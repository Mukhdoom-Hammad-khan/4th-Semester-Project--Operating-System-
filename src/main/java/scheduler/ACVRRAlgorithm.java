package scheduler;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ACV-RR Algorithm (Adaptive Coefficient of Variation Round Robin)
 * 
 * This is an adaptive scheduling algorithm that adjusts the time quantum
 * dynamically based on the Coefficient of Variation (CV) of process burst times.
 */
@Service
public class ACVRRAlgorithm extends BaseScheduler {
    
    /**
     * Execute ACV-RR Algorithm
     */
    public AlgorithmResult run(List<Process> inputProcesses) {
        // Deep copy processes
        List<Process> procs = deepCopyProcesses(inputProcesses);
        
        // Algorithm variables
        int time = 0;
        ContextSwitchCounter contextSwitchCounter = new ContextSwitchCounter();
        String lastProcess = null;
        int roundNumber = 0;
        List<GanttBlock> gantt = new ArrayList<>();
        List<RoundDetail> roundDetails = new ArrayList<>();
        
        // Main scheduling loop
        while (procs.stream().anyMatch(p -> p.getRemaining() > 0)) {
            roundNumber++;
            
            // Step 1: Build ready queue with all arrived processes
            List<Process> readyQueue = buildReadyQueue(procs, time);
            
            // If no processes ready, advance time and add idle block
            if (readyQueue.isEmpty()) {
                int idleStart = time;
                time++;
                gantt.add(new GanttBlock("Idle", idleStart, time));
                continue;
            }
            
            // Step 2: Calculate statistics (Mean, Min, Max, CV)
            List<Integer> burstList = readyQueue.stream()
                    .map(Process::getRemaining)
                    .collect(Collectors.toList());
            
            double mean = burstList.stream().mapToInt(Integer::intValue).average().orElse(0);
            int minBT = burstList.stream().mapToInt(Integer::intValue).min().orElse(0);
            int maxBT = burstList.stream().mapToInt(Integer::intValue).max().orElse(0);
            
            // Calculate Coefficient of Variation
            double variance = burstList.stream()
                    .mapToDouble(val -> Math.pow(val - mean, 2))
                    .average().orElse(0);
            double std = Math.sqrt(variance);
            double cv = mean != 0 ? std / mean : 0;
            
            // Step 3: Calculate quantum based on CV value
            double rawQ;
            String quantumFormula;
            
            if (cv < 0.20) {
                rawQ = (minBT + maxBT + mean) / 2.0;
                quantumFormula = "(Min + Max + Mean) / 2";
            } else if (cv < 0.50) {
                rawQ = (minBT + maxBT + mean) / 3.0;
                quantumFormula = "(Min + Max + Mean) / 3";
            } else if (cv < 0.70) {
                rawQ = (maxBT * mean) / 3.0;
                quantumFormula = "(Max × Mean) / 3";
            } else {
                rawQ = (minBT + mean) / 4.0;
                quantumFormula = "(Min + Mean) / 4";
            }
            int quantum = (int) Math.ceil(rawQ);
            
            // Step 4: Sort ready queue by SJF (Shortest Job First)
            readyQueue.sort((a, b) -> Integer.compare(a.getRemaining(), b.getRemaining()));
            
            // Store round information
            RoundDetail roundInfo = new RoundDetail();
            roundInfo.setRound(roundNumber);
            roundInfo.setReadyQueue(readyQueue.stream()
                    .map(p -> new RoundDetail.QueueProcess(p.getPid(), p.getRemaining()))
                    .collect(Collectors.toList()));
            
            RoundDetail.Statistics stats = new RoundDetail.Statistics();
            stats.setMean(mean);
            stats.setMinBT(minBT);
            stats.setMaxBT(maxBT);
            stats.setVariance(variance);
            stats.setStd(std);
            stats.setCv(cv);
            roundInfo.setStatistics(stats);
            
            roundInfo.setQuantum(quantum);
            roundInfo.setQuantumFormula(quantumFormula);
            
            // Step 5: Execute all processes in ready queue for this round (using base class method)
            ExecutionResult execResult = executeRound(readyQueue, quantum, time, roundNumber, 
                                                     gantt, roundInfo, lastProcess, contextSwitchCounter);
            
            time = execResult.getTime();
            lastProcess = execResult.getLastProcess();
            roundInfo.setCompletedThisRound(execResult.getCompletedProcesses());
            roundDetails.add(roundInfo);
        }
        
        // Step 6: Calculate waiting and turnaround times
        calculateWaitingAndTurnaroundTimes(procs);
        
        // Step 7: Calculate metrics and return
        return calculateMetrics(procs, contextSwitchCounter.getCount(), gantt, roundDetails);
    }
}

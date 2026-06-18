package scheduler;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple Round Robin Algorithm
 * Uses fixed time quantum
 */
@Service
public class SimpleRRAlgorithm extends BaseScheduler {
    
    /**
     * Execute Simple Round Robin Algorithm
     */
    public AlgorithmResult run(List<Process> inputProcesses, int quantum) {
        // Deep copy processes
        List<Process> procs = deepCopyProcesses(inputProcesses);
        
        int time = 0;
        ContextSwitchCounter contextSwitchCounter = new ContextSwitchCounter();
        String lastProcess = null;
        int roundNumber = 0;
        List<GanttBlock> gantt = new ArrayList<>();
        List<RoundDetail> roundDetails = new ArrayList<>();
        
        while (procs.stream().anyMatch(p -> p.getRemaining() > 0)) {
            roundNumber++;
            
            // Build ready queue
            List<Process> readyQueue = buildReadyQueue(procs, time);
            
            if (readyQueue.isEmpty()) {
                int idleStart = time;
                time++;
                gantt.add(new GanttBlock("Idle", idleStart, time));
                continue;
            }
            
            // Store round information
            RoundDetail roundInfo = new RoundDetail();
            roundInfo.setRound(roundNumber);
            roundInfo.setReadyQueue(readyQueue.stream()
                    .map(p -> new RoundDetail.QueueProcess(p.getPid(), p.getRemaining()))
                    .collect(Collectors.toList()));
            roundInfo.setQuantum(quantum);
            
            // Execute all processes in ready queue (using base class method)
            ExecutionResult execResult = executeRound(readyQueue, quantum, time, roundNumber, 
                                                     gantt, roundInfo, lastProcess, contextSwitchCounter);
            
            time = execResult.getTime();
            lastProcess = execResult.getLastProcess();
            roundInfo.setCompletedThisRound(execResult.getCompletedProcesses());
            roundDetails.add(roundInfo);
        }
        
        // Calculate waiting and turnaround times
        calculateWaitingAndTurnaroundTimes(procs);
        
        return calculateMetrics(procs, contextSwitchCounter.getCount(), gantt, roundDetails);
    }
}

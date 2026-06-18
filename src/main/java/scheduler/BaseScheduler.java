package scheduler;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Base Scheduler
 * Contains shared logic for all scheduling algorithms
 */
public abstract class BaseScheduler {
    
    /**
     * Deep copy process list to avoid modifying original data
     */
    protected List<Process> deepCopyProcesses(List<Process> inputProcesses) {
        return inputProcesses.stream()
                .map(p -> new Process(p.getPid(), p.getArrival(), p.getBurst()))
                .collect(Collectors.toList());
    }
    
    /**
     * Build ready queue with processes that have arrived and are not complete
     */
    protected List<Process> buildReadyQueue(List<Process> processes, int currentTime) {
        return processes.stream()
                .filter(p -> p.getArrival() <= currentTime && p.getRemaining() > 0)
                .collect(Collectors.toList());
    }
    
    /**
     * Execute a single process for a given quantum
     * Returns the updated time after execution
     */
    protected int executeProcess(Process current, int quantum, int currentTime, 
                                 int roundNumber, List<GanttBlock> gantt,
                                 RoundDetail roundInfo, String lastProcess,
                                 ContextSwitchCounter contextSwitchCounter) {
        // Calculate execution time
        int execTime = Math.min(quantum, current.getRemaining());
        int startTime = currentTime;
        
        // Count context switch
        if (lastProcess != null && !current.getPid().equals(lastProcess)) {
            contextSwitchCounter.increment();
        }
        
        // Update time and remaining burst
        currentTime += execTime;
        int rbtBefore = current.getRemaining();
        current.setRemaining(current.getRemaining() - execTime);
        
        // Add to Gantt chart
        gantt.add(new GanttBlock(current.getPid(), startTime, currentTime));
        
        // Store execution history
        current.getExecutionHistory().add(
                new Process.ExecutionHistory(roundNumber, startTime, currentTime, execTime)
        );
        
        // Store execution details for this round
        RoundDetail.ExecutionDetail execDetail = new RoundDetail.ExecutionDetail();
        execDetail.setPid(current.getPid());
        execDetail.setRbtBefore(rbtBefore);
        execDetail.setQuantum(quantum);
        execDetail.setExecuted(execTime);
        execDetail.setRbtAfter(current.getRemaining());
        execDetail.setCompleted(current.getRemaining() == 0);
        roundInfo.getExecutions().add(execDetail);
        
        // Mark as completed if no remaining burst
        if (current.getRemaining() == 0) {
            current.setCompletion(currentTime);
        }
        
        return currentTime;
    }
    
    /**
     * Execute all processes in the ready queue for one round
     * Returns updated time and list of completed processes
     */
    protected ExecutionResult executeRound(List<Process> readyQueue, int quantum, 
                                          int currentTime, int roundNumber,
                                          List<GanttBlock> gantt, RoundDetail roundInfo,
                                          String lastProcess, ContextSwitchCounter contextSwitchCounter) {
        List<String> completedThisRound = new ArrayList<>();
        String updatedLastProcess = lastProcess;
        
        for (Process current : readyQueue) {
            currentTime = executeProcess(current, quantum, currentTime, roundNumber, 
                                        gantt, roundInfo, updatedLastProcess, contextSwitchCounter);
            updatedLastProcess = current.getPid();
            
            if (current.getRemaining() == 0) {
                completedThisRound.add(current.getPid());
            }
        }
        
        return new ExecutionResult(currentTime, completedThisRound, updatedLastProcess);
    }
    
    /**
     * Calculate waiting and turnaround times for all processes
     */
    protected void calculateWaitingAndTurnaroundTimes(List<Process> processes) {
        for (Process p : processes) {
            p.setTurnaround(p.getCompletion() - p.getArrival());
            
            int wt = 0;
            List<Process.ExecutionHistory> history = p.getExecutionHistory();
            for (int i = 0; i < history.size(); i++) {
                if (i == 0) {
                    wt += history.get(0).getStart() - p.getArrival();
                } else {
                    wt += history.get(i).getStart() - history.get(i - 1).getEnd();
                }
            }
            p.setWaiting(wt);
        }
    }
    
    /**
     * Calculate final metrics for algorithm result
     */
    protected AlgorithmResult calculateMetrics(List<Process> processes, int contextSwitches,
                                              List<GanttBlock> gantt, List<RoundDetail> roundDetails) {
        AlgorithmResult result = new AlgorithmResult();
        
        // Process details
        result.setProcessDetails(processes.stream()
                .map(p -> new AlgorithmResult.ProcessDetail(
                        p.getPid(), p.getArrival(), p.getBurst(),
                        p.getCompletion(), p.getTurnaround(), p.getWaiting()
                ))
                .collect(Collectors.toList()));
        
        // Calculate averages
        double totalWT = processes.stream().mapToInt(Process::getWaiting).sum();
        double totalTAT = processes.stream().mapToInt(Process::getTurnaround).sum();
        
        result.setAvgWT(totalWT / processes.size());
        result.setAvgTAT(totalTAT / processes.size());
        result.setContextSwitches(contextSwitches);
        
        result.setGantt(gantt);
        result.setRoundDetails(roundDetails);
        
        return result;
    }
    
    /**
     * Helper class to track context switches (mutable counter)
     */
    protected static class ContextSwitchCounter {
        private int count = 0;
        
        public void increment() {
            count++;
        }
        
        public int getCount() {
            return count;
        }
    }
    
    /**
     * Helper class to return execution results
     */
    protected static class ExecutionResult {
        private final int time;
        private final List<String> completedProcesses;
        private final String lastProcess;
        
        public ExecutionResult(int time, List<String> completedProcesses, String lastProcess) {
            this.time = time;
            this.completedProcesses = completedProcesses;
            this.lastProcess = lastProcess;
        }
        
        public int getTime() {
            return time;
        }
        
        public List<String> getCompletedProcesses() {
            return completedProcesses;
        }
        
        public String getLastProcess() {
            return lastProcess;
        }
    }
}

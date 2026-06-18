package scheduler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Process Model
 * Represents a single process with scheduling attributes
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Process {
    private String pid;
    private int arrival;
    private int burst;
    private int remaining;
    private int completion;
    private int turnaround;
    private int waiting;
    private List<ExecutionHistory> executionHistory = new ArrayList<>();
    
    public Process(String pid, int arrival, int burst) {
        this.pid = pid;
        this.arrival = arrival;
        this.burst = burst;
        this.remaining = burst;
        this.executionHistory = new ArrayList<>();
    }
    
    /**
     * Execution History Entry
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExecutionHistory {
        private int round;
        private int start;
        private int end;
        private int duration;
    }
}

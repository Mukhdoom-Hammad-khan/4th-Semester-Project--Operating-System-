package scheduler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Algorithm Result
 * Contains all results from running a scheduling algorithm
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmResult {
    private List<ProcessDetail> processDetails = new ArrayList<>();
    private double avgWT;
    private double avgTAT;
    private int contextSwitches;
    private List<GanttBlock> gantt = new ArrayList<>();
    private List<RoundDetail> roundDetails = new ArrayList<>();
    
    /**
     * Process Detail - simplified for JSON response
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProcessDetail {
        private String pid;
        private int arrival;
        private int burst;
        private int completion;
        private int turnaround;
        private int waiting;
    }
}

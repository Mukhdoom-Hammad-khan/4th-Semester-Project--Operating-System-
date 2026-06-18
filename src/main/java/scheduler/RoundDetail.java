package scheduler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Round Detail
 * Contains detailed information about a single scheduling round
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoundDetail {
    private int round;
    private List<QueueProcess> readyQueue = new ArrayList<>();
    private Statistics statistics;
    private int quantum;
    private String quantumFormula;
    private List<ExecutionDetail> executions = new ArrayList<>();
    private List<String> completedThisRound = new ArrayList<>();
    
    /**
     * Queue Process - simplified process info for ready queue
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QueueProcess {
        private String pid;
        private int remaining;
    }
    
    /**
     * Statistics for the round
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Statistics {
        private double mean;
        private int minBT;
        private int maxBT;
        private double variance;
        private double std;
        private double cv;
    }
    
    /**
     * Execution Detail for a single process in this round
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExecutionDetail {
        private String pid;
        private int rbtBefore;
        private int quantum;
        private int executed;
        private int rbtAfter;
        private boolean completed;
    }
}

package scheduler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Compare Request DTO
 * Request body for comparing algorithms
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompareRequest {
    private List<ProcessInput> processes;
    private int quantum; // For Simple RR
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProcessInput {
        private String pid;
        private int arrival;
        private int burst;
    }
}

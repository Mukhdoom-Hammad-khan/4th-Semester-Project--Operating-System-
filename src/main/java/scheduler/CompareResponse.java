package scheduler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Compare Response DTO
 * Response containing results from both algorithms
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompareResponse {
    private AlgorithmResult acv;
    private AlgorithmResult simple;
}

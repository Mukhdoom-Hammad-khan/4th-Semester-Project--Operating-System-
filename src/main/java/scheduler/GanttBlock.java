package scheduler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Gantt Chart Block
 * Represents a single execution block in the Gantt chart
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GanttBlock {
    private String pid;
    private int start;
    private int end;
}

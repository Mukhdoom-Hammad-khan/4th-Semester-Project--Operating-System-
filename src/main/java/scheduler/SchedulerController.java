package scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for Scheduling Algorithms
 * Provides API endpoints for comparing different CPU scheduling algorithms
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SchedulerController {
    
    @Autowired
    private ACVRRAlgorithm acvrrAlgorithm;
    
    @Autowired
    private SimpleRRAlgorithm simpleRRAlgorithm;
    
    /**
     * Compare all algorithms endpoint
     * POST /api/compare
     */
    @PostMapping("/compare")
    public ResponseEntity<CompareResponse> compareAlgorithms(@RequestBody CompareRequest request) {
        try {
            // Convert input to Process objects
            List<Process> processes = request.getProcesses().stream()
                    .map(p -> new Process(p.getPid(), p.getArrival(), p.getBurst()))
                    .collect(Collectors.toList());
            
            // Run both algorithms
            AlgorithmResult acvResult = acvrrAlgorithm.run(processes);
            AlgorithmResult simpleResult = simpleRRAlgorithm.run(processes, request.getQuantum());
            
            // Create response
            CompareResponse response = new CompareResponse(acvResult, simpleResult);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("CPU Scheduler API is running");
    }
}

# CPU Scheduling Algorithm Comparator 🖥️

> **A modern web-based platform for comparing CPU scheduling algorithms in real-time**
>
> This educational project showcases the performance differences between **ACV-RR (Adaptive Coefficient of Variation Round Robin)** and traditional **Simple Round Robin** scheduling algorithms through interactive visualizations and detailed metrics.

---

## 📋 Project Overview

This project is a full-stack web application designed to help students and researchers understand and visualize how different CPU scheduling algorithms work in operating systems. It provides an interactive environment to input process data, run scheduling simulations, and compare performance metrics side-by-side with detailed step-by-step execution traces.

### Key Highlights
- **Interactive Gantt Charts** - Visualize process execution timelines
- **Real-time Comparisons** - Compare algorithms instantly with performance metrics
- **14 Preset Datasets** - Pre-configured test cases for quick experimentation
- **Custom Process Input** - Design your own scheduling scenarios
- **Detailed Metrics Analysis** - Waiting time, turnaround time, context switches, and more

---

## 📚 Academic Information

| Detail | Information |
|--------|-------------|
| **University** | Sir Syed University of Engineering and Technology (SSUET) |
| **Department** | Software Engineering |
| **Session** | Spring 2026 |
| **Semester** | 4th |
| **Course** | Operating Systems (CS-403) |
| **Instructor** | Farheen Qazi |

---

## 👥 Team Members

| Name | Roll Number | Role |
|------|-------------|------|
| **Mukhdoom Hammad Khan** | 2024F-BSE-074 | Project Lead & Algorithm Implementation |
| **Muhammad Huzaifa Ali** | 2024F-BSE-070 | Backend Developer |
| **Ahmed Raza** | 2024F-BSE-065 | Frontend Developer & UI/UX |
| **Ajwad Rehman** | 2024F-BSE-053 | Testing & Documentation |

---

## 🛠️ Technology Stack

```
┌─────────────────────────────────────┐
│        Full Stack Architecture      │
├─────────────────────────────────────┤
│  Frontend Layer                     │
│  ├─ HTML5                           │
│  ├─ CSS3 (Responsive Design)        │
│  └─ Vanilla JavaScript              │
├─────────────────────────────────────┤
│  Backend Layer                      │
│  ├─ Java 17                         │
│  ├─ Spring Boot 3.2.0               │
│  ├─ Spring Web MVC                  │
│  └─ Thymeleaf Template Engine       │
├─────────────────────────────────────┤
│  Build & Dependencies               │
│  ├─ Maven 3.x                       │
│  ├─ Lombok (Boilerplate Reduction)  │
│  └─ Spring Boot DevTools            │
└─────────────────────────────────────┘
```

### Language Composition
- **CSS**: 33.7% - Styling and responsive UI
- **JavaScript**: 24.2% - Frontend interactivity
- **HTML**: 22.5% - Markup and structure
- **Java**: 19.6% - Backend logic and algorithms

---

## ✨ Features

### Algorithm Comparison
- ✅ **ACV-RR Algorithm** - Adaptive scheduling with dynamic quantum adjustment
- ✅ **Simple Round Robin** - Traditional fixed time quantum scheduling
- ✅ **Side-by-side Performance Metrics** - Compare results instantly

### User Interface
- ✅ **Interactive Input Page** - Configure processes with custom burst and arrival times
- ✅ **Gantt Chart Visualization** - Visual timeline of process execution
- ✅ **Real-time Calculations** - Step-by-step execution trace
- ✅ **Performance Dashboard** - Comprehensive metrics comparison
- ✅ **Algorithm Details Page** - Pseudocode and theoretical overview
- ✅ **About Section** - Project information and team details

### Testing
- ✅ **14 Preset Datasets** - Pre-configured test scenarios
- ✅ **Custom Process Input** - Add unlimited custom processes
- ✅ **Batch Processing** - Test multiple configurations

---

## 📁 Project Structure

```
4th-Semester-Project--Operating-System-/
│
├── 📄 README.md                          # Project documentation
├── 📄 pom.xml                            # Maven configuration
├── 📄 .gitignore                         # Git ignore rules
│
└── src/
    ├── main/
    │   ├── java/com/os/project/
    │   │   ├── config/                   # Spring configuration
    │   │   │   └── WebConfig.java       # Web and CORS settings
    │   │   │
    │   │   ├── controller/               # REST API endpoints
    │   │   │   ├── HomeController.java  # Page routing
    │   │   │   └── ApiController.java   # Algorithm API endpoints
    │   │   │
    │   │   ├── dto/                      # Data transfer objects
    │   │   │   ├── ProcessDTO.java      # Process data structure
    │   │   │   ├── ScheduleResultDTO.java
    │   │   │   └── MetricsDTO.java      # Performance metrics
    │   │   │
    │   │   ├── model/                    # Domain models
    │   │   │   ├── Process.java         # Process entity
    │   │   │   ├── ScheduleResult.java  # Scheduling result
    │   │   │   └── GanttData.java       # Gantt chart data
    │   │   │
    │   │   ├── service/                  # Business logic
    │   │   │   ├── SchedulingService.java       # Main scheduler
    │   │   │   ├── AcvRrAlgorithm.java         # ACV-RR implementation
    │   │   │   ├── SimpleRoundRobin.java       # RR implementation
    │   │   │   ├── MetricsCalculator.java      # Metrics computation
    │   │   │   ├── DatasetManager.java         # Preset datasets
    │   │   │   └── VisualizationService.java   # Chart generation
    │   │   │
    │   │   └── Application.java              # Main Spring Boot entry point
    │   │
    │   └── resources/
    │       ├── application.properties        # Server configuration
    │       ├── static/                       # Static web assets
    │       │   ├── css/
    │       │   │   ├── style.css            # Main styling
    │       │   │   ├── responsive.css       # Mobile responsive
    │       │   │   └── gantt-chart.css      # Chart styling
    │       │   ├── js/
    │       │   │   ├── main.js              # Core functionality
    │       │   │   ├── chart.js             # Chart rendering
    │       │   │   ├── api-client.js        # API communication
    │       │   │   └── algorithms.js        # Algorithm visualization
    │       │   ├── images/                  # Logos and assets
    │       │   └── index.html               # Main page
    │       │
    │       └── templates/                   # Thymeleaf templates
    │           ├── index.html               # Home page
    │           ├── input.html               # Input form page
    │           ├── calculations.html        # Results page
    │           ├── algorithms.html          # Algorithm details
    │           ├── about.html               # About/team page
    │           └── footer.html              # Shared footer
    │
    └── test/                            # Test classes
        └── java/com/os/project/
            ├── AlgorithmTests.java      # Algorithm unit tests
            └── IntegrationTests.java    # Integration tests
```

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Java 17 or higher** - [Download JDK](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
- **Git** - For cloning the repository
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge (preferably latest version)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mukhdoom-Hammad-khan/4th-Semester-Project--Operating-System-.git
   cd 4th-Semester-Project--Operating-System-
   ```

2. **Install Dependencies**
   ```bash
   mvn clean install
   ```

3. **Run the Application**

   **Option A - Using run.bat (Windows):**
   ```bash
   run.bat
   ```

   **Option B - Using Maven:**
   ```bash
   mvn spring-boot:run
   ```

   **Option C - From IDE:**
   - Open the project in your IDE (IntelliJ IDEA / Eclipse / VS Code)
   - Run `Application.java` as a Spring Boot application

4. **Access the Application**
   
   Open your web browser and navigate to:
   ```
   http://localhost:8081
   ```

   The application will automatically load the home page.

---

## 📖 How to Use

### Step 1: Input Configuration
1. Navigate to the **"Input"** page
2. Choose either **"Preset Dataset"** or **"Custom Input"**
3. Configure your processes:
   - Enter **Arrival Time** and **Burst Time** for each process
   - Or select a preset scenario from the dropdown
4. Click **"Run Simulation"**

### Step 2: View Results
1. The application will display:
   - **Gantt Charts** for both algorithms
   - **Performance Metrics** (waiting time, turnaround time, context switches)
   - **Side-by-side Comparison**

### Step 3: Detailed Analysis
1. Go to **"Calculations"** page to see:
   - Step-by-step execution trace
   - Ready queue evolution
   - Context switch points
   - Detailed metrics breakdown

### Step 4: Learn More
1. Visit **"Algorithms"** page for:
   - Pseudocode and algorithm flow
   - Theoretical explanation
   - Comparison details

---

## 🧮 Algorithm Explanations

### ACV-RR (Adaptive Coefficient of Variation Round Robin)

An advanced scheduling algorithm that dynamically adjusts the time quantum based on process characteristics.

**Key Features:**
- **Adaptive Quantum** - Calculated using Coefficient of Variation (CV) of burst times
- **SJF-Based Sorting** - Ready queue sorted by shortest job first for fairness
- **Context Switch Minimization** - Reduces unnecessary switches by intelligent quantum adjustment
- **Performance Optimized** - Achieves better average waiting and turnaround times

**Algorithm Flow:**
```
1. Calculate CV of all process burst times
2. Compute adaptive quantum: Q = (Mean Burst Time) * (1 + CV)
3. Sort ready queue by burst time (SJF)
4. Execute processes with adaptive time quantum
5. Update metrics on each context switch
```

**Advantages:**
- Better than traditional RR for mixed workloads
- Significantly fewer context switches
- Improved response time for short processes
- Fair scheduling while minimizing overhead

### Simple Round Robin

Traditional CPU scheduling with fixed time quantum.

**Key Features:**
- **Fixed Quantum** - All processes get equal CPU time slice
- **FIFO Queue** - First-come, first-served ready queue
- **Fair Distribution** - All processes get equal opportunity
- **Simple Implementation** - Easy to understand and implement

**Algorithm Flow:**
```
1. Set fixed time quantum Q
2. Enqueue all processes in ready queue (FIFO)
3. Execute process for time quantum Q
4. If not completed, move to back of queue
5. Repeat until all processes finish
```

**Advantages:**
- Fair to all processes
- Simple to implement
- Good for interactive systems
- Prevents starvation

**Disadvantages:**
- Many context switches for long processes
- High overhead with small quantum
- Not optimal for mixed workloads

---

## 📊 Performance Metrics

The application calculates and displays:

| Metric | Description | Formula |
|--------|-------------|---------|
| **Waiting Time** | Time process waits in ready queue | Turnaround Time - Burst Time |
| **Turnaround Time** | Total time from arrival to completion | Completion Time - Arrival Time |
| **Average Waiting Time** | Mean waiting time of all processes | Sum(Waiting Times) / Process Count |
| **Average Turnaround Time** | Mean turnaround time of all processes | Sum(Turnaround Times) / Process Count |
| **Context Switches** | Number of times CPU switches processes | Counted during execution |
| **CPU Utilization** | Percentage of time CPU is busy | (Total CPU Time / Total Time) × 100 |

---

## 🧪 Testing

### Running Tests

```bash
mvn test
```

### Test Coverage

- **Unit Tests** - Algorithm implementations
- **Integration Tests** - Controller and service layer
- **Metrics Tests** - Calculation accuracy

---

## 📝 API Documentation

### Endpoints

#### GET /
- **Description**: Serves home page
- **Response**: HTML page

#### GET /input
- **Description**: Serves input configuration page
- **Response**: HTML page with form

#### GET /calculations
- **Description**: Serves calculations/results page
- **Response**: HTML page with metrics

#### POST /api/schedule
- **Description**: Runs scheduling simulation
- **Body**: JSON array of processes
- **Response**: Scheduling results with metrics

Example Request:
```json
{
  "processes": [
    {"id": 1, "arrivalTime": 0, "burstTime": 8},
    {"id": 2, "arrivalTime": 1, "burstTime": 4},
    {"id": 3, "arrivalTime": 2, "burstTime": 2}
  ],
  "timeQuantum": 4
}
```

Example Response:
```json
{
  "acvRrResult": {
    "ganttChart": [...],
    "metrics": {
      "avgWaitingTime": 3.5,
      "avgTurnaroundTime": 8.2,
      "contextSwitches": 4
    }
  },
  "simpleRRResult": {
    "ganttChart": [...],
    "metrics": {
      "avgWaitingTime": 4.2,
      "avgTurnaroundTime": 9.1,
      "contextSwitches": 6
    }
  }
}
```

---

## 🔧 Configuration

### Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8081
server.servlet.context-path=/
spring.application.name=CPU Scheduler

# Thymeleaf Configuration
spring.thymeleaf.cache=false
spring.thymeleaf.encoding=UTF-8

# Logging
logging.level.root=INFO
logging.level.com.os.project=DEBUG
```

---

## 🐛 Troubleshooting

### Application won't start
- Ensure Java 17+ is installed: `java -version`
- Check Maven is installed: `mvn -version`
- Verify port 8081 is not in use

### Port already in use
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8081
kill -9 <PID>
```

### Maven build fails
```bash
# Clean cache and rebuild
mvn clean install -DskipTests
```

### Page won't load
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for JavaScript errors (F12)
- Verify server is running on port 8081

---

## 📚 Learning Resources

### OS Scheduling Concepts
- [Operating System Concepts (Silberschatz, Galvin, Gagne)](https://www.os-book.com/)
- [Introduction to Operating Systems](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- [CPU Scheduling Algorithms](https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/)

### Spring Boot
- [Official Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Boot Tutorial](https://spring.io/guides/gs/serving-web-content/)

### Frontend Technologies
- [MDN Web Docs - HTML, CSS, JavaScript](https://developer.mozilla.org/)

---

## 📜 License

This project is created for **educational purposes only** as part of the Operating Systems course (CS-403) at Sir Syed University of Engineering and Technology.

**Academic Use Only** - Not intended for commercial use or reproduction without proper attribution.

---

## 🤝 Contributing

While this is an academic project, we welcome constructive feedback and suggestions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📧 Contact

For questions or feedback regarding this project, please reach out to:

- **Project Lead**: Mukhdoom Hammad Khan ([GitHub](https://github.com/Mukhdoom-Hammad-khan))
- **Course Instructor**: Farheen Qazi (SSUET)

---

## 📸 Screenshots

> _Coming soon - Add screenshots of your application UI here_

---

## 🎯 Future Enhancements

- [ ] Add more scheduling algorithms (Priority, SJF, Preemptive SJF)
- [ ] Support for process priorities
- [ ] Real-time algorithm performance comparison
- [ ] Export results to PDF/CSV
- [ ] Mobile-optimized interface
- [ ] Algorithm performance analysis tools
- [ ] Interactive algorithm visualization
- [ ] Machine learning-based optimal quantum prediction

---

## ✅ Checklist for Deployment

- [ ] All tests pass (`mvn test`)
- [ ] Code follows style guidelines
- [ ] No hardcoded sensitive data
- [ ] Documentation is up-to-date
- [ ] Application runs on clean build
- [ ] Browser compatibility tested
- [ ] Performance optimized

---

**Last Updated**: June 18, 2026  
**Version**: 1.0.0

---

<div align="center">

Made with ❤️ by the SSUET OS Project Team

⭐ If you found this helpful, please star the repository!

</div>

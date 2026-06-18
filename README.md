# CPU Scheduling Algorithm Comparator

A web-based application that compares CPU scheduling algorithms: **ACV-RR (Adaptive Coefficient of Variation Round Robin)** and **Simple Round Robin**.

## Project Information

- **University**: Sir Syed University of Engineering and Technology
- **Department**: Software Engineering
- **Session**: Spring 2026 - Semester 4
- **Course**: Operating Systems

## Team Members

- Mukhdoom Hammad Khan (2024F-BSE-074)
- Muhammad Huzaifa Ali (2024F-BSE-070)
- Ahmed Raza (2024F-BSE-065)
- Ajwad Rehman (2024F-BSE-053)

## Instructor

Farheen Qazi

## Technologies

- **Backend**: Java Spring Boot
- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: Maven

## Features

- Compare ACV-RR vs Simple Round Robin algorithms
- 14 preset datasets for testing
- Custom process input
- Interactive Gantt chart visualization
- Performance metrics comparison (Waiting Time, Turnaround Time, Context Switches)
- Detailed step-by-step calculations

## How to Run

### Prerequisites

- Java 17 or higher
- Maven

### Run the Application

**Windows:**
```bash
run.bat
```

**Manual:**
```bash
mvn spring-boot:run
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:8081
```

## Project Structure

```
src/
├── main/
│   ├── java/com/os/project/
│   │   ├── config/          # Web configuration
│   │   ├── controller/      # REST API controllers
│   │   ├── dto/             # Data transfer objects
│   │   ├── model/           # Domain models
│   │   └── service/         # Algorithm implementations
│   └── resources/
│       ├── static/          # HTML, CSS, JS, images
│       └── application.properties
└── test/                    # Test files (if any)
```

## Algorithm Overview

### ACV-RR (Adaptive Coefficient of Variation Round Robin)

A dynamic scheduling algorithm that adjusts time quantum based on process characteristics to minimize context switches while maintaining fairness.

**Key Features:**
- Adaptive quantum calculation based on CV (Coefficient of Variation)
- SJF-based ready queue sorting
- Minimizes context switches
- Improves average waiting and turnaround times

### Simple Round Robin

Traditional round-robin scheduling with fixed time quantum.

## Pages

1. **Input Page** - Configure processes and run comparison
2. **Calculations Page** - View detailed step-by-step execution
3. **Algorithm Page** - View ACV-RR pseudocode and overview
4. **About Page** - Project and team information

## License

This project is created for educational purposes as part of the Operating Systems course at Sir Syed University of Engineering and Technology.

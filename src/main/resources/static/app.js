// ============================================
// CPU Scheduler Application
// Backend: Java Spring Boot handles all algorithm logic
// Frontend: JavaScript handles UI and displays results
// ============================================

let processes = [];
let processCounter = 1;
let lastResults = null;

// DOM Elements
const presetSelect = document.getElementById('presetSelect');
const processTableBody = document.getElementById('processTableBody');
const processCount = document.getElementById('processCount');
const pidInput = document.getElementById('pidInput');
const arrivalInput = document.getElementById('arrivalInput');
const burstInput = document.getElementById('burstInput');
const addProcessBtn = document.getElementById('addProcessBtn');
const compareBtn = document.getElementById('compareBtn');
const clearBtn = document.getElementById('clearBtn');
const quantumInput = document.getElementById('quantumInput');
const resultsContent = document.getElementById('resultsContent');
const emptyResults = document.getElementById('emptyResults');

// Preset Datasets
const presetDatasets = {
    "1": { name: "All same arrival (uniform burst)", processes: [{pid: "P1", arrival: 0, burst: 10}, {pid: "P2", arrival: 0, burst: 10}, {pid: "P3", arrival: 0, burst: 10}, {pid: "P4", arrival: 0, burst: 10}] },
    "2": { name: "High variation (short + very long jobs)", processes: [{pid: "P1", arrival: 0, burst: 2}, {pid: "P2", arrival: 0, burst: 50}, {pid: "P3", arrival: 1, burst: 4}, {pid: "P4", arrival: 2, burst: 40}, {pid: "P5", arrival: 3, burst: 1}] },
    "3": { name: "Ascending burst times", processes: [{pid: "P1", arrival: 0, burst: 2}, {pid: "P2", arrival: 0, burst: 5}, {pid: "P3", arrival: 0, burst: 9}, {pid: "P4", arrival: 0, burst: 14}, {pid: "P5", arrival: 0, burst: 20}] },
    "4": { name: "Descending burst times", processes: [{pid: "P1", arrival: 0, burst: 20}, {pid: "P2", arrival: 0, burst: 14}, {pid: "P3", arrival: 0, burst: 9}, {pid: "P4", arrival: 0, burst: 5}, {pid: "P5", arrival: 0, burst: 2}] },
    "5": { name: "Descending burst - large values", processes: [{pid: "P1", arrival: 0, burst: 120}, {pid: "P2", arrival: 0, burst: 95}, {pid: "P3", arrival: 0, burst: 70}, {pid: "P4", arrival: 0, burst: 45}, {pid: "P5", arrival: 0, burst: 20}, {pid: "P6", arrival: 0, burst: 8}] },
    "6": { name: "Mixed arrival + heavy burst", processes: [{pid: "P1", arrival: 0, burst: 80}, {pid: "P2", arrival: 5, burst: 60}, {pid: "P3", arrival: 10, burst: 100}, {pid: "P4", arrival: 15, burst: 45}, {pid: "P5", arrival: 20, burst: 75}, {pid: "P6", arrival: 25, burst: 30}] },
    "7": { name: "High variation - extreme range", processes: [{pid: "P1", arrival: 0, burst: 200}, {pid: "P2", arrival: 0, burst: 5}, {pid: "P3", arrival: 2, burst: 150}, {pid: "P4", arrival: 2, burst: 8}, {pid: "P5", arrival: 4, burst: 180}, {pid: "P6", arrival: 4, burst: 3}] },
    "8": { name: "Uniform large burst - low CV expected", processes: [{pid: "P1", arrival: 0, burst: 100}, {pid: "P2", arrival: 0, burst: 105}, {pid: "P3", arrival: 0, burst: 98}, {pid: "P4", arrival: 0, burst: 102}, {pid: "P5", arrival: 0, burst: 99}, {pid: "P6", arrival: 0, burst: 101}] },
    "9": { name: "Staggered arrival - long jobs", processes: [{pid: "P1", arrival: 0, burst: 50}, {pid: "P2", arrival: 10, burst: 90}, {pid: "P3", arrival: 20, burst: 130}, {pid: "P4", arrival: 30, burst: 70}, {pid: "P5", arrival: 40, burst: 110}, {pid: "P6", arrival: 50, burst: 40}] },
    "10": { name: "Large burst - uniform, 6 processes", processes: [{pid: "P1", arrival: 0, burst: 150}, {pid: "P2", arrival: 0, burst: 160}, {pid: "P3", arrival: 0, burst: 140}, {pid: "P4", arrival: 0, burst: 155}, {pid: "P5", arrival: 0, burst: 145}, {pid: "P6", arrival: 0, burst: 150}] },
    "11": { name: "Large burst - mixed arrival, 6 processes", processes: [{pid: "P1", arrival: 0, burst: 200}, {pid: "P2", arrival: 10, burst: 180}, {pid: "P3", arrival: 20, burst: 220}, {pid: "P4", arrival: 30, burst: 190}, {pid: "P5", arrival: 40, burst: 210}, {pid: "P6", arrival: 50, burst: 170}] },
    "12": { name: "Large burst - high CV, 6 processes", processes: [{pid: "P1", arrival: 0, burst: 300}, {pid: "P2", arrival: 0, burst: 50}, {pid: "P3", arrival: 0, burst: 280}, {pid: "P4", arrival: 0, burst: 40}, {pid: "P5", arrival: 0, burst: 260}, {pid: "P6", arrival: 0, burst: 30}] },
    "13": { name: "Large burst - descending, 6 processes", processes: [{pid: "P1", arrival: 0, burst: 500}, {pid: "P2", arrival: 0, burst: 400}, {pid: "P3", arrival: 0, burst: 300}, {pid: "P4", arrival: 0, burst: 200}, {pid: "P5", arrival: 0, burst: 100}, {pid: "P6", arrival: 0, burst: 50}] },
    "14": { name: "Large burst - staggered, high CV, 6 processes", processes: [{pid: "P1", arrival: 0, burst: 400}, {pid: "P2", arrival: 5, burst: 25}, {pid: "P3", arrival: 10, burst: 350}, {pid: "P4", arrival: 15, burst: 20}, {pid: "P5", arrival: 20, burst: 300}, {pid: "P6", arrival: 25, burst: 15}] }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (processTableBody) updateTable();
    loadFromStorage();
    
    if (presetSelect) presetSelect.addEventListener('change', loadPreset);
    if (addProcessBtn) addProcessBtn.addEventListener('click', addProcess);
    if (compareBtn) compareBtn.addEventListener('click', compareAlgorithms);
    if (clearBtn) clearBtn.addEventListener('click', clearAll);
    
    if (pidInput) {
        pidInput.addEventListener('focus', () => {
            if (!pidInput.value) pidInput.value = `P${processCounter}`;
        });
    }
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('calc-tab')) {
            switchCalcTab(e.target.dataset.algo);
        }
    });
    
    if (lastResults && document.getElementById('calcTabs')) {
        document.getElementById('calcInfoMessage').style.display = 'none';
        document.getElementById('calcTabs').style.display = 'flex';
        switchCalcTab('acv');
    }
});

function loadFromStorage() {
    const saved = {
        results: localStorage.getItem('lastResults'),
        processes: localStorage.getItem('lastProcesses'),
        quantum: localStorage.getItem('lastQuantum')
    };
    
    if (saved.results) lastResults = JSON.parse(saved.results);
    if (saved.processes && processTableBody) {
        processes = JSON.parse(saved.processes);
        processCounter = processes.length + 1;
        updateTable();
    }
    if (saved.quantum && quantumInput) quantumInput.value = saved.quantum;
}

function loadPreset() {
    if (!presetSelect) return;
    const key = presetSelect.value;
    if (key && presetDatasets[key]) {
        processes = presetDatasets[key].processes.map(p => ({...p}));
        processCounter = processes.length + 1;
        updateTable();
        showToast(`Loaded: ${presetDatasets[key].name}`, 'success');
    }
}

function addProcess() {
    if (!pidInput || !arrivalInput || !burstInput) return;
    
    const pid = pidInput.value.trim();
    const arrival = parseInt(arrivalInput.value);
    const burst = parseInt(burstInput.value);
    
    if (!pid) { showToast('Please enter a Process ID', 'error'); return; }
    if (isNaN(arrival) || arrival < 0) { showToast('Arrival time must be >= 0', 'error'); return; }
    if (isNaN(burst) || burst <= 0) { showToast('Burst time must be > 0', 'error'); return; }
    if (processes.some(p => p.pid === pid)) { showToast('Process ID already exists!', 'error'); return; }
    
    processes.push({pid, arrival, burst});
    processCounter++;
    
    pidInput.value = `P${processCounter}`;
    arrivalInput.value = '0';
    burstInput.value = '10';
    
    updateTable();
    showToast(`Process ${pid} added!`, 'success');
}

function removeProcess(idx) {
    processes.splice(idx, 1);
    updateTable();
    showToast('Process removed', 'success');
}

function clearAll() {
    processes = [];
    processCounter = 1;
    if (presetSelect) presetSelect.value = '';
    if (pidInput) pidInput.value = '';
    updateTable();
    if (resultsContent) resultsContent.style.display = 'none';
    if (emptyResults) emptyResults.style.display = 'block';
    showToast('All data cleared', 'success');
}

function updateTable() {
    if (!processCount || !processTableBody) return;
    
    processCount.textContent = `${processes.length} process${processes.length !== 1 ? 'es' : ''}`;
    
    if (processes.length === 0) {
        processTableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="4"><i class="fas fa-inbox"></i><p>No processes. Load a dataset or add processes below.</p></td>
            </tr>`;
        return;
    }
    
    processTableBody.innerHTML = processes.map((p, idx) => `
        <tr>
            <td><input type="text" class="process-input" value="${p.pid}" onchange="updateProcess(${idx}, 'pid', this.value)" style="width: 60px;"></td>
            <td><input type="number" class="process-input" value="${p.arrival}" onchange="updateProcess(${idx}, 'arrival', parseInt(this.value))" style="width: 70px;"></td>
            <td><input type="number" class="process-input" value="${p.burst}" onchange="updateProcess(${idx}, 'burst', parseInt(this.value))" style="width: 70px;"></td>
            <td><button class="btn btn-danger" onclick="removeProcess(${idx})"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

function updateProcess(idx, field, value) {
    if (field === 'pid') processes[idx].pid = value;
    else if (field === 'arrival') processes[idx].arrival = isNaN(value) ? 0 : value;
    else if (field === 'burst') processes[idx].burst = isNaN(value) || value <= 0 ? 1 : value;
}

async function compareAlgorithms() {
    if (processes.length === 0) { showToast('Please add processes first!', 'error'); return; }
    
    showToast('Running comparison...', 'success');
    const quantum = parseInt(quantumInput?.value) || 5;
    
    try {
        const response = await fetch('/api/compare', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({processes, quantum})
        });
        
        if (!response.ok) throw new Error('API call failed');
        
        const data = await response.json();
        lastResults = {acv: data.acv, simple: data.simple};
        
        localStorage.setItem('lastResults', JSON.stringify(lastResults));
        localStorage.setItem('lastProcesses', JSON.stringify(processes));
        localStorage.setItem('lastQuantum', quantum);
        
        displayResults(data.acv, data.simple);
        
        if (resultsContent) {
            setTimeout(() => resultsContent.scrollIntoView({behavior: 'smooth'}), 100);
        }
        
        showToast('Comparison completed!', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast('Error running comparison. Please try again.', 'error');
    }
}

function displayResults(acv, simple) {
    if (!resultsContent || !emptyResults) return;
    
    emptyResults.style.display = 'none';
    resultsContent.style.display = 'block';
    
    const winners = {
        awt: getWinner([acv.avgWT, simple.avgWT], true),
        atat: getWinner([acv.avgTAT, simple.avgTAT], true),
        cs: getWinner([acv.contextSwitches, simple.contextSwitches], true)
    };
    
    // Calculate percentage differences (positive = ACV-RR is better)
    const wtDiff = ((simple.avgWT - acv.avgWT) / simple.avgWT * 100);
    const tatDiff = ((simple.avgTAT - acv.avgTAT) / simple.avgTAT * 100);
    const csDiff = ((simple.contextSwitches - acv.contextSwitches) / simple.contextSwitches * 100);
    
    const winCounts = {'ACV-RR': 0, 'Simple RR': 0};
    Object.values(winners).forEach(w => w.forEach(algo => winCounts[algo]++));
    const overallWinner = Object.keys(winCounts).reduce((a, b) => winCounts[a] > winCounts[b] ? a : b);
    
    resultsContent.innerHTML = `
        <div style="animation: fadeIn 0.5s ease;">
            <div class="metrics-grid">
                ${createMetricCard('Average Waiting Time', acv.avgWT, simple.avgWT, winners.awt, 'far fa-clock', true, true, wtDiff)}
                ${createMetricCard('Average Turnaround Time', acv.avgTAT, simple.avgTAT, winners.atat, 'fas fa-hourglass-half', true, true, tatDiff)}
                ${createMetricCard('Context<br>Switches', acv.contextSwitches, simple.contextSwitches, winners.cs, 'fas fa-exchange-alt', true, false, csDiff)}
            </div>
            
            <div class="winner-card">
                <div class="winner-icon"><i class="fas fa-trophy"></i></div>
                <h2>Overall Winner</h2>
                <div class="winner-name">${overallWinner}</div>
                <div class="winner-stats">
                    <div class="stat"><span>ACV-RR</span><strong>${winCounts['ACV-RR']} wins</strong></div>
                    <div class="stat"><span>Simple RR</span><strong>${winCounts['Simple RR']} wins</strong></div>
                </div>
            </div>
            
            <div class="comparison-table-container">
                <h3><i class="fas fa-table"></i> Detailed Comparison</h3>
                <table class="comparison-table">
                    <thead><tr><th>Metric</th><th>ACV-RR</th><th>Simple RR</th><th>Difference</th><th>Winner</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>Avg Waiting Time</td>
                            <td>${acv.avgWT.toFixed(2)}</td>
                            <td>${simple.avgWT.toFixed(2)}</td>
                            <td class="${wtDiff > 0 ? 'positive-diff' : 'negative-diff'}">${wtDiff > 0 ? '+' : ''}${wtDiff.toFixed(2)}%</td>
                            <td class="winner-cell">${winners.awt.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Avg Turnaround Time</td>
                            <td>${acv.avgTAT.toFixed(2)}</td>
                            <td>${simple.avgTAT.toFixed(2)}</td>
                            <td class="${tatDiff > 0 ? 'positive-diff' : 'negative-diff'}">${tatDiff > 0 ? '+' : ''}${tatDiff.toFixed(2)}%</td>
                            <td class="winner-cell">${winners.atat.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Context Switches</td>
                            <td>${acv.contextSwitches}</td>
                            <td>${simple.contextSwitches}</td>
                            <td class="${csDiff > 0 ? 'positive-diff' : 'negative-diff'}">${csDiff > 0 ? '+' : ''}${csDiff.toFixed(2)}%</td>
                            <td class="winner-cell">${winners.cs.join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function createMetricCard(title, acvVal, simpleVal, winners, icon, lowerBetter, isDecimal = true, percentDiff = 0) {
    const fmt = val => isDecimal ? val.toFixed(2) : Math.round(val);
    const diffClass = percentDiff > 0 ? 'improvement' : 'degradation';
    const diffText = percentDiff > 0 ? `${percentDiff.toFixed(1)}% better` : `${Math.abs(percentDiff).toFixed(1)}% worse`;
    
    return `
        <div class="metric-card">
            <div class="metric-header"><i class="${icon}"></i><h3>${title}</h3></div>
            <div class="metric-values">
                <div class="algo-value ${winners.includes('ACV-RR') ? 'winner' : ''}">
                    <span class="algo-name">ACV-RR</span>
                    <span class="value">${fmt(acvVal)}</span>
                    ${winners.includes('ACV-RR') ? '<i class="fas fa-crown"></i>' : ''}
                </div>
                <div class="algo-value ${winners.includes('Simple RR') ? 'winner' : ''}">
                    <span class="algo-name">Simple RR</span>
                    <span class="value">${fmt(simpleVal)}</span>
                    ${winners.includes('Simple RR') ? '<i class="fas fa-crown"></i>' : ''}
                </div>
            </div>
            <div class="metric-footer">
                <span class="winner-label">${lowerBetter ? 'Lower is Better' : 'Higher is Better'}</span>
                <span class="diff-label ${diffClass}">
                    <i class="fas fa-${percentDiff > 0 ? 'arrow-up' : 'arrow-down'}"></i>
                    ACV-RR is ${diffText}
                </span>
            </div>
        </div>
    `;
}

function getWinner(values, lowerBetter) {
    const algos = ['ACV-RR', 'Simple RR'];
    const best = lowerBetter ? Math.min(...values) : Math.max(...values);
    return algos.filter((_, i) => values[i] === best);
}

function mergeConsecutiveIdleBlocks(gantt) {
    if (!gantt || gantt.length === 0) return gantt;
    
    const merged = [];
    let i = 0;
    
    while (i < gantt.length) {
        const current = gantt[i];
        
        // If it's an Idle block, check for consecutive Idle blocks
        if (current.pid === 'Idle') {
            let endTime = current.end;
            let j = i + 1;
            
            // Keep merging consecutive Idle blocks
            while (j < gantt.length && gantt[j].pid === 'Idle' && gantt[j].start === endTime) {
                endTime = gantt[j].end;
                j++;
            }
            
            // Add the merged Idle block
            merged.push({
                pid: 'Idle',
                start: current.start,
                end: endTime
            });
            
            i = j; // Skip the merged blocks
        } else {
            // Not an Idle block, just add it
            merged.push(current);
            i++;
        }
    }
    
    return merged;
}

function switchCalcTab(algo) {
    document.querySelectorAll('.calc-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.algo === algo) tab.classList.add('active');
    });
    
    if (lastResults && lastResults[algo]) {
        displayCalculationDetails(algo);
    }
}

function displayCalculationDetails(algo) {
    const result = lastResults[algo];
    const calcContent = document.getElementById('calcContent');
    if (!calcContent || !result) return;
    
    const algoNames = {
        acv: 'ACV-RR (My Algorithm)',
        simple: 'Simple Round Robin'
    };
    
    let html = `
        <div class="calc-details">
            <h2 style="color: var(--primary); margin-bottom: var(--spacing-lg);">
                <i class="fas fa-microchip"></i> ${algoNames[algo]}
            </h2>
            
            <div class="calc-section">
                <h3><i class="fas fa-table"></i> Initial Processes</h3>
                <table class="process-details-table">
                    <thead><tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th></tr></thead>
                    <tbody>
                        ${result.processDetails.map(p => `
                            <tr><td><strong>${p.pid}</strong></td><td>${p.arrival}</td><td>${p.burst}</td></tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
    `;
    
    // Display round details if available
    if (result.roundDetails) {
        result.roundDetails.forEach(round => {
            html += `
                <div class="calc-section" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid var(--primary); border-radius: 4px;">
                    <h3 style="margin-top: 0;"><i class="fas fa-layer-group"></i> Step ${round.round}</h3>
                    
                    <div style="margin: 15px 0;">
                        <strong>Processes considered for TQ (loaded + waiting):</strong><br>
                        <code style="display: block; margin: 8px 0; padding: 8px; background: white; border-radius: 3px; font-size: 13px;">
                            ${round.readyQueue.map(p => `${p.pid}=${p.remaining}`).join(', ')}
                        </code>
                    </div>
                    
                    <div style="margin: 15px 0; padding: 10px; background: white; border-radius: 3px;">
                        <strong>── Quantum Calculation ──</strong><br>
                        ${algo === 'simple' ? `
                            Fixed Time Quantum : ${round.quantum}
                        ` : `
                            CV = ${round.statistics.cv.toFixed(4)}<br>
                            ${round.statistics.cv < 0.20 ? 'Since CV < 0.20' : round.statistics.cv < 0.50 ? 'Since 0.20 ≤ CV < 0.50' : round.statistics.cv < 0.70 ? 'Since 0.50 ≤ CV < 0.70' : 'Since CV ≥ 0.70'}:<br>
                            Quantum = ${round.quantumFormula}<br>
                            Quantum = ${round.quantum}
                        `}
                    </div>
                    
                    <div style="margin: 15px 0; padding: 10px; background: white; border-radius: 3px;">
                        <strong>Waiting in queue:</strong> 
                        ${round.readyQueue.length > 1 ? round.readyQueue.slice(1).map(p => `${p.pid}=${p.remaining}`).join(', ') : '(empty)'}
                    </div>
                    
                    <div style="margin: 15px 0; padding: 10px; background: white; border-radius: 3px;">
                        <strong>── Execution ──</strong><br>
                        ${round.executions.map(exec => {
                            let status = exec.rbtAfter === 0 ? `  ✓ Completed at t=${result.gantt.filter(g => g.pid === exec.pid).pop().end}` : '  → returned to queue';
                            return `
                                ${exec.pid}:<br>
                                &nbsp;&nbsp;RBT Before = ${exec.rbtBefore}<br>
                                &nbsp;&nbsp;Quantum    = ${exec.quantum}<br>
                                &nbsp;&nbsp;Executed   = ${exec.executed}<br>
                                &nbsp;&nbsp;RBT After  = ${exec.rbtAfter}${status}
                            `;
                        }).join('<br>')}
                    </div>
                </div>
            `;
        });
    }
    
    // Gantt Chart with Smart Scaling
    // First, merge consecutive Idle blocks
    const mergedGantt = mergeConsecutiveIdleBlocks(result.gantt);
    
    // Calculate durations to determine appropriate scaling
    const durations = mergedGantt.map(g => g.end - g.start);
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    
    // Use logarithmic scaling for better proportions
    // Small durations get MORE width to prevent label overlap
    function calculateWidth(duration, pid) {
        // Special handling for Idle blocks - make them 4x bigger
        const idleMultiplier = (pid === 'Idle') ? 4 : 1;
        
        if (maxDuration <= 10) {
            // If all durations are small, use linear scaling
            return duration * 10 * idleMultiplier;
        }
        
        // Increase width for small durations to fit time labels
        const minWidth = 50; // Increased minimum width
        const scaleFactor = 50;
        
        if (duration <= 5) {
            // Very small durations (1-5): give extra width (10x) to fit labels
            return (minWidth + (duration * 10)) * idleMultiplier;
        } else if (duration <= 20) {
            // Small durations (6-20): linear scaling with higher multiplier
            return (minWidth + (duration * 6)) * idleMultiplier;
        } else {
            // Large durations (> 20): logarithmic scaling (compressed)
            return (minWidth + (Math.log(1 + duration) * scaleFactor)) * idleMultiplier;
        }
    }
    
    // Calculate positions using cumulative widths
    let cumulativePosition = 0;
    const blockData = mergedGantt.map(g => {
        const width = calculateWidth(g.end - g.start, g.pid);
        const data = {
            pid: g.pid,
            start: g.start,
            end: g.end,
            width: width,
            position: cumulativePosition
        };
        cumulativePosition += width;
        return data;
    });
    
    const totalWidth = cumulativePosition;
    
    // Collect time points with their positions
    const timePositions = new Map();
    blockData.forEach(block => {
        timePositions.set(block.start, block.position);
        timePositions.set(block.end, block.position + block.width);
    });
    
    const sortedTimes = Array.from(timePositions.keys()).sort((a, b) => a - b);
    
    html += `
        <div class="calc-section">
            <h3><i class="fas fa-chart-bar"></i> Gantt Chart</h3>
            <div class="gantt-chart">
                <div class="gantt-timeline" style="width: ${totalWidth}px;">
                    ${blockData.map(block => {
                        return `
                            <div class="gantt-block" data-process="${block.pid}" style="width: ${block.width}px;">
                                <div class="process-name">${block.pid}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="gantt-time-axis" style="width: ${totalWidth}px;">
                    ${sortedTimes.map(time => {
                        const position = timePositions.get(time);
                        return `
                            <div class="time-tick" style="left: ${position}px;">
                                <div class="tick-mark"></div>
                                <div class="tick-label">${time}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Final Results
    html += `
        <div class="calc-section">
            <h3><i class="fas fa-table"></i> Final Results</h3>
            <table class="process-details-table">
                <thead><tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Turnaround Time</th><th>Waiting Time</th></tr></thead>
                <tbody>
                    ${result.processDetails.map(p => `
                        <tr><td><strong>${p.pid}</strong></td><td>${p.arrival}</td><td>${p.burst}</td><td>${p.turnaround}</td><td>${p.waiting}</td></tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="calc-section">
            <h3><i class="fas fa-chart-line"></i> Performance Metrics</h3>
            <div class="metrics-summary">
                <div class="metric-box"><div class="label">Avg Waiting Time</div><div class="value">${result.avgWT.toFixed(2)}</div></div>
                <div class="metric-box"><div class="label">Avg Turnaround Time</div><div class="value">${result.avgTAT.toFixed(2)}</div></div>
                <div class="metric-box"><div class="label">Context Switches</div><div class="value">${result.contextSwitches}</div></div>
            </div>
        </div>
    </div>`;
    
    calcContent.innerHTML = html;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => toast.classList.remove('show'), 3000);
}

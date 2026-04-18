<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Browse | PRMD 2.0</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root {
    --primary: #2e7d32;
    --primary-dark: #1b5e20;
    --primary-light: #e8f5e9;
    --bg: #f5f7fa;
    --surface: #ffffff;
    --text: #1a1a2e;
    --text-muted: #6b7280;
    --border: #e5e7eb;
    --danger: #ef4444;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Noto Sans SC', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
}

/* ========== Sidebar ========== */
.sidebar {
    position: fixed;
    top: 70px;
    left: 15px;
    width: 280px;
    bottom: 15px;
    background: var(--surface);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
    overflow-y: auto;
    border: 1px solid var(--border);
    z-index: 10;
}

.sidebar-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary);
    padding: 8px 0;
    border-bottom: 2px solid var(--primary);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.sidebar ul { list-style: none; }
.sidebar > ul > li { margin-bottom: 8px; }
.sidebar li { margin: 2px 0; position: relative; }

.sidebar li .toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    background: var(--bg);
    border-radius: 4px;
    margin-right: 6px;
    color: var(--text-muted);
    transition: background 0.2s, color 0.2s;
}

.sidebar li .toggle:hover { background: var(--primary); color: #fff; }

.sidebar li > span.category-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text);
}

.sidebar li ul {
    display: none;
    padding-left: 22px;
    margin-top: 4px;
    border-left: 2px solid var(--border);
    margin-left: 9px;
}

.sidebar li ul.show { display: block; }

.sidebar a {
    display: block;
    text-decoration: none;
    color: var(--text-muted);
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s, padding-left 0.2s;
}

.sidebar a:hover { background: rgba(76, 175, 80, 0.1); color: var(--primary); padding-left: 14px; }
.sidebar a.active { background: rgba(76, 175, 80, 0.15); color: var(--primary); font-weight: 600; }

/* ========== Content Area ========== */
.content {
    margin-left: 310px;
    margin-top: 70px;
    padding: 20px;
    min-height: calc(100vh - 70px);
}

/* ========== Statistics / Charts Section ========== */
.stats-section {
    background: var(--surface);
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    border: 1px solid var(--border);
}

.stats-section h3 {
    font-size: 16px;
    color: var(--text);
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
}

.stats-grid {
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    gap: 20px;
    min-height: 380px;
}

/* Pie chart area */
.chart-pie-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.chart-pie {
    background: var(--bg);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px dashed var(--border);
    flex: 1;
}

.chart-pie .pie-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
    text-align: center;
}

.chart-pie canvas {
    max-width: 100%;
}

.chart-pie .placeholder {
    color: var(--text-muted);
    font-size: 13px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.chart-pie .placeholder i {
    font-size: 32px;
    display: block;
    margin-bottom: 10px;
    opacity: 0.5;
}

/* Canvas base style - keep display size */
.chart-pie canvas,
.chart-bar canvas,
.chart-motif .motif-logo canvas {
    width: 100%;
    height: auto;
    display: block;
}


/* Bar chart area */
.chart-bar {
    background: var(--bg);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px dashed var(--border);
}

.chart-bar canvas {
    max-width: 100%;
}

/* Motif detail area */
.chart-motif {
    background: var(--bg);
    border-radius: 8px;
    padding: 16px;
    border: 1px dashed var(--border);
    overflow: hidden;
}

.chart-motif .placeholder {
    color: var(--text-muted);
    font-size: 13px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.chart-motif .placeholder i {
    font-size: 32px;
    display: block;
    margin-bottom: 10px;
    opacity: 0.5;
}

.motif-detail {
    display: none;
}

.motif-detail.show {
    display: block;
}

.motif-detail h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 10px;
    text-align: center;
}

.motif-sequence {
    font-family: 'JetBrains Mono', monospace;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 4px;
    margin-bottom: 12px;
    padding: 12px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid var(--border);
}

.motif-sequence .base-A { color: #ef4444; }
.motif-sequence .base-T { color: #22c55e; }
.motif-sequence .base-G { color: #3b82f6; }
.motif-sequence .base-C { color: #f59e0b; }

.motif-logo {
    margin-top: 12px;
}

.motif-logo canvas {
    width: 100%;
    height: auto;
}

.motif-stats {
    margin-top: 12px;
    padding: 10px;
    background: #fff;
    border-radius: 6px;
    font-size: 12px;
}

.motif-stats p {
    margin-bottom: 4px;
    color: var(--text-muted);
}

.motif-stats strong {
    color: var(--text);
}

/* ========== Table Section ========== */
.table-section {
    background: var(--surface);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    border: 1px solid var(--border);
}

.table-section h3 {
    font-size: 16px;
    color: var(--text);
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table-section h3 .record-count {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-muted);
}

.table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: 500px;
    border: 1px solid var(--border);
    border-radius: 6px;
}

.table-wrapper table {
    width: 100%;
    min-width: 1200px;
    border-collapse: collapse;
    font-size: 13px;
}

.table-wrapper th {
    background: var(--primary);
    color: #fff;
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
    position: sticky;
    top: 0;
    z-index: 1;
}

.table-wrapper td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    color: var(--text);
    white-space: nowrap;
}

.table-wrapper tbody tr:hover { background: rgba(76, 175, 80, 0.05); }
.table-wrapper tbody tr:nth-child(even) { background: var(--bg); }
.table-wrapper tbody tr:nth-child(even):hover { background: rgba(76, 175, 80, 0.08); }

/* Motif link in table */
.motif-link {
    color: var(--primary);
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
}

.motif-link:hover {
    text-decoration: underline;
}

/* ========== Status Indicators ========== */
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 40px;
    color: var(--text-muted);
}

.loading::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error { text-align: center; padding: 40px; color: var(--danger); }
.empty { text-align: center; padding: 40px; color: var(--text-muted); }

/* ========== Responsive ========== */
@media (max-width: 1200px) {
    .stats-grid {
        grid-template-columns: 240px 1fr 240px;
    }
}

@media (max-width: 1100px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .chart-pie-container {
        flex-direction: row;
    }
}

@media (max-width: 900px) {
    .sidebar {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        margin-bottom: 15px;
        max-height: 300px;
    }

    .content { margin-left: 0; margin-top: 0; }
}

@media (max-width: 768px) {
    .content { margin-top: 120px; }

    .chart-pie-container {
        flex-direction: column;
    }
}
</style>
</head>
<body>

<?php include 'head.php'; ?>

<!-- Sidebar -->
<div class="sidebar">
    <div class="sidebar-title">🌿 Plant Database</div>
    <ul>
        <li>
            <span class="toggle show">−</span><span class="category-name">Angiosperms</span>
            <ul class="show">
                <li>
                    <span class="toggle show">−</span><span class="category-name">Monocots</span>
                    <ul class="show">
                        <li><a href="#" data-plant="rice" class="active">🌾 Oryza sativa (Rice)</a></li>
                    </ul>
                </li>
                <li>
                    <span class="toggle show">−</span><span class="category-name">Dicots</span>
                    <ul class="show">
                        <li><a href="#" data-plant="ath">🌱 Arabidopsis thaliana (Thale Cress)</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <span class="toggle">+</span><span class="category-name">Gymnosperms</span>
            <ul>
                <li><a href="#" data-plant="pinus">🌲 Pinus taeda (Loblolly Pine)</a></li>
            </ul>
        </li>
    </ul>
</div>
<!-- Right Content Area -->
<div class="content">
    <!-- Statistics / Charts Section -->
    <div class="stats-section">
        <h3>📊 Statistics Overview</h3>
        <div class="stats-grid">
            <!-- Left: Two Pie Charts -->
            <div class="chart-pie-container">
                <div class="chart-pie">
                    <div class="pie-title">Peaks Gene Association</div>
                    <canvas id="genePieChart" width="260" height="200" style="width:100%;max-width:260px;"></canvas>
                </div>
                <div class="chart-pie">
                    <div class="pie-title">Location Distribution</div>
                    <canvas id="locationPieChart" width="260" height="200" style="width:100%;max-width:260px;"></canvas>
                </div>
            </div>

            <!-- Center: Bar Chart -->
            <div class="chart-bar">
                <canvas id="motifBarChart" width="500" height="340" style="width:100%;max-width:500px;"></canvas>
            </div>

            <!-- Right: Motif Detail -->
            <div class="chart-motif">
                <div class="placeholder" id="motifPlaceholder">
                    <i>🧬</i>
                    <span>Click a Motif in the bar chart<br>to view the sequence Logo</span>
                </div>
                <div class="motif-detail" id="motifDetail">
                    <h4 id="motifTitle">-</h4>
                    <div class="motif-sequence" id="motifSequence">-</div>
                    <div class="motif-logo">
                        <canvas id="motifLogoCanvas" width="240" height="100" style="width:100%;max-width:240px;"></canvas>
                    </div>
                    <div class="motif-stats">
                        <p>Occurrences: <strong id="motifCount">-</strong></p>
                        <p>Proportion: <strong id="motifPercent">-</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Data Table Section -->
    <div class="table-section">
        <h3>
            📋 Data Table
            <span class="record-count" id="recordCount"></span>
        </h3>
        <div class="table-wrapper" id="tableWrapper">
            <div class="loading">Please select a species to load data...</div>
        </div>
    </div>
</div>

<script>
// Global variables
let currentMotifData = [];
let csvData = [];
let statsData = null;
let motifStatsData = null;
let currentPlant = 'rice';  // Record the current species



// ========== High-DPI Canvas Setup ==========
function setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const dpr = window.devicePixelRatio || 1;

    // Get container width as display width
    var parent = canvas.parentElement;
    var containerWidth = parent ? parent.clientWidth - 24 : 500;  // Subtract padding

    // Calculate height ratio based on container width
    var aspectRatio = canvas.height / canvas.width;
    var cssWidth = Math.min(containerWidth, canvas.width);
    var cssHeight = cssWidth * aspectRatio;

    // Set actual pixel dimensions
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;

    // Set CSS display dimensions
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Store logical dimensions
    canvas.logicalWidth = cssWidth;
    canvas.logicalHeight = cssHeight;

    return ctx;
}


// ========== Sidebar Expand/Collapse ==========
document.querySelectorAll('.sidebar .toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const parentLi = this.parentElement;
        const subUl = parentLi.querySelector('ul');
        if (!subUl) return;

        const isShowing = subUl.classList.contains('show');
        if (isShowing) {
            subUl.classList.remove('show');
            this.textContent = '+';
        } else {
            subUl.classList.add('show');
            this.textContent = '−';
        }
    });
});

// ========== Draw Pie Chart ==========
function drawPieChart(canvasId, data, colors) {
    const ctx = setupCanvas(canvasId);
    if (!ctx) return;

    const canvas = document.getElementById(canvasId);
    const width = canvas.logicalWidth;
    const height = canvas.logicalHeight;

    ctx.clearRect(0, 0, width, height);

    const entries = Object.entries(data);
    if (entries.length === 0) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '13px "Noto Sans SC"';
        ctx.textAlign = 'center';
        ctx.fillText('No data available', width / 2, height / 2);
        return;
    }

    const total = entries.reduce((sum, [_, v]) => sum + v, 0);
    const centerX = width / 2;
    const centerY = height / 2 - 15;
    const radius = Math.min(centerX, centerY) - 35;

    let startAngle = -Math.PI / 2;
    const legendY = height - 25;

    entries.forEach(([label, value], index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        const color = colors[index % colors.length];

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        const percent = ((value / total) * 100).toFixed(1);
        if (sliceAngle > 0.3) {
            const midAngle = startAngle + sliceAngle / 2;
            const labelRadius = radius * 0.65;
            const labelX = centerX + Math.cos(midAngle) * labelRadius;
            const labelY = centerY + Math.sin(midAngle) * labelRadius;

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px "Noto Sans SC"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(percent + '%', labelX, labelY);
        }

        startAngle = endAngle;
    });

    const legendStartX = 8;
    const legendSpacing = Math.min(85, (width - 16) / entries.length);

    entries.forEach(([label, value], index) => {
        const percent = ((value / total) * 100).toFixed(1);
        const x = legendStartX + (index % 3) * legendSpacing;
        const y = legendY + Math.floor(index / 3) * 14;
        const color = colors[index % colors.length];

        ctx.fillStyle = color;
        ctx.fillRect(x, y - 5, 8, 8);

        ctx.fillStyle = '#1a1a2e';
        ctx.font = '10px "Noto Sans SC"';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        let displayLabel = label;
        if (displayLabel.length > 7) {
            displayLabel = displayLabel.substring(0, 6) + '..';
        }
        ctx.fillText(displayLabel + ' ' + percent + '%', x + 12, y);
    });
}



// ========== Load Statistics JSON ==========
function loadStatsJSON(plant) {
    // First load motif_stats.json
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'try_data/motif_stats.json', true);
    xhr2.timeout = 10000;
    xhr2.onload = function() {
        if (xhr2.status === 200) {
            try {
                motifStatsData = JSON.parse(xhr2.responseText);
            } catch (e) {
                console.error('Failed to parse motif_stats.json:', e);
            }
        }
    };
    xhr2.onerror = function() { console.error('Failed to load motif_stats.json'); };
    xhr2.send();

    // For non-ath species, show no statistics message on pie charts
    if (plant !== 'ath') {
        var gc = document.getElementById('genePieChart');
        var lc = document.getElementById('locationPieChart');
        if (gc) {
            var gctx = gc.getContext('2d');
            gctx.clearRect(0, 0, gc.width, gc.height);
            gctx.fillStyle = '#6b7280';
            gctx.font = '12px sans-serif';
            gctx.textAlign = 'center';
            gctx.fillText('No statistics available', gc.width/2, gc.height/2);
        }
        if (lc) {
            var lctx = lc.getContext('2d');
            lctx.clearRect(0, 0, lc.width, lc.height);
            lctx.fillStyle = '#6b7280';
            lctx.font = '12px sans-serif';
            lctx.textAlign = 'center';
            lctx.fillText('No statistics available', lc.width/2, lc.height/2);
        }
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'try_data/try_ath_stats.json', true);
    xhr.timeout = 10000;
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                statsData = JSON.parse(xhr.responseText);
                drawPieCharts();
            } catch (e) {
                console.error('Failed to parse try_ath_stats.json:', e);
            }
        }
    };
    xhr.onerror = function() { console.error('Failed to load try_ath_stats.json'); };
    xhr.send();
}


// ========== Load Motif Statistics JSON ==========
function loadMotifStatsJSON() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'try_data/motif_stats.json', true);
    xhr.timeout = 10000;
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                motifStatsData = JSON.parse(xhr.responseText);
                console.log('motif_stats.json loaded successfully', motifStatsData);
                // If CSV is already loaded and it's rice, redraw the bar chart
                if (csvData.length > 0) {
                    var activeLink = document.querySelector('.sidebar a.active');
                    if (activeLink && activeLink.getAttribute('data-plant') === 'rice') {
                        drawBarChartFromStats();
                    }
                }
            } catch (e) {
                console.error('Failed to parse motif_stats.json:', e);
            }
        } else {
            console.error('motif_stats.json HTTP status:', xhr.status);
        }
    };
    xhr.onerror = function() { console.error('Failed to load motif_stats.json'); };
    xhr.send();
}



// ========== Draw Two Pie Charts ==========
function drawPieCharts() {
    if (!statsData) return;

    // Pie chart colors
    const geneColors = ['#2e7d32', '#90a4ae'];
    const locationColors = [
        '#1b5e20', '#2e7d32', '#43a047', '#4caf50',
        '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9'
    ];

    // Draw gene association pie chart
    if (statsData.gene_presence) {
        drawPieChart('genePieChart', statsData.gene_presence, geneColors);
    }

    // Draw location distribution pie chart
    if (statsData.location_distribution) {
        drawPieChart('locationPieChart', statsData.location_distribution, locationColors);
    }
}

// ========== Parse CSV ==========
function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return { headers: [], data: [] };

    const headers = lines[0].split('\t');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t');
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((h, idx) => {
                row[h.trim()] = values[idx] ? values[idx].trim() : '';
            });
            data.push(row);
        }
    }

    return { headers, data };
}

// ========== Count Motifs ==========
function countMotifs(data) {
    const counts = {};
    const motifColumns = ['motif_cress', 'motif_rice'];

    data.forEach(row => {
        motifColumns.forEach(col => {
            const motif = row[col];
            if (motif && motif.length > 0) {
                counts[motif] = (counts[motif] || 0) + 1;
            }
        });
    });

    // Convert to array and sort
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1]);

    return sorted;
}

// ========== Draw Bar Chart from Stats Data (rice only) ==========
function drawBarChartFromStats() {
    if (!motifStatsData || !motifStatsData.motif_list) {
        // No stats data, fall back to CSV statistics
        motifData = countMotifs(csvData);
        drawBarChart(motifData);
        return;
    }

    var canvas = document.getElementById('motifBarChart');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    var motifList = motifStatsData.motif_list;
    var totalTypes = motifStatsData.motif_type_count;
    var totalCount = motifStatsData.total_count;

    // Take top 7 + Others
    var top7 = motifList.slice(0, 7);
    var othersCount = 0;
    for (var i = 7; i < motifList.length; i++) {
        othersCount += motifList[i].count;
    }

    var chartData = [];
    for (var i = 0; i < top7.length; i++) {
        chartData.push({ label: top7[i].motif, value: top7[i].count });
    }
    if (othersCount > 0) {
        chartData.push({ label: 'Others', value: othersCount });
    }

    currentMotifData = chartData;

    var padding = { top: 60, right: 30, bottom: 65, left: 65 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;

    var maxValue = 0;
    for (var i = 0; i < chartData.length; i++) {
        if (chartData[i].value > maxValue) maxValue = chartData[i].value;
    }

    var barCount = chartData.length;
    var barWidth = (chartWidth / barCount) * 0.65;
    var barGap = (chartWidth / barCount) * 0.35;

    var colors = ['#1b5e20', '#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a', '#81c784', '#90a4ae'];

    // Title
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Motif Distribution Statistics', width / 2, 22);

    // Subtitle
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.fillText('Total: ' + totalCount.toLocaleString() + '  |  Types: ' + totalTypes, width / 2, 42);

    // Axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Y-axis ticks
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    var ySteps = 5;
    for (var i = 0; i <= ySteps; i++) {
        var y = padding.top + (chartHeight / ySteps) * i;
        var value = Math.round(maxValue - (maxValue / ySteps) * i);
        ctx.fillText(value.toLocaleString(), padding.left - 8, y + 4);

        ctx.strokeStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
    }

    // Draw bars
    var bars = [];
    for (var index = 0; index < chartData.length; index++) {
        var item = chartData[index];
        var x = padding.left + (barWidth + barGap) * index + barGap / 2;
        var barHeight = (item.value / maxValue) * chartHeight;
        var y = height - padding.bottom - barHeight;

        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        bars.push({ x: x, y: y, width: barWidth, height: barHeight, label: item.label, value: item.value });

        // Value labels
        ctx.fillStyle = '#1a1a2e';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toLocaleString(), x + barWidth / 2, y - 8);

        // X-axis labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + barWidth / 2, height - padding.bottom + 15);
        ctx.rotate(-0.35);
        ctx.fillText(item.label, 0, 0);
        ctx.restore();
    }

    // Click event
    canvas.onclick = function(e) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = width / rect.width;
        var scaleY = height / rect.height;
        var clickX = (e.clientX - rect.left) * scaleX;
        var clickY = (e.clientY - rect.top) * scaleY;

        for (var j = 0; j < bars.length; j++) {
            var bar = bars[j];
            if (clickX >= bar.x && clickX <= bar.x + bar.width &&
                clickY >= bar.y && clickY <= bar.y + bar.height) {
                showMotifDetail(bar.label, bar.value);
                break;
            }
        }
    };

    // Mouse hover
    canvas.onmousemove = function(e) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = width / rect.width;
        var scaleY = height / rect.height;
        var mouseX = (e.clientX - rect.left) * scaleX;
        var mouseY = (e.clientY - rect.top) * scaleY;

        var isOverBar = false;
        for (var j = 0; j < bars.length; j++) {
            var bar = bars[j];
            if (mouseX >= bar.x && mouseX <= bar.x + bar.width &&
                mouseY >= bar.y && mouseY <= bar.y + bar.height) {
                isOverBar = true;
                break;
            }
        }
        canvas.style.cursor = isOverBar ? 'pointer' : 'default';
    };
}


// ========== Show Motif Detail ==========
function showMotifDetail(motif, count) {

    // ========== Draw Bar Chart from Stats Data ==========
function drawBarChartFromStats() {
    if (!motifStatsData || !motifStatsData.motif_list) {
        // Show placeholder when no data
        const ctx = setupCanvas('motifBarChart');
        if (!ctx) return;
        const canvas = document.getElementById('motifBarChart');
        const w = canvas.logicalWidth;
        const h = canvas.logicalHeight;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px "Noto Sans SC"';
        ctx.textAlign = 'center';
        ctx.fillText('No statistics data available', w / 2, h / 2);
        return;
    }

    const ctx = setupCanvas('motifBarChart');
    if (!ctx) return;

    const canvas = document.getElementById('motifBarChart');
    const width = canvas.logicalWidth;
    const height = canvas.logicalHeight;

    ctx.clearRect(0, 0, width, height);

    const motifList = motifStatsData.motif_list;
    const totalTypes = motifStatsData.motif_type_count;
    const totalCount = motifStatsData.total_count;

    // Take top 7 + Others
    const top7 = motifList.slice(0, 7);
    const othersCount = motifList.slice(7).reduce((sum, item) => sum + item.count, 0);

    const chartData = top7.map(item => ({ label: item.motif, value: item.count }));
    if (othersCount >Others', value: othersCount });
    }

    currentMotifData = chartData;

    // Chart configuration
    const padding = { top: 60, right: 30, bottom: 65, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...chartData.map(d => d.value));
    const barWidth = chartWidth / chartData.length * 0.65;
    const barGap = chartWidth / chartData.length * 0.35;

    const colors = ['#1b5e20', '#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a', '#81c784', '#90a4ae'];

    // Title
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 15px "Noto Sans SC"';
    ctx.textAlign = 'center';
    ctx.fillText('Motif Distribution Statistics', width / 2, 22);

    // Subtitle: total count and type count
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px "Noto Sans SC"';
    ctx.fillText('Total: ' + totalCount.toLocaleString() + '  |  Types: ' + totalTypes, width / 2, 42);

    // Y-axis line
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Y-axis ticks
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px "Noto Sans SC"';
    ctx.textAlign = 'right';
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const y = padding.top + (chartHeight / ySteps) * i;
        const value = Math.round(maxValue - (maxValue / ySteps) * i);
        ctx.fillText(value.toLocaleString(), padding.left - 8, y + 4);

        ctx.strokeStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
    }

    // Draw bars
    const bars = [];
    chartData.forEach((item, index) => {
        const x = padding.left + (barWidth + barGap) * index + barGap / 2;
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = height - padding.bottom - barHeight;

        // Bar
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        bars.push({ x, y, width: barWidth, height: barHeight, label: item.label, value: item.value });

        // Value label
        ctx.fillStyle = '#1a1a2e';
        ctx.font = 'bold 11px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toLocaleString(), x + barWidth / 2, y - 8);

        // X-axis label
        ctx.fillStyle = '# 0) {
        chartData.push({ label: '6b7280';
        ctx.font = '11px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + barWidth / 2, height - padding.bottom + 15);
        ctx.rotate(-0.35);
        ctx.fillText(item.label, 0, 0);
        ctx.restore();
    });

    // Click event
    canvas.onclick = function(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.logicalWidth / rect.width;
        const scaleY = canvas.logicalHeight / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        for (const bar of bars) {
            if (clickX >= bar.x && clickX <= bar.x + bar.width &&
                clickY >= bar.y && clickY <= bar.y + bar.height) {
                showMotifDetail(bar.label, bar.value);
                break;
            }
        }
    };

    // Mouse hover
    canvas.onmousemove = function(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.logicalWidth / rect.width;
        const scaleY = canvas.logicalHeight / rect.height;
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        let isOverBar = false;
        for (const bar of bars) {
            if (mouseX >= bar.x && mouseX <= bar.x + bar.width &&
                mouseY >= bar.y && mouseY <= bar.y + bar.height) {
                isOverBar = true;
                break;
            }
        }
        canvas.style.cursor = isOverBar ? 'pointer' : 'default';
    };
}

// ========== Show Motif Detail ==========



    document.getElementById('motifPlaceholder').style.display = 'none';
    document.getElementById('motifDetail').classList.add('show');

    document.getElementById('motifTitle').textContent = 'Motif: ' + motif;
    document.getElementById('motifCount').textContent = count;

    // Calculate proportion
    const total = currentMotifData.reduce((sum, d) => sum + d.value, 0);
    const percent = ((count / total) * 100).toFixed(1);
    document.getElementById('motifPercent').textContent = percent + '%';

    // Draw Motif sequence
    const seqDiv = document.getElementById('motifSequence');
    seqDiv.innerHTML = motif.split('').map(base =>
        '<span class="base-' + base + '">' + base + '</span>'
    ).join('');

    // Draw Motif Logo
    drawMotifLogo(motif);
}

// ========== Draw Motif Logo ==========
function drawMotifLogo(motif) {
    const ctx = setupCanvas('motifLogoCanvas');
    if (!ctx) return;

    const canvas = document.getElementById('motifLogoCanvas');
    const width = canvas.logicalWidth;
    const height = canvas.logicalHeight;

    ctx.clearRect(0, 0, width, height);

    const bases = motif.split('');
    const baseWidth = width / bases.length;
    const maxHeight = height - 20;

    const colors = {
        'A': '#ef4444',
        'T': '#22c55e',
        'G': '#3b82f6',
        'C': '#f59e0b'
    };

    bases.forEach((base, index) => {
        const x = index * baseWidth;
        const color = colors[base] || '#6b7280';

        ctx.fillStyle = color;
        ctx.font = 'bold ' + (baseWidth * 0.8) + 'px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(base, x + baseWidth / 2, height - 5);

        const h = maxHeight * (0.6 + Math.random() * 0.4);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.fillRect(x + 2, height - h, baseWidth - 4, h);
        ctx.globalAlpha = 1;
    });
}


// ========== Render Table ==========
function renderTable(data, headers) {
    if (data.length === 0) {
        return '<div class="empty">No data available</div>';
    }

    // Find motif column indices
    const motifColIndices = [];
    headers.forEach((h, idx) => {
        if (h.includes('motif')) {
            motifColIndices.push(idx);
        }
    });

    let html = '<table><thead><tr>';
    headers.forEach(h => {
        html += '<th>' + h + '</th>';
    });
    html += '</tr></thead><tbody>';

    data.forEach(row => {
        html += '<tr>';
        headers.forEach((h, idx) => {
            let value = row[h] || '';
            // If it's a motif column, add click event
            if (motifColIndices.includes(idx) && value.length > 0) {
                html += '<td><a class="motif-link" onclick="showMotifFromTable(\'' + value + '\')">' + value + '</a></td>';
            } else {
                html += '<td>' + value + '</td>';
            }
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

// ========== Show Motif from Table Click ==========
function showMotifFromTable(motif) {
    // Find the motif's statistical count
    const motifItem = currentMotifData.find(d => d.label === motif);
    const count = motifItem ? motifItem.value : '-';

    // Find count from raw data
    const motifCount = motifData.filter(m => m[0] === motif).length;
    showMotifDetail(motif, motifCount > 0 ? motifCount : count);

    // Scroll to statistics section
    document.querySelector('.stats-section').scrollIntoView({ behavior: 'smooth' });
}

// ========== Load CSV ==========
let motifData = [];

function loadCSV(plant) {
    currentPlant = plant;  // Record current species

    const tableWrapper = document.getElementById('tableWrapper');
    tableWrapper.innerHTML = '<div class="loading">Loading data...</div>';

    // Update sidebar highlight
    document.querySelectorAll('.sidebar a[data-plant]').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector('.sidebar a[data-plant="' + plant + '"]');
    if (activeLink) activeLink.classList.add('active');


    // Reset charts
    resetCharts();

    // Load statistics JSON
    loadStatsJSON(plant);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'load_csv.php?plant=' + encodeURIComponent(plant), true);
    xhr.timeout = 30000;

    xhr.onload = function() {
    if (xhr.status === 200) {
        var response = xhr.responseText.trim();

        if (!response || response.indexOf('Error') >= 0) {
            tableWrapper.innerHTML = '<div class="empty">No data available</div>';
            return;
        }

        // Parse CSV
        var parsed = parseCSV(response);
        csvData = parsed.data;

        // Bar chart: prioritize motif_stats.json (rice), otherwise use CSV statistics
        if (plant === 'rice' && motifStatsData && motifStatsData.motif_list) {
            drawBarChartFromStats();
        } else {
            motifData = countMotifs(csvData);
            drawBarChart(motifData);
        }

        // Update record count
        document.getElementById('recordCount').textContent = 'Total ' + csvData.length + ' records';

        // Render table
        tableWrapper.innerHTML = renderTable(csvData, parsed.headers);
    } else {
        tableWrapper.innerHTML = '<div class="error">❌ Load failed (Status code: ' + xhr.status + ')</div>';
    }
};


    xhr.onerror = function() {
        tableWrapper.innerHTML = '<div class="error">❌ Network error, please check your connection and retry</div>';
    };

    xhr.ontimeout = function() {
        tableWrapper.innerHTML = '<div class="error">❌ Request timed out, please try again later</div>';
    };

    xhr.send();
}

// ========== Reset Charts ==========
function resetCharts() {
    // Clear bar chart
    const ctx = setupCanvas('motifBarChart');
    if (ctx) {
        const canvas = document.getElementById('motifBarChart');
        ctx.clearRect(0, 0, canvas.logicalWidth, canvas.logicalHeight);
    }

    // Reset Motif detail
    document.getElementById('motifPlaceholder').style.display = 'flex';
    document.getElementById('motifDetail').classList.remove('show');

    currentMotifData = [];
    motifData = [];
}


// ========== Sidebar Click Events ==========
document.querySelectorAll('.sidebar a[data-plant]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        loadCSV(this.getAttribute('data-plant'));
    });
});

// ========== Default: Load Rice ==========
window.addEventListener('DOMContentLoaded', function() {
    loadCSV('rice');
});

// ========== Redraw Charts on Window Resize ==========
var resizeTimer = null;
window.addEventListener('resize', function() {
    // Debounce: wait 300ms without changes before executing
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Redraw pie charts
        if (statsData && statsData.gene_presence) {
            drawPieCharts();
        }
        // Redraw bar chart
        if (currentPlant === 'rice' && motifStatsData && motifStatsData.motif_list) {
            drawBarChartFromStats();
        } else if (csvData.length > 0) {
            motifData = countMotifs(csvData);
            drawBarChart(motifData);
        }
    }, 300);
});

</script>


</body>
</html>

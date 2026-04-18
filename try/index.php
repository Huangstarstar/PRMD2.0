<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PRMD 2.0 | Home</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
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
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans SC', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
}

/* ========== Main Content ========== */
.main-content {
    margin-top: 70px;
    padding: 40px 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 70px);
}

/* ========== Welcome Section ========== */
.welcome-section {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, var(--primary-light) 0%, #c8e6c9 100%);
    border-radius: 16px;
    margin-bottom: 40px;
}

.welcome-section h1 {
    font-size: 36px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 15px;
}

.welcome-section p {
    font-size: 16px;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
}

/* ========== Feature Cards ========== */
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.feature-card {
    background: var(--surface);
    border-radius: 12px;
    padding: 30px;
    border: 1px solid var(--border);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    border-color: var(--primary);
}

.feature-card .icon {
    width: 60px;
    height: 60px;
    background: var(--primary-light);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin-bottom: 20px;
}

.feature-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 10px;
}

.feature-card p {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
}

.feature-card .arrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    color: var(--primary);
    font-weight: 600;
    font-size: 14px;
}

/* ========== Tools Section ========== */
.tools-section {
    background: var(--surface);
    border-radius: 12px;
    padding: 30px;
    border: 1px solid var(--border);
    margin-bottom: 40px;
}

.tools-section h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.tool-card {
    background: var(--bg);
    border-radius: 8px;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s, transform 0.2s;
    display: flex;
    align-items: center;
    gap: 12px;
}

.tool-card:hover {
    background: var(--primary-light);
    transform: translateX(5px);
}

.tool-card .tool-icon {
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
}

.tool-card .tool-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text);
}

.tool-card .tool-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
}

/* ========== Statistics Section ========== */
.stats-section {
    background: var(--surface);
    border-radius: 12px;
    padding: 40px;
    border: 1px solid var(--border);
    margin-bottom: 40px;
}

.stats-section h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 30px;
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 30px;
}

.stat-item {
    text-align: center;
}

.stat-item .number {
    font-size: 36px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 8px;
}

.stat-item .label {
    font-size: 14px;
    color: var(--text-muted);
}

/* ========== Footer ========== */
.footer {
    text-align: center;
    padding: 30px;
    color: var(--text-muted);
    font-size: 13px;
    border-top: 1px solid var(--border);
    margin-top: 40px;
}

.footer a {
    color: var(--primary);
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}

/* ========== Responsive ========== */
@media (max-width: 768px) {
    .main-content {
        margin-top: 120px;
        padding: 20px 15px;
    }

    .welcome-section {
        padding: 40px 20px;
    }

    .welcome-section h1 {
        font-size: 28px;
    }
}
</style>
</head>
<body>

<!-- Include unified header -->
<?php include 'head.php'; ?>

<!-- Main Content -->
<div class="main-content">

    <!-- Welcome Section -->
    <div class="welcome-section">
        <h1>🌿 Plant RNA Modification Database</h1>
        <p>
            PRMD 2.0 is a comprehensive database platform dedicated to plant RNA modification research,
            integrating m6A and other RNA modification site data across multiple plant species,
            providing convenient data browsing, visualization, and analysis tools.
        </p>
    </div>

    <!-- Feature Cards -->
    <div class="features-grid">
        <a href="try_browse.php" class="feature-card">
            <div class="icon">📊</div>
            <h3>Data Browse</h3>
            <p>Browse RNA modification data across different plant species, with support for viewing detailed modification site information and statistical charts by species category.</p>
            <div class="arrow">Start Browsing →</div>
        </a>

        <a href="try_links.php" class="feature-card">
            <div class="icon">🔗</div>
            <h3>Related Resources</h3>
            <p>Curated collections of RNA modification-related databases, analysis tools, and high-throughput technology resources for quick access and learning.</p>
            <div class="arrow">View Resources →</div>
        </a>

        <a href="RMdiff_v2.php" class="feature-card">
            <div class="icon">🧬</div>
            <h3>Differential Analysis</h3>
            <p>Perform RNA modification differential analysis using RMdiff v2.0 to compare modification patterns across different conditions or species.</p>
            <div class="arrow">Start Analysis →</div>
        </a>

        <a href="RNAmodNet.php" class="feature-card">
            <div class="icon">🌐</div>
            <h3>Network Analysis</h3>
            <p>RNAmodNet provides network visualization analysis of RNA modifications, exploring associations and regulatory relationships between modification sites.</p>
            <div class="arrow">View Network →</div>
        </a>
    </div>

    <!-- Analysis Tools -->
    <div class="tools-section">
        <h2>🔧 Analysis Tools</h2>
        <div class="tools-grid">
            <a href="RMdiff_v2.php" class="tool-card">
                <div class="tool-icon">📊</div>
                <div>
                    <div class="tool-name">RMdiff v2.0</div>
                    <div class="tool-desc">Modification Differential Analysis</div>
                </div>
            </a>
            <a href="RMvar.php" class="tool-card">
                <div class="tool-icon">🧬</div>
                <div>
                    <div class="tool-name">RMvar</div>
                    <div class="tool-desc">Plant Variant Analysis</div>
                </div>
            </a>
            <a href="RNAmodNet.php" class="tool-card">
                <div class="tool-icon">🌐</div>
                <div>
                    <div class="tool-name">RNAmodNet</div>
                    <div class="tool-desc">Network Visualization</div>
                </div>
            </a>
            <a href="blast.php" class="tool-card">
                <div class="tool-icon">🔍</div>
                <div>
                    <div class="tool-name">BLAST</div>
                    <div class="tool-desc">Sequence Alignment</div>
                </div>
            </a>
            <!-- 新增基因编辑工具卡片 -->
            <a href="gene_editor.php" class="tool-card">
                <div class="tool-icon">🧬</div>
                <div>
                    <div class="tool-name">Gene Editor</div>
                    <div class="tool-desc">基因编辑工具</div>
                </div>
            </a>
            <a href="results.php" class="tool-card">
                <div class="tool-icon">📋</div>
                <div>
                    <div class="tool-name">Results</div>
                    <div class="tool-desc">View Results</div>
                </div>
            </a>
        </div>
    </div>

    <!-- Database Statistics -->
    <div class="stats-section">
        <h2>📈 Database Statistics</h2>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="number">20+</div>
                <div class="label">Plant Species</div>
            </div>
            <div class="stat-item">
                <div class="number">73</div>
                <div class="label">Modification Types</div>
            </div>
            <div class="stat-item">
                <div class="number">1M+</div>
                <div class="label">Modification Sites</div>
            </div>
            <div class="stat-item">
                <div class="number">6</div>
                <div class="label">Analysis Tools</div>
            </div>
            <div class="stat-item">
                <div class="number">4</div>
                <div class="label">Visualization Methods</div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>&copy; 2024 PRMD 2.0 - Plant RNA Modification Database |
            <a href="try_browse.php">Browse</a> |
            <a href="try_links.php">Links</a> |
            <a href="RMdiff_v2.php">Tools</a>
        </p>
    </div>

</div>

</body>
</html>

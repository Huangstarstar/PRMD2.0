<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gene Editor - PRMD 2.0</title>
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
    --success: #4caf50;
    --warning: #ff9800;
    --error: #f44336;
    --info: #2196f3;
    --chip-bg: #f7f9fb;
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

.main-content {
    margin-top: 70px;
    padding: 40px 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 70px);
}

.page-header {
    margin-bottom: 30px;
}

.page-header h1 {
    font-size: 28px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 10px;
}

.page-header p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
}

.editor-container {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 30px;
    margin-bottom: 40px;
}

@media (max-width: 1000px) {
    .editor-container {
        grid-template-columns: 1fr;
    }
}

.input-panel,
.results-panel,
.info-section {
    background: var(--surface);
    border-radius: 14px;
    padding: 24px;
    border: 1px solid var(--border);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.input-panel h2,
.results-panel h2,
.info-section h2 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.notice-box {
    background: #fff8e1;
    border: 1px solid #ffe08a;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 13px;
    color: #7a5c00;
    margin-bottom: 20px;
    line-height: 1.7;
}

.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text);
    font-size: 14px;
}

.form-group select,
.form-group input,
.form-group textarea {
    width: 100%;
    padding: 11px 12px;
    border: 1px solid var(--border);
    border-radius: 9px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #fff;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.18);
}

.form-group textarea {
    min-height: 160px;
    resize: vertical;
    font-family: 'Courier New', monospace;
    line-height: 1.6;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}

.form-hint {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 6px;
    line-height: 1.6;
}

.sequence-stats {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 9px;
    border-radius: 999px;
    background: var(--chip-bg);
    border: 1px solid #edf1f5;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1;
}

.btn-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 18px;
    border: none;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    gap: 8px;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
}

.btn-secondary {
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
}

.btn-secondary:hover {
    background: #e9ecef;
}

.results-container {
    max-height: 860px;
    overflow-y: auto;
    padding-right: 4px;
}

.loading {
    display: none;
    text-align: center;
    padding: 28px 20px;
}

.loading.active {
    display: block;
}

.spinner {
    width: 42px;
    height: 42px;
    border: 3px solid var(--primary-light);
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 12px;
}

.loading p {
    font-size: 13px;
    color: var(--text-muted);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.result-item {
    padding: 15px;
    border: 1px solid var(--border);
    border-radius: 10px;
    margin-bottom: 12px;
    transition: all 0.2s;
    background: #fff;
}

.result-item:hover {
    border-color: var(--primary);
    background: #fcfffc;
}

.result-item.highlight {
    border-color: var(--success);
    background: #f1f8e9;
}

.result-item.info {
    background: #f8fbff;
    border-color: #d7e9ff;
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.result-title {
    font-weight: 700;
    color: var(--text);
}

.result-score {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--primary-light);
    color: var(--primary-dark);
    font-weight: 700;
}

.result-sequence {
    font-family: 'Courier New', monospace;
    font-size: 13px;
    background: #f8f9fa;
    padding: 10px;
    border-radius: 6px;
    margin: 10px 0;
    word-break: break-all;
    border: 1px solid #eef1f4;
    line-height: 1.5;
}

.result-details {
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    line-height: 1.6;
}

.result-details span {
    background: var(--chip-bg);
    border: 1px solid #edf1f5;
    padding: 4px 8px;
    border-radius: 999px;
}

.section-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.summary-block {
    white-space: pre-line;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.8;
}

.warning-list,
.offtarget-list {
    margin-top: 12px;
}

.warning-list h4,
.offtarget-list h4 {
    font-size: 13px;
    margin-bottom: 8px;
    color: var(--text);
}

.warning-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.warning-tag {
    background: #fff3e0;
    color: #a35a00;
    border: 1px solid #ffd18a;
    border-radius: 999px;
    padding: 4px 9px;
    font-size: 12px;
}

details.offtarget-details {
    margin-top: 12px;
    border: 1px solid #e7edf3;
    border-radius: 8px;
    background: #fafcff;
    overflow: hidden;
}

details.offtarget-details summary {
    cursor: pointer;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    list-style: none;
}

details.offtarget-details summary::-webkit-details-marker {
    display: none;
}

details.offtarget-details summary::after {
    content: "▾";
    float: right;
    color: var(--text-muted);
}

details.offtarget-details[open] summary::after {
    content: "▴";
}

.offtarget-inner {
    padding: 0 12px 12px 12px;
}

.offtarget-card {
    border: 1px solid #edf1f5;
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
}

.offtarget-seq {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    background: #f8f9fa;
    border: 1px solid #eef1f4;
    border-radius: 6px;
    padding: 8px;
    margin-top: 8px;
    word-break: break-all;
    line-height: 1.5;
}

.info-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
}

.info-card {
    background: var(--bg);
    border-radius: 10px;
    padding: 15px;
    border: 1px solid #edf1f5;
}

.info-card h3 {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 8px;
}

.info-card p {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.7;
}

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

code.inline-code {
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 6px;
    font-size: 12px;
}

@media (max-width: 768px) {
    .main-content {
        margin-top: 120px;
        padding: 20px 15px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
</head>
<body>

<?php include 'head.php'; ?>

<div class="main-content">
    <div class="page-header">
        <h1>🧬 Gene Editor Tool</h1>
        <p>
            Design and evaluate candidate guide RNAs for CRISPR-based plant genome editing.
            This page submits analysis requests to <code class="inline-code">analyze_sequence.php</code>.
        </p>
    </div>

    <div class="editor-container">
        <div class="input-panel">
            <h2>📝 Input Parameters</h2>

            <div class="notice-box">
                Enter a DNA sequence using only <strong>A / T / G / C</strong>.  
                Supported length: <strong>20–200 bp</strong>.  
                Cas13 is not enabled in the current DNA-only backend.
            </div>

            <form id="geneEditorForm">
                <div class="form-group">
                    <label for="genomeSelect">Reference Genome</label>
                    <select id="genomeSelect" name="genome" required>
                        <option value="">-- Select Genome --</option>
                        <option value="arabidopsis_thaliana">Arabidopsis thaliana (TAIR10)</option>
                        <option value="oryza_sativa">Oryza sativa (MSU7)</option>
                        <option value="zea_mays">Zea mays (Zm-B73-REFERENCE-GRAMENE-4.0)</option>
                        <option value="glycine_max">Glycine max (Wm82.a2.v1)</option>
                        <option value="solanum_tuberosum">Solanum tuberosum (ITAG3.2)</option>
                        <option value="vitis_vinifera">Vitis vinifera (PN40024)</option>
                    </select>
                    <div class="form-hint">Choose the reference genome used for analysis.</div>
                </div>

                <div class="form-group">
                    <label for="targetSequence">Target DNA Sequence</label>
                    <textarea
                        id="targetSequence"
                        name="targetSequence"
                        placeholder="Paste DNA sequence here (A/T/G/C only)"
                        required
                    ></textarea>
                    <div class="form-hint">
                        Spaces, line breaks, and non-ATGC characters will be removed automatically.
                    </div>
                    <div class="sequence-stats">
                        <span class="chip" id="seqLengthChip">Length: 0 bp</span>
                        <span class="chip" id="seqGcChip">GC: 0.0%</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="casProtein">Cas Protein</label>
                    <select id="casProtein" name="casProtein" required>
                        <option value="cas9" selected>SpCas9</option>
                        <option value="cas12a">Cas12a (Cpf1)</option>
                        <option value="base_editor">Base Editor</option>
                        <option value="prime_editor">Prime Editor</option>
                    </select>
                    <div class="form-hint">Choose the editing system used for gRNA design.</div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="pamSequence">PAM Sequence</label>
                        <input type="text" id="pamSequence" name="pamSequence" placeholder="e.g. NGG">
                        <div class="form-hint">Leave empty to use the default PAM of the selected Cas system.</div>
                    </div>

                    <div class="form-group">
                        <label for="gcContent">Preferred GC Content (%)</label>
                        <input type="number" id="gcContent" name="gcContent" value="40" min="20" max="80">
                        <div class="form-hint">Used as a scoring preference.</div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="offTargetTolerance">Off-target Tolerance</label>
                        <select id="offTargetTolerance" name="offTargetTolerance">
                            <option value="strict">Strict</option>
                            <option value="moderate" selected>Moderate</option>
                            <option value="relaxed">Relaxed</option>
                        </select>
                        <div class="form-hint">Controls mismatch tolerance in simulated off-target prediction.</div>
                    </div>

                    <div class="form-group">
                        <label for="maxResults">Max Results</label>
                        <input type="number" id="maxResults" name="maxResults" value="10" min="1" max="100">
                        <div class="form-hint">Maximum number of candidate gRNAs returned.</div>
                    </div>
                </div>

                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">
                        <span>🔍</span> Analyze Sequence
                    </button>
                    <button type="button" class="btn btn-secondary" id="clearBtn">
                        <span>🗑️</span> Clear
                    </button>
                    <button type="button" class="btn btn-secondary" id="exampleBtn">
                        <span>🧪</span> Load Example
                    </button>
                </div>
            </form>
        </div>

        <div class="results-panel">
            <h2>📊 Analysis Results</h2>

            <div class="loading" id="loadingIndicator">
                <div class="spinner"></div>
                <p>Analyzing sequence and scoring candidate guide RNAs...</p>
            </div>

            <div class="results-container" id="resultsContainer">
                <div class="result-item">
                    <div class="result-header">
                        <div class="result-title">No results yet</div>
                    </div>
                    <p style="color: var(--text-muted); font-size: 13px; line-height: 1.7;">
                        Fill in the parameters and click <strong>Analyze Sequence</strong> to generate gRNA candidates.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="info-section">
        <h2>ℹ️ Gene Editing Information</h2>
        <div class="info-content">
            <div class="info-card">
                <h3>Guide RNA Design</h3>
                <p>
                    Candidate guides are selected according to PAM matching, basic sequence validity,
                    GC content, simplified structural checks, and simulated off-target scoring.
                </p>
            </div>

            <div class="info-card">
                <h3>Scoring Model</h3>
                <p>
                    The current backend uses a heuristic scoring strategy rather than a fully validated
                    genome-wide prediction pipeline. It is suitable for demo and prototype workflows.
                </p>
            </div>

            <div class="info-card">
                <h3>Current Scope</h3>
                <p>
                    This version accepts DNA input only. Cas13 is intentionally excluded on this page
                    because Cas13 is typically used for RNA targeting.
                </p>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2024 PRMD 2.0 - Plant RNA Modification Database |
            <a href="index.php">Home</a> |
            <a href="try_browse.php">Browse</a> |
            <a href="help.php">Help</a>
        </p>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('geneEditorForm');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const clearBtn = document.getElementById('clearBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const targetSequence = document.getElementById('targetSequence');
    const casProtein = document.getElementById('casProtein');
    const pamSequence = document.getElementById('pamSequence');
    const seqLengthChip = document.getElementById('seqLengthChip');
    const seqGcChip = document.getElementById('seqGcChip');

    const defaultPAMs = {
        cas9: 'NGG',
        cas12a: 'TTTV',
        base_editor: 'NGG',
        prime_editor: 'NGG'
    };

    function sanitizeSequence(seq) {
        return (seq || '')
            .toUpperCase()
            .replace(/[^ATGC]/g, '');
    }

    function calculateGC(seq) {
        if (!seq || seq.length === 0) return 0;
        const gcCount = (seq.match(/[GC]/g) || []).length;
        return (gcCount / seq.length) * 100;
    }

    function updateSequenceStats() {
        const cleaned = sanitizeSequence(targetSequence.value);
        const gc = calculateGC(cleaned);
        seqLengthChip.textContent = `Length: ${cleaned.length} bp`;
        seqGcChip.textContent = `GC: ${gc.toFixed(1)}%`;
    }

    function escapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function resetResults() {
        resultsContainer.innerHTML = `
            <div class="result-item">
                <div class="result-header">
                    <div class="result-title">No results yet</div>
                </div>
                <p style="color: var(--text-muted); font-size: 13px; line-height: 1.7;">
                    Fill in the parameters and click <strong>Analyze Sequence</strong> to generate gRNA candidates.
                </p>
            </div>
        `;
    }

    function showError(message) {
        resultsContainer.innerHTML = `
            <div class="result-item" style="border-color: var(--error); background: #ffebee;">
                <div class="result-header">
                    <div class="result-title" style="color: var(--error);">Error</div>
                </div>
                <p style="color: var(--error); font-size: 13px; line-height: 1.7;">
                    ${escapeHtml(message)}
                </p>
            </div>
        `;
    }

    function updatePamPlaceholder() {
        const cas = casProtein.value;
        const defaultPam = defaultPAMs[cas] ?? '';
        pamSequence.placeholder = defaultPam ? `e.g. ${defaultPam}` : 'Enter PAM';
    }

    function setDefaultPamIfEmpty() {
        if (!pamSequence.value.trim()) {
            const cas = casProtein.value;
            pamSequence.value = defaultPAMs[cas] ?? '';
        }
    }

    function renderWarnings(warnings) {
        if (!Array.isArray(warnings) || warnings.length === 0) {
            return '';
        }

        const tags = warnings.map(w => `<span class="warning-tag">${escapeHtml(w)}</span>`).join('');
        return `
            <div class="warning-list">
                <h4>Warnings</h4>
                <div class="warning-tags">${tags}</div>
            </div>
        `;
    }

    function renderOfftargets(offtargets) {
        if (!Array.isArray(offtargets) || offtargets.length === 0) {
            return `
                <details class="offtarget-details">
                    <summary>View off-target details (0)</summary>
                    <div class="offtarget-inner">
                        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.7;">
                            No simulated off-target records were returned.
                        </p>
                    </div>
                </details>
            `;
        }

        let html = `
            <details class="offtarget-details">
                <summary>View off-target details (${offtargets.length})</summary>
                <div class="offtarget-inner">
        `;

        offtargets.forEach((ot, idx) => {
            const mismatchPositions = Array.isArray(ot.mismatch_positions) ? ot.mismatch_positions.join(', ') : '';
            html += `
                <div class="offtarget-card">
                    <div class="result-header">
                        <div class="result-title">Off-target #${idx + 1}</div>
                        <div class="result-score">Score: ${escapeHtml(ot.score ?? '-')}</div>
                    </div>
                    <div class="result-details">
                        <span>Chromosome: ${escapeHtml(ot.chromosome ?? '-')}</span>
                        <span>Position: ${escapeHtml(ot.position ?? '-')}</span>
                        <span>Mismatches: ${escapeHtml(ot.mismatches ?? 0)}</span>
                        <span>Mismatch sites: ${escapeHtml(mismatchPositions || 'None')}</span>
                    </div>
                    <div class="offtarget-seq">${escapeHtml(ot.sequence || '')}</div>
                </div>
            `;
        });

        html += `</div></details>`;
        return html;
    }

    function displayResults(payload) {
        const summary = payload.summary || '';
        const grnas = Array.isArray(payload.grnas) ? payload.grnas : [];
        const best = payload.best_grna || null;
        const stats = payload.statistics || {};
        const genomeInfo = payload.reference_genome_info || null;
        const casInfo = payload.cas_info || null;
        const input = payload.input || {};

        if (grnas.length === 0) {
            resultsContainer.innerHTML = `
                <div class="result-item">
                    <div class="result-header">
                        <div class="result-title">No gRNA found</div>
                    </div>
                    <p style="color: var(--text-muted); font-size: 13px; line-height: 1.7;">
                        No valid guide RNAs were found for the submitted sequence and selected parameters.
                    </p>
                </div>
            `;
            return;
        }

        let html = '';

        html += `
            <div class="result-item">
                <div class="section-label">Summary</div>
                <div class="result-header">
                    <div class="result-title">Analysis Overview</div>
                </div>
                <div class="summary-block">${escapeHtml(summary)}</div>
            </div>
        `;

        if (genomeInfo || casInfo || input) {
            html += `
                <div class="result-item info">
                    <div class="section-label">Run Information</div>
                    <div class="result-header">
                        <div class="result-title">Input & Reference</div>
                    </div>
                    <div class="result-details">
                        ${genomeInfo?.name ? `<span>Genome: ${escapeHtml(genomeInfo.name)}</span>` : ''}
                        ${genomeInfo?.version ? `<span>Genome version: ${escapeHtml(genomeInfo.version)}</span>` : ''}
                        ${genomeInfo?.size ? `<span>Genome size: ${escapeHtml(genomeInfo.size)}</span>` : ''}
                        ${genomeInfo?.gc_content !== undefined ? `<span>Genome GC: ${escapeHtml(genomeInfo.gc_content)}%</span>` : ''}
                        ${casInfo?.name ? `<span>Cas system: ${escapeHtml(casInfo.name)}</span>` : ''}
                        ${casInfo?.description ? `<span>Description: ${escapeHtml(casInfo.description)}</span>` : ''}
                        ${input?.pamSequence ? `<span>PAM used: ${escapeHtml(input.pamSequence)}</span>` : ''}
                        ${input?.sequenceLength ? `<span>Sequence length: ${escapeHtml(input.sequenceLength)} bp</span>` : ''}
                        ${input?.preferredGcContent ? `<span>Preferred GC: ${escapeHtml(input.preferredGcContent)}%</span>` : ''}
                        ${input?.offTargetTolerance ? `<span>Off-target tolerance: ${escapeHtml(input.offTargetTolerance)}</span>` : ''}
                        ${input?.maxResults ? `<span>Max results: ${escapeHtml(input.maxResults)}</span>` : ''}
                    </div>
                </div>
            `;
        }

        html += `
            <div class="result-item">
                <div class="section-label">Statistics</div>
                <div class="result-header">
                    <div class="result-title">Guide RNA Statistics</div>
                </div>
                <div class="result-details">
                    <span>Total guides: ${escapeHtml(stats.total_guides ?? 0)}</span>
                    <span>Average score: ${escapeHtml(stats.average_score ?? 0)}</span>
                    <span>Max score: ${escapeHtml(stats.max_score ?? 0)}</span>
                    <span>Min score: ${escapeHtml(stats.min_score ?? 0)}</span>
                    <span>Average GC: ${escapeHtml(stats.average_gc ?? 0)}%</span>
                    <span>Average specificity: ${escapeHtml(stats.average_specificity ?? 0)}%</span>
                    <span>Average off-targets: ${escapeHtml(stats.average_offtargets ?? 0)}</span>
                    <span>High-quality guides: ${escapeHtml(stats.high_quality_guides ?? 0)}</span>
                </div>
            </div>
        `;

        if (best) {
            html += `
                <div class="result-item highlight">
                    <div class="section-label">Best Candidate</div>
                    <div class="result-header">
                        <div class="result-title">${escapeHtml(best.id || 'Best gRNA')}</div>
                        <div class="result-score">Score: ${escapeHtml(best.score ?? '-')}</div>
                    </div>
                    <div class="result-sequence">${escapeHtml(best.sequence || '')}</div>
                    <div class="result-details">
                        <span>Position: ${escapeHtml(best.position || '-')}</span>
                        <span>PAM position: ${escapeHtml(best.pam_position ?? '-')}</span>
                        <span>PAM: ${escapeHtml(best.pam_sequence || '-')}</span>
                        <span>GC: ${best.gc_content !== undefined ? Number(best.gc_content).toFixed(1) : '-'}%</span>
                        <span>Specificity: ${escapeHtml(best.specificity ?? '-')}</span>
                        <span>Off-targets: ${escapeHtml(best.offtarget_count ?? 0)}</span>
                        <span>Strand: ${escapeHtml(best.strand || '+')}</span>
                    </div>
                    ${renderWarnings(best.warnings)}
                    ${renderOfftargets(best.offtargets)}
                </div>
            `;
        }

        html += `
            <div class="result-item info">
                <div class="section-label">Candidates</div>
                <div class="result-header">
                    <div class="result-title">All Designed gRNAs</div>
                    <div class="result-score">${grnas.length} candidates</div>
                </div>
            </div>
        `;

        grnas.forEach((grna, index) => {
            html += `
                <div class="result-item">
                    <div class="result-header">
                        <div class="result-title">${escapeHtml(grna.id || ('gRNA_' + (index + 1)))}</div>
                        <div class="result-score">Score: ${escapeHtml(grna.score ?? '-')}</div>
                    </div>
                    <div class="result-sequence">${escapeHtml(grna.sequence || '')}</div>
                    <div class="result-details">
                        <span>Position: ${escapeHtml(grna.position || '-')}</span>
                        <span>PAM position: ${escapeHtml(grna.pam_position ?? '-')}</span>
                        <span>PAM: ${escapeHtml(grna.pam_sequence || '-')}</span>
                        <span>GC: ${grna.gc_content !== undefined ? Number(grna.gc_content).toFixed(1) : '-'}%</span>
                        <span>Specificity: ${escapeHtml(grna.specificity ?? '-')}</span>
                        <span>Off-targets: ${escapeHtml(grna.offtarget_count ?? 0)}</span>
                        <span>Strand: ${escapeHtml(grna.strand || '+')}</span>
                    </div>
                    ${renderWarnings(grna.warnings)}
                    ${renderOfftargets(grna.offtargets)}
                </div>
            `;
        });

        resultsContainer.innerHTML = html;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        loadingIndicator.classList.add('active');
        resultsContainer.innerHTML = '';

        const formData = new FormData(form);
        const cleanedSequence = sanitizeSequence(formData.get('targetSequence'));

        const data = {
            referenceGenome: formData.get('genome'),
            targetSequence: cleanedSequence,
            casProtein: formData.get('casProtein'),
            pamSequence: (formData.get('pamSequence') || '').trim().toUpperCase(),
            gcContent: parseInt(formData.get('gcContent'), 10) || 40,
            offTargetTolerance: formData.get('offTargetTolerance'),
            maxResults: parseInt(formData.get('maxResults'), 10) || 10
        };

        if (!data.referenceGenome) {
            loadingIndicator.classList.remove('active');
            showError('Please select a reference genome.');
            return;
        }

        if (!data.targetSequence) {
            loadingIndicator.classList.remove('active');
            showError('Please enter a valid DNA sequence.');
            return;
        }

        if (!/^[ATGC]+$/.test(data.targetSequence)) {
            loadingIndicator.classList.remove('active');
            showError('Invalid DNA sequence. Only A, T, G, and C are allowed.');
            return;
        }

        if (data.targetSequence.length < 20 || data.targetSequence.length > 200) {
            loadingIndicator.classList.remove('active');
            showError('Sequence length must be between 20 and 200 bp.');
            return;
        }

        if (data.gcContent < 20 || data.gcContent > 80) {
            loadingIndicator.classList.remove('active');
            showError('Preferred GC content must be between 20 and 80.');
            return;
        }

        if (data.maxResults < 1 || data.maxResults > 100) {
            loadingIndicator.classList.remove('active');
            showError('Max results must be between 1 and 100.');
            return;
        }

        try {
            const response = await fetch('analyze_sequence.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            loadingIndicator.classList.remove('active');

            if (result.success) {
                displayResults(result.data);
            } else {
                showError(result.error || 'An unknown error occurred.');
            }
        } catch (error) {
            loadingIndicator.classList.remove('active');
            showError('Network error: ' + error.message);
        }
    });

    clearBtn.addEventListener('click', function() {
        form.reset();
        pamSequence.value = 'NGG';
        document.getElementById('gcContent').value = 40;
        document.getElementById('maxResults').value = 10;
        updatePamPlaceholder();
        updateSequenceStats();
        resetResults();
    });

    exampleBtn.addEventListener('click', function() {
        document.getElementById('genomeSelect').value = 'arabidopsis_thaliana';
        document.getElementById('casProtein').value = 'cas9';
        document.getElementById('pamSequence').value = 'NGG';
        document.getElementById('gcContent').value = '40';
        document.getElementById('offTargetTolerance').value = 'moderate';
        document.getElementById('maxResults').value = '10';
        document.getElementById('targetSequence').value = 'ATGCGTACGTTAGCGGATCCGATGCTAGCTTGGCGATCGGATCGTACGATCG';
        updateSequenceStats();
        resetResults();
    });

    casProtein.addEventListener('change', function() {
        updatePamPlaceholder();
        setDefaultPamIfEmpty();
    });

    targetSequence.addEventListener('input', updateSequenceStats);

    targetSequence.addEventListener('blur', function() {
        this.value = sanitizeSequence(this.value);
        updateSequenceStats();
    });

    updatePamPlaceholder();
    updateSequenceStats();
});
</script>

</body>
</html>
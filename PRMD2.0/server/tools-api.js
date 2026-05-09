import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// In-memory job store (in production, use a database)
const jobs = new Map();

// ============================================================
// RMlevelDiff API
// ============================================================
app.get("/api/tools/rmleveldiff/samples", (req, res) => {
  const { species } = req.query;
  // Mock sample list based on species
  const sampleMap = {
    ath: ["SRX19027089_SRX19027101", "SRX19027090_SRX19027102", "SRX19027091_SRX19027103", "SRX19027092_SRX19027104", "SRX19027093_SRX19027105"],
    osa: ["SRX19027101_SRX19027111", "SRX19027102_SRX19027112", "SRX19027103_SRX19027113"],
    zma: ["SRX19027121_SRX19027131", "SRX19027122_SRX19027132", "SRX19027123_SRX19027133"],
    sly: ["SRX19027141_SRX19027151", "SRX19027142_SRX19027152"],
  };
  res.json({ samples: sampleMap[species] || [] });
});

app.post("/api/tools/rmleveldiff/submit", (req, res) => {
  const { species, groupA, groupB, software, foldChange, pvalue } = req.body;
  if (!species || !groupA?.length || !groupB?.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const jobId = `RMLD_${crypto.randomBytes(8).toString("hex")}_${Date.now()}`;
  jobs.set(jobId, {
    tool: "rmleveldiff",
    status: "running",
    params: { species, groupA, groupB, software, foldChange, pvalue },
    createdAt: new Date().toISOString(),
  });
  // Simulate async processing
  setTimeout(() => {
    const job = jobs.get(jobId);
    if (job) {
      job.status = "completed";
      job.results = {
        totalPeaks: Math.floor(Math.random() * 5000) + 1000,
        differentialPeaks: Math.floor(Math.random() * 500) + 50,
        upregulated: Math.floor(Math.random() * 200) + 20,
        downregulated: Math.floor(Math.random() * 200) + 20,
        files: [
          { name: "differential_peaks.bed", url: `/api/tools/rmleveldiff/download/${jobId}/differential_peaks.bed` },
          { name: "summary_report.txt", url: `/api/tools/rmleveldiff/download/${jobId}/summary_report.txt` },
        ],
      };
    }
  }, 5000);
  res.json({ jobId, message: "Job submitted successfully" });
});

app.get("/api/tools/rmleveldiff/results", (req, res) => {
  const { jobId } = req.query;
  const job = jobs.get(jobId);
  if (!job) return res.status(404).json({ error: "Job not found" });
  if (job.status === "running") return res.json({ status: "running", message: "Job is still running..." });
  res.json({ status: "completed", ...job.results });
});

// ============================================================
// RMplantVar API
// ============================================================
app.post("/api/tools/rmplantvar/submit", (req, res) => {
  const { species, software, email } = req.body;
  if (!species) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const jobId = `RMPV_${crypto.randomBytes(8).toString("hex")}_${Date.now()}`;
  jobs.set(jobId, {
    tool: "rmplantvar",
    status: "running",
    params: { species, software, email },
    createdAt: new Date().toISOString(),
  });
  setTimeout(() => {
    const job = jobs.get(jobId);
    if (job) {
      job.status = "completed";
      job.results = {
        totalVariants: Math.floor(Math.random() * 10000) + 500,
        deleteriousVariants: Math.floor(Math.random() * 100) + 10,
        files: [
          { name: "deleterious_variants.txt", url: `/api/tools/rmplantvar/download/${jobId}/deleterious_variants.txt` },
          { name: "variant_annotation.txt", url: `/api/tools/rmplantvar/download/${jobId}/variant_annotation.txt` },
        ],
      };
    }
  }, 8000);
  res.json({ jobId, message: "Job submitted successfully" });
});

app.get("/api/tools/rmplantvar/results", (req, res) => {
  const { jobId } = req.query;
  const job = jobs.get(jobId);
  if (!job) return res.status(404).json({ error: "Job not found" });
  if (job.status === "running") return res.json({ status: "running", message: "Job is still running..." });
  res.json({ status: "completed", ...job.results });
});

// ============================================================
// RNAmodNet API
// ============================================================
app.get("/api/tools/rnamodnet/genes", (req, res) => {
  const { species } = req.query;
  const geneMap = {
    ath: ["AT1G01010", "AT1G01020", "AT1G01030", "AT1G01040", "AT1G01050", "AT1G01060", "AT1G01070", "AT1G01080", "AT1G01090", "AT1G01100"],
    osa: ["Os01g0100100", "Os01g0100200", "Os01g0100300", "Os01g0100400", "Os01g0100500"],
    sly: ["Solyc01g005000", "Solyc01g005010", "Solyc01g005020", "Solyc01g005030"],
    zma: ["Zm00001d000001", "Zm00001d000002", "Zm00001d000003", "Zm00001d000004"],
  };
  res.json({ genes: geneMap[species] || [] });
});

app.get("/api/tools/rnamodnet/graph", (req, res) => {
  const { species, gene } = req.query;
  if (!gene) return res.status(400).json({ error: "Gene parameter required" });
  // Generate mock co-methylation network
  const relatedGenes = [
    gene,
    `REL_${gene}_1`,
    `REL_${gene}_2`,
    `REL_${gene}_3`,
    `REL_${gene}_4`,
    `REL_${gene}_5`,
  ];
  const nodes = relatedGenes.map((id, i) => ({
    id,
    label: id,
    group: i === 0 ? "query" : "related",
  }));
  const edges = relatedGenes.slice(1).map((target) => ({
    source: gene,
    target,
    weight: Math.random().toFixed(3),
  }));
  res.json({ nodes, edges });
});

// ============================================================
// BLAST API
// ============================================================
app.post("/api/tools/blast/submit", (req, res) => {
  const { program, database, querySeq, evalue, matrix } = req.body;
  if (!querySeq) {
    return res.status(400).json({ error: "Query sequence is required" });
  }
  const jobId = `BLAST_${crypto.randomBytes(8).toString("hex")}_${Date.now()}`;
  jobs.set(jobId, {
    tool: "blast",
    status: "running",
    params: { program, database, querySeq, evalue, matrix },
    createdAt: new Date().toISOString(),
  });
  // Simulate BLAST search
  setTimeout(() => {
    const job = jobs.get(jobId);
    if (job) {
      job.status = "completed";
      job.results = {
        results: [
          {
            id: "MTA70_ARATH",
            description: "mRNA adenosine methylase MTA (EC 2.1.1.62) - Arabidopsis thaliana",
            evalue: "2e-45",
            score: 185,
            identity: 78.5,
          },
          {
            id: "MTA70_ORYSJ",
            description: "mRNA adenosine methylase MTA (EC 2.1.1.62) - Oryza sativa",
            evalue: "5e-38",
            score: 152,
            identity: 72.1,
          },
          {
            id: "MTA70_MAIZE",
            description: "mRNA adenosine methylase MTA (EC 2.1.1.62) - Zea mays",
            evalue: "1e-35",
            score: 143,
            identity: 70.3,
          },
        ],
      };
    }
  }, 3000);
  res.json({ jobId, message: "BLAST job submitted" });
});

app.get("/api/tools/blast/results", (req, res) => {
  const { jobId } = req.query;
  const job = jobs.get(jobId);
  if (!job) return res.status(404).json({ error: "Job not found" });
  if (job.status === "running") return res.json({ status: "running", message: "Job is still running..." });
  res.json({ status: "completed", ...job.results });
});

// ============================================================
// Generic download endpoint
// ============================================================
app.get("/api/tools/:tool/download/:jobId/:filename", (req, res) => {
  const { tool, jobId, filename } = req.params;
  const job = jobs.get(jobId);
  if (!job) return res.status(404).json({ error: "Job not found" });
  // Generate mock file content
  const content = `# ${tool} results for job ${jobId}\n# Generated at ${job.createdAt}\n\n# This is a placeholder result file.\n# In production, this would contain actual analysis results.\n`;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.send(content);
});

// ============================================================
// Health check
// ============================================================
app.get("/api/tools/health", (req, res) => {
  res.json({ status: "ok", activeJobs: jobs.size });
});

app.listen(PORT, () => {
  console.log(`Tools API server running on http://localhost:${PORT}`);
});

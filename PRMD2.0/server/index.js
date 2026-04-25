import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const tsvPath = path.resolve(
  __dirname,
  "../../../当前ath数据/ath_merged_annotated_sample.tsv"
);

/**
 * Read TSV file and parse it efficiently
 * Returns { headers, rows }
 */
function readTsvFile() {
  const fileContent = fs.readFileSync(tsvPath, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split("\t");
  return { headers, lines };
}

/**
 * Parse a single line into a row object
 */
function parseLine(line, headers, id) {
  const values = line.split("\t");
  const row = { id };
  headers.forEach((header, i) => {
    row[header] = values[i] || "";
  });
  return row;
}

/**
 * GET /api/browse/data
 * Paginated data with filters
 */
app.get("/api/browse/data", (req, res) => {
  try {
    const {
      page = "1",
      pageSize = "100",
      species,
      modification,
      method,
      location,
      keyword,
    } = req.query;

    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);
    const { headers, lines } = readTsvFile();

    let filteredLines = lines.slice(1); // Skip header

    // Apply filters
    if (species && species !== "all") {
      filteredLines = filteredLines.filter((line) => {
        const vals = line.split("\t");
        return vals[0] === species;
      });
    }
    if (modification && modification !== "all") {
      filteredLines = filteredLines.filter((line) => {
        const vals = line.split("\t");
        return vals[8] === modification;
      });
    }
    if (method && method !== "all") {
      // Method is not directly in TSV, but we can infer from context
      // For now, skip method filter on server side
    }
    if (location && location !== "all") {
      filteredLines = filteredLines.filter((line) => {
        const vals = line.split("\t");
        return vals[7] === location;
      });
    }
    if (keyword && keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      filteredLines = filteredLines.filter((line) =>
        line.toLowerCase().includes(kw)
      );
    }

    const totalCount = filteredLines.length;
    const totalPages = Math.ceil(totalCount / pageSizeNum);
    const startIdx = (pageNum - 1) * pageSizeNum;
    const pageLines = filteredLines.slice(startIdx, startIdx + pageSizeNum);

    const rows = pageLines.map((line, idx) =>
      parseLine(line, headers, startIdx + idx + 1)
    );

    res.json({
      rows,
      pagination: {
        page: pageNum,
        pageSize: pageSizeNum,
        totalCount,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error reading TSV:", error);
    res.status(500).json({ error: "Failed to read data file" });
  }
});

/**
 * GET /api/browse/stats
 * Get total peaks count and location distribution
 */
app.get("/api/browse/stats", (req, res) => {
  try {
    const { species, modification, method, location, keyword } = req.query;
    const { headers, lines } = readTsvFile();
    const locationIndex = headers.indexOf("Location");

    let filteredLines = lines.slice(1);

    // Apply same filters as data endpoint
    if (species && species !== "all") {
      filteredLines = filteredLines.filter((line) => {
        const vals = line.split("\t");
        return vals[0] === species;
      });
    }
    if (modification && modification !== "all") {
      filteredLines = filteredLines.filter((line) => {
        const vals = line.split("\t");
        return vals[8] === modification;
      });
    }
    if (location && location !== "all") {
      filteredLines = filteredLines.filter((line) => {
        const vals = line.split("\t");
        return vals[7] === location;
      });
    }
    if (keyword && keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      filteredLines = filteredLines.filter((line) =>
        line.toLowerCase().includes(kw)
      );
    }

    // Location distribution
    const locationMap = new Map();
    filteredLines.forEach((line) => {
      const vals = line.split("\t");
      const loc = vals[locationIndex] || "unknown";
      locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
    });

    const locationDistribution = [...locationMap.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    res.json({
      totalPeaks: filteredLines.length,
      locationDistribution,
    });
  } catch (error) {
    console.error("Error reading stats:", error);
    res.status(500).json({ error: "Failed to read stats" });
  }
});

/**
 * GET /api/browse/filters
 * Get unique values for filter dropdowns
 */
app.get("/api/browse/filters", (req, res) => {
  try {
    const { headers, lines } = readTsvFile();
    const speciesSet = new Set();
    const modificationSet = new Set();
    const locationSet = new Set();

    // Read first 50000 lines to get representative filter values
    const sampleLines = lines.slice(1, 50001);
    sampleLines.forEach((line) => {
      const vals = line.split("\t");
      if (vals[0]) speciesSet.add(vals[0]);
      if (vals[8]) modificationSet.add(vals[8]);
      if (vals[7]) locationSet.add(vals[7]);
    });

    res.json({
      species: [...speciesSet].sort(),
      modifications: [...modificationSet].sort(),
      locations: [...locationSet].sort(),
    });
  } catch (error) {
    console.error("Error reading filters:", error);
    res.status(500).json({ error: "Failed to read filters" });
  }
});

app.listen(PORT, () => {
  console.log(`Browse API server running on http://localhost:${PORT}`);
});

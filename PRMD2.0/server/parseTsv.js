import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tsvPath = path.resolve(
  __dirname,
  "../../../ath_data/ath_merged_annotated_sample.tsv"
);

/**
 * Parse TSV file and return structured data
 * Only reads first N lines for preview, or full file
 */
export function parseTsvFile(maxLines = Infinity) {
  const fileContent = fs.readFileSync(tsvPath, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

  // First line is header
  const headers = lines[0].split("\t");
  const dataLines = lines.slice(1, maxLines + 1);

  const rows = dataLines.map((line, idx) => {
    const values = line.split("\t");
    const row = { id: idx + 1 };
    headers.forEach((header, i) => {
      row[header] = values[i] || "";
    });
    return row;
  });

  return rows;
}

/**
 * Get unique values for a specific column
 */
export function getUniqueValues(column, maxLines = 50000) {
  const rows = parseTsvFile(maxLines);
  const values = new Set(rows.map((row) => row[column]).filter(Boolean));
  return [...values].sort();
}

/**
 * Get stats: total peaks, location distribution
 */
export function getStats(maxLines = Infinity) {
  const rows = parseTsvFile(maxLines);
  const locationMap = new Map();

  rows.forEach((row) => {
    const loc = row.Location || "unknown";
    locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
  });

  return {
    totalPeaks: rows.length,
    locationDistribution: [...locationMap.entries()].map(([name, value]) => ({
      name,
      value,
    })),
  };
}

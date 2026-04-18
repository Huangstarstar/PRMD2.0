import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BrowseFilters from "../components/browse/BrowseFilters";
import BrowseStatsPanel from "../components/browse/BrowseStatsPanel";
import BrowseTable from "../components/browse/BrowseTable";
import { browseRows } from "../data/mockBrowseData";

function Browse({ setPage, setSelectedBrowseRow, externalSearchKeyword = "" }) {
  const [filters, setFilters] = useState({
    modification_type: "all",
    method: "all",
    species: "all",
    region: "all",
    keyword: externalSearchKeyword,
  });

  const filteredRows = useMemo(() => {
    return browseRows.filter((row) => {
      const keyword = filters.keyword.trim().toLowerCase();
      const searchable = [row.gene_id, row.transcript_id, row.peak_id, row.species, row.tissue, row.motif].join(" ").toLowerCase();
      return (
        (filters.modification_type === "all" || row.modification_type === filters.modification_type) &&
        (filters.method === "all" || row.method === filters.method) &&
        (filters.species === "all" || row.species === filters.species) &&
        (filters.region === "all" || row.region === filters.region) &&
        (!keyword || searchable.includes(keyword))
      );
    });
  }, [filters]);

  const topMotifs = useMemo(() => {
    const map = new Map();
    filteredRows.forEach((row) => map.set(row.motif, (map.get(row.motif) || 0) + 1));
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [filteredRows]);

  const speciesPie = useMemo(() => {
    const map = new Map();
    filteredRows.forEach((row) => map.set(row.species, (map.get(row.species) || 0) + 1));
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [filteredRows]);

  const regionPie = useMemo(() => {
    const map = new Map();
    filteredRows.forEach((row) => map.set(row.region, (map.get(row.region) || 0) + 1));
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [filteredRows]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <BrowseFilters filters={filters} setFilters={setFilters} />

      <div className="space-y-6">
        <BrowseStatsPanel speciesPie={speciesPie} regionPie={regionPie} topMotifs={topMotifs} />

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Filtered records</CardTitle>
              <CardDescription>{filteredRows.length} records</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Detail ready</Badge>
              <Badge variant="secondary">JBrowse linked entry</Badge>
              <Badge variant="secondary">Annotation linked entry</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <BrowseTable
              rows={filteredRows}
              onViewDetail={(row) => {
                setSelectedBrowseRow(row);
                setPage("BrowseDetail");
              }}
              onOpenJBrowse={(row) => {
                setSelectedBrowseRow(row);
                setPage("JBrowse");
              }}
              onOpenAnnotation={(row) => {
                setSelectedBrowseRow(row);
                setPage("Annotation");
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Browse;

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BrowseTable from "../components/browse/BrowseTable";
import { browseRows } from "../data/mockBrowseData";

function SearchResults({ query, setPage, setSelectedBrowseRow }) {
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return browseRows;
    return browseRows.filter((row) => [row.gene_id, row.motif, row.species, row.peak_id, row.tissue].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
        <CardDescription>{results.length} matched records{query ? ` for "${query}"` : ""}</CardDescription>
      </CardHeader>
      <CardContent>
        <BrowseTable
          rows={results}
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
  );
}

export default SearchResults;

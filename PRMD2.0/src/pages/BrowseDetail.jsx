import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmptyState from "../components/common/EmptyState";
import SectionHeader from "../components/common/SectionHeader";

function BrowseDetail({ row, setPage }) {
  if (!row) {
    return (
      <EmptyState
        title="No record selected"
        description="Detail page content pending; currently supports entry and lineage from Browse row-level operations."
        actionLabel="Back to Browse"
        onAction={() => setPage("Browse")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader title="Browse Detail" description="Detail page content pending; currently supports entry and lineage from Browse row-level operations." />
        <Button variant="outline" onClick={() => setPage("Browse")}>Back</Button>
      </div>
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{row.gene_id} / {row.transcript_id}</CardTitle>
          <CardDescription>Will be replaced with full gene-level detail structure</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {[
            ["Species", row.species],
            ["Modification type", row.modification_type],
            ["Method", row.method],
            ["Peak ID", row.peak_id],
            ["Tissue", row.tissue],
            ["Region", row.region],
            ["Motif", row.motif],
            ["chr_cress:pos_cress", `${row.chr_cress}:${row.pos_cress}`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">{k}</div>
              <div className="mt-2 font-medium text-slate-900">{v}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default BrowseDetail;

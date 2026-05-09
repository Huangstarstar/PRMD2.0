import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "../components/common/SectionHeader";

function JBrowse({ selectedBrowseRow }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="JBrowse" description="Genome browser entry page; Browse table already includes jump buttons for JBrowse navigation." />
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Genome browser entry</CardTitle>
          <CardDescription>Will support parameter linking for gene, coordinates and species</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            {selectedBrowseRow
              ? `Selected record from Browse: ${selectedBrowseRow.gene_id} / ${selectedBrowseRow.species} / ${selectedBrowseRow.peak_id}`
              : "No Browse record parameters provided."}
          </div>
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">JBrowse iframe / embedded browser placeholder</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JBrowse;

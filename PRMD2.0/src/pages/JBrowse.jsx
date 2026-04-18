import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "../components/common/SectionHeader";

function JBrowse({ selectedBrowseRow }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="JBrowse" description="当前先作为独立入口页，Browse 表格已预留跳转按钮。" />
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Genome browser entry</CardTitle>
          <CardDescription>后续可接基因、坐标、物种参数联动</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            {selectedBrowseRow
              ? `当前来自 Browse 的选中记录：${selectedBrowseRow.gene_id} / ${selectedBrowseRow.species} / ${selectedBrowseRow.peak_id}`
              : "当前未携带 Browse 记录参数。"}
          </div>
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">JBrowse iframe / embedded browser placeholder</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JBrowse;

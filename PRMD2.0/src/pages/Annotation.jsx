import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import SectionHeader from "../components/common/SectionHeader";
import { annotationEnrichment, expressionHeatmapRows } from "../data/mockAnnotation";

function Annotation() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Annotation" description="读取预计算结果，当前按 GO / KEGG / Reactome、表达热图、基因家族与联动图结构组织。" />

      <Tabs defaultValue="enrichment" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap gap-2 rounded-2xl bg-transparent p-0">
          {[
            ["enrichment", "Functional Enrichment"],
            ["expression", "Expression Heatmap"],
            ["family", "Gene Family"],
            ["network", "Network / Association"],
            ["downloads", "Downloads"],
          ].map(([value, label]) => (
            <TabsTrigger key={value} value={value} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 data-[state=active]:bg-[#223e36] data-[state=active]:text-white">{label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="enrichment">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>GO / KEGG / Reactome enrichment</CardTitle>
                <CardDescription>前端先用预计算结果示意</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {annotationEnrichment.map((item) => (
                  <div key={item.term} className="space-y-2 rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">{item.term}</span>
                      <span className="text-sm text-slate-500">{item.score}</span>
                    </div>
                    <Progress value={item.score} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Result actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full rounded-2xl bg-[#223e36] hover:bg-[#1b312b]">Download result table</Button>
                <Button variant="outline" className="w-full rounded-2xl">Download figure</Button>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">当前设定为读取预计算结果，不提供用户上传；后端接通后可替换为真实下载链接。</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expression">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle>RNA-seq expression heatmap</CardTitle>
              <CardDescription>修饰酶表达统计占位区</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <div className="min-w-[680px] rounded-2xl border border-slate-200">
                <div className="grid grid-cols-5 border-b bg-slate-50 text-sm font-semibold text-slate-700">
                  <div className="p-4">Gene</div>
                  <div className="p-4">Root</div>
                  <div className="p-4">Leaf</div>
                  <div className="p-4">Seed</div>
                  <div className="p-4">Panicle</div>
                </div>
                {expressionHeatmapRows.map((row) => (
                  <div key={row.gene} className="grid grid-cols-5 border-b last:border-b-0">
                    <div className="p-4 font-medium">{row.gene}</div>
                    {[row.root, row.leaf, row.seed, row.panicle].map((v, i) => (
                      <div key={i} className="p-4">
                        <div className="rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-900" style={{ backgroundColor: `rgba(34,62,54,${0.08 + v / 100})` }}>{v}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Gene family browser</CardTitle>
                <CardDescription>浏览已有物种 / 家族结果</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Writers family overview", "Readers family overview", "Erasers family overview"].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>
                ))}
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader><CardTitle>Family figure placeholder</CardTitle></CardHeader>
              <CardContent className="flex min-h-[260px] items-center justify-center rounded-2xl bg-slate-50 text-slate-500">Heatmap / family distribution / comparative chart</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Network / association view</CardTitle>
              <CardDescription>后续可承接 RNAmodNet 或 Browse / Annotation 联动图</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[340px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">Network graph placeholder</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader><CardTitle>Annotation result downloads</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {[
                "GO enrichment result table",
                "KEGG enrichment result table",
                "Reactome enrichment result table",
                "Expression heatmap figure",
                "Gene family summary figure",
                "Association network figure",
              ].map((item) => (
                <button key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#223e36]">
                  <div className="font-medium text-slate-900">{item}</div>
                  <div className="mt-2 text-sm text-slate-500">Download placeholder</div>
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Annotation;

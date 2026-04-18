import React from "react";
import { motion } from "framer-motion";
import { Database, Table2, FileSearch, Compass, Network, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "../components/common/StatCard";
import { statsCards, toolsMenu } from "../data/mockStats";

function FeatureCard({ icon: Icon, title, desc, onClick }) {
  return (
    <button onClick={onClick} className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4f0]">
        <Icon className="h-7 w-7 text-[#223e36]" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
    </button>
  );
}

function Home({ setPage }) {
  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 rounded-3xl bg-gradient-to-br from-[#dce9e3] via-white to-[#eef5f1] p-8 shadow-sm md:grid-cols-[1.3fr_0.7fr] md:p-10">
        <div className="space-y-5">
          <Badge className="rounded-full bg-[#223e36] px-3 py-1 text-white">Plant RNA Modification Database</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">PRMD 2.0：面向植物 RNA 修饰研究的数据浏览、检索、统计与注释平台</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            PRMD 2.0 是植物 RNA 修饰数据库的 2.0 版本。数据库整合来自 XX 个植物物种的 XX 个 MeRIP-seq 样本，覆盖超过 XX 万个 m6A 修饰位点及 XX 万个富集区域。平台基于统一的数据处理流程，对原始数据进行标准化分析，包括数据预处理、peak 识别、注释及下游功能分析，并提供 Browse、Search、Visualization、Statistics、Annotation 与 Tools 等功能模块，支持用户进行多维度的数据挖掘与分析。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setPage("Browse")} className="rounded-2xl bg-[#223e36] px-6 py-6 text-base hover:bg-[#1b312b]">进入 Browse</Button>
            <Button onClick={() => setPage("Annotation")} variant="outline" className="rounded-2xl px-6 py-6 text-base">查看 Annotation</Button>
          </div>
        </div>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Database className="h-5 w-5 text-[#223e36]" /> Core Scope</CardTitle>
            <CardDescription>站点核心功能概览</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              "多物种、多样本 RNA 修饰数据整合",
              "组合筛选与结果表联动统计图",
              "数据库检索与详情浏览",
              "JBrowse 可视化入口",
              "GO / KEGG / Reactome 预计算注释结果",
              "RNA 修饰分析工具集合",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{item}</div>
            ))}
          </CardContent>
        </Card>
      </motion.section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard icon={Table2} title="Browse" desc="按修饰类型、测序方法、物种与区域进行组合筛选，并查看统计图与数据表联动结果。" onClick={() => setPage("Browse")} />
        <FeatureCard icon={FileSearch} title="Search" desc="支持 gene ID、motif、species、peak ID 与 tissue 的数据库内容检索。" onClick={() => setPage("Search")} />
        <FeatureCard icon={Compass} title="JBrowse" desc="作为独立页面展示浏览器入口，并为 Browse 结果预留基因跳转通道。" onClick={() => setPage("JBrowse")} />
        <FeatureCard icon={Network} title="Annotation" desc="提供功能富集、修饰酶家族、表达热图与联动图等预计算结果浏览。" onClick={() => setPage("Annotation")} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Tools</CardTitle>
            <CardDescription>先放统一入口，后续可替换为原始 PHP 工具逻辑</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {toolsMenu.map((tool) => (
              <button
                key={tool}
                onClick={() => setPage(tool)}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#223e36]"
              >
                <div>
                  <div className="font-semibold text-slate-900">{tool}</div>
                  <div className="mt-1 text-sm text-slate-500">Temporary landing page</div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#223e36]" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Quick Statistics</CardTitle>
            <CardDescription>首页展示占位概览，完整内容在 Statistics 页面</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {statsCards.map((item) => <StatCard key={item.label} label={item.label} value={item.value} />)}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Home;

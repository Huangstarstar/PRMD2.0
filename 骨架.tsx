import React, { useMemo, useState } from "react";
import { Search, Database, BarChart3, Network, Download, HelpCircle, Mail, ExternalLink, ChevronDown, Dna, Layers, Filter, Eye, Compass, Table2, Info, ArrowRight, PieChart, FileSearch, Boxes, Activity, Heatmap, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const THEME = "#223e36";

const browseRows = [
  {
    id: 1,
    species: "Arabidopsis thaliana",
    modification_type: "m6A",
    method: "MeRIP-seq",
    gene_id: "AT1G70830",
    transcript_id: "AT1G70830.4",
    peak_id: "peak_001",
    tissue: "Leaf",
    region: "3UTR",
    motif: "AGACA",
    transcript_cress: "AT1G70830.4",
    transcript_rice: "Os04t0465600-01",
    transcript_pos_cress: 603,
    transcript_pos_rice: 564,
    base_cress: "A",
    base_rice: "A",
    chr_cress: "1",
    pos_cress: 26710766,
    strand_cress: "-",
    motif_cress: "AGACA",
    chr_rice: "4",
    pos_rice: 23279181,
    strand_rice: "+",
    motif_rice: "AGACA",
  },
  {
    id: 2,
    species: "Arabidopsis thaliana",
    modification_type: "m6A",
    method: "MeRIP-seq",
    gene_id: "AT1G32080",
    transcript_id: "AT1G32080.1",
    peak_id: "peak_002",
    tissue: "Panicle",
    region: "gene body",
    motif: "AGATG",
    transcript_cress: "AT1G32080.1",
    transcript_rice: "Os01t0511600-01",
    transcript_pos_cress: 1789,
    transcript_pos_rice: 2639,
    base_cress: "A",
    base_rice: "A",
    chr_cress: "1",
    pos_cress: 11537462,
    strand_cress: "-",
    motif_cress: "AGATG",
    chr_rice: "1",
    pos_rice: 18013754,
    strand_rice: "-",
    motif_rice: "AGATT",
  },
  {
    id: 3,
    species: "Arabidopsis thaliana",
    modification_type: "m6A",
    method: "MeRIP-seq",
    gene_id: "AT1G16710",
    transcript_id: "AT1G16710.3",
    peak_id: "peak_003",
    tissue: "Root",
    region: "5UTR",
    motif: "AGACA",
    transcript_cress: "AT1G16710.3",
    transcript_rice: "Os02t0137500-01",
    transcript_pos_cress: 5012,
    transcript_pos_rice: 1127,
    base_cress: "A",
    base_rice: "A",
    chr_cress: "1",
    pos_cress: 5720490,
    strand_cress: "+",
    motif_cress: "AGACA",
    chr_rice: "2",
    pos_rice: 1995349,
    strand_rice: "+",
    motif_rice: "AGATA",
  },
  {
    id: 4,
    species: "Oryza sativa",
    modification_type: "m6A",
    method: "MeRIP-seq",
    gene_id: "Os02t0137500",
    transcript_id: "Os02t0137500-01",
    peak_id: "peak_004",
    tissue: "Seed",
    region: "3UTR",
    motif: "GAACT",
    transcript_cress: "AT1G16710.3",
    transcript_rice: "Os02t0137500-01",
    transcript_pos_cress: 6201,
    transcript_pos_rice: 2308,
    base_cress: "A",
    base_rice: "A",
    chr_cress: "1",
    pos_cress: 5722196,
    strand_cress: "+",
    motif_cress: "TGACT",
    chr_rice: "2",
    pos_rice: 1997044,
    strand_rice: "+",
    motif_rice: "GAACT",
  },
  {
    id: 5,
    species: "Oryza sativa",
    modification_type: "m6A",
    method: "MeRIP-seq",
    gene_id: "Os02t0137500",
    transcript_id: "Os02t0137500-01",
    peak_id: "peak_005",
    tissue: "Leaf",
    region: "gene body",
    motif: "GAACT",
    transcript_cress: "AT1G16710.3",
    transcript_rice: "Os02t0137500-01",
    transcript_pos_cress: 6247,
    transcript_pos_rice: 2360,
    base_cress: "A",
    base_rice: "A",
    chr_cress: "1",
    pos_cress: 5722242,
    strand_cress: "+",
    motif_cress: "GTACA",
    chr_rice: "2",
    pos_rice: 1997096,
    strand_rice: "+",
    motif_rice: "GAACT",
  },
];

const statsCards = [
  { label: "Modification types", value: "08" },
  { label: "Plant species", value: "XX" },
  { label: "MeRIP-seq samples", value: "XX" },
  { label: "Modification sites", value: "XX万+" },
];

const modificationDist = [
  { name: "m6A", value: 68 },
  { name: "m5C", value: 14 },
  { name: "Ψ", value: 9 },
  { name: "Nm", value: 6 },
  { name: "Others", value: 3 },
];

const methodDist = [
  { name: "MeRIP-seq", value: 70 },
  { name: "miCLIP", value: 12 },
  { name: "Nanopore", value: 8 },
  { name: "SCARLET", value: 5 },
  { name: "Others", value: 5 },
];

const speciesDist = [
  { name: "Arabidopsis", value: 160 },
  { name: "Rice", value: 148 },
  { name: "Maize", value: 96 },
  { name: "Wheat", value: 80 },
  { name: "Soybean", value: 61 },
];

const regionDist = [
  { name: "5UTR", value: 22 },
  { name: "gene body", value: 39 },
  { name: "3UTR", value: 39 },
];

const motifSummary = [
  { name: "RRACH-like", desc: "Enriched around canonical m6A-centered peaks" },
  { name: "AGACA", desc: "High-frequency motif observed in conserved sites" },
  { name: "GAACT", desc: "Prominent in rice-related orthologous records" },
];

const annotationEnrichment = [
  { term: "RNA processing", score: 92 },
  { term: "mRNA stability", score: 84 },
  { term: "Translation regulation", score: 76 },
  { term: "Stress response", score: 61 },
  { term: "Hormone signaling", score: 54 },
];

const expressionHeatmapRows = [
  { gene: "MTA", root: 76, leaf: 42, seed: 61, panicle: 55 },
  { gene: "MTB", root: 68, leaf: 38, seed: 72, panicle: 49 },
  { gene: "FIP37", root: 52, leaf: 66, seed: 59, panicle: 45 },
  { gene: "ALKBH", root: 32, leaf: 58, seed: 36, panicle: 41 },
];

const toolsMenu = [
  "RMlevelDiff",
  "RMplantVar",
  "RNAmodNet",
  "Blast",
  "Gene Editor",
];

const topNav = [
  "Home",
  "Browse",
  "Annotation",
  "JBrowse",
  "Tools",
  "Download",
  "Links",
  "Statistics",
  "Help",
  "Contact",
  "Search",
];

const COLORS = ["#223e36", "#365c51", "#4c7a6b", "#699887", "#8bb2a2"];

function App() {
  const [page, setPage] = useState("Home");
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedBrowseRow, setSelectedBrowseRow] = useState(null);

  const goToSearch = () => {
    setPage("Search");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f5] text-slate-800">
      <Header
        page={page}
        setPage={setPage}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        goToSearch={goToSearch}
      />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-6">
        {page === "Home" && <HomePage setPage={setPage} />}
        {page === "Browse" && (
          <BrowsePage
            setPage={setPage}
            setSelectedBrowseRow={setSelectedBrowseRow}
            externalSearchKeyword={globalSearch}
          />
        )}
        {page === "BrowseDetail" && (
          <BrowseDetailPage row={selectedBrowseRow} setPage={setPage} />
        )}
        {page === "Statistics" && <StatisticsPage />}
        {page === "Annotation" && <AnnotationPage />}
        {page === "JBrowse" && <JBrowsePage selectedRow={selectedBrowseRow} />}
        {page === "Search" && (
          <SearchPage
            initialKeyword={globalSearch}
            setPage={setPage}
            setSelectedBrowseRow={setSelectedBrowseRow}
          />
        )}
        {page === "Download" && <PlaceholderPage title="Download" icon={Download} description="Download pages will provide curated datasets, processed tables, motif summaries, and exportable files for PRMD 2.0." />}
        {page === "Links" && <LinksPage />}
        {page === "Help" && <HelpPage />}
        {page === "Contact" && <ContactPage />}
        {toolsMenu.includes(page) && <ToolPlaceholderPage title={page} />}
      </main>
    </div>
  );
}

function Header({ page, setPage, globalSearch, setGlobalSearch, goToSearch }) {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#223e36]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-6">
        <button
          onClick={() => setPage("Home")}
          className="shrink-0 text-left text-white"
        >
          <div className="text-2xl font-bold tracking-wide">PRMD <span className="font-medium text-white/70">2.0</span></div>
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {topNav.map((item) => {
            if (item === "Tools") {
              return (
                <div key={item} className="relative">
                  <button
                    onClick={() => setToolsOpen((v) => !v)}
                    className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      toolsMenu.includes(page) || page === "Tools"
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Tools <ChevronDown className="h-4 w-4" />
                  </button>
                  {toolsOpen && (
                    <div className="absolute left-0 top-12 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                      {toolsMenu.map((tool) => (
                        <button
                          key={tool}
                          onClick={() => {
                            setPage(tool);
                            setToolsOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          <span>{tool}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  page === item
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex w-full max-w-xs items-center gap-2 lg:w-auto">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/65" />
            <Input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToSearch();
              }}
              placeholder="Search genes, motif, species..."
              className="border-white/10 bg-white/12 pl-9 text-white placeholder:text-white/60"
            />
          </div>
          <Button onClick={goToSearch} className="bg-white text-[#223e36] hover:bg-white/90">
            Go
          </Button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ setPage }) {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 rounded-3xl bg-gradient-to-br from-[#dce9e3] via-white to-[#eef5f1] p-8 shadow-sm md:grid-cols-[1.3fr_0.7fr] md:p-10"
      >
        <div className="space-y-5">
          <Badge className="rounded-full bg-[#223e36] px-3 py-1 text-white">Plant RNA Modification Database</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            PRMD 2.0：面向植物 RNA 修饰研究的数据浏览、检索、统计与注释平台
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            PRMD 2.0 是植物 RNA 修饰数据库的 2.0 版本。数据库整合来自 XX 个植物物种的 XX 个 MeRIP-seq 样本，覆盖超过 XX 万个 m6A 修饰位点及 XX 万个富集区域。平台基于统一的数据处理流程，对原始数据进行标准化分析，包括数据预处理、peak 识别、注释及下游功能分析，并提供 Browse、Search、Visualization、Statistics、Annotation 与 Tools 等功能模块，支持用户进行多维度的数据挖掘与分析。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setPage("Browse")} className="rounded-2xl bg-[#223e36] px-6 py-6 text-base hover:bg-[#1b312b]">
              进入 Browse
            </Button>
            <Button onClick={() => setPage("Annotation")} variant="outline" className="rounded-2xl px-6 py-6 text-base">
              查看 Annotation
            </Button>
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
            {statsCards.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
                <div className="text-3xl font-bold text-[#223e36]">{item.value}</div>
                <div className="mt-2 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4f0]">
        <Icon className="h-7 w-7 text-[#223e36]" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
    </button>
  );
}

function BrowsePage({ setPage, setSelectedBrowseRow, externalSearchKeyword = "" }) {
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
    filteredRows.forEach((row) => {
      map.set(row.motif, (map.get(row.motif) || 0) + 1);
    });
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
      <Card className="sticky top-28 h-fit rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-[#223e36]" /> Browse Filters</CardTitle>
          <CardDescription>支持组合筛选</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">关键词</label>
            <Input
              value={filters.keyword}
              onChange={(e) => setFilters((p) => ({ ...p, keyword: e.target.value }))}
              placeholder="gene / motif / species / peak / tissue"
              className="rounded-2xl"
            />
          </div>
          <FilterSelect label="Modification type" value={filters.modification_type} onChange={(v) => setFilters((p) => ({ ...p, modification_type: v }))} items={["all", "m6A"]} />
          <FilterSelect label="Method" value={filters.method} onChange={(v) => setFilters((p) => ({ ...p, method: v }))} items={["all", "MeRIP-seq"]} />
          <FilterSelect label="Species" value={filters.species} onChange={(v) => setFilters((p) => ({ ...p, species: v }))} items={["all", "Arabidopsis thaliana", "Oryza sativa"]} />
          <FilterSelect label="Region" value={filters.region} onChange={(v) => setFilters((p) => ({ ...p, region: v }))} items={["all", "5UTR", "3UTR", "gene body"]} />
          <Button
            variant="outline"
            className="w-full rounded-2xl"
            onClick={() =>
              setFilters({
                modification_type: "all",
                method: "all",
                species: "all",
                region: "all",
                keyword: "",
              })
            }
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><BarChart3 className="h-5 w-5 text-[#223e36]" /> Statistics from filtered data</CardTitle>
              <CardDescription>右上区域用于快速观察筛选后结果分布</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-2">
              <MiniPieCard title="Species distribution" data={speciesPie} />
              <MiniPieCard title="Region distribution" data={regionPie} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><PieChart className="h-5 w-5 text-[#223e36]" /> Motif summary</CardTitle>
              <CardDescription>后端后续可替换为真实 motif 统计与 logo 展示</CardDescription>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topMotifs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill={THEME} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

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

function FilterSelect({ label, value, onChange, items }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-2xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function MiniPieCard({ title, data }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-3 text-sm font-semibold text-slate-700">{title}</div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={68} innerRadius={34}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BrowseTable({ rows, onViewDetail, onOpenJBrowse, onOpenAnnotation }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transcript_ID_cress</TableHead>
            <TableHead>Transcript_ID_rice</TableHead>
            <TableHead>Transcript_pos_cress</TableHead>
            <TableHead>Transcript_pos_rice</TableHead>
            <TableHead>Base_cress</TableHead>
            <TableHead>Base_rice</TableHead>
            <TableHead>chr_cress</TableHead>
            <TableHead>pos_cress</TableHead>
            <TableHead>strand_cress</TableHead>
            <TableHead>motif_cress</TableHead>
            <TableHead>chr_rice</TableHead>
            <TableHead>pos_rice</TableHead>
            <TableHead>strand_rice</TableHead>
            <TableHead>motif_rice</TableHead>
            <TableHead className="min-w-[240px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.transcript_cress}</TableCell>
              <TableCell>{row.transcript_rice}</TableCell>
              <TableCell>{row.transcript_pos_cress}</TableCell>
              <TableCell>{row.transcript_pos_rice}</TableCell>
              <TableCell>{row.base_cress}</TableCell>
              <TableCell>{row.base_rice}</TableCell>
              <TableCell>{row.chr_cress}</TableCell>
              <TableCell>{row.pos_cress}</TableCell>
              <TableCell>{row.strand_cress}</TableCell>
              <TableCell>{row.motif_cress}</TableCell>
              <TableCell>{row.chr_rice}</TableCell>
              <TableCell>{row.pos_rice}</TableCell>
              <TableCell>{row.strand_rice}</TableCell>
              <TableCell>{row.motif_rice}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]" onClick={() => onViewDetail(row)}>
                    <Eye className="mr-1 h-4 w-4" /> View Detail
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onOpenJBrowse(row)}>
                    <Compass className="mr-1 h-4 w-4" /> JBrowse
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onOpenAnnotation(row)}>
                    <Boxes className="mr-1 h-4 w-4" /> Annotation
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function BrowseDetailPage({ row, setPage }) {
  if (!row) {
    return (
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center gap-4">
          <Info className="h-10 w-10 text-slate-400" />
          <div className="text-lg font-semibold">No record selected</div>
          <Button onClick={() => setPage("Browse")} className="bg-[#223e36] hover:bg-[#1b312b]">Back to Browse</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Browse Detail</h2>
          <p className="mt-2 text-slate-600">详情页内容待定，当前先保证可进入并承接 Browse 行级操作。</p>
        </div>
        <Button variant="outline" onClick={() => setPage("Browse")}>Back</Button>
      </div>
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{row.gene_id} / {row.transcript_id}</CardTitle>
          <CardDescription>可在后续替换为真正的基因级详情结构</CardDescription>
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

function SearchPage({ initialKeyword, setPage, setSelectedBrowseRow }) {
  const [query, setQuery] = useState(initialKeyword || "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return browseRows;
    return browseRows.filter((row) =>
      [row.gene_id, row.motif, row.species, row.peak_id, row.tissue].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5 text-[#223e36]" /> Search database content</CardTitle>
          <CardDescription>支持搜索 gene ID、motif、species、peak ID、tissue；结果复用 Browse 表格组件。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by gene ID / motif / species / peak ID / tissue"
            className="rounded-2xl"
          />
          <Button className="rounded-2xl bg-[#223e36] hover:bg-[#1b312b]">Search</Button>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>{results.length} matched records</CardDescription>
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
    </div>
  );
}

function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Statistics</h2>
        <p className="mt-2 text-slate-600">当前为前端静态占位版本，后续可直接替换为真实统计接口。</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((item) => (
          <Card key={item.label} className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-3 text-4xl font-bold text-[#223e36]">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Modification type distribution" description="Hover 查看占位说明">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modificationDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={THEME} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Records by species" description="柱状图占位">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={speciesDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4c7a6b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Sequencing method composition" description="占比图">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie data={methodDist} dataKey="value" nameKey="name" outerRadius={100}>
                {methodDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Region distribution" description="5' / gene body / 3'">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={regionDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={THEME} fill="#d9e8e2" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Motif enrichment summary</CardTitle>
          <CardDescription>卡片 + 说明为主，鼠标移动可查看描述</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {motifSummary.map((item) => (
            <Popover key={item.name}>
              <PopoverTrigger asChild>
                <button className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-[#223e36] hover:bg-white">
                  <div className="text-lg font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-2 text-sm text-slate-500">Hover for description</div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="rounded-2xl border-slate-200">
                <p className="text-sm leading-6 text-slate-700">{item.desc}</p>
              </PopoverContent>
            </Popover>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">{children}</CardContent>
    </Card>
  );
}

function AnnotationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Annotation</h2>
        <p className="mt-2 text-slate-600">读取预计算结果，当前按 GO / KEGG / Reactome、表达热图、基因家族与联动图结构组织。</p>
      </div>

      <Tabs defaultValue="enrichment" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap gap-2 rounded-2xl bg-transparent p-0">
          <TabsTrigger value="enrichment" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 data-[state=active]:bg-[#223e36] data-[state=active]:text-white">Functional Enrichment</TabsTrigger>
          <TabsTrigger value="expression" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 data-[state=active]:bg-[#223e36] data-[state=active]:text-white">Expression Heatmap</TabsTrigger>
          <TabsTrigger value="family" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 data-[state=active]:bg-[#223e36] data-[state=active]:text-white">Gene Family</TabsTrigger>
          <TabsTrigger value="network" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 data-[state=active]:bg-[#223e36] data-[state=active]:text-white">Network / Association</TabsTrigger>
          <TabsTrigger value="downloads" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 data-[state=active]:bg-[#223e36] data-[state=active]:text-white">Downloads</TabsTrigger>
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
                <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                  当前设定为读取预计算结果，不提供用户上传；后端接通后可替换为真实下载链接。
                </div>
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
                        <div
                          className="rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-900"
                          style={{ backgroundColor: `rgba(34,62,54,${0.08 + v / 100})` }}
                        >
                          {v}
                        </div>
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
                {[
                  "Writers family overview",
                  "Readers family overview",
                  "Erasers family overview",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>
                ))}
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Family figure placeholder</CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-[260px] items-center justify-center rounded-2xl bg-slate-50 text-slate-500">
                Heatmap / family distribution / comparative chart
              </CardContent>
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
              <div className="flex min-h-[340px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                Network graph placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Annotation result downloads</CardTitle>
            </CardHeader>
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

function JBrowsePage({ selectedRow }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">JBrowse</h2>
        <p className="mt-2 text-slate-600">当前先作为独立入口页，Browse 表格已预留跳转按钮。</p>
      </div>
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Genome browser entry</CardTitle>
          <CardDescription>后续可接基因、坐标、物种参数联动</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            {selectedRow
              ? `当前来自 Browse 的选中记录：${selectedRow.gene_id} / ${selectedRow.species} / ${selectedRow.peak_id}`
              : "当前未携带 Browse 记录参数。"}
          </div>
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
            JBrowse iframe / embedded browser placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LinksPage() {
  const links = [
    "RNAmod",
    "RiboToolkit",
    "Ribo-uORF",
    "CRISPRBase",
    "sRNAtools",
    "PRMD",
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Links</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {links.map((name) => (
          <Card key={name} className="rounded-3xl border-0 shadow-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <div className="text-lg font-semibold">{name}</div>
                <div className="mt-1 text-sm text-slate-500">Related external resource</div>
              </div>
              <ExternalLink className="h-5 w-5 text-[#223e36]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HelpPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Help</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "How to browse data", icon: HelpCircle, text: "Use the left panel to filter by modification type, method, species, and region." },
          { title: "How to search", icon: Search, text: "Search supports gene ID, motif, species, peak ID, and tissue." },
          { title: "How to use Annotation", icon: Dna, text: "Annotation currently presents precomputed enrichment, expression, and family-level result views." },
          { title: "How to use Tools", icon: Activity, text: "Tool pages are temporary placeholders and can later be connected to original PHP workflows." },
        ].map((item) => (
          <Card key={item.title} className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4f0]">
                <item.icon className="h-6 w-6 text-[#223e36]" />
              </div>
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#dce9e3] to-white p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900">Contact</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">If you have questions, suggestions, or collaboration inquiries, please contact the PRMD 2.0 team.</p>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-[#223e36]" /> Contact information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">
              Rice Research Institute, Guangdong Academy of Agricultural Sciences<br />
              Guangdong Key Laboratory of New Technology for Rice Breeding<br />
              Guangzhou 510640, China
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              RNA Bioinformatics Team<br />
              rnainfor@gmail.com
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>表单前端样式先搭好，后续可接发信或保存接口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Subject" className="rounded-2xl" />
            <Input placeholder="Name" className="rounded-2xl" />
            <Input placeholder="Email" className="rounded-2xl" />
            <textarea className="min-h-[160px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#223e36]" placeholder="Feedback..." />
            <Button className="rounded-2xl bg-[#223e36] hover:bg-[#1b312b]">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ToolPlaceholderPage({ title }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-slate-600">当前为临时占位页面，后续可根据你提供的原始 PHP 工具页面改成真实 React 功能页。</p>
      </div>
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
          <Layers className="h-12 w-12 text-[#223e36]" />
          <div className="text-xl font-semibold text-slate-900">Temporary tool landing page</div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            This page is reserved for future migration of the original PHP logic, including forms, parameter settings, result tables, figures, and job outputs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PlaceholderPage({ title, icon: Icon, description }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center">
        <Icon className="h-12 w-12 text-[#223e36]" />
        <div className="text-2xl font-semibold text-slate-900">{title}</div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export default App;

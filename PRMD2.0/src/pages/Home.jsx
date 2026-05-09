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
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">PRMD 2.0: An Integrated Platform for Plant RNA Modification Data Browsing, Retrieval, Statistics and Annotation</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            PRMD 2.0 is an updated and expanded integrative database for plant RNA modifications. It integrates RNA modification-related datasets from 30 plant species, including 1,125 MeRIP-seq samples, 15 single-base-resolution m6A datasets and multiple types of RNA modification sites (m6A, m5C, Ψ, Nm, m1A, ac4C, m7G, and more). A standardized workflow was established for data quality control, read alignment, m6A peak calling, single-base site parsing, genomic annotation, motif analysis, functional enrichment and visualization file generation. The database provides multiple modules including Browse, Search, Annotation, JBrowse, Statistics, Download, Links and online analysis tools, supporting multi-dimensional data mining and comparative analysis.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setPage("Browse")} className="rounded-2xl bg-[#223e36] px-6 py-6 text-base hover:bg-[#1b312b]">Browse Database</Button>
            <Button onClick={() => setPage("Annotation")} variant="outline" className="rounded-2xl px-6 py-6 text-base">View Annotation</Button>
          </div>
        </div>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Database className="h-5 w-5 text-[#223e36]" /> Core Scope</CardTitle>
            <CardDescription>Core platform features overview</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              "Multi-species, multi-sample RNA modification data integration",
              "Combined filtering with linked statistical charts",
              "Database search and detailed record browsing",
              "JBrowse genome visualization entry",
              "GO / KEGG / Reactome precomputed annotation results",
              "Integrated RNA modification analysis tools",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{item}</div>
            ))}
          </CardContent>
        </Card>
      </motion.section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard icon={Table2} title="Browse" desc="Filter by modification type, sequencing method, species and genomic region; view linked statistics and data tables." onClick={() => setPage("Browse")} />
        <FeatureCard icon={FileSearch} title="Search" desc="Search database by gene ID, transcript ID, motif, species, peak ID and tissue keywords." onClick={() => setPage("Search")} />
        <FeatureCard icon={Compass} title="JBrowse" desc="Interactive genome browser for visualizing m6A peaks, gene structures and annotation tracks." onClick={() => setPage("JBrowse")} />
        <FeatureCard icon={Network} title="Annotation" desc="Browse functional enrichment, modification enzyme families, expression heatmaps and association networks." onClick={() => setPage("Annotation")} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Tools</CardTitle>
            <CardDescription>Online analysis tools for RNA modification data mining</CardDescription>
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
            <CardDescription>Overview statistics; complete details on the Statistics page</CardDescription>
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

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell, AreaChart, Area } from "recharts";
import StatCard from "../components/common/StatCard";
import SectionHeader from "../components/common/SectionHeader";
import { statsCards, modificationDist, speciesDist, methodDist, regionDist, motifSummary, COLORS } from "../data/mockStats";

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

function Statistics() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Statistics" description="Static frontend version; will be replaced with real statistics API endpoints." />

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
        <ChartCard title="Modification type distribution" description="Distribution of modification types across the database">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modificationDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#223e36" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Records by species" description="Number of records per plant species">
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
        <ChartCard title="Sequencing method composition" description="Proportion of different sequencing methods">
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
              <Area type="monotone" dataKey="value" stroke="#223e36" fill="#d9e8e2" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Motif enrichment summary</CardTitle>
          <CardDescription>Click or hover on each motif card to view its detailed description</CardDescription>
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

export default Statistics;

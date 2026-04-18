import React from "react";
import { BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const COLORS = ["#223e36", "#365c51", "#4c7a6b", "#699887", "#8bb2a2"];

function MiniPieCard({ title, data }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-3 text-sm font-semibold text-slate-700">{title}</div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={68} innerRadius={34}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BrowseStatsPanel({ speciesPie, regionPie, topMotifs }) {
  return (
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
              <Bar dataKey="value" fill="#223e36" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default BrowseStatsPanel;

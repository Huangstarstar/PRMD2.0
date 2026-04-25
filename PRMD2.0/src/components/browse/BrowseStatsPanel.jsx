import React from "react";
import { BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#223e36", "#365c51", "#4c7a6b", "#699887", "#8bb2a2", "#a8c9b8", "#c5ddd0"];

function BrowseStatsPanel({ totalPeaks, locationDistribution }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5 text-[#223e36]" /> 
            Statistics
          </CardTitle>
          <CardDescription>
            Total Peaks: <span className="font-bold text-[#223e36]">{totalPeaks.toLocaleString()}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-3 text-sm font-semibold text-slate-700">Location Distribution</div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={locationDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={45}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(1)}%)`
                    }
                    labelLine={true}
                  >
                    {locationDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PieChart className="h-5 w-5 text-[#223e36]" /> 
            Location Breakdown
          </CardTitle>
          <CardDescription>各区域Peaks数量及占比</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {locationDistribution.map((item, i) => {
              const total = locationDistribution.reduce((s, d) => s + d.value, 0);
              const pct = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                      <span className="text-sm text-slate-500">
                        {item.value.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BrowseStatsPanel;

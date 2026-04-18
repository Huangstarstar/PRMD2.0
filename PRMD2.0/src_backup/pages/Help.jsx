import React from "react";
import { Search, HelpCircle, Dna, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../components/common/SectionHeader";

function Help() {
  const items = [
    { title: "How to browse data", icon: HelpCircle, text: "Use the left panel to filter by modification type, method, species, and region." },
    { title: "How to search", icon: Search, text: "Search supports gene ID, motif, species, peak ID, and tissue." },
    { title: "How to use Annotation", icon: Dna, text: "Annotation currently presents precomputed enrichment, expression, and family-level result views." },
    { title: "How to use Tools", icon: Activity, text: "Tool pages are temporary placeholders and can later be connected to original PHP workflows." },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Help" />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
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

export default Help;

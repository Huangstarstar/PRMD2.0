import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../components/common/SectionHeader";

function Links() {
  const links = ["RNAmod", "RiboToolkit", "Ribo-uORF", "CRISPRBase", "sRNAtools", "PRMD"];

  return (
    <div className="space-y-6">
      <SectionHeader title="Links" />
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

export default Links;

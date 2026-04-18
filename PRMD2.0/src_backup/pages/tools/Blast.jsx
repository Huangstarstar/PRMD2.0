import React from "react";
import { Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function Blast() {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <Layers className="h-12 w-12 text-[#223e36]" />
        <div className="text-xl font-semibold text-slate-900">Blast</div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">Temporary tool landing page reserved for future migration of the original PHP logic.</p>
      </CardContent>
    </Card>
  );
}

export default Blast;

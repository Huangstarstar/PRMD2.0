import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function PagePlaceholder({ title, description, icon: Icon }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center">
        {Icon ? <Icon className="h-12 w-12 text-[#223e36]" /> : null}
        <div className="text-2xl font-semibold text-slate-900">{title}</div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export default PagePlaceholder;

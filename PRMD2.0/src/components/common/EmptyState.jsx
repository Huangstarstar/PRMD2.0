import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

function EmptyState({ title = "No data", description, actionLabel, onAction }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-3xl bg-white text-center shadow-sm">
      <Info className="h-10 w-10 text-slate-400" />
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      {description ? <p className="max-w-xl text-sm leading-7 text-slate-600">{description}</p> : null}
      {actionLabel ? (
        <Button onClick={onAction} className="bg-[#223e36] hover:bg-[#1b312b]">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export default EmptyState;

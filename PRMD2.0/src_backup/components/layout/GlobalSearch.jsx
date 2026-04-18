import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GlobalSearch({ value, onChange, onSubmit }) {
  return (
    <div className="ml-auto flex w-full max-w-xs items-center gap-2 lg:w-auto">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/65" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          placeholder="Search genes, motif, species..."
          className="border-white/10 bg-white/12 pl-9 text-white placeholder:text-white/60"
        />
      </div>
      <Button onClick={onSubmit} className="bg-white text-[#223e36] hover:bg-white/90">
        Go
      </Button>
    </div>
  );
}

export default GlobalSearch;

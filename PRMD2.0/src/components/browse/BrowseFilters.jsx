import React from "react";
import { Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function FilterSelect({ label, value, onChange, items }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-2xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function BrowseFilters({ filters, setFilters }) {
  return (
    <Card className="sticky top-28 h-fit rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-[#223e36]" /> Browse Filters</CardTitle>
        <CardDescription>支持组合筛选</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">关键词</label>
          <Input
            value={filters.keyword}
            onChange={(e) => setFilters((p) => ({ ...p, keyword: e.target.value }))}
            placeholder="gene / motif / species / peak / tissue"
            className="rounded-2xl"
          />
        </div>
        <FilterSelect
          label="Modification type"
          value={filters.modification_type}
          onChange={(v) => setFilters((p) => ({ ...p, modification_type: v }))}
          items={["all", "m6A"]}
        />
        <FilterSelect
          label="Method"
          value={filters.method}
          onChange={(v) => setFilters((p) => ({ ...p, method: v }))}
          items={["all", "MeRIP-seq"]}
        />
        <FilterSelect
          label="Species"
          value={filters.species}
          onChange={(v) => setFilters((p) => ({ ...p, species: v }))}
          items={["all", "Arabidopsis thaliana", "Oryza sativa"]}
        />
        <FilterSelect
          label="Region"
          value={filters.region}
          onChange={(v) => setFilters((p) => ({ ...p, region: v }))}
          items={["all", "5UTR", "3UTR", "gene body"]}
        />
        <Button
          variant="outline"
          className="w-full rounded-2xl"
          onClick={() =>
            setFilters({
              modification_type: "all",
              method: "all",
              species: "all",
              region: "all",
              keyword: "",
            })
          }
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}

export default BrowseFilters;

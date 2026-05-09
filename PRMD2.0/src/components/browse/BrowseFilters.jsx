import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrowseFilters } from "@/api/browse";

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
  const [filterOptions, setFilterOptions] = useState({
    species: ["all"],
    modifications: ["all"],
    methods: ["all"],
    locations: ["all"],
  });

  useEffect(() => {
    getBrowseFilters()
      .then((data) => {
        setFilterOptions({
          species: ["all", ...(data.species || [])],
          modifications: ["all", ...(data.modifications || [])],
          methods: ["all", ...(data.methods || [])],
          locations: ["all", ...(data.locations || [])],
        });
      })
      .catch((err) => console.error("Failed to load filters:", err));
  }, []);

  return (
    <Card className="sticky top-28 h-fit rounded-3xl border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-[#223e36]" /> Browse Filters</CardTitle>
        <CardDescription>Multi-condition combined filtering</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Keyword</label>
          <Input
            value={filters.keyword}
            onChange={(e) => setFilters((p) => ({ ...p, keyword: e.target.value }))}
            placeholder="gene / peak / species / location"
            className="rounded-2xl"
          />
        </div>
        <FilterSelect
          label="Species"
          value={filters.species}
          onChange={(v) => setFilters((p) => ({ ...p, species: v }))}
          items={filterOptions.species}
        />
        <FilterSelect
          label="Modification type"
          value={filters.modification}
          onChange={(v) => setFilters((p) => ({ ...p, modification: v }))}
          items={filterOptions.modifications}
        />
        <FilterSelect
          label="Method"
          value={filters.method}
          onChange={(v) => setFilters((p) => ({ ...p, method: v }))}
          items={filterOptions.methods}
        />
        <FilterSelect
          label="Region (Location)"
          value={filters.location}
          onChange={(v) => setFilters((p) => ({ ...p, location: v }))}
          items={filterOptions.locations}
        />
        <Button
          variant="outline"
          className="w-full rounded-2xl"
          onClick={() =>
            setFilters({
              species: "all",
              modification: "all",
              method: "all",
              location: "all",
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

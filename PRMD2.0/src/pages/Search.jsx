import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Search({ setSearchQuery, navigateToSearchResults }) {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><SearchIcon className="h-5 w-5 text-[#223e36]" /> Search database content</CardTitle>
          <CardDescription>Search by gene ID, motif, species, peak ID and tissue keywords.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by gene ID / motif / species / peak ID / tissue" className="rounded-2xl" />
          <Button
            className="rounded-2xl bg-[#223e36] hover:bg-[#1b312b]"
            onClick={() => {
              setSearchQuery(query);
              navigateToSearchResults(query);
            }}
          >
            Search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Search;

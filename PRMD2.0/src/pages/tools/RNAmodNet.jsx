import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Network, Info } from "lucide-react";

const API_BASE = "/api/tools/rnamodnet";

function RNAmodNet() {
  const [species, setSpecies] = useState("ath");
  const [geneList, setGeneList] = useState([]);
  const [selectedGene, setSelectedGene] = useState("");
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!species) return;
    setLoading(true);
    fetch(`${API_BASE}/genes?species=${species}`)
      .then((r) => r.json())
      .then((data) => {
        setGeneList(data.genes || []);
        if (data.genes?.length > 0) setSelectedGene(data.genes[0]);
      })
      .catch(() => setError("Failed to load gene list"))
      .finally(() => setLoading(false));
  }, [species]);

  const handleDrawGraph = async () => {
    if (!selectedGene) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/graph?species=${species}&gene=${selectedGene}`);
      const data = await res.json();
      if (data.nodes && data.edges) setGraphData(data);
      else setError(data.error || "No graph data available");
    } catch {
      setError("Failed to load graph");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Gene-co-methylation Network
            <a href="/help#RNAmodNet" target="_blank" rel="noreferrer">
              <Info className="h-4 w-4 text-slate-400" />
            </a>
          </CardTitle>
          <CardDescription>Netviewer for gene-co-methylation network analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <p>Netviewer for gene-co-methylation network analysis</p>
          </div>

          {/* Species Selection */}
          <div className="space-y-2">
            <Label className="font-medium">Please choose a species for the analysis</Label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "ath", label: "Arabidopsis thaliana (TAIR10)" },
                { id: "osa", label: "Oryza sativa (IRGSP-1.0)" },
                { id: "sly", label: "Solanum lycopersicum (SL3.0)" },
                { id: "zma", label: "Zea mays (B73 NAM-5.0)" },
              ].map((s) => (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    species === s.id
                      ? "border-[#223e36] bg-[#223e36]/5 text-[#223e36]"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rnamodnet_species"
                    value={s.id}
                    checked={species === s.id}
                    onChange={() => setSpecies(s.id)}
                    className="h-4 w-4 accent-[#223e36]"
                  />
                  <i>{s.label}</i>
                </label>
              ))}
            </div>
          </div>

          {/* Gene Selection */}
          <div className="space-y-2">
            <Label className="font-medium">Try searching for Ensembl IDs</Label>
            <div className="flex gap-2">
              <Select value={selectedGene} onValueChange={setSelectedGene}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select a gene" />
                </SelectTrigger>
                <SelectContent>
                  {geneList.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]"
                onClick={handleDrawGraph}
                disabled={loading || !selectedGene}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Network className="mr-2 h-4 w-4" />
                )}
                Draw graph
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Graph Visualization */}
          {graphData && (
            <div className="space-y-4">
              <h4 className="form-section text-base font-semibold">Genes visualization</h4>
              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nodes:</span> {graphData.nodes.length}
                  </div>
                  <div>
                    <span className="font-medium">Edges:</span> {graphData.edges.length}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {graphData.nodes.map((node) => (
                    <span
                      key={node.id}
                      className="inline-block rounded-full bg-[#223e36]/10 px-3 py-1 text-xs font-medium text-[#223e36]"
                    >
                      {node.label || node.id}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <h5 className="mb-2 text-sm font-medium text-slate-600">Edges (co-methylation links):</h5>
                  <div className="flex flex-wrap gap-1">
                    {graphData.edges.map((edge, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                      >
                        {edge.source} ↔ {edge.target}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default RNAmodNet;

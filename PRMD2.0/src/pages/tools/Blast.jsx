import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Info } from "lucide-react";

const API_BASE = "/api/tools/blast";

function Blast() {
  const [program, setProgram] = useState("blastp");
  const [database, setDatabase] = useState("hsa_modomics");
  const [querySeq, setQuerySeq] = useState("");
  const [evalue, setEvalue] = useState("0.01");
  const [matrix, setMatrix] = useState("BLOSUM62");
  const [ungapped, setUngapped] = useState("0");
  const [descriptions, setDescriptions] = useState("5");
  const [alignments, setAlignments] = useState("5");
  const [otherOptions, setOtherOptions] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const loadExample = () => {
    setProgram("blastp");
    setQuerySeq(
      ">test\nMSASSLLEQRPKGQGNKVQNGSVHQKDGLNDDDFEPYLSPQARPNNAYTAMSDSYLPSYYSPSIGFSYSLGEAAWSTGGDTAMPYLTSYGQLSNGEPHFLPDAMFGQPGALGSTPFLGQHGFNFFPSGIDFSAW"
    );
  };

  const clearForm = () => {
    setQuerySeq("");
    setEvalue("0.01");
    setMatrix("BLOSUM62");
    setDescriptions("5");
    setAlignments("5");
    setOtherOptions("");
    setResults(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!querySeq.trim()) {
      setError("Please input sequences");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program,
          database,
          querySeq,
          evalue,
          matrix,
          ungapped,
          descriptions,
          alignments,
          otherOptions,
        }),
      });
      const data = await res.json();
      if (data.results) setResults(data.results);
      else setError(data.error || "BLAST failed");
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Use BLAST to search RNA modification enzymes
            <a href="/help#Blast" target="_blank" rel="noreferrer">
              <Info className="h-4 w-4 text-slate-400" />
            </a>
          </CardTitle>
          <CardDescription>Blast your sequences to RNA modification enzymes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <ul className="list-inside list-disc space-y-1">
              <li>Inputs could be in FASTA format</li>
            </ul>
          </div>

          {/* Blast Type & Database */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium">
                Blast type <span className="text-red-500">*</span>
              </Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blastp">Blastp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">
                Database to search <span className="text-red-500">*</span>
              </Label>
              <Select value={database} onValueChange={setDatabase}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hsa_modomics">Known RNA modification enzymes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Query Sequence */}
          <div className="space-y-2">
            <Label className="font-medium">
              Sequences <span className="text-red-500">*</span>
            </Label>
            <textarea
              className="min-h-[140px] w-full rounded-lg border border-slate-200 p-3 font-mono text-sm outline-none focus:border-[#223e36] focus:ring-1 focus:ring-[#223e36]"
              placeholder="Input sequences in FASTA format..."
              value={querySeq}
              onChange={(e) => setQuerySeq(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200"
                onClick={loadExample}
              >
                blastp example
              </button>
              <button
                className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 hover:bg-slate-200"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Parameters */}
          <h4 className="border-b pb-2 text-base font-semibold">Parameters for BLAST analysis</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-medium">
                E-value <span className="text-red-500">*</span>
              </Label>
              <Input value={evalue} onChange={(e) => setEvalue(e.target.value)} className="max-w-[120px]" />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">
                Matrix <span className="text-red-500">*</span>
              </Label>
              <Select value={matrix} onValueChange={setMatrix}>
                <SelectTrigger className="w-full max-w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAM30">PAM30</SelectItem>
                  <SelectItem value="PAM70">PAM70</SelectItem>
                  <SelectItem value="BLOSUM45">BLOSUM45</SelectItem>
                  <SelectItem value="BLOSUM62">BLOSUM62</SelectItem>
                  <SelectItem value="BLOSUM80">BLOSUM80</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">
                Ungapped alignment <span className="text-red-500">*</span>
              </Label>
              <Select value={ungapped} onValueChange={setUngapped}>
                <SelectTrigger className="w-full max-w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">YES</SelectItem>
                  <SelectItem value="1">NO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">
                Description <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
                className="max-w-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">
                Alignments <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                value={alignments}
                onChange={(e) => setAlignments(e.target.value)}
                className="max-w-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Other options</Label>
              <Input
                value={otherOptions}
                onChange={(e) => setOtherOptions(e.target.value)}
                className="max-w-[200px]"
                placeholder="Other command parameters"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <Button
              className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Submit
            </Button>
            <Button variant="outline" className="rounded-xl">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">BLAST Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <p className="text-sm text-slate-500">No significant similarity found.</p>
            ) : (
              <div className="space-y-3">
                {results.map((hit, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-[#223e36]">{hit.id || `Hit ${i + 1}`}</span>
                      <span className="text-sm text-slate-500">E-value: {hit.evalue}</span>
                    </div>
                    <p className="text-sm text-slate-600">{hit.description}</p>
                    <div className="mt-2 text-xs text-slate-400">
                      Score: {hit.score} | Identity: {hit.identity}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Blast;

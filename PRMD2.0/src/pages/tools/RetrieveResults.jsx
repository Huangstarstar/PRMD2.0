import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, FileText, ExternalLink } from "lucide-react";

const API_BASE = "/api/tools";

function RetrieveResults() {
  const [tool, setTool] = useState("rmleveldiff");
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleRetrieve = async () => {
    if (!jobId.trim()) {
      setError("Please enter a Job ID");
      return;
    }
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch(`${API_BASE}/${tool}/results?jobId=${encodeURIComponent(jobId.trim())}`);
      const data = await res.json();
      if (data.status === "completed") setResults(data);
      else if (data.status === "running") setResults({ status: "running", message: "Job is still running..." });
      else setError(data.error || "No results found for this Job ID");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-[#223e36]" />
            Retrieve Results
          </CardTitle>
          <CardDescription>
            Retrieve analysis results using your Job ID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <p>Enter the Job ID you received after submitting an analysis job to retrieve the results.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="font-medium">Tool</Label>
              <Select value={tool} onValueChange={setTool}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rmleveldiff">RMlevelDiff</SelectItem>
                  <SelectItem value="rmplantvar">RMplantVar</SelectItem>
                  <SelectItem value="blast">BLAST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="font-medium">
                Job ID <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your Job ID..."
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  className="flex-1"
                />
                <Button
                  className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]"
                  onClick={handleRetrieve}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Retrieve
                </Button>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Results Display */}
          {results && (
            <div className="space-y-4">
              {results.status === "running" ? (
                <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {results.message}
                </div>
              ) : results.status === "completed" ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                    Job completed successfully!
                  </div>
                  {results.files && results.files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">Result Files:</h4>
                      {results.files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <span className="text-sm text-slate-600">{file.name}</span>
                          <a
                            href={file.url}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                            download
                          >
                            <ExternalLink className="h-3 w-3" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.data && (
                    <pre className="max-h-96 overflow-auto rounded-lg bg-slate-50 p-4 text-xs text-slate-700">
                      {JSON.stringify(results.data, null, 2)}
                    </pre>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default RetrieveResults;

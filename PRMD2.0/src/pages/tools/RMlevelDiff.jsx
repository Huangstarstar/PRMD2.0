import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Send, Info } from "lucide-react";

const API_BASE = "/api/tools/rmleveldiff";

function RMlevelDiff() {
  const [species, setSpecies] = useState("");
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [software, setSoftware] = useState("macs2");
  const [foldChange, setFoldChange] = useState("1.5");
  const [pvalue, setPvalue] = useState("0.005");
  const [sampleList, setSampleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState("");

  // Load sample list when species changes
  useEffect(() => {
    if (!species) return;
    setLoading(true);
    setGroupA([]);
    setGroupB([]);
    fetch(`${API_BASE}/samples?species=${species}`)
      .then((r) => r.json())
      .then((data) => setSampleList(data.samples || []))
      .catch(() => setError("Failed to load sample list"))
      .finally(() => setLoading(false));
  }, [species]);

  const moveToA = (item) => {
    setGroupA((prev) => [...prev, item]);
    setGroupB((prev) => prev.filter((i) => i !== item));
    setSampleList((prev) => prev.filter((i) => i !== item));
  };
  const moveToB = (item) => {
    setGroupB((prev) => [...prev, item]);
    setGroupA((prev) => prev.filter((i) => i !== item));
    setSampleList((prev) => prev.filter((i) => i !== item));
  };
  const removeFromA = (item) => {
    setGroupA((prev) => prev.filter((i) => i !== item));
    setSampleList((prev) => [...prev, item]);
  };
  const removeFromB = (item) => {
    setGroupB((prev) => prev.filter((i) => i !== item));
    setSampleList((prev) => [...prev, item]);
  };

  const handleSubmit = async () => {
    if (!species || groupA.length === 0 || groupB.length === 0) {
      setError("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ species, groupA, groupB, software, foldChange, pvalue }),
      });
      const data = await res.json();
      if (data.jobId) setJobId(data.jobId);
      else setError(data.error || "Submission failed");
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  if (jobId) {
    return (
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-green-100 p-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-xl font-semibold text-slate-900">Job Submitted Successfully!</div>
          <p className="text-sm text-slate-500">Job ID: <span className="font-mono font-bold text-[#223e36]">{jobId}</span></p>
          <p className="max-w-md text-sm text-slate-500">
            You can use this Job ID to retrieve your results later.
          </p>
          <Button className="rounded-xl bg-[#223e36]" onClick={() => setJobId(null)}>
            Submit Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            RMlevelDiff Module
            <a href="/help#RMlevelDiff" target="_blank" rel="noreferrer">
              <Info className="h-4 w-4 text-slate-400" />
            </a>
          </CardTitle>
          <CardDescription>
            RMlevelDiff for m6A level analysis and differential RNA modification analysis:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <ul className="list-inside list-disc space-y-1">
              <li>N6-methyladenosine RNA methylation modification level analysis</li>
              <li>The difference analysis of samples m6A level from the same species</li>
              <li>At least one sample for each group</li>
            </ul>
          </div>

          {/* Species Selection */}
          <div className="space-y-2">
            <Label className="font-medium">
              Species <span className="text-red-500">*</span>
            </Label>
            <Select value={species} onValueChange={setSpecies}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ath">Arabidopsis thaliana (ath)</SelectItem>
                <SelectItem value="bra">Brassica rapa (bra)</SelectItem>
                <SelectItem value="fve">Fragaria vesca (fve)</SelectItem>
                <SelectItem value="ghi">Gossypium hirsutum (ghi)</SelectItem>
                <SelectItem value="gma">Glycine max (gma)</SelectItem>
                <SelectItem value="mdo">Malus domestica (mdo)</SelectItem>
                <SelectItem value="nbe">Nicotiana benthamiana (nbe)</SelectItem>
                <SelectItem value="osa">Oryza sativa (osa)</SelectItem>
                <SelectItem value="pfo">Paulownia fortunei (pfo)</SelectItem>
                <SelectItem value="ptr">Populus trichocarpa (ptr)</SelectItem>
                <SelectItem value="sbi">Sorghum bicolor (sbi)</SelectItem>
                <SelectItem value="sly">Solanum lycopersicum (sly)</SelectItem>
                <SelectItem value="tae">Triticum aestivum (tae)</SelectItem>
                <SelectItem value="zma">Zea mays (zma)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sample Selection */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Available Samples */}
            <div className="space-y-2">
              <Label className="font-medium">Available Samples</Label>
              <div className="flex h-48 flex-col gap-1 overflow-y-auto rounded-lg border p-2">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                  </div>
                ) : sampleList.length === 0 ? (
                  <p className="py-4 text-center text-sm text-slate-400">Select a species first</p>
                ) : (
                  sampleList.map((s) => (
                    <div
                      key={s}
                      className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-slate-100"
                      onClick={() => moveToA(s)}
                    >
                      <span>{s}</span>
                      <span className="text-xs text-blue-500">→A</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Group A */}
            <div className="space-y-2">
              <Label className="font-medium">
                Group A <span className="text-red-500">*</span>
              </Label>
              <div className="flex h-48 flex-col gap-1 overflow-y-auto rounded-lg border bg-green-50 p-2">
                {groupA.length === 0 ? (
                  <p className="py-4 text-center text-sm text-slate-400">Click samples to add</p>
                ) : (
                  groupA.map((s) => (
                    <div
                      key={s}
                      className="flex cursor-pointer items-center justify-between rounded-md bg-white px-2 py-1 text-sm hover:bg-red-50"
                      onClick={() => removeFromA(s)}
                    >
                      <span>{s}</span>
                      <span className="text-xs text-red-500">✕</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Group B */}
            <div className="space-y-2">
              <Label className="font-medium">
                Group B <span className="text-red-500">*</span>
              </Label>
              <div className="flex h-48 flex-col gap-1 overflow-y-auto rounded-lg border bg-orange-50 p-2">
                {groupB.length === 0 ? (
                  <p className="py-4 text-center text-sm text-slate-400">Click from A to move</p>
                ) : (
                  groupB.map((s) => (
                    <div
                      key={s}
                      className="flex cursor-pointer items-center justify-between rounded-md bg-white px-2 py-1 text-sm hover:bg-red-50"
                      onClick={() => removeFromB(s)}
                    >
                      <span>{s}</span>
                      <span className="text-xs text-red-500">✕</span>
                    </div>
                  ))
                )}
              </div>
              <p className="text-xs text-slate-400">Click item in Group A to move to B, click in B to move back</p>
            </div>
          </div>

          {/* Software Selection */}
          <div className="space-y-2">
            <Label className="font-medium">
              Software <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={software} onValueChange={setSoftware} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="macs2" id="macs2" />
                <Label htmlFor="macs2">macs2</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="exomepeak2" id="exomepeak2" />
                <Label htmlFor="exomepeak2">exomepeak2</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Parameters */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium">
                Fold Change <span className="text-red-500">*</span>
              </Label>
              <Select value={foldChange} onValueChange={setFoldChange}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">1.2</SelectItem>
                  <SelectItem value="1.5">1.5</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">
                p-value <span className="text-red-500">*</span>
              </Label>
              <Select value={pvalue} onValueChange={setPvalue}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5</SelectItem>
                  <SelectItem value="0.1">0.1</SelectItem>
                  <SelectItem value="0.05">0.05</SelectItem>
                  <SelectItem value="0.01">0.01</SelectItem>
                  <SelectItem value="0.005">0.005</SelectItem>
                  <SelectItem value="0.001">0.001</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <Button
              className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Submit
            </Button>
            <Button variant="outline" className="rounded-xl">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RMlevelDiff;

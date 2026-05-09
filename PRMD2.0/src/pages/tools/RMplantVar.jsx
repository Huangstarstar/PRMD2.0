import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Info } from "lucide-react";

const API_BASE = "/api/tools/rmplantvar";

function RMplantVar() {
  const [species, setSpecies] = useState("");
  const [file, setFile] = useState(null);
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [software, setSoftware] = useState("macs2");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!species || !file) {
      setError("Please select species and upload a VCF file");
      return;
    }
    setSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("species", species);
    formData.append("uploadfile", file);
    formData.append("samples", JSON.stringify(selectedSamples));
    formData.append("software", software);
    formData.append("email", email);

    try {
      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        body: formData,
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
            <Upload className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-xl font-semibold text-slate-900">Job Submitted Successfully!</div>
          <p className="text-sm text-slate-500">Job ID: <span className="font-mono font-bold text-[#223e36]">{jobId}</span></p>
          <p className="max-w-md text-sm text-slate-500">
            You will receive an email notification when the job is completed.
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
            RMplantVar Module
            <a href="/help#RMplantVar" target="_blank" rel="noreferrer">
              <Info className="h-4 w-4 text-slate-400" />
            </a>
          </CardTitle>
          <CardDescription>
            RMplantVar to detect potential deleterious variants effects on RNA modification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <ul className="list-inside list-disc space-y-1">
              <li>Upload your variants sites</li>
              <li>Input files could be in VCF format</li>
              <li>To reduce the file size, we highly recommend that the file is further compressed in .zip or .gz format</li>
            </ul>
          </div>

          {/* Species Selection */}
          <div className="space-y-2">
            <Label className="font-medium">
              Reference genome version <span className="text-red-500">*</span>
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

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="font-medium">
              Variation input <span className="text-red-500">*</span>
            </Label>
            <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center">
              <Input
                type="file"
                accept=".vcf,.vcf.gz,.zip,.gz"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="mt-2 text-xs text-slate-500">
                Please upload VCF file (Files max size is 50MB)
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Example:{" "}
                <a href="/data/testdata/ath_test.vcf" className="text-blue-600 underline" download>
                  Arabidopsis thaliana test VCF
                </a>
              </p>
            </div>
          </div>

          {/* Software Selection */}
          <div className="space-y-2">
            <Label className="font-medium">
              Software <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                <input
                  type="radio"
                  name="rmvar_software"
                  value="macs2"
                  checked={software === "macs2"}
                  onChange={() => setSoftware("macs2")}
                  className="h-4 w-4 accent-[#223e36]"
                />
                macs2
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                <input
                  type="radio"
                  name="rmvar_software"
                  value="exomepeak2"
                  checked={software === "exomepeak2"}
                  onChange={() => setSoftware("exomepeak2")}
                  className="h-4 w-4 accent-[#223e36]"
                />
                exomepeak2
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="font-medium">Email</Label>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-xs"
            />
            <p className="text-xs text-slate-400">
              You can get a notification when the job is completed (optional)
            </p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <Button
              className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
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

export default RMplantVar;

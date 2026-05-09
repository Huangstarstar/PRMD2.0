import React, { useState, useEffect } from "react";
import { Download, FileDown, Database, ExternalLink, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "../components/common/SectionHeader";

// Mock download data based on the original PHP reference
const mockDownloadData = [
  { Species: "A. thaliana", Methylation_type: "m6A", Genome_version: "TAIR10", Size: "12.3 MB", Sites_Annotation_Download: "ath_m6A_annotation.txt" },
  { Species: "A. thaliana", Methylation_type: "m5C", Genome_version: "TAIR10", Size: "8.1 MB", Sites_Annotation_Download: "ath_m5C_annotation.txt" },
  { Species: "A. thaliana", Methylation_type: "Ψ", Genome_version: "TAIR10", Size: "5.6 MB", Sites_Annotation_Download: "ath_psi_annotation.txt" },
  { Species: "O. sativa", Methylation_type: "m6A", Genome_version: "IRGSP-1.0", Size: "15.7 MB", Sites_Annotation_Download: "osa_m6A_annotation.txt" },
  { Species: "O. sativa", Methylation_type: "m5C", Genome_version: "IRGSP-1.0", Size: "9.3 MB", Sites_Annotation_Download: "osa_m5C_annotation.txt" },
  { Species: "O. sativa", Methylation_type: "Nm", Genome_version: "IRGSP-1.0", Size: "6.2 MB", Sites_Annotation_Download: "osa_Nm_annotation.txt" },
  { Species: "Z. mays", Methylation_type: "m6A", Genome_version: "AGPv4", Size: "18.4 MB", Sites_Annotation_Download: "zma_m6A_annotation.txt" },
  { Species: "Z. mays", Methylation_type: "m5C", Genome_version: "AGPv4", Size: "10.8 MB", Sites_Annotation_Download: "zma_m5C_annotation.txt" },
  { Species: "T. aestivum", Methylation_type: "m6A", Genome_version: "IWGSC", Size: "22.1 MB", Sites_Annotation_Download: "tae_m6A_annotation.txt" },
  { Species: "G. max", Methylation_type: "m6A", Genome_version: "Wm82.a2.v1", Size: "14.5 MB", Sites_Annotation_Download: "gma_m6A_annotation.txt" },
  { Species: "S. lycopersicum", Methylation_type: "m6A", Genome_version: "SL4.0", Size: "11.2 MB", Sites_Annotation_Download: "sly_m6A_annotation.txt" },
  { Species: "B. rapa", Methylation_type: "m6A", Genome_version: "Bravo_1.0", Size: "9.8 MB", Sites_Annotation_Download: "bra_m6A_annotation.txt" },
  { Species: "P. trichocarpa", Methylation_type: "m6A", Genome_version: "Ptrichocarpa_v3.0", Size: "13.6 MB", Sites_Annotation_Download: "ptr_m6A_annotation.txt" },
  { Species: "F. vesca", Methylation_type: "m6A", Genome_version: "Fvb1", Size: "7.9 MB", Sites_Annotation_Download: "fve_m6A_annotation.txt" },
  { Species: "M. domestica", Methylation_type: "m6A", Genome_version: "GDDH13", Size: "10.4 MB", Sites_Annotation_Download: "mdo_m6A_annotation.txt" },
  { Species: "S. bicolor", Methylation_type: "m6A", Genome_version: "Sorghum_v3.1.1", Size: "12.7 MB", Sites_Annotation_Download: "sbi_m6A_annotation.txt" },
  { Species: "P. patens", Methylation_type: "m6A", Genome_version: "Phypa_V3", Size: "6.5 MB", Sites_Annotation_Download: "ppa_m6A_annotation.txt" },
  { Species: "P. fortunei", Methylation_type: "m6A", Genome_version: "Pfortunei_1.0", Size: "5.8 MB", Sites_Annotation_Download: "pfo_m6A_annotation.txt" },
  { Species: "N. benthamiana", Methylation_type: "m6A", Genome_version: "Nbenthamiana_1.0.1", Size: "8.3 MB", Sites_Annotation_Download: "nbe_m6A_annotation.txt" },
  { Species: "P. vulgaris", Methylation_type: "m6A", Genome_version: "Pvulgaris_442_v2.1", Size: "7.1 MB", Sites_Annotation_Download: "pvu_m6A_annotation.txt" },
  { Species: "A. tauschii", Methylation_type: "m6A", Genome_version: "Aet_v4.0", Size: "9.5 MB", Sites_Annotation_Download: "ata_m6A_annotation.txt" },
  { Species: "T. dicoccoides", Methylation_type: "m6A", Genome_version: "WEW_v2.0", Size: "8.9 MB", Sites_Annotation_Download: "tdi_m6A_annotation.txt" },
  { Species: "G. arboreum", Methylation_type: "m6A", Genome_version: "Garboreum_v1.0", Size: "7.6 MB", Sites_Annotation_Download: "gar_m6A_annotation.txt" },
  { Species: "G. hirsutum", Methylation_type: "m6A", Genome_version: "Ghir_UTX_v2.1", Size: "11.3 MB", Sites_Annotation_Download: "ghi_m6A_annotation.txt" },
];

function DownloadPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Get unique species and types for filter dropdowns
  const speciesList = [...new Set(mockDownloadData.map((d) => d.Species))];
  const typeList = [...new Set(mockDownloadData.map((d) => d.Methylation_type))];

  const filteredData = mockDownloadData.filter((item) => {
    const matchSearch =
      !searchTerm ||
      item.Species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Methylation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Genome_version.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecies = !speciesFilter || item.Species === speciesFilter;
    const matchType = !typeFilter || item.Methylation_type === typeFilter;
    return matchSearch && matchSpecies && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-[#dce9e3] to-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#223e36]">
            <Download className="h-7 w-7 text-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-900">Download</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              If you make use of the data and web-server presented here, please{" "}
              <strong className="text-red-600">
                cite our PRMD paper{" "}
                <a
                  href="https://academic.oup.com/nar/article/52/D1/D1597/7311088#420764627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  (2023)
                </a>
              </strong>{" "}
              in addition to the primary data sources. The PRMD data files can be freely downloaded and used in
              accordance with the GNU Public License and the license of primary data sources.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Database className="h-5 w-5 text-[#223e36]" />
            Download the data in PRMD
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search species, modification type, genome..."
                className="rounded-2xl pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#223e36]"
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
            >
              <option value="">All Species</option>
              {speciesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#223e36]"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {typeList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-5 py-4 font-semibold text-slate-700">Species</th>
                  <th className="px-5 py-4 font-semibold text-slate-700">Methylation type</th>
                  <th className="px-5 py-4 font-semibold text-slate-700">Genome version</th>
                  <th className="px-5 py-4 font-semibold text-slate-700">Download link</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-500">
                      No data record
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <tr key={idx} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <span className="font-medium text-slate-800">{item.Species}</span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          variant="outline"
                          className="rounded-full border-[#223e36] text-[#223e36]"
                        >
                          {item.Methylation_type}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{item.Genome_version}</td>
                      <td className="px-5 py-4">
                        <a
                          href={`./data/download/${item.Sites_Annotation_Download}`}
                          download={item.Sites_Annotation_Download}
                          className="inline-flex items-center gap-2 rounded-2xl bg-[#223e36] px-4 py-2 text-sm text-white transition hover:bg-[#1b312b]"
                        >
                          <FileDown className="h-4 w-4" />
                          Download ({item.Size})
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-400">
            Showing {filteredData.length} of {mockDownloadData.length} records
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DownloadPage;

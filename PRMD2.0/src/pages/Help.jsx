import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, ExternalLink, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Table of contents data
const tocItems = [
  { id: "Overview", label: "Overview of PRMD" },
  { id: "data_preprocess", label: "Data analysis processing", children: [
    { id: "call_peak", label: "Data preprocessing and peak calling" },
    { id: "RNAmod", label: "Annotation of RNA modification" },
  ]},
  { id: "Quickly", label: "Quickly start PRMD", children: [
    { id: "annotation", label: "Explain the annotation results", children: [
      { id: "predicted_m6A", label: "The difference between m6A and predicted m6A" },
    ]},
  ]},
  { id: "Web-based", label: "Web-based analysis tools developed in PRMD", children: [
    { id: "RMlevelDiff", label: "RMlevelDiff for m6A level analysis and differential rna modification analysis" },
    { id: "RMplantVar", label: "RMplantVar to detect potential deleterious variants effects on RNA modification" },
    { id: "RNAmodNet", label: "RNAmodNet for gene-co-modification network analysis" },
    { id: "Blast", label: "Blast for identifying potential RNA modification enzymes" },
    { id: "GeneEditor", label: "GeneEditor for gene editing analysis" },
  ]},
  { id: "Visualization", label: "Visualization tools developed in PRMD", children: [
    { id: "mRNAbrowse", label: "mRNAbrowse for RNA modification visualization" },
    { id: "RNAlollipop", label: "RNAlollipop for lollipop view of modification on RNA" },
    { id: "Jbrowse", label: "Jbrowse showed the tracks of m6A RNA modifications and other related annotations" },
    { id: "IGV", label: "IGV view of modification sites and peaks" },
  ]},
  { id: "Download", label: "Download of PRMD" },
  { id: "Browser", label: "Browser compatibility" },
];

// Help content sections
const helpSections = [
  {
    id: "Overview",
    title: "Overview of PRMD",
    content: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            The scheme of PRMD workflow: PRMD provides comprehensive information on RNA modifications. For m<sup>6</sup>A, 693 MeRIP-seq samples were carefully collected from the SRA and GSA databases for the following 19 plant species: Ae. tauschii (6), A. thaliana (259), B. rapa (24), F. vesca (18), G. max (24), G. arboreum (6), G. hirsutum (18), M. domestica (32), N. benthamiana (18), O. sativa (88), P. fortunei (8), P. patens (6), P. trichocarpa (26), P. vulgaris (6), S. bicolor (22), S. lycopersicum (38), T. aestivum (22), T. dicoccoides (6) and Z. mays (66). In addition, 12 MeRIP-seq samples were generated in this study for O. rufipogon (DXW81), O. sativa ssp. indica (WSSM) and O. sativa ssp. japonica (ZH11). The overall statistical analysis of all datasets indicated the m6A methylation ratios were negatively correlated with the genome size and the number of genes in these plant species.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Moreover, PRMD integrated datasets of other types of RNA modifications, such as m<sup>1</sup>A, m<sup>5</sup>C, m<sup>7</sup>G, ac<sup>4</sup>C, 2′-O-Me and pseudouridine, as well as additional related datasets, including those for eQTLs, SNVs, GWAS sites, rG4 structures, sORFs, RBP binding sites, RNA loops, RNA secondary structures, conservations and APA site information. All datasets were processed through our uniform pipelines. The information was deposited in a MySQL database and displayed in convenient web modules in PRMD. Furthermore, we designed PRMD to enable users to easily visualize and analyze the data in the database.
          </p>
        </div>
        <div className="flex justify-center rounded-2xl bg-slate-50 p-6">
          <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">
            [PRMD Workflow Overview Figure]
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "data_preprocess",
    title: "Data analysis processing",
    content: null,
  },
  {
    id: "call_peak",
    title: "Data preprocessing and peak calling",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          The MeRIP-seq datasets in the SRA format were converted to the FASTQ format using sratoolkit and then the default parameters of fastp were used to trim the adapter sequences and low-quality bases. After filtering the data for quality, STAR was used to map clean reads to the corresponding reference genomes to generate BAM format results. And then using the BAM format genome mapping files of the IP and the input samples, we applied two peak calling strategies. The following parameters of MACS2 were used to identify methylation peaks: --nomodel --extsize 150 -B -n -q 0.05. The R package exomePeak2 was used for peak calling, which involved the same BAM files and GTF files. The parameters were set as follows: fragment_length = 100 binding_length = 25 step_length = 25 pc_count_cutoff = 5 bg_count_cutoff = 50 p_cutoff = 1e-05 peak_calling_mode = exon.
        </p>
      </div>
    ),
  },
  {
    id: "RNAmod",
    title: "Annotation of RNA modification",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          RNAmod (https://bioinformatics.sc.cn/RNAmod), which is an interactive and freely available platform for the annotation and visualization of RNA modifications, was used to annotate the RNA modifications in PRMD. First, RNAmod extracted gene features, such as promoter regions, 5′ and 3′ untranslated regions (UTRs), start codon regions, coding sequence (CDS) regions and stop codon regions, from different annotated reference genomes and then examined gene characteristics, including the GC content, length and minimum free energy. Second, RNAmod mapped all modification sites to different RNA features and calculated coverage values and analyzed metagenes and other annotations. The modified genes were functionally characterized on the basis of Gene Ontology (GO) and KEGG pathways using the clusterProfiler package and according to Reactome pathways using ReactomePA packages.
        </p>
      </div>
    ),
  },
  {
    id: "Quickly",
    title: "Quickly start PRMD",
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">
              The "Search" module in PRMD allows users to quickly obtain comprehensive information by submitting gene IDs, transcript IDs, gene symbols, sample IDs, study IDs, or PubMed IDs. We also added a quick-search function that supports one query on the PRMD homepage.
            </p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Quick Start Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">
              If you have an interesting gene/transcript, you also can search for it in the 'Search' module.
            </p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Search Module Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">
              The results of the "Search" module revealed that the two transcripts derived from this gene differ in terms of two RNA modifications (m<sup>6</sup>A and m<sup>5</sup>C) in PRMD.
            </p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Search Results Figure]</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "annotation",
    title: "Explain the annotation results",
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Modification sites distribution on different gene features, including Promoter, 5'UTR (UTR5), CDS, 3'UTR (UTR3), Start codon, Stop codon, Intron and Intergenic region. Y-axis denotes the frequency of sites (number of sites) while x-axis represents different gene features. The numbers on the bar indicates the frequency of sites distributed on according gene feature. The plot can be showed in three different forms: 'Plain', 'Inverted' and 'Poplar' and the plot can be exported in png, jpeg, pdf and svg formats. It is noted that the stop codon is overlapped with 3'UTR and CDS.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Modification sites distribution on different gene biotypes, such as protein coding gene, lncRNA, pseudogenes, rRNA, and miRNA. Y-axis indicates the frequency of sites (number of sites) while x-axis represents different gene biotypes.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Coverage plot for modification sites overlapping with different mRNA features. After excluding the features shorter than specific length, each gene feature is divided into bins (100 bins by default) in equal size.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Coverage plot for modification sites around transcription start sites and translation end sites. The number of sites for each location is counted around the flank regions (upstream and downstream, 1000 bp flank size in default).
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Coverage plot for modification sites around translation start sites (TSS) and translation end sites (TES).
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Coverage plot for modification sites around 5' splice sites and 3' splice sites.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            mRNA characteristics statistics between genes with modifications and other background genes. Y-axis in three plots (from left to right) represents length, GC content and minimum free energy (MFE), respectively.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            mRNA metagene plot. After excluding the gene with any of the mRNA features (5'UTR, CDS and 3'UTR) shorter than specific length, each mRNA feature was divided into bins with equal size (100 bins by default).
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Enriched motifs detect by Homer for the modification sites. The seqLogo plots for enriched motifs (top 5 as default) are showed.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Heatmap of modification sites around transcription start sites and transcription end sites (genomic regions).
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Heatmap of modification sites among translation start sites and translation end sites (transcriptic regions).
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Gene Ontology (GO) functional enrichment for genes with modifications. Top 12 enriched terms are show in the bar plots.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Functional pathway enrichments for genes with modifications, which include KEGG for all 20 species.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            The detail list of genes containing modification sites. The gene information include transcript ID, gene symbol and gene biotype (gene_type).
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Detail annotation list of sites. The gene information for the peak include transcript ID, gene symbol, gene biotype (gene type) and location on according gene.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "predicted_m6A",
    title: "The difference between m6A and predicted m6A",
    content: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            The m<sup>6</sup>A peak sites were identified by our own uniform pipeline based on the MeRIP-seq datasets, while all the potential m<sup>6</sup>A sites were predicted by the m<sup>6</sup>A prediction software. SRAMP requires nucleotide sequence only for running a prediction. There are two prediction modes available:
          </p>
        </div>
        <div className="ml-9 space-y-2">
          <p className="text-sm leading-7 text-slate-600">
            <strong>Full transcript mode:</strong> This mode is recommended when running predictions on both coding and non-coding RNAs, due to its superior accuracy. Note that in this mode, genomic sequence of the full transcript (with introns) rather than mature mRNA/cDNA sequences should be used.
          </p>
          <p className="text-sm leading-7 text-slate-600">
            <strong>Mature mRNA mode:</strong> This prediction mode is an alternative solution for users who do not have genomic sequences at hand, and its performance is still competitive. This model works on mature mRNA (cDNA) sequences and CANNOT predict m<sup>6</sup>A sites in introns.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            The thresholds for very high/high/moderate/low confidence m<sup>6</sup>A sites correspond to the thresholds achieved 99%/95%/90%/85% specificities (in other words, had 5%/10%/15% false positive rate) on cross-validation tests, respectively. These predicted m<sup>6</sup>A sites were as a supplementary data set in the PRMD database.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "Web-based",
    title: "Web-based analysis tools developed in PRMD",
    content: null,
  },
  {
    id: "RMlevelDiff",
    title: "RMlevelDiff for m6A level analysis and differential rna modification analysis",
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">Choose reference genome from supported plant species, and select samples for different groups.</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[RMlevelDiff Sample Selection Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">After job is submitted, the web server will give the user a Job ID, and display the running progressing.</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Job Progress Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">Retrieving results: tools for retrieving the analysis results of RMlevelDiff</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Retrieve Results Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">The page while redirect to the result page when the job completed. In volcano plot, each point represents a site, red represents up-regulated peak and green represents down-regulated peak according to cutoff giving by users.</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Result Page Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">The detail list of m<sup>6</sup>A modification sites in selected samples.</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">The detail list of mean and foldchange of the two groups in selected samples.</p>
        </div>
      </div>
    ),
  },
  {
    id: "RMplantVar",
    title: "RMplantVar to detect potential deleterious variants effects on RNA modification",
    content: (
      <div className="space-y-6">
        <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-7 text-slate-600">
          <p className="font-semibold text-amber-800">VCF lines have four required fields:</p>
          <ul className="mt-2 space-y-2">
            <li><strong>CHROM</strong> - chromosome: An identifier from the reference genome.</li>
            <li><strong>POS</strong> - position: The reference position, with the 1st base having position 1.</li>
            <li><strong>REF</strong> - reference base(s): Each base must be one of A,C,G,T,N (case insensitive).</li>
            <li><strong>ALT</strong> - alternate base(s): Comma separated list of alternate non-reference alleles.</li>
          </ul>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">Choose reference genome from supported plant species, upload variation file and select samples.</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Parameter Selection Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">After job is submitted, the web server will give the user a Job ID, which can be used to retrieve the results.</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">Query the job status and retrieve the results by input your job ID which is a 16 characters string.</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">Query the job status. There are four major steps in the data analysis process: RPF mapping, RPF profiling and job completed. The page refreshes every 30 seconds and will redirect to the result page when the job status is "job completed".</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">The percentage of whether the score gained, lost, or equal after alter.</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">The list of whether the score gained, lost, or equal after alter.</p>
        </div>
      </div>
    ),
  },
  {
    id: "RNAmodNet",
    title: "RNAmodNet for gene-co-modification network analysis",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <div>
          <p className="text-sm leading-7 text-slate-600">Choose species from supported plant species for network visualization.</p>
          <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
            <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Network Viewer Figure]</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "Blast",
    title: "Blast for identifying potential RNA modification enzymes",
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">Use blast to search RNA modification enzymes.</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Blast Figure]</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
            <span className="text-xs text-white">✓</span>
          </div>
          <div>
            <p className="text-sm leading-7 text-slate-600">Parameters for blast analysis.</p>
            <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[Blast Parameters Figure]</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "GeneEditor",
    title: "GeneEditor for gene editing analysis",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          GeneEditor is a tool for gene editing analysis. Content coming soon.
        </p>
      </div>
    ),
  },
  {
    id: "Visualization",
    title: "Visualization tools developed in PRMD",
    content: null,
  },
  {
    id: "mRNAbrowse",
    title: "mRNAbrowse for RNA modification visualization",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <div>
          <p className="text-sm leading-7 text-slate-600">
            mRNAbrowse was designed for the intuitive visualization of RNA modifications and related datasets (transcript scale), including modification sites determined by nanopore sequencing and miCLIP-seq, sequence conservation, GWAS sites, miRNA target sites, APA sites, RBP binding sites, RNA secondary structures, rG4 structures, R-loop elements, sORFs and other types of modifications. In mRNAbrowse, users can zoom in and out using buttons in the upper right corner to visualize the modification site sequence context.
          </p>
          <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
            <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[mRNAbrowse Figure]</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "RNAlollipop",
    title: "RNAlollipop for lollipop view of modification on RNA",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <div>
          <p className="text-sm leading-7 text-slate-600">
            RNAlollipop was designed to establish lollipop views of the modifications and other datasets in PRMD. For each dataset type, all of the datasets were merged to enable users to intuitively compare the RNA modifications with other elements at the same location from different sources. JBrowse was integrated to visualize the modification sites and other information (genome scale).
          </p>
          <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
            <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[RNAlollipop Figure]</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "Jbrowse",
    title: "Jbrowse showed the tracks of m6A RNA modifications and other related annotations",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <div>
          <p className="text-sm leading-7 text-slate-600">
            JBrowse is a fast, full-featured genome browser built with JavaScript and HTML5. It is easily embedded into websites and can be used to explore genomic datasets. In PRMD, JBrowse was integrated to visualize the modification sites and other information (genome scale).
          </p>
          <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
            <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[JBrowse Figure]</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "IGV",
    title: "IGV view of modification sites and peaks",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <div>
          <p className="text-sm leading-7 text-slate-600">
            The Integrative Genomics Viewer (IGV) is a high-performance visualization tool for interactive exploration of large, integrated genomic datasets. It supports a wide variety of data types, including array-based and next-generation sequencing data, and genomic annotations. In PRMD, we provide the download links of the BED files of modification sites and peaks for IGV visualization.
          </p>
          <div className="mt-3 flex justify-center rounded-2xl bg-slate-50 p-4">
            <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">[IGV Figure]</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "Download",
    title: "Download of PRMD",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          The PRMD data files can be freely downloaded and used in accordance with the GNU Public License and the license of primary data sources. If you make use of the data and web-server presented here, please cite our PRMD paper in addition to the primary data sources.
        </p>
      </div>
    ),
  },
  {
    id: "Browser",
    title: "Browser compatibility",
    content: (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#223e36]">
          <span className="text-xs text-white">✓</span>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          PRMD is compatible with the following browsers: Google Chrome (version 60+), Mozilla Firefox (version 60+), Apple Safari (version 12+), Microsoft Edge (version 80+). For the best experience, we recommend using the latest version of Google Chrome.
        </p>
      </div>
    ),
  },
];

function Help() {
  const [activeSection, setActiveSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setActiveSection(id);
  };

  const scrollToSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: true }));
    setActiveSection(id);
    setTimeout(() => {
      const el = document.getElementById(`section-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Render TOC recursively
  const renderTOC = (items, depth = 0) => (
    <ul className={`space-y-1 ${depth > 0 ? "ml-4 mt-1" : ""}`}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => scrollToSection(item.id)}
            className={`w-full text-left text-sm transition hover:text-[#223e36] ${
              activeSection === item.id ? "font-semibold text-[#223e36]" : "text-slate-600"
            } ${depth === 0 ? "font-medium" : ""}`}
          >
            {item.label}
          </button>
          {item.children && renderTOC(item.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

  // Get section title from tocItems
  const getSectionTitle = (id) => {
    const findTitle = (items) => {
      for (const item of items) {
        if (item.id === id) return item.label;
        if (item.children) {
          const found = findTitle(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findTitle(tocItems);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-[#dce9e3] to-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#223e36]">
            <HelpCircle className="h-7 w-7 text-white" />
          </div>
          <div className="space-y-3 flex-1">
            <h2 className="text-3xl font-bold text-slate-900">Help</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              Documentation and user guide for PRMD database. Browse the sections below to learn how to use PRMD effectively.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar - Table of Contents */}
        <aside className="lg:w-72 shrink-0">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Table of Contents
            </h3>
            {renderTOC(tocItems)}
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 space-y-4">
          {helpSections.map((section) => {
            const sectionTitle = getSectionTitle(section.id);
            const isExpanded = expandedSections[section.id] ?? (section.id === "Overview");
            const isParent = section.content === null;

            return (
              <Card
                key={section.id}
                id={`section-${section.id}`}
                className={`rounded-3xl border-0 shadow-sm overflow-hidden transition-all ${
                  activeSection === section.id ? "ring-2 ring-[#223e36]/20" : ""
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between p-5 text-left hover:bg-slate-50"
                >
                  <CardTitle
                    className={`text-base ${
                      isParent
                        ? "font-bold text-[#223e36]"
                        : "font-semibold text-slate-800"
                    }`}
                  >
                    {section.title}
                  </CardTitle>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <CardContent className="px-5 pb-5 pt-0">
                    {isParent ? (
                      <p className="text-sm leading-7 text-slate-500 italic">
                        This section contains sub-topics. Please expand the relevant sub-section below for details.
                      </p>
                    ) : (
                      section.content
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default Help;


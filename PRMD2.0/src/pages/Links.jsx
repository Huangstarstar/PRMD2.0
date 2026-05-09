import React, { useState } from "react";
import { ExternalLink, Wrench, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "../components/common/SectionHeader";

// Data organized by categories from the original PHP reference
const linkCategories = [
  {
    title: "Tools for calling RNA modifications from meRIP-seq",
    badge: null,
    items: [
      { name: "MACS2", url: "https://pypi.org/project/MACS2/", desc: "MACS was originally designed to give robust and high resolution peak identification for ChIP-Seq data. It can also be used to identify peak for MeRIP-Seq data.", badgeType: "default" },
      { name: "exomePeak2", url: "https://bioconductor.org/packages/devel/bioc/html/exomePeak2.html", desc: "ExomePeak2 provides peak detection and differential methylation for Methylated RNA Immunoprecipitation Sequencing (MeRIP-Seq) data.", badgeType: "default" },
      { name: "MeRIPtools", url: "https://github.com/scottzijiezhang/MeRIPtools", desc: "MeRIPtools is a comprehensive tool to process and analyze aligned sequencing data. MeRIPtools also provide a framework to manage data associated with peak-calling, differential methylation analysis in R.", badgeType: "default" },
      { name: "MeTPeak", url: "https://github.com/compgenomics/MeTPeak", desc: "MeTPeak is a graphical model-based peak calling method for transcriptome-wide detection of m6A sites from MeRIP-seq data.", badgeType: "default" },
      { name: "BayesPeak", url: "http://bioconductor.org/packages/3.8/bioc/html/BayesPeak.html", desc: "BayesPeak is a Bioconductor package for the analysis of data sets from ChIP-seq experiments, particularly for identifying the genomic sites of protein–DNA interactions.", badgeType: "default" },
      { name: "m6aViewer", url: "http://dna2.leeds.ac.uk/m6a", desc: "m6aViewer is a cross-platform application for analysis and visualization of m6A peaks from sequencing data.", badgeType: "default" },
      { name: "PEA", url: "https://hub.docker.com/r/malab/pea", desc: "PEA is an integrated R toolkit to facilitate the analysis of plant epitranscriptome data.", badgeType: "default" },
      { name: "DeepEA", url: "https://github.com/cma2015/DeepEA", desc: "deepEA is a convenient, freely available, web-based platform that is capable to support deep analysis of epitranscriptome sequencing data.", badgeType: "default" },
    ],
  },
  {
    title: "RNA modification predictors",
    badge: {
      text: 'Diverse modifications',
      infoClass: 'badge-info',
      specificText: 'Specific modification',
      successClass: 'badge-success',
    },
    items: [
      { name: "RNAMethPre", url: "http://bioinfo.tsinghua.edu.cn/RNAMethPre/index.html", desc: "The RNAMethPre web server provides a user-friendly tool for the prediction and query of mRNA m6A sites.", badgeType: "success" },
      { name: "HAMR", url: "https://www.lisanwanglab.org/hamr", desc: "HAMR (High-throughput Annotation of Modified Ribonucleotides) is a web application that can not only locate these modifications transcriptome-wide with single nucleotide resolution in RNA-seq data, but can also differentiate between different classes of modifications.", badgeType: "info" },
      { name: "RNAm5Cfinder", url: "http://www.rnanut.net/rnam5cfinder", desc: "RNAm5Cfinder is a web-server that is based on RNA sequence features and machine learning method to predict RNA m5C sites in eight tissue/cell types from mouse and human.", badgeType: "success" },
      { name: "WHISTLE", url: "http://180.208.58.19/whistle/index.html", desc: "WHISTLE is a prediction framework for transcriptome-wide m6A RNA-methylation site prediction.", badgeType: "success" },
      { name: "DeepM6ASeq", url: "https://github.com/rreybeyb/DeepM6ASeq", desc: "DeepM6ASeq is a deep-learning-based framework to predict m6A-containing sequences and visualize saliency map for sequences.", badgeType: "success" },
      { name: "BERMP", url: "http://www.bioinfogo.org/bermp", desc: "BERMP is a web server that could predict multi-species m6A sites from nucleotide sequences.", badgeType: "success" },
      { name: "SRAMP", url: "http://www.cuilab.cn/sramp", desc: "SRAMP is a mammalian m6A sites predictor which can extract and integrate the sequence and predicted structural features around m6A sites under a machine learning framework.", badgeType: "success" },
      { name: "RFAthM6A", url: "https://github.com/nongdaxiaofeng/RFAthM6A", desc: "RFAthM6A is tool for predicting m6A sites in Arabidopsis thaliana based on manually curated a reliable dataset of m6A sites and non-m6A sites.", badgeType: "success" },
      { name: "iRNA-Methyl", url: "http://lin-group.cn/server/iRNA-Methyl", desc: "iRNA-Methyl is a web server for identifying N6-methyladenosine sites using pseudo nucleotide composition.", badgeType: "success" },
      { name: "iRNA-2methyl", url: "http://www.jci-bioinfo.cn/iRNA-2methyl", desc: "iRNA-2methyl is a web server for identifying RNA 2'-O-methylation Sites by Incorporating Sequence-Coupled Effects into General PseKNC and Ensemble Classifier.", badgeType: "success" },
      { name: "PseUI", url: "http://zhulab.ahu.edu.cn/PseUI", desc: "PseUI was developed by using support vector machine based on three different kinds of features including position specific nucleotide propensity, nucleotide composition, and Pseudo nucleotide composition.", badgeType: "success" },
      { name: "RAM-NPPS", url: "http://server.malab.cn/RAM-NPPS/index.jsp", desc: "RAM-NPPS is a sequence predictor for identifying N6-methyladenosine sites using multi-interval nucleotide pair position specificity and support vector machine.", badgeType: "success" },
      { name: "MethyRNA", url: "http://lin-group.cn/server/MethyRNA", desc: "MethyRNA is a sequence-based tool for the identification of N6-methyladenosine sites", badgeType: "success" },
      { name: "HMpre", url: "https://github.com/Zhixun-Zhao/HMpre", desc: "HMpre is a mRNA N6-Methylation predictor for human, which exhibits good performance and robustness.", badgeType: "success" },
      { name: "PEA-m5C", url: "https://github.com/cma2015/PEA-m5C", desc: "PEA-m5C is a machine learning-based m5C predictor trained with features extracted from the flanking sequence of m5C modifications.", badgeType: "success" },
      { name: "M5C-HPCR", url: "http://cslab.just.edu.cn:8080/M5C-HPCR", desc: "M5C-HPCR is a m5C site predictor by introducing a novel heuristic nucleotide physicochemical property reduction (HPCR) algorithm and classifier ensemble.", badgeType: "success" },
      { name: "AthMethPre", url: "http://bioinfo.tsinghua.edu.cn/AthMethPre/index.html", desc: "AthMethPre is a web server for the prediction and query of mRNA m6A sites in Arabidopsis thaliana.", badgeType: "success" },
      { name: "M6APred-EL", url: "http://server.malab.cn/M6APred-EL", desc: "M6APred-EL is a Sequence-Based Predictor for Identifying N6-methyladenosine Sites Using Ensemble Learning.", badgeType: "success" },
      { name: "m6ASNP", url: "http://m6asnp.renlab.org", desc: "m6ASNP is a user-friendly web server that is dedicated to the identification of genetic variants that target m6A modification sites.", badgeType: "success" },
      { name: "pRNAm-PC", url: "http://www.jci-bioinfo.cn/pRNAm-PC", desc: "pRNAm-PC is a tool for predicting N(6)-methyladenosine sites in RNA sequences via physical-chemical properties.", badgeType: "success" },
      { name: "PPUS", url: "http://lyh.pkmu.cn/ppus", desc: "PPUS is a web server to predict PUS-specific pseudouridine sites.", badgeType: "success" },
      { name: "m6Acomet", url: "http://180.208.58.19/m6Acomet", desc: "Large-scale functional prediction of individual m6A RNA methylation sites from an RNA co-methylation network.", badgeType: "success" },
      { name: "M6AMRFS", url: "http://server.malab.cn/M6AMRFS", desc: "M6AMRFS is a new machine learning based predictor for the identification of m6A sites.", badgeType: "success" },
      { name: "iRNAm5C-PseDNC", url: "http://www.jci-bioinfo.cn/iRNAm5C-PseDNC", desc: "Identifying RNA 5-methylcytosine sites by incorporating physical-chemical properties into pseudo dinucleotide composition.", badgeType: "success" },
      { name: "m6A-NeuralTool", url: "http://nsclbio.jbnu.ac.kr/tools/m6A-NeuralTool", desc: "The m6A-NeuralTool makes the final prediction for the identification of m6A sites by applying majority voting on three different sub-architectures.", badgeType: "success" },
      { name: "ELIGOS", url: "https://gitlab.com/piroonj/eligos2", desc: "The software was applied to the synthetic modified IVT RNA, rRNA, and mRNA sequences obtained with the materials described in the next section.", badgeType: "info" },
      { name: "iRNA-methyl", url: "http://lin-group.cn/server/iRNAMethyl/", desc: "The web-server iRNA-methyl was developed to identify the N6-methyladenosine (m6A).", badgeType: "info" },
      { name: "iRNA(m6A)-PseDNC", url: "http://lin-group.cn/server/iRNA(m6A)-PseDNC.php", desc: "The web-server was an updated version of iRNA-Methyl, which was developed to identify the N6-methyladenosine (m6A) in the Saccharomyces cerevisiae genome.", badgeType: "info" },
    ],
  },
  {
    title: "RNA modification database",
    badge: {
      text: 'Diverse modifications',
      infoClass: 'badge-info',
      specificText: 'Specific modification',
      successClass: 'badge-success',
    },
    items: [
      { name: "Modomics", url: "http://modomics.genesilico.pl", desc: "MODOMICS is a database of RNA modifications that provides comprehensive information concerning the chemical structures of modified ribonucleosides.", badgeType: "info" },
      { name: "RMBase v2.0", url: "http://rna.sysu.edu.cn/rmbase", desc: "RMBase v2.0 is a comprehensive database to integrate epitranscriptome sequencing data for exploring post-transcriptionally modifications of RNAs.", badgeType: "info" },
      { name: "RNAMDB", url: "https://mods.rna.albany.edu", desc: "RNAMDB has served as a focal point for information pertaining to naturally occurring RNA modifications.", badgeType: "info" },
      { name: "MeT-DB", url: "http://180.208.58.19/metdb_v2/html/index.php", desc: "MeT-DB was the first comprehensive database focusing on N6-methyladenosine (m6A) methyltranscriptome.", badgeType: "success" },
      { name: "m6aVar", url: "http://m6avar.renlab.org", desc: "m6AVar is a comprehensive database of m6A-associated variants that potentially influence m6A modification.", badgeType: "success" },
      { name: "RMVar", url: "https://rmvar.renlab.org", desc: "RMVar is the updated version of m6AVar renamed RMVar, which contains 1,678,126 RM-associated variants for 9 kinds of RNA modifications.", badgeType: "success" },
      { name: "m6A2Target", url: "http://m6a2target.canceromics.org", desc: "m6A2Target is a comprehensive database for the target gene of writers, erasers and readers (WERs) of m6A modification.", badgeType: "success" },
      { name: "REPIC", url: "https://repicmod.uchicago.edu/repic/", desc: "REPIC (RNA Epitranscriptome Collection) is a database dedicated to provide a new resource to investigate potential functions and mechanisms of N6-adenosine methylation (m6A) modifications.", badgeType: "success" },
      { name: "M6ADD", url: "http://m6add.edbc.org", desc: "m6ADD is a database containing manually collected experimentally confirmed m6A-disease data.", badgeType: "success" },
      { name: "m6A-Atlas v2.0", url: "http://rnamd.org/m6a/index.php", desc: "m6A-Atlas v2.0 was expanded to include 797,091 reliable m6A sites among, with 13 high-resolution technologies and 109 conditions.", badgeType: "success" },
      { name: "ENCORE", url: "https://rna.sysu.edu.cn/encore/", desc: "ENCORE (The Encyclopedia of RNA Epitranscriptome) is an upgraded version of RMBase that mainly focuses on the mechanism and function of diverse RNA modifications.", badgeType: "success" },
      { name: "RMDisease", url: "http://180.208.58.19/RMDisease/index.html", desc: "RMDisease, a database of genetic variants that can affect RNA modifications.", badgeType: "success" },
    ],
  },
  {
    title: "RNA features annotation",
    badge: null,
    items: [
      { name: "RNAModR", url: "https://github.com/mevers/RNAModR", desc: "RNAModR provides functions to map lists of genomic loci of RNA modifications to a reference mRNA transcriptome.", badgeType: "default" },
      { name: "Guitar", url: "https://bioconductor.org/packages/release/bioc/html/Guitar.html", desc: "The package is designed for transcriptomic visualization of RNA-related genomic features represented with genome-based coordinates.", badgeType: "default" },
      { name: "RCAS", url: "https://bioconductor.org/packages/release/bioc/html/RCAS.html", desc: "RCAS is an R/Bioconductor package designed as a generic reporting tool for the functional analysis of transcriptome-wide regions of interest.", badgeType: "default" },
      { name: "RNAmod", url: "https://bioinformatics.sc.cn/RNAmod/", desc: "RNAmod is a very convenient web-based platform for the meta-analysis and functional annotation of modifications on mRNAs.", badgeType: "default" },
    ],
  },
  {
    title: "RNA modification high-throughput technologies",
    badge: {
      text: 'Diverse modifications',
      infoClass: 'badge-info',
      specificText: 'Specific modification',
      successClass: 'badge-success',
    },
    items: [
      { name: "ICE", url: "http://enseqlopedia.com/wiki-entry/rna-sequencing-methods/rna-modifications/ice/", desc: "ICE followed by NGS identifies adenosine-to-inosine editing.", badgeType: "success" },
      { name: "MeRIP-Seq", url: "http://enseqlopedia.com/wiki-entry/rna-sequencing-methods/rna-modifications/merip-seq/", desc: "MeRIP-Seq (Methylated RNA Immunoprecipitation Sequencing) maps methylated RNA.", badgeType: "info" },
      { name: "miCLIP-m6A", url: "http://enseqlopedia.com/wiki-entry/rna-sequencing-methods/rna-modifications/miclip-m6a/", desc: "miCLIP-m6A (m6A Individual-Nucleotide-Resolution Crosslinking and Immunoprecipitation) maps m6A locations in the transcriptome with single-nucleotide resolution.", badgeType: "success" },
      { name: "PA-m6A-seq", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4396828/", desc: "PA-m6A-seq is a photo-crosslinking-assisted m6A sequencing strategy to more accurately define sites with m6A modification.", badgeType: "success" },
      { name: "m6A-LAIC-seq", url: "https://www.nature.com/articles/nmeth.3898", desc: "m6A-LAIC-seq (m6A-level and isoform-characterization sequencing) is a method to quantify transcript copies of particular genes with m6A modified.", badgeType: "success" },
      { name: "Bisulfite-seq", url: "https://academic.oup.com/nar/article/40/11/5023/2409239", desc: "Bisulfite-seq can be used to map modified cytosine sites across a human transcriptome", badgeType: "success" },
      { name: "m5C-RIP", url: "https://www.ncbi.nlm.nih.gov/pubmed/23825970", desc: "m5C-RIP (m5C RNA immunoprecipitation)", badgeType: "success" },
      { name: "Aza-IP", url: "https://www.nature.com/articles/nbt.2566", desc: "Aza-IP (5-azacytidine–mediated RNA immunoprecipitation) exploits the catalytic mechanisms of the m5C methyltransferases.", badgeType: "success" },
      { name: "Ψ-seq", url: "https://linkinghub.elsevier.com/retrieve/pii/S0092-8674(14)01098-8", desc: "Ψ-seq is a method to transcriptome-wide quantitative mapping of Ψ.", badgeType: "success" },
      { name: "CeU-Seq", url: "https://www.nature.com/articles/nchembio.1836", desc: "CeU-Seq (N3-CMC-enriched pseudouridine sequencing) is a selective chemical labeling and pulldown method.", badgeType: "success" },
      { name: "Pseudo-Seq", url: "http://enseqlopedia.com/wiki-entry/rna-sequencing-methods/rna-modifications/pseudo-seq/", desc: "Pseudo-Seq detects pseudouridylation sites in ncRNAs with single-nucleotide resolution using high-throughput sequencing.", badgeType: "success" },
      { name: "PSI-Seq", url: "http://enseqlopedia.com/wiki-entry/rna-sequencing-methods/rna-modifications/psi-seq", desc: "PSI-Seq (Pseudouridine Site Identification Sequencing) identifies RNA sequences containing pseudouridine sites using high-throughput sequencing.", badgeType: "success" },
      { name: "m1A-seq", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4842015", desc: "m1A-seq is based on methylated RNA immunoprecipitation sequencing (MeRIP-seq).", badgeType: "success" },
      { name: "m1A-ID-seq", url: "https://www.nature.com/articles/nchembio.2040", desc: "m1A-ID-seq technique is based on m1A immunoprecipitation and the inherent ability of m1A to stall reverse transcription.", badgeType: "success" },
      { name: "TRAC-seq", url: "https://www.cell.com/molecular-cell/fulltext/S1097-2765(18)30443-X", desc: "TRAC-seq is m7G methylated tRNA immunoprecipitation sequencing (MeRIP-seq).", badgeType: "success" },
      { name: "AlkAniline-Seq", url: "https://onlinelibrary.wiley.com/doi/full/10.1002/anie.201810946", desc: "AlkAniline-Seq enables a deep sequencing-based technology for the simultaneous detection of 7-methylguanosine (m7G) and 3-methylcytidine (m3C) in RNA at single nucleotide resolution.", badgeType: "info" },
    ],
  },
  {
    title: "Other",
    badge: null,
    items: [
      { name: "ChIPseeker", url: "https://bioconductor.org/packages/release/bioc/html/ChIPseeker.html", desc: "ChIPseeker is a Bioconductor package implements functions to retrieve the nearest genes around the peak.", badgeType: "default" },
      { name: "Rfam", url: "https://rfam.xfam.org", desc: "The Rfam database is a collection of RNA families, each represented by multiple sequence alignments, consensus secondary structures and covariance models (CMs).", badgeType: "default" },
      { name: "ENCODE", url: "https://www.encodeproject.org/", desc: "ENCODE is a public research consortium aimed at identifying all functional elements in the human and mouse genomes.", badgeType: "default" },
      { name: "POSTAR", url: "http://lulab.life.tsinghua.edu.cn/postar/rbp2.php", desc: "POSTAR is a resource of POST-trAnscriptional Regulation coordinated by RNA-binding proteins (RBPs).", badgeType: "default" },
      { name: "m6Acorr", url: "http://www.rnanut.net/m6Acorr", desc: "The m6Acorr server could not only efficiently eliminate the potential bias in m6A methylation profiles, but also perform profile-profile comparisons.", badgeType: "default" },
      { name: "m6Areader", url: "https://bio.tools/m6areader", desc: "m6Areader can predict the putative binding readers of m6A sites.", badgeType: "default" },
    ],
  },
];

const badgeColors = {
  info: "bg-blue-100 text-blue-700 border-blue-200",
  success: "bg-green-100 text-green-700 border-green-200",
  default: "bg-slate-100 text-slate-600 border-slate-200",
};

function Links() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = linkCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !searchTerm ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-[#dce9e3] to-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#223e36]">
            <ExternalLink className="h-7 w-7 text-white" />
          </div>
          <div className="space-y-3 flex-1">
            <h2 className="text-3xl font-bold text-slate-900">Links</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              Related databases and tools for RNA modification research.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search links..."
          className="rounded-2xl pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Link Categories */}
      {filteredCategories.map((category, catIdx) => (
        <Card key={catIdx} className="rounded-3xl border-0 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#edf4f0] to-white pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-[#223e36]" />
              {category.title}
            </CardTitle>
            {category.badge && (
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-500">{category.badge.text}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  <span className="text-slate-500">{category.badge.specificText}</span>
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent className="divide-y divide-slate-100">
            {category.items.map((item, itemIdx) => (
              <div key={itemIdx} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 shrink-0 text-[#699887]" />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#223e36] hover:text-[#365c51] hover:underline"
                      >
                        {item.name}
                      </a>
                      <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.desc}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 rounded-full ${badgeColors[item.badgeType] || badgeColors.default}`}
                  >
                    {item.badgeType === "info" ? "Diverse" : item.badgeType === "success" ? "Specific" : "Tool"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Links;

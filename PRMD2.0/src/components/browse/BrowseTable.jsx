import React from "react";
import { Eye, Compass, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function BrowseTable({ rows, onViewDetail, onOpenJBrowse, onOpenAnnotation }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transcript_ID_cress</TableHead>
            <TableHead>Transcript_ID_rice</TableHead>
            <TableHead>Transcript_pos_cress</TableHead>
            <TableHead>Transcript_pos_rice</TableHead>
            <TableHead>Base_cress</TableHead>
            <TableHead>Base_rice</TableHead>
            <TableHead>chr_cress</TableHead>
            <TableHead>pos_cress</TableHead>
            <TableHead>strand_cress</TableHead>
            <TableHead>motif_cress</TableHead>
            <TableHead>chr_rice</TableHead>
            <TableHead>pos_rice</TableHead>
            <TableHead>strand_rice</TableHead>
            <TableHead>motif_rice</TableHead>
            <TableHead className="min-w-[240px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.transcript_cress}</TableCell>
              <TableCell>{row.transcript_rice}</TableCell>
              <TableCell>{row.transcript_pos_cress}</TableCell>
              <TableCell>{row.transcript_pos_rice}</TableCell>
              <TableCell>{row.base_cress}</TableCell>
              <TableCell>{row.base_rice}</TableCell>
              <TableCell>{row.chr_cress}</TableCell>
              <TableCell>{row.pos_cress}</TableCell>
              <TableCell>{row.strand_cress}</TableCell>
              <TableCell>{row.motif_cress}</TableCell>
              <TableCell>{row.chr_rice}</TableCell>
              <TableCell>{row.pos_rice}</TableCell>
              <TableCell>{row.strand_rice}</TableCell>
              <TableCell>{row.motif_rice}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]" onClick={() => onViewDetail(row)}>
                    <Eye className="mr-1 h-4 w-4" /> View Detail
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onOpenJBrowse(row)}>
                    <Compass className="mr-1 h-4 w-4" /> JBrowse
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onOpenAnnotation(row)}>
                    <Boxes className="mr-1 h-4 w-4" /> Annotation
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BrowseTable;

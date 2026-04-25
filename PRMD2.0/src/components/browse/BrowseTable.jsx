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
            <TableHead>PeakID</TableHead>
            <TableHead>Gene</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Chr</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Strand</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>SignalValue</TableHead>
            <TableHead>PValue</TableHead>
            <TableHead>QValue</TableHead>
            <TableHead className="min-w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="py-8 text-center text-slate-400">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="max-w-[200px] truncate" title={row.PeakID}>
                  {row.PeakID}
                </TableCell>
                <TableCell>{row.Gene}</TableCell>
                <TableCell>
                  <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {row.Location}
                  </span>
                </TableCell>
                <TableCell>{row.Chr}</TableCell>
                <TableCell>{row.Start}</TableCell>
                <TableCell>{row.End}</TableCell>
                <TableCell>{row.Strand}</TableCell>
                <TableCell>{row.Score}</TableCell>
                <TableCell>{parseFloat(row.SignalValue).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(row.PValue).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(row.QValue).toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="rounded-xl bg-[#223e36] hover:bg-[#1b312b]" onClick={() => onViewDetail(row)}>
                      <Eye className="mr-1 h-4 w-4" /> Detail
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default BrowseTable;

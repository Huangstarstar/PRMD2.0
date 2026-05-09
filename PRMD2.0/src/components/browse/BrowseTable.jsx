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
            <TableHead className="whitespace-nowrap">Species</TableHead>
            <TableHead className="whitespace-nowrap">Chr</TableHead>
            <TableHead className="whitespace-nowrap">Start</TableHead>
            <TableHead className="whitespace-nowrap">End</TableHead>
            <TableHead className="whitespace-nowrap">sample_ID</TableHead>
            <TableHead className="whitespace-nowrap">PeakID</TableHead>
            <TableHead className="whitespace-nowrap">Gene</TableHead>
            <TableHead className="whitespace-nowrap">Location</TableHead>
            <TableHead className="whitespace-nowrap">Modification</TableHead>
            <TableHead className="whitespace-nowrap">Tool</TableHead>
            <TableHead className="whitespace-nowrap">Score</TableHead>
            <TableHead className="whitespace-nowrap">Strand</TableHead>
            <TableHead className="whitespace-nowrap">SignalValue</TableHead>
            <TableHead className="whitespace-nowrap">PValue</TableHead>
            <TableHead className="whitespace-nowrap">QValue</TableHead>
            <TableHead className="whitespace-nowrap">PeakOffset</TableHead>
            <TableHead className="whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={17} className="py-8 text-center text-slate-400">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="whitespace-nowrap text-xs">{row.Species}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.Chr}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.Start}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.End}</TableCell>
                <TableCell className="max-w-[140px] truncate text-xs" title={row.sample_ID}>
                  {row.sample_ID}
                </TableCell>
                <TableCell className="max-w-[140px] truncate font-mono text-xs" title={row.PeakID}>
                  {row.PeakID}
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-xs">{row.Gene}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {row.Location}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.Modification}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.Tool}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.Score}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.Strand}</TableCell>
                <TableCell className="whitespace-nowrap text-xs">
                  {parseFloat(row.SignalValue).toFixed(2)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs">
                  {parseFloat(row.PValue).toFixed(2)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs">
                  {parseFloat(row.QValue).toFixed(2)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs">{row.PeakOffset}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" className="h-7 rounded-lg bg-[#223e36] px-2 text-xs hover:bg-[#1b312b]" onClick={() => onViewDetail(row)}>
                      <Eye className="mr-0.5 h-3 w-3" /> Detail
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 rounded-lg px-2 text-xs" onClick={() => onOpenJBrowse(row)}>
                      <Compass className="mr-0.5 h-3 w-3" /> JBrowse
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 rounded-lg px-2 text-xs" onClick={() => onOpenAnnotation(row)}>
                      <Boxes className="mr-0.5 h-3 w-3" /> Annot
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

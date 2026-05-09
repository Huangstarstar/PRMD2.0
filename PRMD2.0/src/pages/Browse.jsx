import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BrowseFilters from "../components/browse/BrowseFilters";
import BrowseStatsPanel from "../components/browse/BrowseStatsPanel";
import BrowseTable from "../components/browse/BrowseTable";
import { getBrowseData, getBrowseStats } from "../api/browse";

const PAGE_SIZE = 50;

function Browse({ setPage, setSelectedBrowseRow, externalSearchKeyword = "" }) {
  const [filters, setFilters] = useState({
    species: "all",
    modification: "all",
    method: "all",
    location: "all",
    keyword: externalSearchKeyword,
  });
  const [page, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ rows: [], pagination: { totalCount: 0, totalPages: 0 } });
  const [stats, setStats] = useState({ totalPeaks: 0, locationDistribution: [] });

  // Sync external keyword
  useEffect(() => {
    if (externalSearchKeyword) {
      setFilters((p) => ({ ...p, keyword: externalSearchKeyword }));
    }
  }, [externalSearchKeyword]);

  // Fetch data when filters or page change
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [dataResult, statsResult] = await Promise.all([
        getBrowseData({
          page,
          pageSize: PAGE_SIZE,
          species: filters.species,
          modification: filters.modification,
          method: filters.method,
          location: filters.location,
          keyword: filters.keyword,
        }),
        getBrowseStats({
          species: filters.species,
          modification: filters.modification,
          method: filters.method,
          location: filters.location,
          keyword: filters.keyword,
        }),
      ]);
      setData(dataResult);
      setStats(statsResult);
    } catch (err) {
      console.error("Failed to fetch browse data:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPageNum(1);
  }, [filters.species, filters.modification, filters.method, filters.location, filters.keyword]);

  const { rows, pagination } = data;

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
      {/* Sidebar Filters */}
      <BrowseFilters filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <div className="min-w-0 space-y-6">
        {/* Stats Panel */}
        <BrowseStatsPanel
          totalPeaks={stats.totalPeaks}
          locationDistribution={stats.locationDistribution}
        />

        {/* Data Table */}
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Peaks Records</CardTitle>
              <CardDescription>
                {pagination.totalCount.toLocaleString()} records total
                {loading && <Loader2 className="ml-2 inline h-4 w-4 animate-spin" />}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Detail ready</Badge>
              <Badge variant="secondary">JBrowse linked entry</Badge>
              <Badge variant="secondary">Annotation linked entry</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading && rows.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-[#223e36]" />
              </div>
            ) : (
              <>
                <BrowseTable
                  rows={rows}
                  onViewDetail={(row) => {
                    setSelectedBrowseRow(row);
                    setPage("BrowseDetail");
                  }}
                  onOpenJBrowse={(row) => {
                    setSelectedBrowseRow(row);
                    setPage("JBrowse");
                  }}
                  onOpenAnnotation={(row) => {
                    setSelectedBrowseRow(row);
                    setPage("Annotation");
                  }}
                />

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Page {pagination.page} of {pagination.totalPages.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        disabled={page <= 1 || loading}
                        onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        disabled={page >= pagination.totalPages || loading}
                        onClick={() => setPageNum((p) => p + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Browse;

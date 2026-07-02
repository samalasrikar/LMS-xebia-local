import { useState, useMemo, useEffect } from "react";
import { filterDataset } from "../utils/mockData";

export default function useDashboardData() {
  const [filters, setFilters] = useState({
    year: "2026",
    quarter: "All Quarters",
    region: "All Regions",
    department: "All Departments",
    bu: "All BUs",
    practice: "All Practices"
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(false);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setPage(1);
  }, [filters, search]);

  const resetFilters = () => {
    setFilters({
      year: "2026",
      quarter: "All Quarters",
      region: "All Regions",
      department: "All Departments",
      bu: "All BUs",
      practice: "All Practices"
    });
    setSearch("");
    setPage(1);
    setIsEmptyState(false);
    setIsErrorState(false);
    setIsLoadingState(false);
  };

  const dataset = useMemo(() => {
    if (isEmptyState) {
      return {
        trends: [],
        kpis: {
          totalEnrollments: 0,
          completionRate: 0,
          learningVelocity: 0,
          activeGrowth: "+0%",
          avgSessionDuration: "0 min",
          engagementScore: 0
        },
        charts: {
          enrollmentVsCompletion: [],
          activeUsersGrowth: [],
          monthlyLearningHours: [],
          dropoffTrend: [],
          engagementDistribution: [],
          heatmapData: []
        }
      };
    }
    return filterDataset(filters, search);
  }, [filters, search, isEmptyState]);

  const totalPages = Math.ceil(dataset.trends.length / ITEMS_PER_PAGE) || 1;
  const paginatedTrends = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return dataset.trends.slice(start, start + ITEMS_PER_PAGE);
  }, [dataset.trends, page]);

  return {
    filters,
    setFilters,
    search,
    setSearch,
    resetFilters,

    isLoading: isLoadingState,
    setIsLoading: setIsLoadingState,
    isError: isErrorState,
    setIsError: setIsErrorState,
    isEmpty: isEmptyState || dataset.trends.length === 0,
    setIsEmpty: setIsEmptyState,

    trends: dataset.trends,
    paginatedTrends,
    page,
    setPage,
    totalPages,

    kpis: dataset.kpis,
    charts: dataset.charts,
    itemsPerPage: ITEMS_PER_PAGE
  };
}

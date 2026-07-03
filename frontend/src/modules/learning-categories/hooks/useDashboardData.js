import { useState, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { filterDataset } from "../utils/mockData";

export default function useDashboardData() {
  const context = useOutletContext() || {};
  const reloadTrigger = context.reloadTrigger;

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

  useEffect(() => {
    if (reloadTrigger !== undefined && reloadTrigger > 0) {
      setIsLoadingState(true);
      const timer = setTimeout(() => {
        setIsLoadingState(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [reloadTrigger]);

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
        categories: [],
        kpis: {
          totalCategories: 0,
          totalCourses: 0,
          avgCompletionRate: 0,
          totalEnrollments: 0,
          topRatedScore: 0,
          trendingCount: 0
        },
        charts: {
          categoryEnrollments: [],
          typeDistribution: [],
          enrollmentTrend: [],
          completionByCategory: []
        }
      };
    }
    return filterDataset(filters, search);
  }, [filters, search, isEmptyState]);

  const totalPages = Math.ceil(dataset.categories.length / ITEMS_PER_PAGE) || 1;
  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return dataset.categories.slice(start, start + ITEMS_PER_PAGE);
  }, [dataset.categories, page]);

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
    isEmpty: isEmptyState || dataset.categories.length === 0,
    setIsEmpty: setIsEmptyState,

    categories: dataset.categories,
    paginatedCategories,
    page,
    setPage,
    totalPages,

    kpis: dataset.kpis,
    charts: dataset.charts,
    itemsPerPage: ITEMS_PER_PAGE
  };
}

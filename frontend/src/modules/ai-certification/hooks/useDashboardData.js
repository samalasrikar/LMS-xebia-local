import { useState, useMemo, useEffect } from "react";
import { filterDataset } from "../utils/mockData";

export default function useDashboardData() {
  // State for all dashboards filters
  const [filters, setFilters] = useState({
    year: "2026",
    quarter: "All Quarters",
    region: "All Regions",
    department: "All Departments",
    bu: "All BUs",
    practice: "All Practices"
  });

  const [search, setSearch] = useState("");

  // Pagination states
  const [championPage, setChampionPage] = useState(1);
  const [certPage, setCertPage] = useState(1);
  const [programPage, setProgramPage] = useState(1);

  // Reset pagination pages to 1 when filters or search change
  useEffect(() => {
    setChampionPage(1);
    setCertPage(1);
    setProgramPage(1);
  }, [filters, search]);

  // States to toggle and demonstrate state handlers (Loading, Error, Empty)
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(false);

  const ITEMS_PER_PAGE = 5;

  // Filter reset helper
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
    setChampionPage(1);
    setCertPage(1);
    setProgramPage(1);
    setIsEmptyState(false);
    setIsErrorState(false);
    setIsLoadingState(false);
  };

  // Derive filtered datasets
  const dataset = useMemo(() => {
    if (isEmptyState) {
      return {
        champions: [],
        certs: [],
        programs: [],
        kpis: {
          ai: { readiness: 0, adoption: 0, learningHours: 0, certifiedEmployees: 0, enabledEmployees: 0, maturityScore: 0 },
          certs: { totalCertifications: 0, activeCertifications: 0, expiredCertifications: 0, certifiedEmployees: 0, completionRate: 0 },
          programs: { totalPrograms: 0, activePrograms: 0, participants: 0, completionRate: 0, learningHours: 0, feedbackRating: 0 },
          champions: { topLearners: 0, aiChampionsCount: 0, certifiedEmployees: 0, recognitionAwards: 0 }
        },
        charts: {
          aiReadinessTrend: [],
          aiAdoptionTrend: [],
          capabilityDistribution: [],
          aiLearningTrend: [],
          deptReadiness: [],
          heatmapData: [],
          certTechDistribution: [],
          certRegionDistribution: [],
          certDeptDistribution: [],
          certBUDistribution: [],
          certProjectDistribution: [],
          flagshipParticipationTrend: [],
          flagshipCompletionTrend: [],
          flagshipDistribution: [],
          flagshipLearningHoursTrend: [],
          championLearningHours: [],
          championReadiness: [],
          championCertScore: []
        }
      };
    }
    return filterDataset(filters, search);
  }, [filters, search, isEmptyState]);

  // Pagination calculations for Champions
  const totalChampionPages = Math.ceil(dataset.champions.length / ITEMS_PER_PAGE) || 1;
  const paginatedChampions = useMemo(() => {
    const start = (championPage - 1) * ITEMS_PER_PAGE;
    return dataset.champions.slice(start, start + ITEMS_PER_PAGE);
  }, [dataset.champions, championPage]);

  // Pagination calculations for Certifications
  const totalCertPages = Math.ceil(dataset.certs.length / ITEMS_PER_PAGE) || 1;
  const paginatedCerts = useMemo(() => {
    const start = (certPage - 1) * ITEMS_PER_PAGE;
    return dataset.certs.slice(start, start + ITEMS_PER_PAGE);
  }, [dataset.certs, certPage]);

  // Pagination calculations for Programs
  const totalProgramPages = Math.ceil(dataset.programs.length / ITEMS_PER_PAGE) || 1;
  const paginatedPrograms = useMemo(() => {
    const start = (programPage - 1) * ITEMS_PER_PAGE;
    return dataset.programs.slice(start, start + ITEMS_PER_PAGE);
  }, [dataset.programs, programPage]);

  return {
    filters,
    setFilters,
    search,
    setSearch,
    resetFilters,

    // Loading / Error / Empty States control
    isLoading: isLoadingState,
    setIsLoading: setIsLoadingState,
    isError: isErrorState,
    setIsError: setIsErrorState,
    isEmpty: isEmptyState || (dataset.champions.length === 0 && dataset.certs.length === 0 && dataset.programs.length === 0),
    setIsEmpty: setIsEmptyState,

    // Direct and Paginated datasets
    champions: dataset.champions,
    paginatedChampions,
    championPage,
    setChampionPage,
    totalChampionPages,

    certs: dataset.certs,
    paginatedCerts,
    certPage,
    setCertPage,
    totalCertPages,

    programs: dataset.programs,
    paginatedPrograms,
    programPage,
    setProgramPage,
    totalProgramPages,

    kpis: dataset.kpis,
    charts: dataset.charts,
    itemsPerPage: ITEMS_PER_PAGE
  };
}

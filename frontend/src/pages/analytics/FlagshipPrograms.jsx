import React from "react";
import useScrollToSection from "../../hooks/useScrollToSection";
import useDashboardData from "@/modules/ai-certification/hooks/useDashboardData";
import DashboardContainer from "@/modules/ai-certification/components/DashboardContainer";
import PageHeader from "@/modules/ai-certification/components/PageHeader";
import FilterPanel from "@/modules/ai-certification/components/filters/FilterPanel";
import ProgramCard from "@/modules/ai-certification/components/cards/ProgramCard";
import LineChartCard from "@/modules/ai-certification/components/charts/LineChartCard";
import DonutChartCard from "@/modules/ai-certification/components/charts/DonutChartCard";
import AreaChartCard from "@/modules/ai-certification/components/charts/AreaChartCard";
import ProgramTable from "@/modules/ai-certification/components/tables/ProgramTable";
import SearchBar from "@/modules/ai-certification/components/SearchBar";
import LoadingSkeleton from "@/modules/ai-certification/components/LoadingSkeleton";
import ErrorState from "@/modules/ai-certification/components/ErrorState";
import EmptyState from "@/modules/ai-certification/components/EmptyState";

export default function FlagshipPrograms() {
  useScrollToSection();
  const {
    filters,
    setFilters,
    search,
    setSearch,
    resetFilters,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    isEmpty,
    setIsEmpty,
    paginatedPrograms,
    programPage,
    setProgramPage,
    totalProgramPages,
    kpis,
    charts
  } = useDashboardData();

  const breadcrumbs = [{ label: "Flagship Programs" }];

  return (
    <DashboardContainer>
      <PageHeader
        title="Flagship Learning Programs"
        description="Analyze corporate learning academies, cohort completion rates, participant sizes, and feedback score trends."
        breadcrumbs={breadcrumbs}
      />

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isError={isError}
        setIsError={setIsError}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
      />

      {isError ? (
        <ErrorState onRetry={resetFilters} />
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : isEmpty ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* ── KPI Cards ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ProgramCard
              title="Active Academies"
              value={kpis.flagship.activeAcademies}
              type="primary"
            />
            <ProgramCard
              title="Avg Graduation Rate"
              value={kpis.flagship.avgCompletionRate}
              suffix="%"
              type="rate"
            />
            <ProgramCard
              title="Total Participants"
              value={kpis.flagship.totalParticipants}
              type="participants"
            />
            <ProgramCard
              title="Overall NPS Score"
              value={kpis.flagship.overallNps}
              suffix=" / 5.0"
              type="rating"
            />
          </div>

          {/* ── Visual Charts Row 1 ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AreaChartCard
                title="Learning Hours Trend"
                subtitle="Breakdown of self-guided pathway hours vs interactive workshops"
                data={charts.flagshipLearningHoursTrend}
                xKey="month"
                areas={[
                  { key: "selfGuidedHours", color: "#84117C", name: "Self-Guided Hours" },
                  { key: "workshopHours", color: "#6C1D5F", name: "Workshop Hours" }
                ]}
              />
            </div>
            <div id="innovation">
              <DonutChartCard
                title="Program Domain Distribution"
                subtitle="Share of programs running in cloud, AI, and architecture domains"
                data={charts.flagshipDistribution}
                nameKey="name"
                valueKey="value"
              />
            </div>
          </div>

          {/* ── Visual Charts Row 2 ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div id="graduate">
              <LineChartCard
                title="Participation Trend"
                subtitle="Active participants registered across flagship academies"
                data={charts.flagshipParticipationTrend}
                xKey="month"
                lines={[{ key: "activeParticipants", color: "#6C1D5F", name: "Participants Count" }]}
              />
            </div>
            <div id="internship">
              <LineChartCard
                title="Cohort Completion Trend"
                subtitle="Average percentage graduation rate of course enrollments"
                data={charts.flagshipCompletionTrend}
                xKey="month"
                lines={[{ key: "rate", color: "#01AC9F", name: "Completion Rate (%)" }]}
              />
            </div>
          </div>

          {/* ── Program Table Section ─────────────────────────────── */}
          <div id="leadership" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#6C1D5F]">Academy Programs</h3>
                <p className="text-xs text-[#83727c]">Detailed index of training cohorts and user engagement scores</p>
              </div>

              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search programs..."
              />
            </div>

            <ProgramTable
              programs={paginatedPrograms}
              currentPage={programPage}
              totalPages={totalProgramPages}
              onPageChange={setProgramPage}
            />
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}

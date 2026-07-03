import React from "react";
import { Brain, TrendingUp, Calendar, BookOpen, UserCheck, Star } from "lucide-react";
import useScrollToSection from "../../hooks/useScrollToSection";
import useDashboardData from "@/modules/ai-certification/hooks/useDashboardData";
import DashboardContainer from "@/modules/ai-certification/components/DashboardContainer";
import PageHeader from "@/modules/ai-certification/components/PageHeader";
import FilterPanel from "@/modules/ai-certification/components/filters/FilterPanel";
import AIKPICard from "@/modules/ai-certification/components/cards/AIKPICard";
import LineChartCard from "@/modules/ai-certification/components/charts/LineChartCard";
import BarChartCard from "@/modules/ai-certification/components/charts/BarChartCard";
import DonutChartCard from "@/modules/ai-certification/components/charts/DonutChartCard";
import AreaChartCard from "@/modules/ai-certification/components/charts/AreaChartCard";
import HeatMapCard from "@/modules/ai-certification/components/charts/HeatMapCard";
import ChampionTable from "@/modules/ai-certification/components/tables/ChampionTable";
import SearchBar from "@/modules/ai-certification/components/SearchBar";
import LoadingSkeleton from "@/modules/ai-certification/components/LoadingSkeleton";
import ErrorState from "@/modules/ai-certification/components/ErrorState";
import EmptyState from "@/modules/ai-certification/components/EmptyState";

export default function AITransformation() {
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
    paginatedChampions,
    championPage,
    setChampionPage,
    totalChampionPages,
    champions,
    kpis,
    charts
  } = useDashboardData();

  // Set up Breadcrumbs
  const breadcrumbs = [{ label: "AI Transformation" }];

  return (
    <DashboardContainer>
      <PageHeader
        title="AI Transformation"
        description="Monitor onboarding progress, developer copilot adoption, practice capability metrics, and certification pipelines."
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
          {/* ── KPI Cards Row ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            <AIKPICard
              title="Workforce Trained"
              value={kpis.ai.trainedCount}
              icon={Brain}
              trend="+140"
              tooltip="Employees who completed at least one AI core module"
            />
            <AIKPICard
              title="Copilot Adoption"
              value={kpis.ai.copilotAdoptionPct}
              suffix="%"
              icon={TrendingUp}
              trend="+8.5%"
              tooltip="Percent active developer licenses with weekly utilization"
            />
            <AIKPICard
              title="Onboarded Cohort"
              value={kpis.ai.onboardedCohort}
              icon={Calendar}
              trend="+12"
              tooltip="Total freshers currently in structured AI curriculum track"
            />
            <AIKPICard
              title="Avg Practice Score"
              value={kpis.ai.avgPracticeScore}
              suffix="/5.0"
              icon={BookOpen}
              trend="+0.4"
              tooltip="Mean evaluation grades in domain capability audits"
            />
            <AIKPICard
              title="Certified Advocates"
              value={kpis.ai.certifiedCount}
              icon={UserCheck}
              trend="+45"
              tooltip="Workforce equipped with active Copilot or developer licenses"
            />
            <AIKPICard
              title="AI Maturity Score"
              value={kpis.ai.maturityScore}
              suffix="/5.0"
              icon={Star}
              trend="+0.3"
              tooltip="Overall calculated enterprise cognitive capability index"
            />
          </div>

          {/* ── Visual Charts Row 1 ─────────────────────────────── */}
          <div id="ai-adoption" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AreaChartCard
                title="AI Adoption Trend"
                subtitle="Growth of pilot programs versus direct production deployments"
                data={charts.aiAdoptionTrend}
                xKey="month"
                areas={[
                  { key: "pilot", color: "#84117C", name: "Pilot Stage" },
                  { key: "production", color: "#6C1D5F", name: "Production System" }
                ]}
              />
            </div>
            <div>
              <DonutChartCard
                title="AI Capability Distribution"
                subtitle="Workforce learning focus across key AI competencies"
                data={charts.capabilityDistribution}
                nameKey="name"
                valueKey="value"
              />
            </div>
          </div>

          {/* ── Visual Charts Row 2 ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartCard
              title="AI Readiness Trend"
              subtitle="Enterprise ready scores vs target thresholds over the past semester"
              data={charts.aiReadinessTrend}
              xKey="month"
              lines={[
                { key: "readiness", color: "#6C1D5F", name: "Current Readiness" },
                { key: "target", color: "#01AC9F", name: "Target Baseline" }
              ]}
            />
            <div id="ai-learning">
              <BarChartCard
                title="AI Learning Trend"
                subtitle="Comparison of self-paced digital content vs instructor-guided workshops"
                data={charts.aiLearningTrend}
                xKey="month"
                bars={[
                  { key: "selfPaced", color: "#84117C", name: "Self-Paced" },
                  { key: "guided", color: "#6C1D5F", name: "Instructor-Guided" }
                ]}
              />
            </div>
          </div>

          {/* ── Heatmap & Department Comparison Row ─────────────────── */}
          <div id="ai-readiness" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HeatMapCard
                title="Department Capability Heatmap"
                subtitle="Detailed breakdown of readiness scores across core capability domains"
                data={charts.heatmapData}
              />
            </div>
            <div>
              <BarChartCard
                title="Department-wise AI Readiness"
                subtitle="Aggregated ready score index by business department"
                data={charts.deptReadiness}
                xKey="name"
                layout="vertical"
                bars={[{ key: "score", color: "#6C1D5F", name: "Readiness Index (%)" }]}
              />
            </div>
          </div>

          {/* ── Leaderboard & Champion Table Section ─────────────────── */}
          <div id="ai-insights" className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-[#6C1D5F]">AI Champions Leaderboard</h3>
                <p className="text-xs text-[#83727c]">Top employee advocates driving digital innovation across practices</p>
              </div>
              
              {/* Search Bar inside Table Section */}
              <div className="w-full sm:w-auto min-w-0">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search champions..."
                />
              </div>
            </div>

            <ChampionTable
              champions={paginatedChampions}
              currentPage={championPage}
              totalPages={totalChampionPages}
              onPageChange={setChampionPage}
            />
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}

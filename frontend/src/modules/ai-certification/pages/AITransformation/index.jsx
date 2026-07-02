import React from "react";
import { Brain, TrendingUp, Calendar, BookOpen, UserCheck, Star } from "lucide-react";
import AppLayout from "../../../../components/layout/AppLayout";
import useDashboardData from "../../hooks/useDashboardData";
import DashboardContainer from "../../components/DashboardContainer";
import PageHeader from "../../components/PageHeader";
import FilterPanel from "../../components/filters/FilterPanel";
import AIKPICard from "../../components/cards/AIKPICard";
import LineChartCard from "../../components/charts/LineChartCard";
import BarChartCard from "../../components/charts/BarChartCard";
import DonutChartCard from "../../components/charts/DonutChartCard";
import AreaChartCard from "../../components/charts/AreaChartCard";
import HeatMapCard from "../../components/charts/HeatMapCard";
import ChampionTable from "../../components/tables/ChampionTable";
import SearchBar from "../../components/SearchBar";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorState from "../../components/ErrorState";
import EmptyState from "../../components/EmptyState";

export default function AITransformation() {
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
    <AppLayout>
      <DashboardContainer>
        <PageHeader
          title="AI Transformation Analytics"
          description="Monitor enterprise-wide AI readiness, adoption milestones, learning hours, and capability distributions."
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
              title="AI Readiness"
              value={kpis.ai.readiness}
              suffix="%"
              icon={Brain}
              trend="+4.2%"
              tooltip="Percentage of workforce completed basic AI enablement paths"
            />
            <AIKPICard
              title="AI Adoption"
              value={kpis.ai.adoption}
              suffix="%"
              icon={TrendingUp}
              trend="+8.5%"
              tooltip="Share of active cloud projects currently employing AI services"
            />
            <AIKPICard
              title="AI Learning Hours"
              value={kpis.ai.learningHours}
              icon={BookOpen}
              trend="+12%"
              tooltip="Cumulative learning hours on AI tools, models, and practices"
            />
            <AIKPICard
              title="AI Certified Employees"
              value={kpis.ai.certifiedEmployees}
              icon={UserCheck}
              trend="+15"
              tooltip="Employees holding accredited external AI certifications"
            />
            <AIKPICard
              title="AI Enabled Employees"
              value={kpis.ai.enabledEmployees}
              icon={Calendar}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          {/* ── Heatmap & Department Comparison Row ─────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          <div className="space-y-4">
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
    </AppLayout>
  );
}

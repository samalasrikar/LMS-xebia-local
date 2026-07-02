import React from "react";
import { Clock, BookOpen, Target, Users, TrendingUp, Zap } from "lucide-react";
import AppLayout from "../../../../components/layout/AppLayout";
import useDashboardData from "../../hooks/useDashboardData";
import DashboardContainer from "../../../ai-certification/components/DashboardContainer";
import PageHeader from "../../../ai-certification/components/PageHeader";
import FilterPanel from "../../../ai-certification/components/filters/FilterPanel";
import AreaChartCard from "../../../ai-certification/components/charts/AreaChartCard";
import BarChartCard from "../../../ai-certification/components/charts/BarChartCard";
import DonutChartCard from "../../../ai-certification/components/charts/DonutChartCard";
import SearchBar from "../../../ai-certification/components/SearchBar";
import LoadingSkeleton from "../../../ai-certification/components/LoadingSkeleton";
import ErrorState from "../../../ai-certification/components/ErrorState";
import EmptyState from "../../../ai-certification/components/EmptyState";
import HoursKPICard from "../../components/cards/HoursKPICard";
import LearningHoursTable from "../../components/tables/LearningHoursTable";

export default function LearningHours() {
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
    paginatedRecords,
    page,
    setPage,
    totalPages,
    kpis,
    charts
  } = useDashboardData();

  const breadcrumbs = [{ label: "Learning Hours" }];

  return (
    <AppLayout>
      <DashboardContainer>
        <PageHeader
          title="Learning Hours Analytics"
          description="Track employee learning time distribution, self-paced vs instructor-led hours, target achievements, and monthly growth trends."
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
              <HoursKPICard
                title="Total Learning Hours"
                value={kpis.totalHours}
                icon={Clock}
                trend="+18%"
                tooltip="Cumulative hours across all learning modes and employees"
              />
              <HoursKPICard
                title="Avg Hours / Employee"
                value={kpis.avgHoursPerEmployee}
                suffix=" hrs"
                icon={Users}
                trend="+6.2%"
                tooltip="Mean learning hours completed per active employee"
              />
              <HoursKPICard
                title="Self-Paced %"
                value={kpis.selfPacedPct}
                suffix="%"
                icon={BookOpen}
                trend="+3.1%"
                tooltip="Proportion of total hours from self-paced digital content"
              />
              <HoursKPICard
                title="Target Achievement"
                value={kpis.targetAchievement}
                suffix="%"
                icon={Target}
                trend="+5.4%"
                tooltip="Percentage of organizational learning hour targets achieved"
              />
              <HoursKPICard
                title="Active Learners"
                value={kpis.activeLearners}
                icon={Zap}
                trend="+22"
                tooltip="Employees who have logged at least 1 learning hour"
              />
              <HoursKPICard
                title="Monthly Growth"
                value={kpis.monthlyGrowth}
                icon={TrendingUp}
                trend={kpis.monthlyGrowth}
                tooltip="Month-over-month learning hour growth rate"
              />
            </div>

            {/* ── Charts Row 1 ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AreaChartCard
                  title="Monthly Hours Trend"
                  subtitle="Breakdown of self-paced content hours vs instructor-guided sessions"
                  data={charts.monthlyHoursTrend}
                  xKey="month"
                  areas={[
                    { key: "selfPaced", color: "#84117C", name: "Self-Paced" },
                    { key: "guided", color: "#6C1D5F", name: "Instructor-Guided" }
                  ]}
                />
              </div>
              <div>
                <DonutChartCard
                  title="Learning Mode Distribution"
                  subtitle="Self-paced digital vs instructor-guided workshop hours"
                  data={charts.modeDistribution}
                  nameKey="name"
                  valueKey="value"
                />
              </div>
            </div>

            {/* ── Charts Row 2 ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChartCard
                title="Department-wise Learning Hours"
                subtitle="Aggregated hours logged across operational departments"
                data={charts.deptHours}
                xKey="name"
                bars={[{ key: "hours", color: "#6C1D5F", name: "Learning Hours" }]}
              />
              <BarChartCard
                title="Top Practices by Hours"
                subtitle="Practice areas with highest learning time investments"
                data={charts.practiceHours}
                xKey="name"
                layout="vertical"
                bars={[{ key: "hours", color: "#01AC9F", name: "Hours Logged" }]}
              />
            </div>

            {/* ── Table Section ─────────────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#6C1D5F]">Learning Hours Registry</h3>
                  <p className="text-xs text-[#83727c]">Individual employee learning hour records and target progress</p>
                </div>

                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search employees..."
                />
              </div>

              <LearningHoursTable
                records={paginatedRecords}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </DashboardContainer>
    </AppLayout>
  );
}

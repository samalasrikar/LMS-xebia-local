import React from "react";
import { TrendingUp, Target, Zap, Users, Clock, Activity } from "lucide-react";
import AppLayout from "../../../../components/layout/AppLayout";
import useDashboardData from "../../hooks/useDashboardData";
import DashboardContainer from "../../../ai-certification/components/DashboardContainer";
import PageHeader from "../../../ai-certification/components/PageHeader";
import FilterPanel from "../../../ai-certification/components/filters/FilterPanel";
import AreaChartCard from "../../../ai-certification/components/charts/AreaChartCard";
import BarChartCard from "../../../ai-certification/components/charts/BarChartCard";
import LineChartCard from "../../../ai-certification/components/charts/LineChartCard";
import DonutChartCard from "../../../ai-certification/components/charts/DonutChartCard";
import HeatMapCard from "../../../ai-certification/components/charts/HeatMapCard";
import SearchBar from "../../../ai-certification/components/SearchBar";
import LoadingSkeleton from "../../../ai-certification/components/LoadingSkeleton";
import ErrorState from "../../../ai-certification/components/ErrorState";
import EmptyState from "../../../ai-certification/components/EmptyState";
import TrendKPICard from "../../components/cards/TrendKPICard";
import TrendsTable from "../../components/tables/TrendsTable";

export default function LearningTrends() {
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
    paginatedTrends,
    page,
    setPage,
    totalPages,
    kpis,
    charts
  } = useDashboardData();

  const breadcrumbs = [{ label: "Learning Trends" }];

  return (
    <AppLayout>
      <DashboardContainer>
        <PageHeader
          title="Learning Trends & Insights"
          description="Visualize learning momentum, adoption patterns, engagement scores, user growth, and seasonal learning activity across the organization."
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
              <TrendKPICard
                title="YTD Enrollments"
                value={kpis.totalEnrollments}
                icon={Users}
                trend="+24%"
                tooltip="Total year-to-date enrollments across all learning paths"
              />
              <TrendKPICard
                title="Completion Rate"
                value={kpis.completionRate}
                suffix="%"
                icon={Target}
                trend="+6.3%"
                tooltip="Overall enrollment to completion conversion rate"
              />
              <TrendKPICard
                title="Learning Velocity"
                value={kpis.learningVelocity}
                suffix="/mo"
                icon={Zap}
                trend="+180"
                tooltip="Average enrollments per month — measures learning momentum"
              />
              <TrendKPICard
                title="Active Learner Growth"
                value={kpis.activeGrowth}
                icon={TrendingUp}
                trend={kpis.activeGrowth}
                tooltip="Growth in monthly active learners since period start"
              />
              <TrendKPICard
                title="Avg Session Duration"
                value={kpis.avgSessionDuration}
                icon={Clock}
                trend="+8 min"
                tooltip="Average time per learning session across all users"
              />
              <TrendKPICard
                title="Engagement Score"
                value={kpis.engagementScore}
                suffix="/100"
                icon={Activity}
                trend="+12"
                tooltip="Composite score: completion × retention × session depth"
              />
            </div>

            {/* ── Charts Row 1 ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AreaChartCard
                  title="Enrollment vs Completion Trend"
                  subtitle="Side-by-side comparison of monthly learning registrations and graduations"
                  data={charts.enrollmentVsCompletion}
                  xKey="month"
                  areas={[
                    { key: "enrollments", color: "#84117C", name: "Enrollments" },
                    { key: "completions", color: "#01AC9F", name: "Completions" }
                  ]}
                />
              </div>
              <div>
                <DonutChartCard
                  title="Engagement Distribution"
                  subtitle="Workforce segmentation by learning engagement levels"
                  data={charts.engagementDistribution}
                  nameKey="name"
                  valueKey="value"
                />
              </div>
            </div>

            {/* ── Charts Row 2 ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChartCard
                title="Active Users Growth"
                subtitle="Monthly active and newly onboarded learner counts"
                data={charts.activeUsersGrowth}
                xKey="month"
                lines={[
                  { key: "activeUsers", color: "#6C1D5F", name: "Active Users" },
                  { key: "newUsers", color: "#01AC9F", name: "New Users" }
                ]}
              />
              <BarChartCard
                title="Monthly Learning Hours"
                subtitle="Total cumulative learning hours across the organization"
                data={charts.monthlyLearningHours}
                xKey="month"
                bars={[{ key: "hours", color: "#6C1D5F", name: "Learning Hours" }]}
              />
            </div>

            {/* ── Charts Row 3: Heatmap & Drop-off ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HeatMapCard
                  title="Department Activity Heatmap"
                  subtitle="Monthly engagement intensity across operational departments"
                  data={charts.heatmapData}
                />
              </div>
              <div>
                <LineChartCard
                  title="Drop-off Rate Trend"
                  subtitle="Month-over-month learner attrition percentage"
                  data={charts.dropoffTrend}
                  xKey="month"
                  lines={[{ key: "rate", color: "#ba1a1a", name: "Drop-off Rate (%)" }]}
                />
              </div>
            </div>

            {/* ── Table Section ─────────────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#6C1D5F]">Monthly Trends Registry</h3>
                  <p className="text-xs text-[#83727c]">Detailed monthly breakdowns of learning platform activity metrics</p>
                </div>

                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search months..."
                />
              </div>

              <TrendsTable
                trends={paginatedTrends}
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

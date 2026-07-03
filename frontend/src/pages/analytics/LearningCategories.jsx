import React from "react";
import { FolderOpen, BookOpen, Target, Users, Star, TrendingUp } from "lucide-react";
import useScrollToSection from "../../hooks/useScrollToSection";
import useDashboardData from "@/modules/learning-categories/hooks/useDashboardData";
import DashboardContainer from "@/modules/ai-certification/components/DashboardContainer";
import PageHeader from "@/modules/ai-certification/components/PageHeader";
import FilterPanel from "@/modules/ai-certification/components/filters/FilterPanel";
import BarChartCard from "@/modules/ai-certification/components/charts/BarChartCard";
import LineChartCard from "@/modules/ai-certification/components/charts/LineChartCard";
import DonutChartCard from "@/modules/ai-certification/components/charts/DonutChartCard";
import SearchBar from "@/modules/ai-certification/components/SearchBar";
import LoadingSkeleton from "@/modules/ai-certification/components/LoadingSkeleton";
import ErrorState from "@/modules/ai-certification/components/ErrorState";
import EmptyState from "@/modules/ai-certification/components/EmptyState";
import CategoryKPICard from "@/modules/learning-categories/components/cards/CategoryKPICard";
import CategoriesTable from "@/modules/learning-categories/components/tables/CategoriesTable";

export default function LearningCategories() {
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
    paginatedCategories,
    page,
    setPage,
    totalPages,
    kpis,
    charts
  } = useDashboardData();

  const breadcrumbs = [{ label: "Learning Categories" }];

  return (
    <DashboardContainer>
      <PageHeader
        title="Learning Categories Analytics"
        description="Analyze learning content distribution across categories, enrollment trends, completion rates, and category popularity metrics."
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
            <CategoryKPICard
              title="Total Categories"
              value={kpis.totalCategories}
              icon={FolderOpen}
              trend="+3"
              tooltip="Number of active learning categories across the platform"
            />
            <CategoryKPICard
              title="Active Courses"
              value={kpis.totalCourses}
              icon={BookOpen}
              trend="+12"
              tooltip="Total published courses spanning all categories"
            />
            <CategoryKPICard
              title="Avg Completion Rate"
              value={kpis.avgCompletionRate}
              suffix="%"
              icon={Target}
              trend="+4.2%"
              tooltip="Average course completion rate across all categories"
            />
            <CategoryKPICard
              title="Total Enrollments"
              value={kpis.totalEnrollments}
              icon={Users}
              trend="+2.1k"
              tooltip="Cumulative enrollment count across every category"
            />
            <CategoryKPICard
              title="Top Rated Score"
              value={kpis.topRatedScore}
              suffix="/5.0"
              icon={Star}
              trend="+0.2"
              tooltip="Highest average rating among all learning categories"
            />
            <CategoryKPICard
              title="Trending Categories"
              value={kpis.trendingCount}
              icon={TrendingUp}
              trend="+2"
              tooltip="Categories showing accelerated enrollment growth"
            />
          </div>

          {/* ── Charts Row 1 ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="technical" className="lg:col-span-2">
              <BarChartCard
                title="Category-wise Enrollments"
                subtitle="Top categories by total learner enrollment counts"
                data={charts.categoryEnrollments}
                xKey="name"
                bars={[{ key: "enrollments", color: "#6C1D5F", name: "Enrollments" }]}
              />
            </div>
            <div id="leadership">
              <DonutChartCard
                title="Category Type Distribution"
                subtitle="Enrollment share across Technical, Methodology, and Soft Skill types"
                data={charts.typeDistribution}
                nameKey="name"
                valueKey="value"
              />
            </div>
          </div>

          {/* ── Charts Row 2 ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartCard
              title="Monthly Enrollment Trend"
              subtitle="Enrollment and completion volume over the past semester"
              data={charts.enrollmentTrend}
              xKey="month"
              lines={[
                { key: "enrollments", color: "#6C1D5F", name: "Enrollments" },
                { key: "completions", color: "#01AC9F", name: "Completions" }
              ]}
            />
            <div id="compliance">
              <BarChartCard
                title="Completion Rate by Category"
                subtitle="Average course completion percentages for top categories"
                data={charts.completionByCategory}
                xKey="name"
                layout="vertical"
                bars={[{ key: "rate", color: "#01AC9F", name: "Completion Rate (%)" }]}
              />
            </div>
          </div>

          {/* ── Table Section ─────────────────────────────────────── */}
          <div id="soft-skills" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#6C1D5F]">Categories Directory</h3>
                <p className="text-xs text-[#83727c]">Search and explore learning category details, courses, and ratings</p>
              </div>

              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search categories..."
              />
            </div>

            <CategoriesTable
              categories={paginatedCategories}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}

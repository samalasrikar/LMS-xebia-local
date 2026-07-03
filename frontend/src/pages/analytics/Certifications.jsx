import React from "react";
import { Award } from "lucide-react";
import useScrollToSection from "../../hooks/useScrollToSection";
import useDashboardData from "@/modules/ai-certification/hooks/useDashboardData";
import DashboardContainer from "@/modules/ai-certification/components/DashboardContainer";
import PageHeader from "@/modules/ai-certification/components/PageHeader";
import FilterPanel from "@/modules/ai-certification/components/filters/FilterPanel";
import CertificationCard from "@/modules/ai-certification/components/cards/CertificationCard";
import BarChartCard from "@/modules/ai-certification/components/charts/BarChartCard";
import PieChartCard from "@/modules/ai-certification/components/charts/PieChartCard";
import DonutChartCard from "@/modules/ai-certification/components/charts/DonutChartCard";
import FunnelChartCard from "@/modules/ai-certification/components/charts/FunnelChartCard";
import CertificationTable from "@/modules/ai-certification/components/tables/CertificationTable";
import SearchBar from "@/modules/ai-certification/components/SearchBar";
import LoadingSkeleton from "@/modules/ai-certification/components/LoadingSkeleton";
import ErrorState from "@/modules/ai-certification/components/ErrorState";
import EmptyState from "@/modules/ai-certification/components/EmptyState";

export default function Certification() {
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
    paginatedCerts,
    certPage,
    setCertPage,
    totalCertPages,
    kpis,
    charts
  } = useDashboardData();

  // Define dynamic trend seed based on years & quarters to keep the funnel in sync
  const trendSeed = (filters.year === "2026" ? 1.2 : filters.year === "2024" ? 0.8 : 1.0) *
                    (filters.quarter === "Q1" ? 0.95 : filters.quarter === "Q2" ? 1.05 : 1.0);

  const funnelData = [
    { stage: "Exam Registrations", count: Math.round(750 * trendSeed), percent: 100 },
    { stage: "Learning Paths Finished", count: Math.round(590 * trendSeed), percent: 78 },
    { stage: "Internal Mock Exams Passed", count: Math.round(480 * trendSeed), percent: 64 },
    { stage: "Exam Vouchers Issued", count: Math.round(420 * trendSeed), percent: 56 },
    { stage: "Active Certifications", count: Math.round(kpis.certs.activeCertifications), percent: Math.round((kpis.certs.activeCertifications / (750 * trendSeed)) * 100) }
  ];

  const breadcrumbs = [{ label: "Certifications" }];

  return (
    <DashboardContainer>
      <PageHeader
        title="Certifications Analytics"
        description="Verify active certification rates, track upcoming exam completions, monitor voucher utilization, and view technology domain coverage."
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
          <div id="renewals" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <CertificationCard
              title="Vouchers Assigned"
              value={kpis.certs.assignedVouchers}
              type="primary"
            />
            <CertificationCard
              title="Exams Scheduled"
              value={kpis.certs.scheduledExams}
              type="warning"
            />
            <CertificationCard
              title="Certified Employees"
              value={kpis.certs.certifiedEmployees}
              type="default"
            />
            <CertificationCard
              title="Completion Rate"
              value={kpis.certs.completionRate}
              suffix="%"
              type="rate"
            />
          </div>

          {/* ── Charts Grid: Row 1 ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="expired" className="lg:col-span-2">
              <BarChartCard
                title="Technology-wise Certifications"
                subtitle="Distribution of credentials across major cloud providers and frameworks"
                data={charts.certTechDistribution}
                xKey="name"
                bars={[{ key: "value", color: "#6C1D5F", name: "Certifications" }]}
              />
            </div>
            <div>
              <DonutChartCard
                title="Region-wise Certifications"
                subtitle="Credential densities across global business offices"
                data={charts.certRegionDistribution}
                nameKey="name"
                valueKey="value"
              />
            </div>
          </div>

          {/* ── Charts Grid: Row 2 ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <PieChartCard
                title="Business Unit Distribution"
                subtitle="Certifications breakdown by vertical BU divisions"
                data={charts.certBUDistribution}
                nameKey="name"
                valueKey="value"
              />
            </div>
            <div className="lg:col-span-2">
              <BarChartCard
                title="Department-wise Certifications"
                subtitle="Credentials achieved by operational department and sectors"
                data={charts.certDeptDistribution}
                xKey="name"
                bars={[{ key: "certifications", color: "#84117C", name: "Certifications" }]}
              />
            </div>
          </div>

          {/* ── Funnel & Project Charts Row ──────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div id="success-rate">
              <FunnelChartCard
                title="Certification Enablement Funnel"
                subtitle="Step-by-step conversion and drop-off analysis of candidate streams"
                data={funnelData}
              />
            </div>
            <BarChartCard
              title="Top Projects by Certifications"
              subtitle="Key client projects showing the highest credentials density"
              data={charts.certProjectDistribution}
              xKey="name"
              layout="vertical"
              bars={[{ key: "certifications", color: "#01AC9F", name: "Certified Staff" }]}
            />
          </div>

          {/* ── Certifications Table Section ─────────────────────── */}
          <div id="active" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#6C1D5F]">Certifications Registry</h3>
                <p className="text-xs text-[#83727c]">Search, track, and filter historical employee certificate achievements</p>
              </div>

              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search certifications..."
              />
            </div>

            <CertificationTable
              certifications={paginatedCerts}
              currentPage={certPage}
              totalPages={totalCertPages}
              onPageChange={setCertPage}
            />
          </div>
        </div>
      )}
    </DashboardContainer>
  );
}

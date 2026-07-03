import { Download } from "lucide-react";
import useScrollToSection from "../../hooks/useScrollToSection";
import ExecutiveFilters from "../../components/executive/ExecutiveFilters";
import LearningReachCards from "../../components/executive/cards/LearningReachCards";
import LearningDeliveryCards from "../../components/executive/cards/LearningDeliveryCards";
import CertificationCards from "../../components/executive/cards/CertificationCards";
import AIReadinessCards from "../../components/executive/cards/AIReadinessCards";
import TrainingEffectivenessCards from "../../components/executive/cards/TrainingEffectivenessCards";
import ExecutiveCharts from "../../components/executive/charts/ExecutiveCharts";
import ExecutiveTables from "../../components/executive/tables/ExecutiveTables";
import ExecutiveInsights from "../../components/executive/ExecutiveInsights";

export default function ExecutiveSummary() {
  useScrollToSection();

  return (
    <div className="max-w-[1400px] mx-auto w-full space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[21px] font-bold text-slate-900">
            Executive Summary
          </h1>

          <p className="text-[13px] text-slate-500 mt-1">
            View overall learning analytics and executive insights.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Filters */}
      <ExecutiveFilters />

      {/* Organization Overview */}
      <div id="organization-overview" className="space-y-6">
        <LearningReachCards />
        <LearningDeliveryCards />
      </div>

      {/* KPI Summary */}
      <div id="kpi-summary" className="space-y-6">
        <CertificationCards />
        <AIReadinessCards />
        <TrainingEffectivenessCards />
      </div>

      {/* Enrollment Overview */}
      <div id="enrollment-overview" className="space-y-6">
        <ExecutiveCharts />
        <ExecutiveTables />
      </div>

      {/* Executive Insights */}
      <div id="executive-insights">
        <ExecutiveInsights />
      </div>
    </div>
  );
}
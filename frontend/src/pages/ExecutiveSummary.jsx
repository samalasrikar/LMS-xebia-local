import { Download } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ExecutiveFilters from "../components/executive/ExecutiveFilters";
import LearningReachCards from "../components/executive/cards/LearningReachCards";
import LearningDeliveryCards from "../components/executive/cards/LearningDeliveryCards";
import CertificationCards from "../components/executive/cards/CertificationCards";
import AIReadinessCards from "../components/executive/cards/AIReadinessCards";
import TrainingEffectivenessCards from "../components/executive/cards/TrainingEffectivenessCards";
import ExecutiveCharts from "../components/executive/charts/ExecutiveCharts";
import ExecutiveTables from "../components/executive/tables/ExecutiveTables";
import ExecutiveInsights from "../components/executive/ExecutiveInsights";
export default function ExecutiveSummary() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">

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

          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50">
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Filters */}
        <ExecutiveFilters />

        {/* Learning Reach */}
        <LearningReachCards />
        <LearningDeliveryCards />
        <CertificationCards />
        <AIReadinessCards />
        <TrainingEffectivenessCards />
        <ExecutiveCharts />
        <ExecutiveTables />
        <ExecutiveInsights />
      </div>
    </AppLayout>
  );
}
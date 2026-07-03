import useScrollToSection from "../../hooks/useScrollToSection";
import ProjectInvestmentCards from "../../components/project/ProjectInvestmentCards";
import ProjectCharts from "../../components/project/ProjectCharts";
import ProjectInsights from "../../components/project/ProjectInsights";

export default function ProjectLearningInvestment() {
  useScrollToSection();

  return (
    <div className="max-w-[1400px] mx-auto w-full space-y-6 animate-fadeIn">

      <div>
        <h1 className="text-[21px] font-bold text-slate-900">
          Project Learning Investment
        </h1>

        <p className="text-[13px] text-slate-500 mt-1">
          Track learning investment across projects.
        </p>
      </div>

      {/* Budget Allocation */}
      <div id="budget-allocation">
        <ProjectInvestmentCards />
      </div>

      {/* ROI */}
      <div id="roi">
        <ProjectCharts />
      </div>

      {/* Cost Analysis */}
      <div id="cost-analysis">
        <ProjectInsights />
      </div>

      {/* Resource Utilization */}
      <div id="resource-utilization" className="bg-white border rounded-xl p-6 space-y-2 hover-lift transition-all duration-200">
        <h3 className="text-base font-bold text-[#6C1D5F]">Resource Utilization</h3>
        <p className="text-xs text-slate-550">Analyze resource allocation, training hours consumed per project team, and capability alignment ratio.</p>
        <div className="h-28 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center text-xs text-slate-400 italic">
          Resource utilization dashboard metrics are loading.
        </div>
      </div>
    </div>
  );
}
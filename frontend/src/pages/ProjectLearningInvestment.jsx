import AppLayout from "../components/layout/AppLayout";
import ProjectInvestmentCards from "../components/project/ProjectInvestmentCards";
import ProjectCharts from "../components/project/ProjectCharts";
import ProjectInsights from "../components/project/ProjectInsights";
export default function ProjectLearningInvestment() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">

        <div>
          <h1 className="text-[21px] font-bold text-slate-900">
            Project Learning Investment
          </h1>

          <p className="text-[13px] text-slate-500 mt-1">
            Track learning investment across projects.
          </p>
        </div>

        <ProjectInvestmentCards />
<ProjectCharts />

<ProjectInsights />
      </div>
    </AppLayout>
  );
}
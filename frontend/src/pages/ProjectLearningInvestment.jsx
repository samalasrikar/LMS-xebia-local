import AppLayout from "../components/layout/AppLayout";

export default function ProjectLearningInvestment() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        <div>
          <h1 className="text-[21px] font-bold text-slate-900">
            Project Learning Investment
          </h1>

          <p className="text-[13px] text-slate-500 mt-1">
            Analyze learning investment across projects.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
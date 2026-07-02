import AppLayout from "../components/layout/AppLayout";

export default function TrainingEffectiveness() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        <div>
          <h1 className="text-[21px] font-bold text-slate-900">
            Training Effectiveness
          </h1>

          <p className="text-[13px] text-slate-500 mt-1">
            Measure training quality and business impact.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
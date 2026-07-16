import React, { useState, useEffect } from "react";
import { Users, TrendingUp, Timer, Heart, Eye } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

export default function FresherJourney() {
  const { filters, search } = useAnalyticsFilters();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dev Simulators
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState(false);
  const [simEmpty, setSimEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [viewingTrainee, setViewingTrainee] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyticsService.getFresherJourneyDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve fresher journey metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const funnelData = charts.journeyFunnel || [];
  const rows = data?.tables?.content || [];

  return (
    <AnalyticsPageLayout
      title="Fresher Journey Dashboard"
      description="Monitor onboarding performance and trainee milestones across the institution."
      breadcrumbs={[{ label: "Fresher Journey" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || funnelData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsKpiCard title="Total Freshers" value={kpis.totalFreshers} icon={Users} type="primary" />
        <AnalyticsKpiCard title="Onboarding Progress" value={kpis.onboardingProgress} suffix="%" icon={TrendingUp} type="success" />
        <AnalyticsKpiCard title="Avg. Time to Competency" value={kpis.timeToCompetency} icon={Timer} type="info" />
        <AnalyticsKpiCard title="Retention Rate" value={kpis.retentionRate} suffix="%" icon={Heart} type="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Journey Funnel" subtitle="Visualizing progression stages of new freshers">
            <AnalyticsChart type="funnel" data={funnelData} />
          </AnalyticsCard>
        </div>
        <div className="bg-[#6C1D5F] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between select-none">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg">✨</span>
            <h3 className="text-sm font-bold">Journey Insights</h3>
          </div>
          <div className="space-y-4 text-xs font-semibold leading-relaxed">
            <p>Processing recent trainee records reveals a 12% speed increase in Phase 1 modules.</p>
            <p>AI readiness index is scaling in alignment with expectations for this year's campus cohort.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-extrabold text-[#6C1D5F] tracking-tight">Recent Onboarded Trainees</h4>
          <p className="text-[10px] text-slate-400 font-semibold">Trainee path registry and verification records</p>
        </div>
        <AnalyticsTable
          headers={["Trainee Name", "Department", "Start Date", "Progress", "Status", "Actions"]}
          rows={rows}
          currentPage={page}
          totalPages={1}
          onPageChange={setPage}
          renderRow={(row) => (
            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[#6C1D5F]/10 text-[#6C1D5F] flex items-center justify-center font-bold text-xs">
                    {row.name ? row.name.charAt(0) : ""}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[9px] text-slate-400 font-medium">ID: {row.id}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 font-semibold text-slate-500">{row.dept}</td>
              <td className="py-4 px-6 text-slate-450">{row.date}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">{row.progress}%</span>
                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#6C1D5F] h-full rounded-full" style={{ width: `${row.progress}%` }} />
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-purple-50 text-[#6C1D5F] border border-purple-100">
                  {row.status}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => setViewingTrainee(row)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 cursor-pointer border-none bg-transparent"
                >
                  <Eye size={12} />
                </button>
              </td>
            </tr>
          )}
        />
      </div>

      {/* View Trainee Details Dialog */}
      <Dialog open={!!viewingTrainee} onOpenChange={() => setViewingTrainee(null)}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 text-left">
          <DialogHeader className="border-b border-slate-50 pb-4">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">Trainee Onboarding Profile</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  Onboarding progression and competency verification records.
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          {viewingTrainee && (
            <div className="py-4 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-base border border-primary/10">
                  {viewingTrainee.name ? viewingTrainee.name.charAt(0) : ""}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-850 text-sm truncate">{viewingTrainee.name}</h3>
                  <p className="text-[11px] text-slate-450 font-mono truncate">Trainee ID: {viewingTrainee.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-450 font-semibold block uppercase tracking-wider text-[10px]">Department</span>
                  <span className="text-slate-700 font-bold">{viewingTrainee.dept}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-450 font-semibold block uppercase tracking-wider text-[10px]">Start Date</span>
                  <span className="text-slate-700 font-bold">{viewingTrainee.date}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-450 font-semibold block uppercase tracking-wider text-[10px]">Onboarding Stage</span>
                  <span className="text-slate-700 font-bold">{viewingTrainee.stage || "Phase 1 Foundations"}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-450 font-semibold block uppercase tracking-wider text-[10px]">Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-purple-50 text-[#6C1D5F] border border-purple-100">
                    {viewingTrainee.status}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-655">
                  <span>Foundations Progress</span>
                  <span>{viewingTrainee.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#6C1D5F] h-full rounded-full" style={{ width: `${viewingTrainee.progress}%` }} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="pt-3 border-t border-slate-50 flex items-center justify-end">
            <Button
              type="button"
              onClick={() => setViewingTrainee(null)}
              className="text-[12.5px] font-semibold cursor-pointer border border-slate-200 text-slate-750 bg-white hover:bg-slate-50"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnalyticsPageLayout>
  );
}

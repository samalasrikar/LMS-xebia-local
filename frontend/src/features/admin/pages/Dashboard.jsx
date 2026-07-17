import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen, FolderOpen, Calendar, UserPlus, Shield, ShieldAlert, Cpu, Heart, LifeBuoy } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import StatsGrid from "@/features/admin/components/dashboard/StatsGrid";
import EnrollmentChart from "@/features/admin/components/dashboard/EnrollmentChart";
import RecentCoursesTable from "@/features/admin/components/dashboard/RecentCoursesTable";
import RecentActivity from "@/features/admin/components/dashboard/RecentActivity";
import SystemStatus from "@/features/admin/components/dashboard/SystemStatus";
import QuickActions from "@/features/admin/components/dashboard/QuickActions";
import TopCategories from "@/features/admin/components/dashboard/TopCategories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

/* ─── Tab list ────────────────────────────────────────────────────── */
const TABS = ["Overview", "Learners", "Courses", "Revenue", "Reports"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSecurity, setShowSecurity] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showHelpDesk, setShowHelpDesk] = useState(false);
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">

        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              Good morning, Admin 👋
            </h1>
            <p className="text-[13px] text-slate-400 mt-1">
              Here's what's happening with your LMS platform today.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium">
              Last updated: just now
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-[#6C1D5F] hover:bg-[#4A1E47] transition-colors cursor-pointer outline-none border-none">
                  <Plus size={13} /> Quick Create
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white p-1 rounded-xl shadow-lg border border-slate-200">
                <DropdownMenuItem onClick={() => navigate("/courses/create")} className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-[#6C1D5F]/5 hover:text-[#6C1D5F] rounded-lg cursor-pointer transition-colors">
                  <BookOpen size={14} className="text-[#6C1D5F]" />
                  Create Course
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/categories/create")} className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-[#6C1D5F]/5 hover:text-[#6C1D5F] rounded-lg cursor-pointer transition-colors">
                  <FolderOpen size={14} className="text-[#6C1D5F]" />
                  Create Category
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin/events/create")} className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-[#6C1D5F]/5 hover:text-[#6C1D5F] rounded-lg cursor-pointer transition-colors">
                  <Calendar size={14} className="text-[#6C1D5F]" />
                  Create Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/learners")} className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-[#6C1D5F]/5 hover:text-[#6C1D5F] rounded-lg cursor-pointer transition-colors">
                  <UserPlus size={14} className="text-[#6C1D5F]" />
                  Add Learner
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────── */}
        <StatsGrid />

        {/* ── Tabs ─────────────────────────────────────────────────── */}
        <div className="flex border-b border-slate-200 -mb-2">
          {TABS.map((tab, i) => (
            <div
              key={tab}
              className={`px-3.5 py-2.5 text-[13px] font-medium cursor-pointer border-b-2 -mb-px whitespace-nowrap transition-colors ${i === 0
                  ? "text-[#6C1D5F] border-[#6C1D5F] font-semibold"
                  : "text-slate-400 border-transparent hover:text-slate-600"
                }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* ── Main 2-column grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 items-start pt-2">

          {/* Left column */}
          <div className="flex flex-col gap-4">
            <EnrollmentChart />
            <RecentCoursesTable />
            <TopCategories />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <SystemStatus />
            <QuickActions />
            <RecentActivity />
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400 font-medium pt-2 pb-1 border-t border-slate-200">
          <p>© 2024 Xebia LMS Enterprise. Admin Dashboard v2.0</p>
          <div className="flex gap-5 mt-3 md:mt-0 uppercase tracking-widest">
            <span onClick={() => setShowSecurity(true)} className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Security</span>
            <span onClick={() => setShowSystemStatus(true)} className="hover:text-[#6C1D5F] transition-colors cursor-pointer">System Status</span>
            <span onClick={() => setShowHelpDesk(true)} className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Help Desk</span>
          </div>
        </footer>

        {/* ── Security Dialog ── */}
        <Dialog open={showSecurity} onOpenChange={setShowSecurity}>
          <DialogContent className="max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
            <DialogHeader className="flex flex-row items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div>
                <DialogTitle className="text-[16px] font-black text-slate-800">Platform Security Diagnostics</DialogTitle>
                <DialogDescription className="text-[11px] text-slate-400">Real-time status of security controls</DialogDescription>
              </div>
            </DialogHeader>
            <div className="space-y-3.5 my-4">
              <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Firewall Status</span>
                <span className="font-semibold text-emerald-600">Active & Shielded</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">SSL/TLS Certificate</span>
                <span className="font-semibold text-emerald-600">Valid (SHA-256)</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">MFA Enforcement</span>
                <span className="font-semibold text-emerald-600">100% Enforced</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Daily Cloud Backup</span>
                <span className="font-semibold text-slate-700">Completed (04:00 AM)</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Open Security Incidents</span>
                <span className="font-semibold text-emerald-600">0 Alerts</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px]">
                <span className="text-slate-500 font-medium">Active Admin Sessions</span>
                <span className="font-semibold text-slate-700">1 session (this one)</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowSecurity(false)}
                className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer outline-none"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── System Status Dialog ── */}
        <Dialog open={showSystemStatus} onOpenChange={setShowSystemStatus}>
          <DialogContent className="max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
            <DialogHeader className="flex flex-row items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Cpu size={20} />
              </div>
              <div>
                <DialogTitle className="text-[16px] font-black text-slate-800">System Health Metrics</DialogTitle>
                <DialogDescription className="text-[11px] text-slate-400">Detailed latency and availability statistics</DialogDescription>
              </div>
            </DialogHeader>
            <div className="space-y-3.5 my-4">
              {[
                { name: "API Services", uptime: "100% Uptime", latency: "12ms avg", status: "Operational" },
                { name: "Video Streaming", uptime: "99.98% Uptime", latency: "45ms avg", status: "Operational" },
                { name: "CDN (Assets)", uptime: "100% Uptime", latency: "8ms avg", status: "Operational" },
                { name: "Database Service", uptime: "100% Uptime", latency: "3ms avg", status: "Operational" },
                { name: "Auth Identity Provider", uptime: "100% Uptime", latency: "15ms avg", status: "Operational" },
              ].map((svc) => (
                <div key={svc.name} className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                  <div>
                    <span className="text-slate-800 font-semibold block">{svc.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{svc.uptime} • {svc.latency}</span>
                  </div>
                  <span className="font-semibold text-emerald-600 text-[12px] bg-emerald-50 px-2 py-0.5 rounded-full">
                    {svc.status}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center text-[12.5px] pt-1">
                <span className="text-slate-500 font-medium">Average Global Response</span>
                <span className="font-bold text-slate-800">86ms</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowSystemStatus(false)}
                className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer outline-none"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Help Desk Dialog ── */}
        <Dialog open={showHelpDesk} onOpenChange={setShowHelpDesk}>
          <DialogContent className="max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
            <DialogHeader className="flex flex-row items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <LifeBuoy size={20} />
              </div>
              <div>
                <DialogTitle className="text-[16px] font-black text-slate-800">IT Help Desk & Support</DialogTitle>
                <DialogDescription className="text-[11px] text-slate-400">Enterprise support contacts and guidelines</DialogDescription>
              </div>
            </DialogHeader>
            <div className="space-y-3.5 my-4">
              <p className="text-[12.5px] text-slate-500 leading-relaxed">
                If you encounter any platform issues, need workspace adjustments, or require infrastructure scaling, please reach out to Xebia IT Administration.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="text-[12px] text-slate-600">
                  <span className="font-semibold text-slate-700">Support Email:</span>{" "}
                  <a href="mailto:enterprise-support@xebia.com" className="text-[#6C1D5F] hover:underline font-medium">
                    enterprise-support@xebia.com
                  </a>
                </div>
                <div className="text-[12px] text-slate-600">
                  <span className="font-semibold text-slate-700">Hotline:</span>{" "}
                  <span className="font-medium text-slate-800">+1 (800) 555-0199</span>
                </div>
                <div className="text-[12px] text-slate-600">
                  <span className="font-semibold text-slate-700">Response SLA:</span>{" "}
                  <span className="font-medium text-slate-800">&lt; 1 hour (Critical Priority)</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 leading-snug">
                Operational hours are Monday through Friday, 9:00 AM – 6:00 PM EST. For high severity outages, the automated paging system is active 24/7.
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowHelpDesk(false)}
                className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer outline-none"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </AppLayout>
  );
}
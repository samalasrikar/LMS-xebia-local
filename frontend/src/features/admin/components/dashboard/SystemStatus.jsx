import { useState } from "react";
import { Cpu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

/* System Status card — from Banani LMS Admin Dashboard */
const SERVICES = [
  { name: "API Services", status: "operational", value: "100% uptime", latency: "12ms avg" },
  { name: "Video Streaming", status: "operational", value: "99.98% uptime", latency: "45ms avg" },
  { name: "CDN", status: "operational", value: "100% uptime", latency: "8ms avg" },
  { name: "Database", status: "operational", value: "100% uptime", latency: "3ms avg" },
  { name: "Auth Service", status: "operational", value: "100% uptime", latency: "15ms avg" },
];

const STATUS_DOT = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
};

export default function SystemStatus() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div className="text-[13px] font-bold text-slate-900">System Status</div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          All Systems OK
        </span>
      </div>

      {/* Service list */}
      <div className="px-[18px] py-1">
        {SERVICES.map((svc, i) => (
          <div
            key={svc.name}
            className={`flex items-center justify-between py-2 ${i < SERVICES.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[svc.status]}`} />
              {svc.name}
            </div>
            <span
              className={`text-[11px] font-medium ${svc.status === "degraded" ? "text-amber-600 font-semibold" : "text-slate-400"
                }`}
            >
              {svc.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-[18px] py-2.5 border-t border-slate-100 bg-slate-50">
        <span className="text-[11px] text-slate-400">Last checked 2 min ago</span>
        <button onClick={() => setShowDetails(true)} className="text-[11px] font-medium text-slate-500 border border-slate-200 rounded px-2 py-0.5 hover:bg-white transition-colors cursor-pointer outline-none">
          View details
        </button>
      </div>

      {/* ── System Status Dialog ── */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
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
            {SERVICES.map((svc) => (
              <div key={svc.name} className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                <div>
                  <span className="text-slate-800 font-semibold block">{svc.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{svc.value} • {svc.latency}</span>
                </div>
                <span className="font-semibold text-emerald-600 text-[12px] bg-emerald-50 px-2 py-0.5 rounded-full">
                  {svc.status === "operational" ? "Operational" : svc.status}
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
              onClick={() => setShowDetails(false)}
              className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer outline-none"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

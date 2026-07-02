import React from "react";
import { Clock, Target, ChevronLeft, ChevronRight } from "lucide-react";

export default function LearningHoursTable({
  records = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  const statusColors = {
    "Exceeded": "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20",
    "On Track": "bg-[#6C1D5F]/10 text-[#6C1D5F] border-[#6C1D5F]/20",
    "Behind": "bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/20"
  };

  return (
    <div className="bg-white rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F8FC] border-b border-[#d5c1cc]/50 text-xs font-bold text-[#83727c]">
              <th className="py-4 px-6 text-[#6C1D5F]">Employee</th>
              <th className="py-4 px-4">Department & BU</th>
              <th className="py-4 px-4 text-center">Self-Paced</th>
              <th className="py-4 px-4 text-center">Guided</th>
              <th className="py-4 px-4 text-center">Total Hours</th>
              <th className="py-4 px-4 text-center">Target Progress</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5c1cc]/30 text-sm">
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-[#83727c] font-medium">
                  No learning hours records match the selected filters.
                </td>
              </tr>
            ) : (
              records.map((record) => {
                const progress = record.targetHours > 0
                  ? Math.min(100, Math.round((record.totalHours / record.targetHours) * 100))
                  : 0;
                const progressColor = progress >= 100
                  ? "bg-[#01AC9F]"
                  : progress >= 80
                    ? "bg-[#6C1D5F]"
                    : "bg-[#ba1a1a]";

                return (
                  <tr
                    key={record.id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center font-extrabold text-[#6C1D5F] text-xs">
                          {record.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800">{record.name}</p>
                          <p className="text-[11px] text-[#83727c] font-semibold">{record.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800 text-xs">{record.department}</p>
                      <p className="text-[10px] text-[#83727c] font-semibold">{record.bu}</p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Clock size={12} className="text-[#83727c]" />
                        {record.selfPacedHours} hrs
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Clock size={12} className="text-[#83727c]" />
                        {record.guidedHours} hrs
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                      {record.totalHours} hrs
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 min-w-[36px]">{progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-xl border ${statusColors[record.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        <Target size={11} />
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-[#F7F8FC] border-t border-[#d5c1cc]/50">
          <p className="text-xs text-[#83727c] font-semibold">
            Page <span className="font-bold text-[#6C1D5F]">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="
                p-1.5 rounded-xl border border-[#d5c1cc] bg-white text-[#83727c] hover:bg-slate-50
                disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer
              "
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
                p-1.5 rounded-xl border border-[#d5c1cc] bg-white text-[#83727c] hover:bg-slate-50
                disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

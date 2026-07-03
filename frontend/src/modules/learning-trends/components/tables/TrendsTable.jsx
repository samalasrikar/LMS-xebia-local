import React from "react";
import { TrendingDown, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

export default function TrendsTable({
  trends = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  return (
    <div className="bg-white rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F8FC] border-b border-[#d5c1cc]/50 text-xs font-bold text-[#83727c]">
              <th className="py-4 px-6 text-[#6C1D5F]">Month</th>
              <th className="py-4 px-4 text-center">Enrollments</th>
              <th className="py-4 px-4 text-center">Completions</th>
              <th className="py-4 px-4 text-center">Completion Rate</th>
              <th className="py-4 px-4 text-center">Active Users</th>
              <th className="py-4 px-4 text-center">New Users</th>
              <th className="py-4 px-4 text-center">Drop-off Rate</th>
              <th className="py-4 px-6 text-right">Learning Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5c1cc]/30 text-sm">
            {trends.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-[#83727c] font-medium">
                  No trend data matches the selected filters.
                </td>
              </tr>
            ) : (
              trends.map((trend) => {
                const rate = trend.enrollments > 0
                  ? Math.round((trend.completions / trend.enrollments) * 100)
                  : 0;
                const isLowDropoff = trend.dropoffRate < 7;

                return (
                  <tr
                    key={trend.id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-[#6C1D5F]/10 flex items-center justify-center font-extrabold text-[#6C1D5F] text-[10px]">
                          {trend.month.slice(0, 3)}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800">{trend.month}</p>
                          <p className="text-[10px] text-[#83727c] font-semibold">{trend.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                      {trend.enrollments.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                      {trend.completions.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full border ${
                        rate >= 85
                          ? "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20"
                          : rate >= 70
                            ? "bg-[#6C1D5F]/10 text-[#6C1D5F] border-[#6C1D5F]/20"
                            : "bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/20"
                      }`}>
                        {rate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-slate-700">
                      {trend.activeUsers.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#01AC9F]">
                        <TrendingUp size={11} />
                        +{trend.newUsers}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                        isLowDropoff ? "text-[#01AC9F]" : "text-[#ba1a1a]"
                      }`}>
                        {isLowDropoff ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                        {trend.dropoffRate}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-extrabold text-[#6C1D5F]">
                      {trend.hours.toLocaleString()}
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

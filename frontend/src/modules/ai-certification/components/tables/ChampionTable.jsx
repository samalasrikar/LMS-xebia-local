import React from "react";
import { Award, Zap, ChevronLeft, ChevronRight } from "lucide-react";

export default function ChampionTable({
  champions = [],
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
              <th className="py-4 px-6 text-[#6C1D5F]">Champion Name</th>
              <th className="py-4 px-4">Department & BU</th>
              <th className="py-4 px-4 text-center">Learning Hours</th>
              <th className="py-4 px-4 text-center">Certifications</th>
              <th className="py-4 px-4 text-center">Readiness Score</th>
              <th className="py-4 px-6 text-right">Recognition Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5c1cc]/30 text-sm">
            {champions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#83727c] font-medium">
                  No learning champions match the selected filters.
                </td>
              </tr>
            ) : (
              champions.map((champion) => (
                <tr
                  key={champion.id}
                  className="hover:bg-slate-50/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center font-extrabold text-[#6C1D5F] text-xs">
                        {champion.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800">{champion.name}</p>
                        <p className="text-[11px] text-[#83727c] font-semibold">{champion.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800 text-xs">{champion.department}</p>
                    <p className="text-[10px] text-[#83727c] font-semibold">{champion.bu}</p>
                  </td>
                  <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                    {champion.learningHours} hrs
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center justify-center bg-[#84117C]/10 text-[#84117C] text-xs font-black px-2.5 py-1 rounded-full border border-[#84117C]/20">
                      {champion.certsCount} Certs
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap size={13} className="text-amber-500 fill-amber-500" />
                      <span className="font-black text-slate-800">{champion.readinessScore}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center gap-1 bg-[#6C1D5F]/10 text-[#6C1D5F] text-xs font-black px-3 py-1 rounded-xl border border-[#6C1D5F]/20">
                      <Award size={12} />
                      {champion.recognition}
                    </span>
                  </td>
                </tr>
              ))
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

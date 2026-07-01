import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Star } from "lucide-react";

export default function ProgramTable({
  programs = [],
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
              <th className="py-4 px-6 text-[#6C1D5F]">Program Name</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4 text-center">Participants</th>
              <th className="py-4 px-4">Completion Rate</th>
              <th className="py-4 px-4 text-center">Feedback Rating</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5c1cc]/30 text-sm">
            {programs.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#83727c] font-medium">
                  No programs match the selected filters.
                </td>
              </tr>
            ) : (
              programs.map((prog) => {
                const isActive = prog.status === "Active";

                return (
                  <tr
                    key={prog.id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-extrabold text-slate-800">
                      {prog.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center text-xs font-bold text-slate-600 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {prog.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                      {prog.participantsCount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 w-48">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-slate-700">{prog.completionRate}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                          <div
                            className="bg-[#6C1D5F] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${prog.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        <span className="font-black text-slate-800">{prog.feedbackRating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full border ${
                          isActive
                            ? "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {isActive ? <PlayCircle size={12} /> : <CheckCircle2 size={12} />}
                        {prog.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

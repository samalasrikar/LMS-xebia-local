import React from "react";
import { Star, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriesTable({
  categories = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  const typeColors = {
    "Technical": "bg-[#6C1D5F]/10 text-[#6C1D5F] border-[#6C1D5F]/20",
    "Methodology": "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20",
    "Soft Skill": "bg-amber-50 text-amber-700 border-amber-200"
  };

  return (
    <div className="bg-white rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F8FC] border-b border-[#d5c1cc]/50 text-xs font-bold text-[#83727c]">
              <th className="py-4 px-6 text-[#6C1D5F]">Category Name</th>
              <th className="py-4 px-4">Type</th>
              <th className="py-4 px-4 text-center">Courses</th>
              <th className="py-4 px-4 text-center">Enrollments</th>
              <th className="py-4 px-4 text-center">Completion Rate</th>
              <th className="py-4 px-4 text-center">Avg Rating</th>
              <th className="py-4 px-6 text-right">Trending</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5c1cc]/30 text-sm">
            {categories.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-[#83727c] font-medium">
                  No categories match the selected filters.
                </td>
              </tr>
            ) : (
              categories.map((cat) => {
                const rateColor = cat.completionRate >= 85
                  ? "bg-[#01AC9F]"
                  : cat.completionRate >= 70
                    ? "bg-[#6C1D5F]"
                    : "bg-[#ba1a1a]";

                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-[#6C1D5F]/10 flex items-center justify-center font-extrabold text-[#6C1D5F] text-[10px]">
                          {cat.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800 text-sm">{cat.name}</p>
                          <p className="text-[10px] text-[#83727c] font-semibold">{cat.totalHours.toLocaleString()} total hours</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex text-[11px] font-black px-2.5 py-1 rounded-lg border ${typeColors[cat.type] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {cat.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                      {cat.coursesCount}
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-800">
                      {cat.enrollments.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${rateColor}`}
                            style={{ width: `${cat.completionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 min-w-[30px]">{cat.completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={13} className="text-amber-500 fill-amber-500" />
                        <span className="font-black text-slate-800">{cat.avgRating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {cat.trending ? (
                        <span className="inline-flex items-center gap-1 bg-[#01AC9F]/10 text-[#01AC9F] text-xs font-black px-3 py-1 rounded-xl border border-[#01AC9F]/20">
                          <TrendingUp size={12} />
                          Trending
                        </span>
                      ) : (
                        <span className="text-xs text-[#83727c] font-semibold">—</span>
                      )}
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

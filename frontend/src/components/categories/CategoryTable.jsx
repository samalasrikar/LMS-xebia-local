import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import CategoryRow from "./CategoryRow";

export default function CategoryTable({
  categories,
  loading,
  viewMode = "grid",
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#6C1D5F] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Loading categories…</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex items-center justify-center">
        <p className="text-sm text-slate-400">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {viewMode === "grid" ? (
        /* ── Grid View ─────────────────────────────────── */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={i}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        /* ── List / Table View ─────────────────────────── */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  {["Image", "Category Name", "Description", "Courses", "Status", "Updated", "Actions"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={`px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${
                          i === 6 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    cat={cat}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-slate-700">1 – {categories.length}</span> of{" "}
              <span className="font-bold text-slate-700">{categories.length}</span> categories
            </p>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-40 cursor-not-allowed" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#6C1D5F] text-white text-xs font-bold shadow-sm">
                1
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-40 cursor-not-allowed" disabled>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { Edit, Trash2, GraduationCap, Users, MoreHorizontal } from "lucide-react";
import { useState } from "react";

/* Accent colours cycling per card index — matches Stitch mockup palette */
const ACCENTS = [
  { border: "border-t-[#6C1D5F]",   bar: "#6C1D5F",  badge: "bg-[#6C1D5F]/8 text-[#6C1D5F]" },
  { border: "border-t-[#01AC9F]",   bar: "#01AC9F",  badge: "bg-[#01AC9F]/10 text-[#01AC9F]" },
  { border: "border-t-amber-500",   bar: "#d97706",  badge: "bg-amber-50 text-amber-600" },
  { border: "border-t-blue-500",    bar: "#3b82f6",  badge: "bg-blue-50 text-blue-600" },
  { border: "border-t-rose-500",    bar: "#e11d48",  badge: "bg-rose-50 text-rose-600" },
  { border: "border-t-indigo-500",  bar: "#6366f1",  badge: "bg-indigo-50 text-indigo-600" },
];

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Updated today";
    if (days === 1) return "Updated yesterday";
    if (days < 30) return `Updated ${days}d ago`;
    const months = Math.floor(days / 30);
    return `Updated ${months}mo ago`;
  } catch {
    return "—";
  }
}

export default function CategoryCard({ cat, index = 0, onView, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  const completion = cat.completion ?? null;
  const learners = cat.learners ?? null;

  return (
    <div
      className={`
        relative bg-white rounded-2xl border border-slate-200/80 border-t-4 ${accent.border}
        shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200
        flex flex-col group cursor-pointer overflow-hidden
      `}
      onClick={() => onView(cat)}
    >
      {/* Category image strip */}
      {cat.image && (
        <div className="w-full h-20 overflow-hidden">
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">{cat.name}</h3>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {cat.description || "No description provided."}
            </p>
          </div>

          {/* Menu button */}
          <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <MoreHorizontal size={15} />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-32">
                  <button
                    onClick={() => { setMenuOpen(false); onEdit(cat); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Edit size={13} /> Edit
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(cat); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats row: Courses | Learners | Completion */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-slate-900 tabular-nums">{cat.courses ?? 0}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide">Courses</span>
          </div>
          <div className="w-px h-6 bg-slate-100" />
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {learners != null ? (learners >= 1000 ? `${(learners / 1000).toFixed(1)}k` : learners) : "—"}
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide">Learners</span>
          </div>
          {completion != null && (
            <>
              <div className="w-px h-6 bg-slate-100" />
              <div className="flex flex-col items-center">
                <span className="text-base font-bold text-slate-900 tabular-nums">{completion}%</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wide">Completion</span>
              </div>
            </>
          )}
        </div>

        {/* Completion progress bar */}
        {completion != null && (
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${completion}%`, background: accent.bar }}
            />
          </div>
        )}

        {/* Footer: status + date */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t border-slate-100">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              cat.status === "Active"
                ? "bg-[#01AC9F]/10 text-[#01AC9F]"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                cat.status === "Active" ? "bg-[#01AC9F]" : "bg-slate-400"
              }`}
            />
            {cat.status === "Active" ? "● Published" : "● Draft"}
          </span>
          <span className="text-[10px] text-slate-400">{formatDate(cat.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}

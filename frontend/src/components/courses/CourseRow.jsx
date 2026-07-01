import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  BookOpen,
  Trash2,
  MoreVertical,
  BarChart2,
  Eye,
  Archive,
  Star,
} from "lucide-react";
import courseService from "../../services/courseService";

const DIFFICULTY_COLORS = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  Advanced: "bg-orange-100 text-orange-700 border-orange-200",
  Expert: "bg-red-100 text-red-700 border-red-200",
};

const STATUS_COLORS = {
  Published: "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20",
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  Archived: "bg-slate-100 text-slate-500 border-slate-200",
};

function Toggle({ checked, onChange, color = "#6C1D5F" }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
        checked ? "bg-[#6C1D5F]" : "bg-slate-200"
      }`}
      style={checked ? { backgroundColor: color } : {}}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function CourseRow({
  course,
  selected,
  onSelect,
  onDelete,
  onRefresh,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  /* ── API toggle helpers ─────────────────────────────────────────────────── */

  const toggleField = async (fieldPatch) => {
    if (updating) return;
    setUpdating(true);
    try {
      await courseService.updateCourse(course.dbId, fieldPatch);
      onRefresh?.();
    } catch (err) {
      console.error("Failed to update course:", err);
    } finally {
      setUpdating(false);
    }
  };

  const togglePublished = () => {
    const newStatus = course.status === "Published" ? "Draft" : "Published";
    toggleField({ status: newStatus });
  };

  const toggleActive = () => {
    // Backend field: isActive (boolean)
    toggleField({ isActive: !course.isActive });
  };

  const toggleFeatured = () => {
    // Backend field: featured (boolean)
    toggleField({ featured: !course.featured });
  };

  return (
    <tr
      className={`hover:bg-slate-50/60 transition-colors group ${
        selected ? "bg-[#6C1D5F]/4" : ""
      } ${updating ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Checkbox */}
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="w-4 h-4 rounded border-slate-300 accent-[#6C1D5F] cursor-pointer"
        />
      </td>

      {/* Thumbnail */}
      <td className="px-3 py-3">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-14 h-9 rounded-lg object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-14 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <BookOpen size={16} className="text-slate-300" />
          </div>
        )}
      </td>

      {/* Title + category */}
      <td className="px-4 py-3 min-w-[180px]">
        <div
          className="font-bold text-xs text-slate-800 cursor-pointer hover:text-[#6C1D5F] transition-colors"
          onClick={() => navigate(`/courses/${course.dbId}/edit`)}
        >
          {course.title}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">{course.category}</div>
      </td>

      {/* Category badge */}
      <td className="px-3 py-3">
        <span className="px-2.5 py-1 bg-[#6C1D5F]/8 text-[#6C1D5F] text-[10px] font-bold rounded-full whitespace-nowrap">
          {course.category}
        </span>
      </td>

      {/* Difficulty */}
      <td className="px-3 py-3">
        <span
          className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${
            DIFFICULTY_COLORS[course.difficulty] ?? "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {course.difficulty ?? "—"}
        </span>
      </td>

      {/* Duration */}
      <td className="px-3 py-3 text-xs text-slate-600 whitespace-nowrap">
        {course.duration ?? "—"}
      </td>

      {/* Language — from API field; "—" if not returned */}
      <td className="px-3 py-3 text-xs font-bold text-slate-500 uppercase">
        {course.language ?? "—"}
      </td>

      {/* Published toggle */}
      <td className="px-3 py-3">
        <div className="flex flex-col items-center gap-0.5">
          <Toggle
            checked={course.status === "Published"}
            onChange={togglePublished}
            color="#01AC9F"
          />
          <span
            className={`text-[9px] font-bold ${
              course.status === "Published" ? "text-[#01AC9F]" : "text-slate-400"
            }`}
          >
            {course.status ?? "Draft"}
          </span>
        </div>
      </td>

      {/* Active toggle */}
      <td className="px-3 py-3">
        <div className="flex flex-col items-center gap-0.5">
          <Toggle
            checked={course.isActive === true}
            onChange={toggleActive}
            color="#6C1D5F"
          />
          <span className={`text-[9px] font-bold ${course.isActive ? "text-[#6C1D5F]" : "text-slate-400"}`}>
            {course.isActive ? "Active" : "Off"}
          </span>
        </div>
      </td>

      {/* Featured toggle */}
      <td className="px-3 py-3">
        <Toggle
          checked={course.featured === true}
          onChange={toggleFeatured}
          color="#ff83ec"
        />
      </td>

      {/* Learner count */}
      <td className="px-3 py-3 text-xs font-bold text-slate-700">
        {course.learnerCount != null
          ? course.learnerCount.toLocaleString()
          : "—"}
      </td>

      {/* Updated date */}
      <td className="px-3 py-3 text-xs text-slate-400 whitespace-nowrap">
        {course.updatedAt ?? course.createdDate ?? "—"}
      </td>

      {/* Actions kebab */}
      <td className="px-3 py-3 text-right">
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-xl shadow-xl py-1 w-44 text-xs">
                <button
                  onClick={() => { setMenuOpen(false); navigate(`/courses/${course.dbId}/edit`); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Edit size={13} /> Edit Course
                </button>
                <button
                  onClick={() => { setMenuOpen(false); navigate(`/courses/${course.dbId}/curriculum`); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <BookOpen size={13} /> Curriculum Builder
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Eye size={13} /> Preview
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <BarChart2 size={13} /> Analytics
                </button>
                <button
                  onClick={() => { setMenuOpen(false); toggleFeatured(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Star size={13} /> Toggle Featured
                </button>
                <button
                  onClick={() => { setMenuOpen(false); toggleField({ status: "Archived" }); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Archive size={13} /> Archive
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => { setMenuOpen(false); onDelete(course); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

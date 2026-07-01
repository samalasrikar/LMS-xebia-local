import { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, Globe, CheckCircle, Archive, Star } from "lucide-react";
import CourseRow from "./CourseRow";
import courseService from "../../services/courseService";

const COLS = [
  "", // checkbox
  "Thumbnail",
  "Title",
  "Category",
  "Difficulty",
  "Duration",
  "Lang",
  "Published",
  "Active",
  "Featured",
  "Learners",
  "Updated",
  "", // actions
];

export default function CourseTable({
  courses,
  loading,
  selectedIds,
  onSelectId,
  onSelectAll,
  onDelete,
  onRefresh,
}) {
  const allSelected = courses.length > 0 && selectedIds.length === courses.length;
  const someSelected = selectedIds.length > 0;

  /* ── Bulk actions ─────────────────────────────────── */
  const handleBulkPublish = async () => {
    await Promise.allSettled(
      selectedIds.map((id) => courseService.updateCourse(id, { status: "Published" }))
    );
    onRefresh?.();
  };

  const handleBulkFeature = async () => {
    await Promise.allSettled(
      selectedIds.map((id) => courseService.updateCourse(id, { featured: true }))
    );
    onRefresh?.();
  };

  const handleBulkArchive = async () => {
    await Promise.allSettled(
      selectedIds.map((id) => courseService.updateCourse(id, { status: "Archived" }))
    );
    onRefresh?.();
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} course(s)? This cannot be undone.`)) return;
    await Promise.allSettled(
      selectedIds.map((id) => courseService.deleteCourse(id))
    );
    onRefresh?.();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* ── Bulk action bar ────────────────────────────── */}
      {someSelected && (
        <div className="flex items-center gap-3 px-5 py-2.5 bg-[#6C1D5F]/5 border-b border-[#6C1D5F]/15">
          <span className="text-xs font-bold text-[#6C1D5F]">
            {selectedIds.length} selected
          </span>
          <button
            onClick={handleBulkPublish}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#01AC9F] text-white text-[10px] font-bold rounded-lg hover:bg-[#019a8d] transition-colors cursor-pointer"
          >
            <CheckCircle size={12} /> Publish
          </button>
          <button
            onClick={handleBulkFeature}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition-colors cursor-pointer"
          >
            <Star size={12} /> Feature
          </button>
          <button
            onClick={handleBulkArchive}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 text-white text-[10px] font-bold rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Archive size={12} /> Archive
          </button>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            <Trash2 size={12} /> Delete
          </button>
          <button
            onClick={() => onSelectAll(false)}
            className="ml-auto text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* ── Table ─────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              {/* Select all */}
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 accent-[#6C1D5F] cursor-pointer"
                />
              </th>
              {COLS.slice(1).map((col, i) => (
                <th
                  key={i}
                  className="px-3 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={COLS.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#6C1D5F] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-slate-400">Loading courses…</p>
                  </div>
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={COLS.length} className="py-16 text-center">
                  <Globe size={32} className="text-slate-200 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No courses found.</p>
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  selected={selectedIds.includes(course.dbId)}
                  onSelect={() => onSelectId(course.dbId)}
                  onDelete={onDelete}
                  onRefresh={onRefresh}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ─────────────────────────────────── */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-700">1 – {courses.length}</span> of{" "}
          <span className="font-bold text-slate-700">{courses.length}</span> results
        </p>
        <div className="flex items-center gap-1.5">
          <button
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-40 cursor-not-allowed"
            disabled
          >
            <ChevronLeft size={16} />
          </button>
          <button className="w-7 h-7 rounded-lg bg-[#6C1D5F] text-white text-xs font-bold shadow-sm">
            1
          </button>
          <button
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-40 cursor-not-allowed"
            disabled
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseRow from "./CourseRow";

export default function CourseTable({
  courses,
  loading,
  searchQuery,
  selectedCategory,
  onDelete,
}) {
  const filtered = courses
    .filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((c) =>
      selectedCategory === "All Categories" || c.category === selectedCategory
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thumbnail</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider min-w-[200px]">Title</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Curriculum</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Created Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-xs text-slate-400">Loading courses...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-xs text-slate-400">No courses found.</td>
              </tr>
            ) : (
              filtered.map((course) => (
                <CourseRow key={course.id} course={course} onDelete={onDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-700">1 - {filtered.length}</span> of{" "}
          <span className="font-bold text-slate-700">{courses.length}</span> courses
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="w-7 h-7 rounded-lg bg-[#6C1D5F] text-white text-xs font-bold shadow-sm">1</button>
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

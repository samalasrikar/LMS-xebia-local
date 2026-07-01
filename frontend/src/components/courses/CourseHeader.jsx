import { Link, useNavigate } from "react-router-dom";
import { Plus, Download, Upload, ChevronRight } from "lucide-react";

export default function CourseHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
        <span className="hover:text-[#6C1D5F] cursor-pointer transition-colors" onClick={() => navigate("/")}>
          Xebia LMS
        </span>
        <ChevronRight size={12} className="text-slate-300" />
        <span className="text-slate-400">Content</span>
        <ChevronRight size={12} className="text-slate-300" />
        <span className="text-slate-700 font-semibold">Courses</span>
      </nav>

      {/* Main Title & CTA actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Courses</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage, publish, and organize all learning courses on your platform.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
            <Download size={13} />
            Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
            <Upload size={13} />
            Import
          </button>
          <Link
            to="/courses/create"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer animate-fadeIn"
          >
            <Plus size={14} />
            New Course
          </Link>
        </div>
      </div>
    </div>
  );
}

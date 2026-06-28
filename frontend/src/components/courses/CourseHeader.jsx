import { Link } from "react-router-dom";
import {
  Plus,
  Download,
  Upload,
} from "lucide-react";

export default function CourseHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
        <p className="text-slate-500 text-sm mt-1">Manage, monitor, and update your educational catalog.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <Upload size={14} />
          Import
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <Download size={14} />
          Export
        </button>
        <Link
          to="/courses/create"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
        >
          <Plus size={14} />
          Create Course
        </Link>
      </div>
    </div>
  );
}

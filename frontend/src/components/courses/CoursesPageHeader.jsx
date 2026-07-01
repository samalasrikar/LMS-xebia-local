import { useNavigate } from "react-router-dom";
import { Download, Upload, Plus } from "lucide-react";

export default function CoursesPageHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-[21px] font-bold text-slate-900 tracking-tight">Courses</h1>
        <p className="text-[13px] text-slate-400 mt-1">
          Manage, publish, and organize all learning courses on your platform.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors">
          <Download size={13} /> Export
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors">
          <Upload size={13} /> Import
        </button>
        <button
          onClick={() => navigate("/courses/create")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#6C1D5F] rounded-md hover:bg-[#4A1E47] transition-colors"
        >
          <Plus size={13} /> New Course
        </button>
      </div>
    </div>
  );
}

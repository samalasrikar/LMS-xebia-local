import {
  GraduationCap,
  CheckCircle,
  FileText,
  Users,
} from "lucide-react";

export default function CourseStats({ courses }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#F7F8FC] flex items-center justify-center text-[#6C1D5F]">
          <GraduationCap size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Courses</p>
          <p className="text-lg font-bold text-slate-900">{courses.length}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-700">
          <CheckCircle size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Published</p>
          <p className="text-lg font-bold text-green-700">{courses.filter((c) => c.status === "Published").length}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
          <FileText size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drafts</p>
          <p className="text-lg font-bold text-amber-700">{courses.filter((c) => c.status === "Draft").length}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F]">
          <Users size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
          <p className="text-lg font-bold text-[#4A1E47]">12.4k</p>
        </div>
      </div>
    </div>
  );
}

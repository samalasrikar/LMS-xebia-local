import { BookOpen, Users, CheckCircle, FileCheck, Brain, MoreVertical, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const kpis = [
    { title: "Active Courses", val: "24", icon: BookOpen, accent: "text-primary" },
    { title: "Learners", val: "1,280", icon: Users, accent: "text-primary" },
    { title: "Comp. Rate", val: "78%", icon: CheckCircle, accent: "text-primary" },
    { title: "Approvals", val: "12", icon: FileCheck, accent: "text-red-500" },
    { title: "Active Trainers", val: "42", icon: Brain, accent: "text-primary" },
    { title: "Batches", val: "18", icon: Users, accent: "text-primary" },
  ];

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-[24px] font-bold text-slate-800">Dashboard</h1>
        <p className="text-[13px] text-slate-400 mt-1">Overview of your learning ecosystem performance.</p>
      </div>

      {/* KPI Cards Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-4 pb-3 scrollbar-thin">
        {kpis.map((k, index) => {
          const Icon = k.icon;
          return (
            <div key={index} className="min-w-[150px] flex-1 p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <Icon className={`${k.accent} mb-3`} size={20} />
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{k.title}</div>
                <div className={`text-[20px] font-extrabold ${k.accent} mt-1`}>{k.val}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento Grid Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-bold text-slate-900">Learning Activity</h3>
            <button className="text-slate-400 hover:text-slate-650">
              <MoreVertical size={16} />
            </button>
          </div>
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3.5"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6C1D5F" strokeWidth="3.5" strokeDasharray="65, 100" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#84117C" strokeWidth="3.5" strokeDasharray="20, 100" strokeDashoffset="-65" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#cbd5e1" strokeWidth="3.5" strokeDasharray="15, 100" strokeDashoffset="-85" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[20px] font-bold text-primary">840</span>
              <span className="text-[8px] uppercase font-bold text-slate-450 tracking-widest mt-0.5">Hours</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Video (65%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <div className="w-2 h-2 rounded-full bg-[#84117C]"></div>
              <span>Quizzes (20%)</span>
            </div>
          </div>
        </div>

        {/* Recruitment Funnel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-bold text-slate-900">Recruitment Funnel</h3>
            <TrendingUp size={16} className="text-slate-450" />
          </div>
          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">Applicants</span>
                <span className="text-slate-800">420</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-full"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">Screened</span>
                <span className="text-slate-800">210</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/2"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">Shortlisted</span>
                <span className="text-slate-800">85</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[20%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[14px] font-bold text-slate-900">Course Progress Trend</h3>
          <span className="text-[11px] font-bold text-[#84117C] bg-purple-50 px-2 py-0.5 rounded">Weekly</span>
        </div>
        <div className="h-44 w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-end">
          <svg className="w-full h-[80%]" preserveAspectRatio="none" viewBox="0 0 500 200">
            <path d="M0,150 Q50,110 100,130 T200,60 T300,100 T400,30 T500,70 L500,200 L0,200 Z" fill="url(#grad2)"></path>
            <path d="M0,150 Q50,110 100,130 T200,60 T300,100 T400,30 T500,70" fill="none" stroke="#84117C" strokeWidth="3"></path>
            <defs>
              <linearGradient id="grad2" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#84117C", stopOpacity: 0.2 }}></stop>
                <stop offset="100%" style={{ stopColor: "#84117C", stopOpacity: 0 }}></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Running Batches List */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-[14px] font-bold text-slate-900 mb-4">Running Batches</h3>
        <div className="space-y-3.5">
          {[
            { id: "Batch-A9", progress: 85, students: "45 learners", days: "14 days left" },
            { id: "Batch-C2", progress: 42, students: "38 learners", days: "28 days left" },
            { id: "Batch-B4", progress: 68, students: "40 learners", days: "21 days left" }
          ].map((b, i) => (
            <div key={i} className="flex flex-col gap-1 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex justify-between items-center text-[12px] font-bold text-slate-800">
                <span>{b.id}</span>
                <span className="text-primary">{b.progress}%</span>
              </div>
              <div className="w-full bg-slate-105 h-2 rounded-full overflow-hidden">
                <div style={{ width: `${b.progress}%` }} className="bg-[#84117C] h-full rounded-full"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-0.5">
                <span>{b.students}</span>
                <span>{b.days}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

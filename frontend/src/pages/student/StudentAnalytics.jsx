import React from "react";
import {
  TrendingUp,
  Award,
  Flame,
  Download,
  Brain,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function StudentAnalytics() {
  // Chart Data
  const trendData = [
    { name: "Jan", performance: 75 },
    { name: "Feb", performance: 78 },
    { name: "Mar", performance: 80 },
    { name: "Apr", performance: 85 },
    { name: "May", performance: 84 },
    { name: "Jun", performance: 89 },
  ];

  const attendanceData = [
    { name: "Present", value: 92, color: "#01AC9F" },
    { name: "Absent", value: 8, color: "#E2E8F0" },
  ];

  const marksData = [
    { subject: "Coding", score: 88, color: "#6C1D5F" },
    { subject: "UX Design", score: 94, color: "#84117C" },
    { subject: "Data Sci", score: 82, color: "#01AC9F" },
    { subject: "Systems", score: 75, color: "#FF6200" },
  ];

  const skillsData = [
    { subject: "Logic", A: 120, fullMark: 150 },
    { subject: "Coding", A: 110, fullMark: 150 },
    { subject: "Design", A: 140, fullMark: 150 },
    { subject: "Systems", A: 90, fullMark: 150 },
    { subject: "Comms", A: 105, fullMark: 150 },
  ];

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Analytics Overview</h2>
          <p className="text-[13px] text-slate-400 mt-1">Track your academic progress and skill development.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/15 text-[#6C1D5F] px-4.5 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer border-none outline-none">
          <Download size={13} /> Export Report
        </button>
      </div>

      {/* ── Top Stats Row ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GPA */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full blur-xl group-hover:bg-purple-100/50 transition-colors" />
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Current GPA</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#6C1D5F] tracking-tight">3.8</span>
            <span className="text-[13px] text-slate-400 font-bold">/ 4.0</span>
          </div>
          <div className="flex items-center gap-0.5 text-emerald-600 mt-1.5 font-bold text-[10.5px]">
            <TrendingUp size={12} /> +0.2 from last term
          </div>
        </div>

        {/* Credits */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-50 rounded-full blur-xl group-hover:bg-teal-100/50 transition-colors" />
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Credits Earned</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">84</span>
            <span className="text-[13px] text-slate-400 font-bold">/ 120</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[#01AC9F] rounded-full" style={{ width: "70%" }} />
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full blur-xl group-hover:bg-orange-100/50 transition-colors" />
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Study Streak</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#FF6200] tracking-tight">14</span>
            <span className="text-[13px] text-slate-400 font-bold">Days</span>
          </div>
          <div className="flex items-center gap-1 text-[#FF6200] mt-1.5 font-bold text-[10.5px]">
            <Flame size={13} fill="currentColor" /> Keep it up!
          </div>
        </div>
      </section>

      {/* ── Bento Grid: Recharts Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[14.5px] text-slate-850">Performance Trend</h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last 6 Months</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0F172A",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#6C1D5F"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4 relative">
          <h3 className="font-bold text-[14.5px] text-slate-850">Attendance Overview</h3>
          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">92%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Present</span>
            </div>
          </div>
        </div>

        {/* Marks per Subject */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4">
          <h3 className="font-bold text-[14.5px] text-slate-850">Marks per Subject</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="subject" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0F172A",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {marksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4">
          <h3 className="font-bold text-[14.5px] text-slate-850">Skill Strength</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillsData}>
                <PolarGrid stroke="#F1F5F9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "#94A3B8", fontSize: 9 }} />
                <Radar name="Srikar" dataKey="A" stroke="#84117C" fill="#84117C" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── AI Insights Banner ── */}
      <section className="bg-gradient-to-r from-[#6C1D5F]/5 via-[#84117C]/5 to-[#6C1D5F]/5 rounded-3xl p-[1px]">
        <div className="bg-white rounded-[23px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C1D5F] to-[#84117C] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#6C1D5F]/10">
              <Brain size={20} />
            </div>
            <div>
              <h4 className="font-bold text-[14.5px] text-slate-800">AI Performance Insight</h4>
              <p className="text-[12.5px] text-slate-500 leading-relaxed max-w-[620px] mt-0.5">
                Your consistent performance in Computer Science and UX Design suggests a strong aptitude for analytical and user-centric problem-solving. Consider focusing your elective credits on Advanced Data Structures and UI engineering to leverage these strengths.
              </p>
            </div>
          </div>
          <button className="bg-[#6c1d5f] hover:bg-[#521347] text-white font-bold px-4.5 py-2 rounded-xl text-[12px] shadow-sm shadow-[#6C1D5F]/15 shrink-0 transition-colors cursor-pointer border-none outline-none">
            View Recommendations
          </button>
        </div>
      </section>
    </div>
  );
}

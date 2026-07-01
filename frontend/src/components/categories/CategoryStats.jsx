import { Layers, CheckCircle, BookOpen, Users } from "lucide-react";

function TrendArrow({ positive }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d={positive ? "M1 8 L5 2 L9 8" : "M1 2 L5 8 L9 2"}
        stroke={positive ? "#01AC9F" : "#e11d48"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CategoryStats({ categories, totalCourses }) {
  const total = categories.length;
  const published = categories.filter((c) => c.status === "Active").length;
  const totalLearners = categories.reduce((sum, c) => sum + (c.learners ?? 0), 0);

  const stats = [
    {
      label: "Total Categories",
      value: total,
      change: "0% this quarter",
      positive: true,
      Icon: Layers,
      bg: "bg-[#6C1D5F]/8",
      color: "text-[#6C1D5F]",
    },
    {
      label: "Published",
      value: published,
      change: "0% this week",
      positive: true,
      Icon: CheckCircle,
      bg: "bg-[#01AC9F]/10",
      color: "text-[#01AC9F]",
    },
    {
      label: "Total Courses",
      value: totalCourses ?? 0,
      change: "0% this month",
      positive: true,
      Icon: BookOpen,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Total Learners",
      value: totalLearners > 0 ? (totalLearners >= 1000 ? `${(totalLearners / 1000).toFixed(1)}k` : totalLearners) : "0",
      change: "0% vs last month",
      positive: true,
      Icon: Users,
      bg: "bg-[#ff83ec]/15",
      color: "text-[#9e2e93]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, change, positive, Icon, bg, color }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
              {label}
            </p>
            <p className="text-xl font-bold text-slate-900 mt-0.5 tabular-nums">{value}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendArrow positive={positive} />
              <p className={`text-[10px] font-medium ${positive ? "text-[#01AC9F]" : "text-red-500"}`}>
                {change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
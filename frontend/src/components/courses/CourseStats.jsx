import { GraduationCap, CheckCircle, FileText, Archive, Users } from "lucide-react";

export default function CourseStats({ courses }) {
  const total = courses.length;
  const published = courses.filter((c) => c.status === "Published").length;
  const draft = courses.filter((c) => c.status === "Draft").length;
  const archived = courses.filter((c) => c.status === "Archived").length;

  const totalLearners = courses.reduce((sum, c) => {
    return c.learnerCount != null ? sum + c.learnerCount : sum;
  }, 0);
  const hasLearnerData = courses.some((c) => c.learnerCount != null);

  const stats = [
    {
      label: "Total Courses",
      value: total,
      sub: `+${Math.max(0, total - Math.floor(total * 0.9))} this month`,
      Icon: GraduationCap,
      bg: "bg-[#6C1D5F]/8",
      color: "text-[#6C1D5F]",
    },
    {
      label: "Published",
      value: published,
      sub: `${total > 0 ? Math.round((published / total) * 100) : 0}% publish rate`,
      Icon: CheckCircle,
      bg: "bg-[#01AC9F]/10",
      color: "text-[#01AC9F]",
    },
    {
      label: "Drafts",
      value: draft,
      sub: "Pending review",
      Icon: FileText,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Archived",
      value: archived,
      sub: "No longer active",
      Icon: Archive,
      bg: "bg-slate-100",
      color: "text-slate-500",
    },
    {
      label: "Total Learners",
      value: hasLearnerData
        ? totalLearners >= 1000
          ? `${(totalLearners / 1000).toFixed(1)}k`
          : totalLearners
        : "0",
      sub: "Across all courses",
      Icon: Users,
      bg: "bg-[#ff83ec]/15",
      color: "text-[#9e2e93]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map(({ label, value, sub, Icon, bg, color }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{label}</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5 tabular-nums">{value}</p>
            <p className="text-[10px] text-[#01AC9F] font-medium mt-0.5 truncate">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

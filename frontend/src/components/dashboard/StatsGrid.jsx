import { useEffect, useState } from "react";
import { Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";
import dashboardService from "../../services/dashboardService";
import courseService from "../../services/courseService";

const CARDS = [
  {
    key: "learners",
    title: "Total Learners",
    icon: Users,
    accent: "#6C1D5F",
    bg: "bg-[#6C1D5F]/8",
    format: (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v ?? 0),
    trend: "0%",
    sub: "vs last month",
  },
  {
    key: "courses",
    title: "Published Courses",
    icon: BookOpen,
    accent: "#01AC9F",
    bg: "bg-[#01AC9F]/10",
    format: (v) => v ?? 0,
    trend: "0%",
    sub: "active courses",
  },
  {
    key: "completion",
    title: "Completion Rate",
    icon: TrendingUp,
    accent: "#6836a8",
    bg: "bg-[#6836a8]/10",
    format: (v) => `${v ?? 0}%`,
    trend: "0%",
    sub: "average rate",
  },
  {
    key: "revenue",
    title: "Total Revenue",
    icon: DollarSign,
    accent: "#d97706",
    bg: "bg-amber-50",
    format: (v) => (v != null ? `$${(v / 1000).toFixed(1)}k` : "$0.0k"),
    trend: "0%",
    sub: "vs last month",
  },
];

export default function StatsGrid() {
  const [stats, setStats] = useState({ learners: 0, courses: 0, completion: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dashData, coursesData] = await Promise.all([
          dashboardService.getDashboardStats(),
          courseService.getAllCourses(),
        ]);
        setStats({
          learners: dashData?.learners ?? dashData?.totalLearners ?? 0,
          courses: coursesData?.filter?.((c) => c.status === "Published")?.length ?? dashData?.courses ?? 0,
          completion: dashData?.completionRate ?? 0,
          revenue: dashData?.revenue ?? 0,
        });
      } catch {
        setStats({ learners: 0, courses: 0, completion: 0, revenue: 0 });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map(({ key, title, icon: Icon, accent, bg, format, trend, sub }) => (
        <div
          key={key}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group"
        >
          <div
            className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
          >
            <Icon size={22} style={{ color: accent }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
              {title}
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5 tabular-nums">
              {loading ? "—" : format(stats[key])}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold text-slate-400">{trend}</span>
              <span className="text-[10px] text-slate-400">{sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
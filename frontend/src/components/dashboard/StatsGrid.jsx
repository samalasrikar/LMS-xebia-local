import { useEffect, useState } from "react";
import { BookOpen, Target, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import dashboardService from "../../services/dashboardService";

/* ─── Static Banani-style stat cards with live backend data overlay ── */
const CARDS = [
  {
    key: "categories",
    label: "Categories",
    icon: BookOpen,
    iconBg: "bg-[#6C1D5F]/10",
    iconColor: "text-[#6C1D5F]",
    trend: "+4%",
    trendDir: "up",
    trendLabel: "vs. last month",
    fallback: 0,
  },
  {
    key: "courses",
    label: "Active Courses",
    icon: BookOpen,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: "+8",
    trendDir: "up",
    trendLabel: "new this month",
    fallback: 0,
  },
  {
    key: "modules",
    label: "Modules",
    icon: Target,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: "+8%",
    trendDir: "up",
    trendLabel: "vs. last month",
    fallback: 0,
  },
  {
    key: "contents",
    label: "Content Items",
    icon: DollarSign,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: "+5%",
    trendDir: "up",
    trendLabel: "vs. last month",
    fallback: 0,
  },
];

export default function StatsGrid() {
  const [stats, setStats] = useState({ categories: 0, courses: 0, modules: 0, subModules: 0, contents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dashboardService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {CARDS.map((card) => {
        const Icon = card.icon;
        const value = loading ? "—" : (stats[card.key] ?? card.fallback);
        const isDown = card.trendDir === "down";

        return (
          <div
            key={card.key}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                {card.label}
              </div>
              <div className={`w-8 h-8 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0`}>
                <Icon size={14} />
              </div>
            </div>

            {/* Value */}
            <div className="text-[26px] font-bold text-slate-900 tracking-tight leading-none">
              {typeof value === "number" ? value.toLocaleString() : value}
            </div>

            {/* Trend footer */}
            <div className="flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 text-[12px] font-semibold ${isDown ? "text-red-600" : "text-emerald-600"}`}>
                {isDown ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                {card.trend}
              </span>
              <span className="text-[11px] text-slate-400">{card.trendLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
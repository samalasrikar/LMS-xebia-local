import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  UserPlus,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import courseService from "../../services/courseService";

/* ─── Icon + colour per activity type ──────────────────────────────── */
const TYPE_CONFIG = {
  course_created:    { Icon: ClipboardCheck, bg: "bg-[#6C1D5F]/10", color: "text-[#6C1D5F]" },
  student_enrolled:  { Icon: UserPlus,       bg: "bg-[#2ebdaf]/10", color: "text-[#2ebdaf]" },
  payment_received:  { Icon: CreditCard,     bg: "bg-[#ff83ec]/20", color: "text-[#9e2e93]" },
};

function formatTimeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "JUST NOW";
  if (mins < 60) return `${mins} MINUTE${mins > 1 ? "S" : ""} AGO`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} HOUR${hrs > 1 ? "S" : ""} AGO`;
  const days = Math.floor(hrs / 24);
  return `${days} DAY${days > 1 ? "S" : ""} AGO`;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Build activity items from real course data */
  useEffect(() => {
    async function load() {
      try {
        const courses = await courseService.getAllCourses();
        if (courses && courses.length) {
          const recent = courses.slice(-3).reverse();
          const items = recent.map((c, i) => {
            return {
              id: c.id ?? i,
              type: "course_created",
              title: "New Course Created",
              subtitle: c.title,
              time: c.updatedAt ?? c.createdAt ?? null,
            };
          });
          setActivities(items);
        }
      } catch (err) {
        console.error("Failed to load recent activity:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d5c1cc] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-[#6C1D5F]">Recent Activity</h3>
        <button className="cursor-pointer hover:rotate-180 transition-transform duration-300">
          <RefreshCw size={18} className="text-[#83727c]" />
        </button>
      </div>

      {/* Timeline */}
      <div className="flex-1 space-y-6 relative">
        {/* Vertical connector line */}
        <div className="absolute left-5 top-2 bottom-16 w-0.5 bg-[#d5c1cc]/30" />

        {loading ? (
          <p className="text-sm text-[#51434c] py-4 text-center">Loading…</p>
        ) : activities.length === 0 ? (
          <p className="text-sm text-[#51434c] py-4 text-center">No recent activity.</p>
        ) : (
          activities.map((a) => {
            const cfg = TYPE_CONFIG[a.type] ?? TYPE_CONFIG.course_created;
            const { Icon } = cfg;
            return (
              <div key={a.id} className="flex gap-4 relative">
                <div
                  className={`w-10 h-10 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0 z-10`}
                >
                  <Icon size={18} className={cfg.color} />
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-sm font-bold text-[#1b1c1c]">{a.title}</p>
                  <p className="text-xs text-[#51434c] mt-0.5">{a.subtitle}</p>
                  <p className="text-[10px] text-[#83727c] font-medium mt-1 uppercase tracking-wider">
                    {formatTimeAgo(a.time)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CTA button */}
      <button
        className="
          mt-6 w-full py-3 rounded-2xl bg-[#f5f3f3]
          text-sm font-bold text-[#6C1D5F]
          hover:bg-[#6C1D5F] hover:text-white
          transition-all cursor-pointer
        "
      >
        View All Activity
      </button>
    </div>
  );
}

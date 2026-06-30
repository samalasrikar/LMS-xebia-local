import { useEffect, useState } from "react";
import {
  FolderTree,
  GraduationCap,
  BookOpen,
  GitBranch,
  FileText,
} from "lucide-react";

import StatCard from "./StatsCards";
import dashboardService from "../../services/dashboardService";

/* ─── Cards config ─────────────────────────────────────────────────── */
const CARDS_CONFIG = [
  { key: "categories",  title: "Categories",  icon: FolderTree,    trend: "+4%"  },
  { key: "courses",     title: "Courses",     icon: GraduationCap, trend: "+12%" },
  { key: "modules",     title: "Modules",     icon: BookOpen,      trend: "+8%"  },
  { key: "subModules",  title: "Sub Modules", icon: GitBranch,     trend: "-2%"  },
  { key: "contents",   title: "Content",     icon: FileText,      trend: "+5%"  },
];

export default function StatsGrid() {
  const [stats, setStats] = useState({
    categories: 0,
    courses:    0,
    modules:    0,
    subModules: 0,
    contents:   0,
  });
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {CARDS_CONFIG.map((cfg) => (
        <StatCard
          key={cfg.title}
          title={cfg.title}
          value={loading ? "—" : stats[cfg.key]}
          icon={cfg.icon}
          trend={cfg.trend}
        />
      ))}
    </div>
  );
}
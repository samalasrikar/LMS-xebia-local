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

export default function StatsGrid() {
  const [stats, setStats] = useState({
    categories: 0,
    courses: 0,
    modules: 0,
    subModules: 0,
    contents: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await dashboardService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  const cards = [
    {
      title: "Categories",
      value: stats.categories,
      trend: "+0",
      icon: FolderTree,
    },
    {
      title: "Courses",
      value: stats.courses,
      trend: "+0",
      icon: GraduationCap,
    },
    {
      title: "Modules",
      value: stats.modules,
      trend: "+0",
      icon: BookOpen,
    },
    {
      title: "Sub Modules",
      value: stats.subModules,
      trend: "+0",
      icon: GitBranch,
    },
    {
      title: "Content",
      value: stats.contents,
      trend: "+0",
      icon: FileText,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
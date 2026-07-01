import { useEffect, useState } from "react";
import { Bell, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

import StatsGrid from "../components/dashboard/StatsGrid";
import EnrollmentChart from "../components/dashboard/EnrollmentChart";
import CourseStatusPanel from "../components/dashboard/CourseStatusPanel";
import RecentCoursesTable from "../components/dashboard/RecentCoursesTable";
import QuickActionsPanel from "../components/dashboard/QuickActionsPanel";
import TopCategoriesPanel from "../components/dashboard/TopCategoriesPanel";
import RecentActivity from "../components/dashboard/RecentActivity";
import PendingReviewsPanel from "../components/dashboard/PendingReviewsPanel";
import LearnerHeatmap from "../components/dashboard/LearnerHeatmap";
import PerformanceFooter from "../components/dashboard/PerformanceFooter";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 50);

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.name) {
      setUserName(user.name);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <div
        className={`space-y-5 max-w-[1600px] mx-auto w-full transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-xl font-bold text-slate-900">
                {getGreeting()}, {userName}
              </h1>
              <span className="text-xl">👋</span>
            </div>

            <p className="text-sm text-slate-500">
              Here's what's happening with your LMS platform today.
            </p>

            <p className="text-[11px] text-slate-400 mt-0.5">
              {formatDate()}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              aria-label="View Notifications"
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white transition-all bg-white/60 shadow-sm cursor-pointer"
            >
              <Bell size={14} />
              Notifications
            </button>

            <button
              onClick={() => navigate("/courses/create")}
              className="flex items-center gap-2 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Zap size={14} />
              Quick Create
            </button>
          </div>
        </div>

        {/* Statistics */}
        <StatsGrid />

        {/* Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <EnrollmentChart />
          </div>

          <div className="flex flex-col gap-5">
            <CourseStatusPanel />
            <QuickActionsPanel />
          </div>
        </div>

        {/* Courses & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <RecentCoursesTable />
          </div>

          <TopCategoriesPanel />
        </div>

        {/* Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <RecentActivity />
          <PendingReviewsPanel />
          <LearnerHeatmap />
        </div>

        {/* Footer Metrics */}
        <PerformanceFooter />

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400 font-medium pt-2 pb-1 border-t border-slate-200/60">
          <p>
            © {new Date().getFullYear()} Xebia LMS Enterprise
          </p>

          <div className="flex gap-6 mt-3 md:mt-0 uppercase tracking-widest">
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">
              Security
            </span>

            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">
              System Status
            </span>

            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">
              Help Desk
            </span>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}
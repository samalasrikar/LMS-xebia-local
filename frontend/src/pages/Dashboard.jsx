import AppLayout from "../components/layout/AppLayout";

import StatsGrid from "../components/dashboard/StatsGrid";
import EnrollmentChart from "../components/dashboard/EnrollmentChart";
import CourseCompletionChart from "../components/dashboard/CourseCompletionChart";
import RecentCoursesTable from "../components/dashboard/RecentCoursesTable";
import RecentActivity from "../components/dashboard/RecentActivity";
import PerformanceFooter from "../components/dashboard/PerformanceFooter";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto w-full">

        {/* ── Statistics cards ─────────────────────────────────── */}
        <StatsGrid />

        {/* ── Analytics row: Enrollment + Course Completion ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EnrollmentChart />
          <CourseCompletionChart />
        </div>

        {/* ── Activity row: Recent Courses + Recent Activity ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentCoursesTable />
          <RecentActivity />
        </div>

        {/* ── Bottom row: Performance + Insights ──────────────── */}
        <PerformanceFooter />

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-[11px] text-[#83727c] font-medium pt-4 pb-2">
          <p>© 2024 Xebia LMS Enterprise. Premium Analytics v4.2.0</p>
          <div className="flex gap-6 mt-3 md:mt-0 uppercase tracking-widest">
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Security</span>
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">System Status</span>
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Help Desk</span>
          </div>
        </footer>

      </div>
    </AppLayout>
  );
}
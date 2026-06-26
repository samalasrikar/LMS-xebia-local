import AppLayout from "../components/layout/AppLayout";

import StatsGrid from "../components/dashboard/StatsGrid";
import QuickActions from "../components/dashboard/QuickActions";
import RecentCoursesTable from "../components/dashboard/RecentCoursesTable";
import RecentCategoriesTable from "../components/dashboard/RecentCategoriesTable";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-8">

        <StatsGrid />

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <RecentCoursesTable />

          </div>

          <QuickActions />

        </div>

        <RecentCategoriesTable />

      </div>
    </AppLayout>
  );
}
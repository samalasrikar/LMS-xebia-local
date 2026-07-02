import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import CreateCategory from "./pages/CreateCategory";
import CategoryDetail from "./pages/CategoryDetail";
import CurriculumBuilder from "./pages/CurriculumBuilder";
import ModuleManagement from "./pages/Modules";
import ContentLibrary from "./pages/ContentLibrary";
import StudentLayout from "./components/layout/StudentLayout";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentGrades from "./pages/student/StudentGrades";
import StudentAnalytics from "./pages/student/StudentAnalytics";
import StudentProfile from "./pages/student/StudentProfile";
import StudentSettings from "./pages/student/StudentSettings";
import StudentDownloads from "./pages/student/StudentDownloads";
import StudentAssistant from "./pages/student/StudentAssistant";
import StudentNotifications from "./pages/student/StudentNotifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/categories/:id" element={<CategoryDetail />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/courses/:id/edit" element={<CreateCourse />} />
      <Route path="/courses/:id/curriculum" element={<CurriculumBuilder />} />
      <Route path="/module-management" element={<ModuleManagement />} />
      <Route path="/content-library" element={<ContentLibrary />} />

      {/* ── Student Portal (sidebar layout) ── */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="calendar" element={<StudentCalendar />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="analytics" element={<StudentAnalytics />} />
        <Route path="downloads" element={<StudentDownloads />} />
        <Route path="assistant" element={<StudentAssistant />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* Redirects for old routes */}
      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/curriculum" element={<CurriculumBuilder />} />
      <Route path="/content-builder" element={<ContentLibrary />} />
    </Routes>
  );
}

/* ─── Placeholder for sub-pages that don't exist yet ─── */
function PlaceholderPage({ title, description }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-[400px] mx-auto px-6">
        <div className="w-14 h-14 rounded-2xl bg-[#6C1D5F]/5 border border-[#6C1D5F]/10 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">🚧</span>
        </div>
        <h2 className="text-[18px] font-bold text-slate-800 mb-1.5">{title}</h2>
        <p className="text-[13px] text-slate-400 leading-relaxed">{description}</p>
        <p className="text-[11px] text-slate-300 mt-4 font-medium">Coming soon</p>
      </div>
    </div>
  );
}

export default App;
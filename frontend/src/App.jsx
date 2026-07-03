import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import CreateCategory from "./pages/CreateCategory";
import CategoryDetail from "./pages/CategoryDetail";
import CurriculumBuilder from "./pages/CurriculumBuilder";
import ModuleManagement from "./pages/Modules";
import ContentLibrary from "./pages/ContentLibrary";

import ExecutiveSummary from "./pages/ExecutiveSummary";
import TrainingEffectiveness from "./pages/TrainingEffectiveness";
import ProjectLearningInvestment from "./pages/ProjectLearningInvestment";
import FresherJourney from "./pages/FresherJourney";
import SkillGap from "./pages/SkillGap";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";

import LearningCoverage from "./pages/LearningCoverage";
import StudentLayout from "./components/layout/StudentLayout";

// AI & Certification Analytics Dashboards Pages
import AITransformation from "./modules/ai-certification/pages/AITransformation";
import Certification from "./modules/ai-certification/pages/Certification";
import FlagshipPrograms from "./modules/ai-certification/pages/FlagshipPrograms";
import LearningChampions from "./modules/ai-certification/pages/LearningChampions";

// Learning Analytics Dashboard Pages
import LearningHours from "./modules/learning-hours/pages/LearningHours";
import LearningCategories from "./modules/learning-categories/pages/LearningCategories";
import LearningTrends from "./modules/learning-trends/pages/LearningTrends";

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

      {/* Categories */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/categories/:id" element={<CategoryDetail />} />

      {/* Courses */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/courses/:id/edit" element={<CreateCourse />} />
      <Route
        path="/courses/:id/curriculum"
        element={<CurriculumBuilder />}
      />

      {/* Module Management */}
      <Route path="/module-management" element={<ModuleManagement />} />
      <Route path="/content-library" element={<ContentLibrary />} />

      {/* Redirects for old routes */}
      <Route path="/analytics" element={<Navigate to="/executive-summary" replace />} />


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

      {/* Backward Compatibility */}

      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/curriculum" element={<CurriculumBuilder />} />
      <Route path="/content-builder" element={<ContentLibrary />} />

      <Route path="/executive-summary" element={<ExecutiveSummary />} />
      <Route
  path="/training-effectiveness"
  element={<TrainingEffectiveness />}
/>

<Route
  path="/project-learning-investment"
  element={<ProjectLearningInvestment />}
/>

<Route
  path="/fresher-journey"
  element={<FresherJourney />}
/>

<Route
  path="/skill-gap"
  element={<SkillGap />}
/>

<Route
  path="/predictive-analytics"
  element={<PredictiveAnalytics />}
/>
 


      {/* Learning Coverage */}
      <Route
        path="/learning/coverage"
        element={<LearningCoverage />}
      />

      {/* Learning Analytics Dashboards */}
      <Route
        path="/learning/hours"
        element={<LearningHours />}
      />
      <Route
        path="/learning/categories"
        element={<LearningCategories />}
      />
      <Route
        path="/learning/trends"
        element={<LearningTrends />}
      />

      {/* AI & Certification Analytics */}
      <Route
        path="/ai-transformation"
        element={<AITransformation />}
      />
      <Route
        path="/certifications"
        element={<Certification />}
      />
      <Route
        path="/flagship-programs"
        element={<FlagshipPrograms />}
      />
      <Route
        path="/learning-champions"
        element={<LearningChampions />}
      />

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
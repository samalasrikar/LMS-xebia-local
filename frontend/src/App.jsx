import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import {
  Dashboard,
  Categories,
  CategoryDetail,
  ContentLibrary,
  Courses,
  CreateCategory,
  CreateCourse,
  CurriculumBuilder,
  DesignSystem,
  Integrations,
  Learners,
  ModuleManagement,
  SEOMeta,
  Settings
} from "./pages/admin";

import {
  ExecutiveSummary,
  TrainingEffectiveness,
  ProjectLearningInvestment,
  FresherJourney,
  SkillGap,
  PredictiveAnalytics,
  LearningCoverage,
  LearningHours,
  LearningCategories,
  LearningTrends,
  AITransformation,
  Certifications,
  FlagshipPrograms,
  LearningChampions
} from "./pages/analytics";

import StudentLayout from "./components/layout/StudentLayout";
import AnalyticsExplorerLayout from "./components/analytics/AnalyticsExplorerLayout";

import {
  StudentDashboard,
  StudentCourses,
  StudentCalendar,
  StudentAssignments,
  StudentGrades,
  StudentAnalytics,
  StudentProfile,
  StudentSettings,
  StudentDownloads,
  StudentAssistant,
  StudentNotifications
} from "./pages/student";
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Dashboard />} />

      {/* Stitch-integrated Admin pages */}
      <Route path="/seo" element={<SEOMeta />} />
      <Route path="/learners" element={<Learners />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/design-system" element={<DesignSystem />} />

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

      {/* ── Analytics Explorer Wrapper ── */}
      <Route path="/analytics" element={<AnalyticsExplorerLayout />}>
        <Route index element={<Navigate to="executive-summary" replace />} />
        <Route path="executive-summary" element={<ExecutiveSummary />} />
        <Route path="training-effectiveness" element={<TrainingEffectiveness />} />
        <Route path="project-learning-investment" element={<ProjectLearningInvestment />} />
        <Route path="fresher-journey" element={<FresherJourney />} />
        <Route path="skill-gap" element={<SkillGap />} />
        <Route path="predictive-analytics" element={<PredictiveAnalytics />} />
        <Route path="learning/coverage" element={<LearningCoverage />} />
        <Route path="learning/hours" element={<LearningHours />} />
        <Route path="learning/categories" element={<LearningCategories />} />
        <Route path="learning/trends" element={<LearningTrends />} />
        <Route path="ai-transformation" element={<AITransformation />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="flagship-programs" element={<FlagshipPrograms />} />
        <Route path="learning-champions" element={<LearningChampions />} />
      </Route>

      {/* Legacy Redirects for Backwards Compatibility */}
      <Route path="/executive-summary" element={<Navigate to="/analytics/executive-summary" replace />} />
      <Route path="/training-effectiveness" element={<Navigate to="/analytics/training-effectiveness" replace />} />
      <Route path="/project-learning-investment" element={<Navigate to="/analytics/project-learning-investment" replace />} />
      <Route path="/fresher-journey" element={<Navigate to="/analytics/fresher-journey" replace />} />
      <Route path="/skill-gap" element={<Navigate to="/analytics/skill-gap" replace />} />
      <Route path="/predictive-analytics" element={<Navigate to="/analytics/predictive-analytics" replace />} />
      <Route path="/learning/coverage" element={<Navigate to="/analytics/learning/coverage" replace />} />
      <Route path="/learning/hours" element={<Navigate to="/analytics/learning/hours" replace />} />
      <Route path="/learning/categories" element={<Navigate to="/analytics/learning/categories" replace />} />
      <Route path="/learning/trends" element={<Navigate to="/analytics/learning/trends" replace />} />
      <Route path="/ai-transformation" element={<Navigate to="/analytics/ai-transformation" replace />} />
      <Route path="/certifications" element={<Navigate to="/analytics/certifications" replace />} />
      <Route path="/flagship-programs" element={<Navigate to="/analytics/flagship-programs" replace />} />
      <Route path="/learning-champions" element={<Navigate to="/analytics/learning-champions" replace />} />

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
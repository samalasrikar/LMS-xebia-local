import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { Toaster } from "@/shared/components/ui/sonner";

// ── Suspense fallback ────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-[3px] border-[#6C1D5F]/20 border-t-[#6C1D5F] rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-semibold">Loading…</span>
      </div>
    </div>
  );
}

// ── Lazy page imports ────────────────────────────────────────────────────────
// Public / Auth
const Landing = lazy(() => import("@/features/landing/pages/Landing"));
const Login = lazy(() => import("@/features/auth/pages/Login"));

// Manager portal
const ManagerLayout = lazy(() => import("@/app/layouts/ManagerLayout"));
const ManagerDashboard = lazy(() => import("@/features/manager/pages/ManagerDashboard"));
const LearningDashboard = lazy(() => import("@/features/manager/pages/LearningDashboard"));
const CoursesManagement = lazy(() => import("@/features/manager/pages/CoursesManagement"));
const ReportsAnalytics = lazy(() => import("@/features/manager/pages/ReportsAnalytics"));
const CategoriesManagement = lazy(() => import("@/features/manager/pages/CategoriesManagement"));
const TrainersManagement = lazy(() => import("@/features/manager/pages/TrainersManagement"));
const LearnersManagement = lazy(() => import("@/features/manager/pages/LearnersManagement"));
const Assessments = lazy(() => import("@/features/manager/pages/Assessments"));
const ManagerSettings = lazy(() => import("@/features/manager/pages/Settings"));
const BatchManagement = lazy(() => import("@/features/manager/pages/BatchManagement"));
const ApprovalCenter = lazy(() => import("@/features/manager/pages/ApprovalCenter"));
const ManagerNotifications = lazy(() => import("@/features/manager/pages/ManagerNotifications"));

// Admin portal
const Dashboard = lazy(() => import("@/features/admin/pages/Dashboard"));
const Learners = lazy(() => import("@/features/admin/pages/Learners"));
const Settings = lazy(() => import("@/features/admin/pages/Settings"));
const AdminNotifications = lazy(() => import("@/features/admin/pages/AdminNotifications"));

// Categories
const Categories = lazy(() => import("@/features/categories/pages/Categories"));
const CategoryDetail = lazy(() => import("@/features/categories/pages/CategoryDetail"));
const CreateCategory = lazy(() => import("@/features/categories/pages/CreateCategory"));

// Courses
const Courses = lazy(() => import("@/features/courses/pages/Courses"));
const CreateCourse = lazy(() => import("@/features/courses/pages/CreateCourse"));
const CurriculumBuilder = lazy(() => import("@/features/courses/pages/CurriculumBuilder"));

// Modules / Content
const ModuleManagement = lazy(() => import("@/features/modules/pages/Modules"));
const ContentLibrary = lazy(() => import("@/features/content/pages/ContentLibrary"));

// Assignments
const ManagerAssignmentDashboard = lazy(() => import("@/features/assignments/pages/ManagerAssignmentDashboard"));
const CreateAssignment = lazy(() => import("@/features/assignments/pages/CreateAssignment"));
const SubmissionReview = lazy(() => import("@/features/assignments/pages/SubmissionReview"));
const Gradebook = lazy(() => import("@/features/assignments/pages/Gradebook"));
const StudentAssignmentDashboard = lazy(() => import("@/features/assignments/pages/StudentAssignmentDashboard"));
const StudentAssignmentDetails = lazy(() => import("@/features/assignments/pages/StudentAssignmentDetails"));
const StudentMySubmissions = lazy(() => import("@/features/assignments/pages/StudentMySubmissions"));
const StudentAssignmentResult = lazy(() => import("@/features/assignments/pages/StudentAssignmentResult"));

// Quizzes
const QuizDashboard = lazy(() => import("@/features/quizzes/pages/QuizDashboard"));
const ImportQuiz = lazy(() => import("@/features/quizzes/pages/ImportQuiz"));
const StudentQuizDashboard = lazy(() => import("@/features/quizzes/pages/StudentQuizDashboard"));
const StudentQuizPlayer = lazy(() => import("@/features/quizzes/pages/StudentQuizPlayer"));
const StudentQuizResult = lazy(() => import("@/features/quizzes/pages/StudentQuizResult"));

// Batches
const BatchDashboard = lazy(() => import("@/features/batches/pages/BatchDashboard"));
const CreateBatch = lazy(() => import("@/features/batches/pages/CreateBatch"));

// Trainer portal
const TrainerDashboard = lazy(() => import("@/features/trainer/pages/TrainerDashboard"));
const TrainerNotifications = lazy(() => import("@/features/trainer/pages/TrainerNotifications"));

// Events
const EventsManagement = lazy(() => import("@/features/events/pages/EventsManagement"));
const CreateEvent = lazy(() => import("@/features/events/pages/CreateEvent"));
const EventRegistrations = lazy(() => import("@/features/events/pages/EventRegistrations"));
const EventsCatalog = lazy(() => import("@/features/events/pages/EventsCatalog"));
const EventDetail = lazy(() => import("@/features/events/pages/EventDetail"));

// Analytics
const AnalyticsExplorerLayout = lazy(() => import("@/features/analytics/components/layout/AnalyticsExplorerLayout"));
const ExecutiveSummary = lazy(() => import("@/features/analytics/pages/ExecutiveSummary"));
const TrainingEffectiveness = lazy(() => import("@/features/analytics/pages/TrainingEffectiveness"));
const ProjectLearningInvestment = lazy(() => import("@/features/analytics/pages/ProjectLearningInvestment"));
const FresherJourney = lazy(() => import("@/features/analytics/pages/FresherJourney"));
const SkillGap = lazy(() => import("@/features/analytics/pages/SkillGap"));
const PredictiveAnalytics = lazy(() => import("@/features/analytics/pages/PredictiveAnalytics"));
const LearningCoverage = lazy(() => import("@/features/analytics/pages/LearningCoverage"));
const LearningHours = lazy(() => import("@/features/analytics/pages/LearningHours"));
const LearningCategories = lazy(() => import("@/features/analytics/pages/LearningCategories"));
const LearningTrends = lazy(() => import("@/features/analytics/pages/LearningTrends"));
const AITransformation = lazy(() => import("@/features/analytics/pages/AITransformation"));
const Certifications = lazy(() => import("@/features/analytics/pages/Certifications"));
const FlagshipPrograms = lazy(() => import("@/features/analytics/pages/FlagshipPrograms"));
const LearningChampions = lazy(() => import("@/features/analytics/pages/LearningChampions"));

// Student portal
const StudentLayout = lazy(() => import("@/app/layouts/StudentLayout"));
const StudentDashboard = lazy(() => import("@/features/student/pages/StudentDashboard"));
const StudentCourses = lazy(() => import("@/features/student/pages/StudentCourses"));
const StudentCalendar = lazy(() => import("@/features/student/pages/StudentCalendar"));
const StudentAssessments = lazy(() => import("@/features/student/pages/StudentAssessments"));
const StudentGrades = lazy(() => import("@/features/student/pages/StudentGrades"));
const StudentAnalytics = lazy(() => import("@/features/student/pages/StudentAnalytics"));
const StudentProfile = lazy(() => import("@/features/student/pages/StudentProfile"));
const StudentSettings = lazy(() => import("@/features/student/pages/StudentSettings"));
const StudentDownloads = lazy(() => import("@/features/student/pages/StudentDownloads"));
const StudentAssistant = lazy(() => import("@/features/student/pages/StudentAssistant"));
const StudentNotifications = lazy(() => import("@/features/student/pages/StudentNotifications"));
const StudentCourseOverview = lazy(() => import("@/features/student/pages/StudentCourseOverview"));
const StudentModuleDetail = lazy(() => import("@/features/student/pages/StudentModuleDetail"));
const StudentLessonDetail = lazy(() => import("@/features/student/pages/StudentLessonDetail"));
const StudentCourseCompletion = lazy(() => import("@/features/student/pages/StudentCourseCompletion"));

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Manager Console routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="learning" element={<LearningDashboard />} />
            <Route path="courses" element={<CoursesManagement />} />
            <Route path="analytics" element={<ReportsAnalytics />} />
            <Route path="categories" element={<CategoriesManagement />} />
            <Route path="trainers" element={<TrainersManagement />} />
            <Route path="learners" element={<LearnersManagement />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="settings" element={<ManagerSettings />} />
            <Route path="batches" element={<BatchManagement />} />
            <Route path="approvals" element={<ApprovalCenter />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="notifications" element={<ManagerNotifications />} />
          </Route>

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/profile" element={<StudentProfile />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />

          {/* Admin pages */}
          <Route path="/learners" element={<Learners />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin/events" element={<EventsManagement />} />
          <Route path="/admin/events/create" element={<CreateEvent />} />
          <Route path="/admin/events/edit/:id" element={<CreateEvent />} />
          <Route path="/admin/events/:id/registrations" element={<EventRegistrations />} />

          {/* Categories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/edit" element={<CreateCourse />} />
          <Route path="/courses/:id/curriculum" element={<CurriculumBuilder />} />

          {/* Module Management */}
          <Route path="/module-management" element={<ModuleManagement />} />
          <Route path="/content-library" element={<ContentLibrary />} />

          {/* Trainer/Manager Routes */}
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/trainer/assignments" element={<ManagerAssignmentDashboard />} />
          <Route path="/trainer/assignments/create" element={<CreateAssignment />} />
          <Route path="/trainer/assignments/edit/:id" element={<CreateAssignment />} />
          <Route path="/trainer/assignments/review/:submissionId" element={<SubmissionReview />} />
          <Route path="/trainer/gradebook" element={<Gradebook />} />
          <Route path="/trainer/quizzes" element={<QuizDashboard />} />
          <Route path="/trainer/quizzes/import" element={<ImportQuiz />} />
          <Route path="/trainer/batches" element={<BatchDashboard />} />
          <Route path="/trainer/batches/create" element={<CreateBatch />} />
          <Route path="/trainer/batches/edit/:id" element={<CreateBatch />} />
          <Route path="/trainer/profile" element={<StudentProfile />} />
          <Route path="/trainer/events" element={<EventsCatalog />} />
          <Route path="/trainer/events/:id" element={<EventDetail />} />
          <Route path="/trainer/notifications" element={<TrainerNotifications />} />

          {/* ── Student Portal (sidebar layout) ── */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="courses/:courseId" element={<StudentCourseOverview />} />
            <Route path="courses/:courseId/completed" element={<StudentCourseCompletion />} />
            <Route path="courses/:courseId/modules/:moduleId" element={<StudentModuleDetail />} />
            <Route path="courses/:courseId/modules/:moduleId/lessons/:lessonId" element={<StudentLessonDetail />} />
            <Route path="calendar" element={<StudentCalendar />} />
            <Route path="assessments" element={<StudentAssessments />} />
            <Route path="assignments" element={<StudentAssessments />} />
            <Route path="assignments/:id" element={<StudentAssignmentDetails />} />
            <Route path="assignments/:id/submissions" element={<StudentMySubmissions />} />
            <Route path="assignments/:id/result" element={<StudentAssignmentResult />} />
            <Route path="quizzes" element={<StudentAssessments />} />
            <Route path="quizzes/:id/result" element={<StudentQuizResult />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="analytics" element={<StudentAnalytics />} />
            <Route path="downloads" element={<StudentDownloads />} />
            <Route path="assistant" element={<StudentAssistant />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route path="events" element={<EventsCatalog />} />
            <Route path="events/:id" element={<EventDetail />} />
          </Route>

          {/* Quiz Player */}
          <Route path="/student/quizzes/:id/play" element={<StudentQuizPlayer />} />

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
      </Suspense>
    </TooltipProvider>
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
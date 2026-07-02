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
import ExecutiveSummary from "./pages/ExecutiveSummary";
import TrainingEffectiveness from "./pages/TrainingEffectiveness";
import ProjectLearningInvestment from "./pages/ProjectLearningInvestment";
import FresherJourney from "./pages/FresherJourney";
import SkillGap from "./pages/SkillGap";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
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
      {/* Redirects for old routes */}
      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/curriculum" element={<ContentLibrary />} />
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
 
    </Routes>
  );
}

export default App;
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
import LearningCoverage from "./pages/LearningCoverage";

// AI & Certification Analytics Dashboards Pages
import AITransformation from "./modules/ai-certification/pages/AITransformation";
import Certification from "./modules/ai-certification/pages/Certification";
import FlagshipPrograms from "./modules/ai-certification/pages/FlagshipPrograms";
import LearningChampions from "./modules/ai-certification/pages/LearningChampions";

// Learning Analytics Dashboard Pages
import LearningHours from "./modules/learning-hours/pages/LearningHours";
import LearningCategories from "./modules/learning-categories/pages/LearningCategories";
import LearningTrends from "./modules/learning-trends/pages/LearningTrends";

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

      {/* Backward Compatibility */}
      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/curriculum" element={<ContentLibrary />} />
      <Route path="/content-builder" element={<ContentLibrary />} />

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

export default App;
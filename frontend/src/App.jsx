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

// AI & Certification Analytics Dashboards Pages
import AITransformation from "./modules/ai-certification/pages/AITransformation";
import Certification from "./modules/ai-certification/pages/Certification";
import FlagshipPrograms from "./modules/ai-certification/pages/FlagshipPrograms";
import LearningChampions from "./modules/ai-certification/pages/LearningChampions";

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
      <Route path="/modules" element={<Courses />} />
      <Route path="/curriculum" element={<Courses />} />

      {/* AI & Certification Analytics Routes */}
      <Route path="/ai-transformation" element={<AITransformation />} />
      <Route path="/certifications" element={<Certification />} />
      <Route path="/flagship-programs" element={<FlagshipPrograms />} />
      <Route path="/learning-champions" element={<LearningChampions />} />
      <Route path="/module-management" element={<ModuleManagement />} />
      <Route path="/content-library" element={<ContentLibrary />} />
      {/* Redirects for old routes */}
      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/curriculum" element={<ContentLibrary />} />
      <Route path="/content-builder" element={<ContentLibrary />} />
    </Routes>
  );
}

export default App;
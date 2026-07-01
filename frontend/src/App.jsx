import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import CurriculumBuilder from "./pages/CurriculumBuilder";

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
    </Routes>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import CurriculumBuilder from "./pages/CurriculumBuilder";
import LearningCoverage from "./pages/LearningCoverage";

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
      <Route path="/learning/coverage" element={<LearningCoverage />} />
    </Routes>
  );
}

export default App;
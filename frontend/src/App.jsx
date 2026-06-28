import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import Curriculum from "./pages/Curriculum";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/modules" element={<Curriculum />} />
      <Route path="/curriculum" element={<Curriculum />} />
    </Routes>
  );
}

export default App;
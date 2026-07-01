import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";

import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";

import CurriculumBuilder from "./pages/CurriculumBuilder";
import Modules from "./pages/Modules";
import ContentBuilder from "./pages/ContentBuilder";

import Learners from "./pages/Learners";
import Certifications from "./pages/Certifications";
import Assessments from "./pages/Assessments";
import Schedule from "./pages/Schedule";
import SEO from "./pages/SEO";
import Settings from "./pages/Settings";
import Permissions from "./pages/Permissions";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Analytics */}
      <Route path="/analytics" element={<Analytics />} />

      {/* Categories */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/categories/:id/edit" element={<CreateCategory />} />

      {/* Courses */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/courses/:id/edit" element={<CreateCourse />} />
      <Route
        path="/courses/:id/curriculum"
        element={<CurriculumBuilder />}
      />

      {/* Modules */}
      <Route path="/modules" element={<Modules />} />
      <Route path="/curriculum" element={<ContentBuilder />} />

      {/* Other Pages */}
      <Route path="/learners" element={<Learners />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/seo" element={<SEO />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/permissions" element={<Permissions />} />
      <Route path="/integrations" element={<Integrations />} />
    </Routes>
  );
}

export default App;
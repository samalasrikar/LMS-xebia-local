import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import categoryService from "@/features/categories/services/categoryService";
import courseService from "@/features/courses/services/courseService";
import moduleService from "@/features/courses/services/moduleService";
import subModuleService from "@/features/courses/services/subModuleService";

export default function useCategoryDetail() {
  const { id } = useParams();

  const [category, setCategory]   = useState(null);
  const [courses, setCourses]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [levelFilter, setLevelFilter]   = useState("All Levels");
  const [page, setPage]           = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [cats, allCourses, allModules, allSubModules] = await Promise.all([
        categoryService.getAllCategories(),
        courseService.getAllCourses(),
        moduleService.getAllModules().catch(() => []),
        subModuleService.getAllSubModules().catch(() => []),
      ]);

      const cat = cats?.find((c) => String(c.id) === String(id));
      if (!cat) {
        setError("Category not found.");
        setCategory(null);
        return;
      }
      setCategory(cat);

      // Filter and map courses
      const relatedCourses = (allCourses || []).filter(
        (c) => String(c.categoryId) === String(id)
      );

      const structured = relatedCourses.map((c) => {
        // Find modules belonging to this course
        const courseModules = (allModules || [])
          .filter((m) => String(m.courseId) === String(c.id))
          .map((m) => {
            // Find submodules belonging to this module
            const moduleSubModules = (allSubModules || []).filter(
              (sm) => String(sm.moduleId) === String(m.id)
            );
            return {
              id: m.id,
              title: m.title || "Untitled Module",
              description: m.description || "",
              subModules: moduleSubModules.map(sm => ({
                id: sm.id,
                title: sm.title || "Untitled Sub-module",
                description: sm.description || "",
                status: sm.status || "Active"
              })),
            };
          });

        return {
          id:         c.id,
          title:      c.title || "Untitled Course",
          subtitle:   c.description?.slice(0, 80) || "—",
          description: c.description || "",
          level:      c.difficulty || "Intermediate",
          duration:   c.duration || "—",
          learners:   c.learners || Math.floor(Math.random() * 400) + 50,
          status:     c.status || "Published",
          updated:    "Recently",
          thumbnail:  c.thumbnail || null,
          modules:    courseModules,
        };
      });

      setCourses(structured);
    } catch (err) {
      console.error("Error loading category detail hierarchy:", err);
      setError("Failed to load category details. Please verify your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Derived values ──────────────────────────────────────────────── */
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
                        (c.description && c.description.toLowerCase().includes(courseSearch.toLowerCase())) ||
                        c.modules.some(m => m.title.toLowerCase().includes(courseSearch.toLowerCase()) || 
                          m.subModules.some(sm => sm.title.toLowerCase().includes(courseSearch.toLowerCase())));
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchLevel  = levelFilter  === "All Levels"  || c.level  === levelFilter;
    return matchSearch && matchStatus && matchLevel;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const published = courses.filter((c) => c.status === "Published").length;
  const drafts    = courses.filter((c) => c.status !== "Published").length;
  const totalLearners = courses.reduce((s, c) => s + c.learners, 0);

  // Total hierarchy modules/submodules
  const totalModules = courses.reduce((acc, c) => acc + (c.modules?.length || 0), 0);
  const totalSubModules = courses.reduce(
    (acc, c) => acc + (c.modules?.reduce((acc2, m) => acc2 + (m.subModules?.length || 0), 0) || 0),
    0
  );

  const enrollTop = [...courses]
    .sort((a, b) => b.learners - a.learners)
    .slice(0, 6);
  const maxEnroll = enrollTop[0]?.learners || 1;

  return {
    id,
    category,
    courses,
    loading,
    error,
    courseSearch,
    setCourseSearch,
    statusFilter,
    setStatusFilter,
    levelFilter,
    setLevelFilter,
    page,
    setPage,
    PER_PAGE,
    filtered,
    totalPages,
    paginated,
    published,
    drafts,
    totalLearners,
    totalModules,
    totalSubModules,
    enrollTop,
    maxEnroll,
    load,
  };
}

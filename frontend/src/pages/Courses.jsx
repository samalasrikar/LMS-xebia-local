import { useState, useEffect, useCallback } from "react";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import categoryService from "../services/categoryService";
import CourseHeader from "../components/courses/CourseHeader";
import CourseFilters from "../components/courses/CourseFilters";
import CourseTable from "../components/courses/CourseTable";
import CourseStats from "../components/courses/CourseStats";
import DeleteDialog from "../components/shared/DeleteDialog";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setSelectedIds([]);
    try {
      const [coursesData, categoriesData] = await Promise.all([
        courseService.getAllCourses(),
        categoryService.getAllCategories(),
      ]);
      setCategories(categoriesData || []);

      if (coursesData && coursesData.length > 0) {
        const mapped = coursesData.map((course) => ({
          // IDs
          id: `CRS-${course.id}`,
          dbId: course.id,
          // Core fields — always from API
          title: course.title,
          category: course.categoryName || "General",
          duration: course.duration || null,
          difficulty: course.difficulty || null,
          status: course.status || "Draft",
          thumbnail: course.thumbnail || null,
          // Extended fields — populated when backend adds them
          language: course.language ?? null,
          isActive: course.isActive ?? null,
          featured: course.featured ?? null,
          learnerCount: course.learnerCount ?? null,
          updatedAt: course.updatedAt ?? null,
          createdDate: course.createdAt ?? null,
        }));
        setCourses(mapped);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ─── Tab counts ────────────────────────────────────────────────────────────

  const tabCounts = {
    all: courses.length,
    Published: courses.filter((c) => c.status === "Published").length,
    Draft: courses.filter((c) => c.status === "Draft").length,
    active: courses.filter((c) => c.isActive === true).length,
    featured: courses.filter((c) => c.featured === true).length,
  };

  // ─── Filtering ─────────────────────────────────────────────────────────────

  const filteredCourses = courses.filter((c) => {
    const matchTab =
      activeTab === "all" ||
      (activeTab === "active" ? c.isActive === true : false) ||
      (activeTab === "featured" ? c.featured === true : false) ||
      c.status === activeTab;

    const matchSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      selectedCategory === "All Categories" || c.category === selectedCategory;

    const matchDifficulty =
      selectedDifficulty === "All Difficulties" || c.difficulty === selectedDifficulty;

    const matchLanguage =
      selectedLanguage === "All Languages" ||
      (c.language && c.language.toUpperCase() === selectedLanguage);

    return matchTab && matchSearch && matchCategory && matchDifficulty && matchLanguage;
  });

  // ─── Selection ─────────────────────────────────────────────────────────────

  const handleSelectId = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedIds(checked ? filteredCourses.map((c) => c.dbId) : []);
  };

  // ─── Delete ────────────────────────────────────────────────────────────────

  const requestDelete = (course) =>
    setDeleteTarget({ dbId: course.dbId, title: course.title });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await courseService.deleteCourse(deleteTarget.dbId);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      console.error("Failed to delete course:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
        <CourseHeader />

        <CourseStats courses={courses} />

        <CourseFilters
          activeTab={activeTab}
          onTabChange={(tab) => { setActiveTab(tab); setSelectedIds([]); }}
          tabCounts={tabCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          categories={categories}
        />

        <CourseTable
          courses={filteredCourses}
          loading={loading}
          selectedIds={selectedIds}
          onSelectId={handleSelectId}
          onSelectAll={handleSelectAll}
          onDelete={requestDelete}
          onRefresh={loadData}
        />

        <DeleteDialog
          show={!!deleteTarget}
          title="Delete Course"
          message="This will permanently remove the course and all its associated modules and lessons. This action cannot be undone."
          itemName={deleteTarget?.title}
          deleting={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AppLayout>
  );
}

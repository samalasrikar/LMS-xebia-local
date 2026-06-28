import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import categoryService from "../services/categoryService";
import CourseHeader from "../components/courses/CourseHeader";
import CourseFilters from "../components/courses/CourseFilters";
import CourseTable from "../components/courses/CourseTable";
import CourseStats from "../components/courses/CourseStats";
import DeleteDialog from "../components/shared/DeleteDialog";

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null); // { dbId, title }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesData, categoriesData] = await Promise.all([
        courseService.getAllCourses(),
        categoryService.getAllCategories(),
      ]);
      setCategories(categoriesData || []);

      if (coursesData && coursesData.length > 0) {
        const mapped = coursesData.map((course) => ({
          id: `CRS-2024-${100 + course.id}`,
          dbId: course.id,
          title: course.title,
          category: course.categoryName || "General",
          duration: course.duration || "10h 00m",
          difficulty: course.difficulty || "Intermediate",
          status: course.status || "Published",
          createdDate: "Recently",
          thumbnail: course.thumbnail || DEFAULT_THUMBNAIL,
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
  };

  // ─── Delete ───────────────────────────────────────────────────────────────

  const requestDelete = (course) => {
    setDeleteTarget({ dbId: course.dbId, title: course.title });
  };

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
      <div className="space-y-8">
        <CourseHeader />

        <CourseFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <CourseTable
          courses={courses}
          loading={loading}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onDelete={requestDelete}
        />

        <CourseStats courses={courses} />

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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import categoryService from "../services/categoryService";
import courseService from "../services/courseService";
import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryStats from "../components/categories/CategoryStats";
import DeleteDialog from "../components/shared/DeleteDialog";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);

  // Toolbar state
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [viewMode, setViewMode] = useState("grid");

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const [categoriesData, coursesData] = await Promise.all([
        categoryService.getAllCategories(),
        courseService.getAllCourses(),
      ]);
      const coursesList = coursesData || [];
      setTotalCourses(coursesList.length);

      if (categoriesData && categoriesData.length > 0) {
        const mapped = categoriesData.map((cat) => {
          const courseCount = coursesList.filter(
            (c) => Number(c.categoryId) === Number(cat.id)
          ).length;

          return {
            id: `CAT-${1000 + cat.id}`,
            dbId: cat.id,
            name: cat.name,
            description: cat.description || "No description provided.",
            courses: courseCount,
            learners: cat.learnerCount ?? null,
            completion: cat.completionRate ?? null,
            status: cat.status || "Active",
            updatedAt: cat.updatedAt ?? cat.createdAt ?? null,
            image: cat.image || null,
          };
        });
        setCategories(mapped);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // ─── Sort logic ────────────────────────────────────────────────────────────

  const applySortAndFilter = (list) => {
    let filtered = list
      .filter((cat) => cat.name.toLowerCase().includes(filterText.toLowerCase()))
      .filter((cat) => statusFilter === "All" || cat.status === statusFilter);

    switch (sortBy) {
      case "Most Popular":
        return filtered.sort((a, b) => (b.courses ?? 0) - (a.courses ?? 0));
      case "Newest First":
        return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case "Oldest First":
        return filtered.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      case "A → Z":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "Z → A":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  };

  const displayedCategories = applySortAndFilter([...categories]);

  // ─── Navigation handlers ────────────────────────────────────────────────────
  const openView = (cat) => navigate(`/categories/${cat.dbId}/edit`);
  const openEdit = (cat) => navigate(`/categories/${cat.dbId}/edit`);

  // ─── Delete ────────────────────────────────────────────────────────────────
  const requestDelete = (cat) => setDeleteTarget({ dbId: cat.dbId, name: cat.name });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await categoryService.deleteCategory(deleteTarget.dbId);
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-5 animate-[fadeIn_0.5s_ease-out]">
        <CategoryHeader />

        <CategoryStats categories={categories} totalCourses={totalCourses} />

        <CategoryToolbar
          filterText={filterText}
          onFilterChange={setFilterText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={displayedCategories.length}
          totalAll={categories.length}
        />

        <CategoryTable
          categories={displayedCategories}
          loading={loading}
          viewMode={viewMode}
          onView={openView}
          onEdit={openEdit}
          onDelete={requestDelete}
        />

        <DeleteDialog
          show={!!deleteTarget}
          title="Delete Category"
          message="This will permanently remove the category and may affect associated courses. This action cannot be undone."
          itemName={deleteTarget?.name}
          deleting={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </AppLayout>
  );
}
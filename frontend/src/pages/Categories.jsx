import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import categoryService from "../services/categoryService";
import courseService from "../services/courseService";
import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryStats from "../components/categories/CategoryStats";
import CategoryDialog from "../components/categories/CategoryDialog";
import DeleteDialog from "../components/shared/DeleteDialog";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit" | "view"
  const [selectedCatDbId, setSelectedCatDbId] = useState(null);

  // Form fields
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatImageFile, setNewCatImageFile] = useState(null);
  const [newCatImagePreview, setNewCatImagePreview] = useState("");
  const [newCatStatus, setNewCatStatus] = useState("Active");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null); // { dbId, name }
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

      if (categoriesData && categoriesData.length > 0) {
        const mapped = categoriesData.map((cat) => {
          const count = coursesList.filter((c) => Number(c.categoryId) === Number(cat.id)).length;
          return {
            id: `CAT-${1000 + cat.id}`,
            dbId: cat.id,
            name: cat.name,
            description: cat.description || "No description provided.",
            courses: count,
            status: cat.status || "Active",
            created: "Recently",
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

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const resetForm = () => {
    setNewCatName("");
    setNewCatDesc("");
    setNewCatImageFile(null);
    setNewCatImagePreview("");
    setNewCatStatus("Active");
    setErrorMsg("");
  };

  const handleImageFileChange = (file) => {
    setNewCatImageFile(file);
    setNewCatImagePreview(URL.createObjectURL(file));
  };

  const openAdd = () => {
    resetForm();
    setModalMode("add");
    setShowModal(true);
  };

  const openView = (cat) => {
    setNewCatName(cat.name);
    setNewCatDesc(cat.description || "");
    setNewCatImageFile(null);
    setNewCatImagePreview(cat.image || "");
    setNewCatStatus(cat.status || "Active");
    setModalMode("view");
    setErrorMsg("");
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setNewCatName(cat.name);
    setNewCatDesc(cat.description || "");
    setNewCatImageFile(null);
    setNewCatImagePreview(cat.image || "");
    setNewCatStatus(cat.status || "Active");
    setSelectedCatDbId(cat.dbId);
    setModalMode("edit");
    setErrorMsg("");
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (modalMode === "view") {
      setShowModal(false);
      return;
    }
    if (!newCatName.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.append("name", newCatName.trim());
      formData.append("description", newCatDesc.trim());
      formData.append("status", newCatStatus);
      if (newCatImageFile) {
        formData.append("image", newCatImageFile);
      }

      if (modalMode === "add") {
        await categoryService.createCategory(formData);
      } else if (modalMode === "edit") {
        await categoryService.updateCategory(selectedCatDbId, formData);
      }
      resetForm();
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error(`Failed to ${modalMode} category:`, err);
      const serverMsg = err.response?.data?.message;
      setErrorMsg(
        serverMsg || "Error processing category. Please check your connection or unique name."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Delete ───────────────────────────────────────────────────────────────

  const requestDelete = (cat) => {
    setDeleteTarget({ dbId: cat.dbId, name: cat.name });
  };

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

  // ─── Derived data ──────────────────────────────────────────────────────────

  const filteredCategories = categories
    .filter((cat) =>
      cat.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((cat) => statusFilter === "All" || cat.status === statusFilter);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <AppLayout>
      <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
        <CategoryHeader onAddCategory={openAdd} />

        <CategoryToolbar
          filterText={filterText}
          onFilterChange={setFilterText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <CategoryTable
          categories={filteredCategories}
          loading={loading}
          onView={openView}
          onEdit={openEdit}
          onDelete={requestDelete}
        />

        <CategoryStats categories={categories} />

        <CategoryDialog
          show={showModal}
          mode={modalMode}
          name={newCatName}
          desc={newCatDesc}
          imagePreview={newCatImagePreview}
          status={newCatStatus}
          errorMsg={errorMsg}
          submitting={submitting}
          onNameChange={setNewCatName}
          onDescChange={setNewCatDesc}
          onImageFileChange={handleImageFileChange}
          onStatusChange={setNewCatStatus}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
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
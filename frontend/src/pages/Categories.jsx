import AppLayout from "../components/layout/AppLayout";
import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryGrid from "../components/categories/CategoryGrid";
import CategoryStats from "../components/categories/CategoryStats";
import CategoryDialog from "../components/categories/CategoryDialog";
import DeleteDialog from "../components/shared/DeleteDialog";

import useCategories from "../hooks/useCategories";

export default function Categories() {
  const {
    categories,
    loading,
    filterText,
    setFilterText,
    statusFilter,
    setStatusFilter,
    showModal,
    setShowModal,
    modalMode,
    newCatName,
    setNewCatName,
    newCatDesc,
    setNewCatDesc,
    newCatImagePreview,
    newCatStatus,
    setNewCatStatus,
    submitting,
    errorMsg,
    deleteTarget,
    setDeleteTarget,
    deleting,
    handleImageFileChange,
    openView,
    openEdit,
    handleFormSubmit,
    requestDelete,
    confirmDelete,
    filteredCategories,
  } = useCategories();

  return (
    <AppLayout>
      <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
        <CategoryHeader />

        <CategoryToolbar
          filterText={filterText}
          onFilterChange={setFilterText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <CategoryGrid
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
import AppLayout from "@/app/layouts/AppLayout";
import CategoryHeader from "@/features/categories/components/CategoryHeader";
import CategoryToolbar from "@/features/categories/components/CategoryToolbar";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import CategoryStats from "@/features/categories/components/CategoryStats";
import DeleteDialog from "@/shared/components/DeleteDialog";

import useCategories from "@/features/categories/hooks/useCategories";

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
    newCatEmoji,
    setNewCatEmoji,
    newCatAccentColor,
    setNewCatAccentColor,
    newCatTags,
    setNewCatTags,
    newCatFeatured,
    setNewCatFeatured,
    newCatMetaTitle,
    setNewCatMetaTitle,
    newCatMetaDesc,
    setNewCatMetaDesc,
    newCatFocusKeyword,
    setNewCatFocusKeyword,
    newCatLongDesc,
    setNewCatLongDesc,
    newCatPublishState,
    setNewCatPublishState,
    newCatSlug,
    setNewCatSlug,
    newCatParentCat,
    setNewCatParentCat,
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
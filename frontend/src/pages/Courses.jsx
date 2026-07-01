import AppLayout from "../components/layout/AppLayout";
import DeleteDialog from "../components/shared/DeleteDialog";

import CoursesPageHeader from "../components/courses/CoursesPageHeader";
import CoursesStatsBar   from "../components/courses/CoursesStatsBar";
import CoursesTabs       from "../components/courses/CoursesTabs";
import CoursesFilterBar  from "../components/courses/CoursesFilterBar";
import CoursesTableView  from "../components/courses/CoursesTableView";
import CoursesGridView   from "../components/courses/CoursesGridView";

import useCourses from "../hooks/useCourses";

export default function Courses() {
  const {
    courses,
    categories,
    loading,
    searchQuery,
    setSearch,
    activeTab,
    setActiveTab,
    selectedCat,
    setSelectedCat,
    selectedDiff,
    setSelectedDiff,
    viewMode,
    setViewMode,
    selected,
    setSelected,
    openDropdown,
    setOpenDropdown,
    deleteTarget,
    setDeleteTarget,
    deleting,
    toast,
    filtered,
    toggleSelect,
    toggleAll,
    toggleFeatured,
    toggleActive,
    confirmDelete,
    handleBulkStatusChange,
    handleBulkFeature,
  } = useCourses();

  const handleBulkDeleteInitiate = () => {
    setDeleteTarget({
      isBulk: true,
      ids: new Set(selected),
      title: `${selected.size} selected courses`,
    });
  };

  /* ─── Derived counts ─────────────────────────────────────────── */
  const counts = {
    published: courses.filter((c) => c.status === "published").length,
    draft:     courses.filter((c) => c.status === "draft").length,
    archived:  courses.filter((c) => c.status === "archived").length,
    featured:  courses.filter((c) => c.featured).length,
  };

  const allSelected  = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && selected.size < filtered.length;

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">

        <CoursesPageHeader />

        <CoursesStatsBar courses={courses} counts={counts} />

        <CoursesTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

        <CoursesFilterBar
          searchQuery={searchQuery}
          setSearch={setSearch}
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
          selectedDiff={selectedDiff}
          setSelectedDiff={setSelectedDiff}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          filteredCount={filtered.length}
        />

        {viewMode === "grid" ? (
          <CoursesGridView
            loading={loading}
            filtered={filtered}
            allCourses={courses}
            selected={selected}
            allSelected={allSelected}
            someSelected={someSelected}
            openDropdown={openDropdown}
            onToggleAll={toggleAll}
            onToggleSelect={toggleSelect}
            onToggleActive={toggleActive}
            onToggleFeatured={toggleFeatured}
            onOpenDropdown={setOpenDropdown}
            onCloseDropdown={() => setOpenDropdown(null)}
            onDeleteTarget={setDeleteTarget}
            onClearSelection={() => setSelected(new Set())}
            onBulkPublish={() => handleBulkStatusChange("published")}
            onBulkArchive={() => handleBulkStatusChange("archived")}
            onBulkFeature={handleBulkFeature}
            onBulkDelete={handleBulkDeleteInitiate}
          />
        ) : (
          <CoursesTableView
            loading={loading}
            filtered={filtered}
            allCourses={courses}
            selected={selected}
            allSelected={allSelected}
            someSelected={someSelected}
            openDropdown={openDropdown}
            onToggleAll={toggleAll}
            onToggleSelect={toggleSelect}
            onToggleActive={toggleActive}
            onToggleFeatured={toggleFeatured}
            onOpenDropdown={setOpenDropdown}
            onCloseDropdown={() => setOpenDropdown(null)}
            onDeleteTarget={setDeleteTarget}
            onClearSelection={() => setSelected(new Set())}
            onBulkPublish={() => handleBulkStatusChange("published")}
            onBulkArchive={() => handleBulkStatusChange("archived")}
            onBulkFeature={handleBulkFeature}
            onBulkDelete={handleBulkDeleteInitiate}
          />
        )}

      </div>

      {/* Close dropdown on outside click */}
      {openDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
      )}

      <DeleteDialog
        show={!!deleteTarget}
        title="Delete Course"
        message="This will permanently remove the course and all its modules. This action cannot be undone."
        itemName={deleteTarget?.title}
        deleting={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${
          toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          {toast.type === "error" ? (
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
          )}
          <span className="text-[13px] font-semibold">{toast.message}</span>
        </div>
      )}
    </AppLayout>
  );
}

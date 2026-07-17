import AppLayout from "@/app/layouts/AppLayout";
import DeleteDialog from "@/shared/components/DeleteDialog";
import { TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

import CoursesPageHeader from "@/features/courses/components/CoursesPageHeader";
import CoursesStatsBar from "@/features/courses/components/CoursesStatsBar";
import CoursesTabs from "@/features/courses/components/CoursesTabs";
import CoursesFilterBar from "@/features/courses/components/CoursesFilterBar";
import CoursesTableView from "@/features/courses/components/CoursesTableView";
import CoursesGridView from "@/features/courses/components/CoursesGridView";

import useCourses from "@/features/courses/hooks/useCourses";

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
    sortBy,
    setSortBy,
    analyticsCourse,
    setAnalyticsCourse,
    duplicateCourse,
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
    draft: courses.filter((c) => c.status === "draft").length,
    archived: courses.filter((c) => c.status === "archived").length,
    featured: courses.filter((c) => c.featured).length,
  };

  const allSelected = filtered.length > 0 && selected.size === filtered.length;
  const someSelected = selected.size > 0 && selected.size < filtered.length;

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">

        <CoursesPageHeader />

        <CoursesStatsBar courses={courses} counts={counts} />

        <CoursesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
          sortBy={sortBy}
          setSortBy={setSortBy}
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
            onOpenAnalytics={setAnalyticsCourse}
            onDuplicate={duplicateCourse}
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
            onOpenAnalytics={setAnalyticsCourse}
            onDuplicate={duplicateCourse}
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

      {/* ── Course Analytics Dialog ── */}
      <Dialog open={analyticsCourse !== null} onOpenChange={(open) => !open && setAnalyticsCourse(null)}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
          {analyticsCourse && (
            <>
              <DialogHeader className="flex flex-row items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <DialogTitle className="text-[16px] font-black text-slate-800">Course Analytics</DialogTitle>
                  <DialogDescription className="text-[11px] text-slate-400">Key metrics for "{analyticsCourse.title}"</DialogDescription>
                </div>
              </DialogHeader>
              <div className="space-y-3.5 my-4">
                <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">Category</span>
                  <span className="font-semibold text-slate-800">{analyticsCourse.category}</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">Difficulty Level</span>
                  <span className="font-semibold text-slate-800">{analyticsCourse.difficulty}</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">Total Enrolled Learners</span>
                  <span className="font-bold text-slate-800">{analyticsCourse.learners}</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">Average Rating</span>
                  <span className="font-semibold text-amber-500">4.5 ★</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px] border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">Course Completion Rate</span>
                  <span className="font-semibold text-slate-800">76.5%</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="text-slate-500 font-medium">Total Course Views</span>
                  <span className="font-semibold text-slate-800">{analyticsCourse.learners * 3 + 47}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setAnalyticsCourse(null)}
                  className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer outline-none"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
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

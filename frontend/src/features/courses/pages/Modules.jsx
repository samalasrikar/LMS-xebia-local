import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/shared/components/ui/spinner";
import AppLayout from "@/app/layouts/AppLayout";
import useModules from "@/features/courses/hooks/useModules";
import ModulesHeader from "@/features/courses/components/modules/ModulesHeader";
import ModulesPane from "@/features/courses/components/modules/ModulesPane";
import SubModulesPane from "@/features/courses/components/modules/SubModulesPane";
import ModulesDialogs from "@/features/courses/components/modules/ModulesDialogs";
import EmptyState from "@/shared/components/EmptyState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

export default function Modules() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCourseSelectDialogOpen, setIsCourseSelectDialogOpen] = useState(false);
  const {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    loading,
    toast,
    modules,
    submodules,
    activeModuleId,
    setActiveModuleId,
    cbDialogTarget,
    setCbDialogTarget,
    isModuleModalOpen,
    setIsModuleModalOpen,
    editingModule,
    moduleTitle,
    setModuleTitle,
    moduleDescription,
    setModuleDescription,
    isSubModuleModalOpen,
    setIsSubModuleModalOpen,
    editingSubModule,
    subModuleTitle,
    setSubModuleTitle,
    subModuleDescription,
    setSubModuleDescription,
    activeModule,
    activeSubModules,
    handleOpenModuleModal,
    handleSaveModule,
    handleDeleteModule,
    handleOpenSubModuleModal,
    handleSaveSubModule,
    handleDeleteSubModule,
    openContentLibraryDialog,
    handleConfirmOpenContentLibrary,
  } = useModules();

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">

        <ModulesHeader
          courses={courses}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-xl p-20 flex flex-col items-center justify-center text-slate-400">
            <Spinner className="h-8 w-8 text-[#6C1D5F] mb-3" />
            <p className="text-[13px] font-medium">Loading curriculum data...</p>
          </div>
        ) : !selectedCourseId ? (
          <EmptyState
            icon={BookOpen}
            title="No Course Selected"
            description="Select an existing course or create a new one to start managing modules and curriculum."
            primaryAction={{
              label: "Select Course",
              onClick: () => setIsCourseSelectDialogOpen(true),
            }}
            secondaryAction={{
              label: "Create New Course",
              onClick: () => navigate("/courses/create"),
            }}
          />
        ) : (
          <div className="grid grid-cols-12 gap-6 items-start">

            <ModulesPane
              modules={modules}
              submodules={submodules}
              activeModuleId={activeModuleId}
              setActiveModuleId={setActiveModuleId}
              selectedCourseId={selectedCourseId}
              handleOpenModuleModal={handleOpenModuleModal}
              handleDeleteModule={handleDeleteModule}
            />

            <SubModulesPane
              activeModule={activeModule}
              activeSubModules={activeSubModules}
              openContentLibraryDialog={openContentLibraryDialog}
              handleOpenSubModuleModal={handleOpenSubModuleModal}
              handleDeleteSubModule={handleDeleteSubModule}
            />

          </div>
        )}

      </div>

      <ModulesDialogs
        isModuleModalOpen={isModuleModalOpen}
        setIsModuleModalOpen={setIsModuleModalOpen}
        editingModule={editingModule}
        moduleTitle={moduleTitle}
        setModuleTitle={setModuleTitle}
        moduleDescription={moduleDescription}
        setModuleDescription={setModuleDescription}
        handleSaveModule={handleSaveModule}
        isSubModuleModalOpen={isSubModuleModalOpen}
        setIsSubModuleModalOpen={setIsSubModuleModalOpen}
        editingSubModule={editingSubModule}
        subModuleTitle={subModuleTitle}
        setSubModuleTitle={setSubModuleTitle}
        subModuleDescription={subModuleDescription}
        setSubModuleDescription={setSubModuleDescription}
        handleSaveSubModule={handleSaveSubModule}
        cbDialogTarget={cbDialogTarget}
        setCbDialogTarget={setCbDialogTarget}
        selectedCourseId={selectedCourseId}
        handleConfirmOpenContentLibrary={handleConfirmOpenContentLibrary}
      />

      {/* Course Selector Dialog */}
      <Dialog open={isCourseSelectDialogOpen} onOpenChange={setIsCourseSelectDialogOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 text-left">
          <DialogHeader className="border-b border-slate-50 pb-4">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <BookOpen size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">Select Course</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  Choose a course from the list below to manage its modules.
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2 max-h-64 overflow-y-auto pr-1">
            {courses.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-4">No courses available.</p>
            ) : (
              courses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCourseId(c.id);
                    setIsCourseSelectDialogOpen(false);
                  }}
                  className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-slate-700 text-xs font-semibold">{c.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">ID: {c.id}</span>
                </div>
              ))
            )}
          </div>
          <DialogFooter className="pt-3 border-t border-slate-50 flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCourseSelectDialogOpen(false)}
              className="text-[12.5px] font-semibold cursor-pointer"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
          <span className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"} flex-shrink-0 animate-pulse`} />
          <span className="text-[13px] font-semibold">{toast.message}</span>
        </div>
      )}

    </AppLayout>
  );
}

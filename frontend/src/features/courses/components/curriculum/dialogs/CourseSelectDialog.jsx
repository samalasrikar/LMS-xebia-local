import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Search, Plus, X, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export default function CourseSelectDialog({
    courseDialogOpen,
    setCourseDialogOpen,
    courseDialogTab,
    setCourseDialogTab,
    courseSearch,
    setCourseSearch,
    allCourses,
    loadingAllCourses,
    id,
    handleSelectCourse,
    newCourseTitle,
    setNewCourseTitle,
    newCourseDescription,
    setNewCourseDescription,
    newCourseCategory,
    setNewCourseCategory,
    creatingCourse,
    handleCreateAndSelectCourse,
}) {
    const navigate = useNavigate();

    return (
        <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
            <DialogContent className="w-[95vw] sm:max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl bg-white border border-slate-200 p-0 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 pt-5 pb-4 border-b border-slate-100 shrink-0 text-left">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-[#6C1D5F]/8 flex items-center justify-center">
                            <GraduationCap size={18} className="text-[#6C1D5F]" />
                        </div>
                        <div>
                            <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Select or Create Course</h2>
                            <p className="text-[11.5px] text-slate-400">Choose an existing course or start a new one</p>
                        </div>
                    </div>

                    {/* Tab bar */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg mt-3.5">
                        {[
                            { id: "select", label: "Select Existing" },
                            { id: "create", label: "Create New Course" },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    if (tab.id === "create") {
                                        setCourseDialogOpen(false);
                                        navigate("/courses/create");
                                    } else {
                                        setCourseDialogTab(tab.id);
                                    }
                                }}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-transparent ${courseDialogTab === tab.id
                                        ? "bg-white text-slate-800 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab: Select Existing */}
                {courseDialogTab === "select" && (
                    <div className="flex-1 min-h-0 flex flex-col p-4 space-y-3">
                        {/* Search bar */}
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-[#6C1D5F]/80 focus-within:ring-1 focus-within:ring-[#6C1D5F]/20 transition-all shrink-0">
                            <Search size={14} className="text-slate-400 shrink-0" />
                            <input
                                type="text"
                                value={courseSearch}
                                onChange={e => setCourseSearch(e.target.value)}
                                placeholder="Search courses by title, code or category..."
                                className="flex-1 bg-transparent text-[12.5px] outline-none text-slate-700 placeholder:text-slate-400"
                            />
                            {courseSearch && (
                                <button onClick={() => setCourseSearch("")} className="text-slate-450 hover:text-slate-650 cursor-pointer bg-transparent border-none">
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <ScrollArea className="flex-1 min-h-0">
                            <div className="space-y-1.5 pr-1 text-left">
                                {loadingAllCourses ? (
                                    <div className="py-12 text-center text-slate-450">
                                        <div className="w-6 h-6 border-2 border-[#6C1D5F] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                        <p className="text-[12px] font-semibold">Loading courses...</p>
                                    </div>
                                ) : (
                                    (() => {
                                        const query = courseSearch.toLowerCase().trim();
                                        const filtered = allCourses.filter(c =>
                                            c.title?.toLowerCase().includes(query) ||
                                            c.courseCode?.toLowerCase().includes(query) ||
                                            c.category?.toLowerCase().includes(query)
                                        );

                                        if (filtered.length === 0) {
                                            return (
                                                <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                                    <GraduationCap size={24} className="mx-auto mb-2 text-slate-350" />
                                                    <p className="text-xs font-semibold">No courses found</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Try searching with a different keyword</p>
                                                </div>
                                            );
                                        }

                                        return filtered.map(course => {
                                            const isSelected = String(course.id) === String(id);
                                            return (
                                                <button
                                                    key={course.id}
                                                    onClick={() => handleSelectCourse(course.id)}
                                                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all hover:bg-slate-50 cursor-pointer ${isSelected
                                                            ? "border-[#6C1D5F] bg-[#6C1D5F]/5"
                                                            : "border-slate-100 bg-white"
                                                        }`}
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-mono">
                                                                {course.courseCode || `CR-${course.id}`}
                                                            </span>
                                                            {course.category && (
                                                                <span className="text-[9.5px] font-bold text-[#6C1D5F] uppercase tracking-wider">
                                                                    {course.category}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h4 className={`text-[12.5px] font-bold truncate ${isSelected ? "text-[#6C1D5F]" : "text-slate-750"}`}>
                                                            {course.title}
                                                        </h4>
                                                        <p className="text-[10.5px] text-slate-400 mt-0.5 line-clamp-1">
                                                            {course.description || "No description provided."}
                                                        </p>
                                                    </div>
                                                    <ChevronRight size={14} className={isSelected ? "text-[#6C1D5F]" : "text-slate-300"} />
                                                </button>
                                            );
                                        });
                                    })()
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                )}

                {/* Tab: Create New (Fallback router-link button is defined above, this is local fallback form) */}
                {courseDialogTab === "create" && (
                    <form onSubmit={handleCreateAndSelectCourse} className="flex-1 min-h-0 flex flex-col p-6 space-y-4 text-left">
                        <div className="space-y-1.5">
                            <Label htmlFor="newCourseTitle" className="text-[12px] font-bold text-slate-500">COURSE TITLE *</Label>
                            <Input
                                id="newCourseTitle"
                                value={newCourseTitle}
                                onChange={e => setNewCourseTitle(e.target.value)}
                                placeholder="e.g. Advanced React Architecture"
                                className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="newCourseCategory" className="text-[12px] font-bold text-slate-500">CATEGORY</Label>
                                <select
                                    id="newCourseCategory"
                                    value={newCourseCategory}
                                    onChange={e => setNewCourseCategory(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700 h-10 outline-none"
                                >
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Product">Product</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="newCourseDesc" className="text-[12px] font-bold text-slate-500 font-sans">COURSE DESCRIPTION</Label>
                            <Textarea
                                id="newCourseDesc"
                                value={newCourseDescription}
                                onChange={e => setNewCourseDescription(e.target.value)}
                                placeholder="Describe what this course program covers..."
                                className="text-[13px] min-h-[100px] focus:ring-1 focus:ring-[#6C1D5F]"
                                rows={4}
                            />
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5 mt-auto">
                            <Button type="button" variant="outline" onClick={() => setCourseDialogOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
                            <Button type="submit" disabled={creatingCourse} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                                {creatingCourse ? "Creating..." : "Create Course"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

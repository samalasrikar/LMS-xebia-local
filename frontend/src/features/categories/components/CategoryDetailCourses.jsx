import React, { useState, useEffect } from "react";
import { 
  BookOpen, Plus, Search, ChevronLeft, ChevronRight, Pencil, Trash2, 
  ChevronDown, ChevronRight as ChevronRightIcon, Clock, Globe, Layers, Award,
  CheckCircle, PlayCircle, Eye
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import EmptyState from "@/shared/components/EmptyState";

const LEVEL_CLS = {
  Beginner:     "bg-emerald-50 text-emerald-700 border-emerald-100",
  Intermediate: "bg-blue-50 text-blue-700 border-blue-100",
  Advanced:     "bg-amber-50 text-amber-800 border-amber-100",
  Expert:       "bg-red-50 text-red-700 border-red-100",
};

export default function CategoryDetailCourses({
  courses,
  courseSearch,
  setCourseSearch,
  statusFilter,
  setStatusFilter,
  levelFilter,
  setLevelFilter,
  page,
  setPage,
  PER_PAGE,
  filtered,
  totalPages,
  paginated,
  navigate,
  loading,
}) {
  const [expandedCourses, setExpandedCourses] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set());

  // Pre-expand first course and its modules on initial load
  useEffect(() => {
    if (courses.length > 0 && expandedCourses.size === 0) {
      const firstCourse = courses[0];
      setExpandedCourses(new Set([firstCourse.id]));
      
      if (firstCourse.modules && firstCourse.modules.length > 0) {
        setExpandedModules(new Set([firstCourse.modules[0].id]));
      }
    }
  }, [courses]);

  const toggleCourse = (courseId) => {
    const next = new Set(expandedCourses);
    if (next.has(courseId)) {
      next.delete(courseId);
    } else {
      next.add(courseId);
    }
    setExpandedCourses(next);
  };

  const toggleModule = (moduleId) => {
    const next = new Set(expandedModules);
    if (next.has(moduleId)) {
      next.delete(moduleId);
    } else {
      next.add(moduleId);
    }
    setExpandedModules(next);
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4 text-left">
      {/* Search & Filters */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={courseSearch}
            onChange={(e) => { setCourseSearch(e.target.value); setPage(1); }}
            placeholder="Search courses, modules, or sub-modules..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] text-[13px] text-slate-700 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="flex-1 md:w-36 bg-white border border-slate-200 rounded-lg py-2 px-3 text-[13px] text-slate-650 font-medium outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] cursor-pointer"
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <select
            value={levelFilter}
            onChange={(e) => { setLevelFilter(e.target.value); setPage(1); }}
            className="flex-1 md:w-36 bg-white border border-slate-200 rounded-lg py-2 px-3 text-[13px] text-slate-655 font-medium outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] cursor-pointer"
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* Curriculum Hierarchy Tree */}
      <div className="space-y-3 pb-8">
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-[13px] text-slate-400">
            Loading curriculum data...
          </div>
        ) : paginated.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10">
            <EmptyState
              icon={BookOpen}
              title="No courses found"
              description="There are no courses matching the search criteria or filters in this category."
              primaryAction={{
                label: "Create Course",
                onClick: () => navigate("/courses/create"),
              }}
            />
          </div>
        ) : (
          paginated.map((course) => {
            const isExpanded = expandedCourses.has(course.id);
            const levelCls = LEVEL_CLS[course.level] || LEVEL_CLS.Intermediate;
            const isPub = course.status === "Published";
            
            // Count total sub-modules in this course
            const subModulesCount = course.modules?.reduce((acc, m) => acc + (m.subModules?.length || 0), 0) || 0;

            return (
              <div key={course.id} className="space-y-2">
                {/* Course Card Header */}
                <div 
                  className={`bg-white border rounded-xl shadow-sm transition-all overflow-hidden ${
                    isExpanded ? "border-[#6C1D5F]/35 ring-1 ring-[#6C1D5F]/5" : "border-slate-200 hover:border-slate-350"
                  }`}
                >
                  <div className="p-4 flex items-center justify-between cursor-pointer group select-none" onClick={() => toggleCourse(course.id)}>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="text-slate-400 group-hover:text-[#6C1D5F] transition-colors shrink-0">
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRightIcon size={18} />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-bold text-slate-800 text-[14.5px] truncate max-w-[280px] sm:max-w-md">{course.title}</h4>
                          <Badge className={`text-[10px] font-bold py-0.5 px-2 uppercase border ${
                            isPub ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}>
                            {course.status}
                          </Badge>
                          <Badge className={`text-[10px] font-bold py-0.5 px-2 uppercase border ${levelCls}`}>
                            {course.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-[11.5px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1"><Clock size={12} className="opacity-70" /> {course.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="flex items-center gap-1"><Layers size={12} className="opacity-70" /> {course.modules?.length || 0} Modules</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="flex items-center gap-1"><Award size={12} className="opacity-70" /> {subModulesCount} Sub-modules</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="flex items-center gap-1"><Globe size={12} className="opacity-70" /> {course.learners} Learners</span>
                        </div>
                      </div>
                    </div>
                    {/* Action buttons (Visible on hover) */}
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                        title="View Course Details"
                      >
                        <Eye size={13} />
                      </button>
                      <button 
                        onClick={() => navigate(`/courses/${course.id}/edit`)}
                        className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 text-slate-500 hover:text-[#6C1D5F] transition-all cursor-pointer"
                        title="Edit Course"
                      >
                        <Pencil size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Modules Section */}
                  {isExpanded && (
                    <div className="px-4 pb-4 ml-8 space-y-3 border-t border-slate-100 pt-4">
                      {course.modules?.length === 0 ? (
                        <div className="text-[12.5px] text-slate-400 py-4 italic">No modules configured for this course.</div>
                      ) : (
                        course.modules.map((module) => {
                          const isModExpanded = expandedModules.has(module.id);
                          return (
                            <div key={module.id} className="relative pl-6">
                              {/* Connector graphics */}
                              <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />
                              <div className="absolute left-0 top-4 w-4.5 h-px bg-slate-200" />

                              {/* Module Card */}
                              <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3">
                                <div 
                                  className="flex items-center justify-between cursor-pointer group/module select-none"
                                  onClick={() => toggleModule(module.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 group-hover/module:text-[#6C1D5F] transition-colors shrink-0">
                                      {isModExpanded ? <ChevronDown size={14} /> : <ChevronRightIcon size={14} />}
                                    </span>
                                    <h5 className="text-[13px] font-bold text-slate-700">{module.title}</h5>
                                    <span className="text-[11px] text-slate-400 font-medium">({module.subModules?.length || 0} Sub-modules)</span>
                                  </div>
                                  <button className="opacity-0 group-hover/module:opacity-100 p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-[#6C1D5F] transition-all cursor-pointer" title="Add Submodule">
                                    <Plus size={13} />
                                  </button>
                                </div>

                                {/* Expandable Sub-modules */}
                                {isModExpanded && (
                                  <div className="ml-4 pl-4 border-l border-slate-200/80 space-y-2 mt-3 mb-1 animate-[fadeIn_0.15s_ease-out]">
                                    {module.subModules?.length === 0 ? (
                                      <div className="text-[11.5px] text-slate-400 py-1 italic">No sub-modules found.</div>
                                    ) : (
                                      module.subModules.map((sub, sidx) => (
                                        <div 
                                          key={sub.id} 
                                          className="flex items-center justify-between p-2 bg-white rounded border border-slate-200 hover:border-[#6C1D5F]/30 hover:shadow-sm transition-all"
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <div className="w-5 h-5 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-extrabold text-slate-500">
                                              {sidx + 1}
                                            </div>
                                            <span className="text-[12.5px] font-medium text-slate-750">{sub.title}</span>
                                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold uppercase leading-none scale-90">
                                              {sub.status || "Active"}
                                            </span>
                                          </div>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
          <span className="text-[12px] text-slate-400 font-medium">
            Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} courses
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p-1))} 
              disabled={page === 1} 
              className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-md border text-[12.5px] font-medium transition-colors cursor-pointer ${
                  page === p 
                    ? "bg-[#6C1D5F] text-white border-[#6C1D5F]" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p+1))} 
              disabled={page === totalPages} 
              className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

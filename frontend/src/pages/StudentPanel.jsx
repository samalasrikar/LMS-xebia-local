import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import courseService from "../services/courseService";

export default function StudentPanel() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to load student courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 space-y-6">
      {/* ── Welcome Hero Banner ── */}
      <div className="bg-gradient-to-br from-[#6C1D5F] via-[#84117C] to-[#6C1D5F] rounded-2xl p-6 md:p-8 text-white shadow-lg shadow-[#6C1D5F]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight">Welcome back, Srikar!</h2>
          <p className="text-[13px] text-white/75 max-w-[500px] leading-relaxed">
            Ready to continue your learning journey? Dive back into your modules, complete quizzes, and claim your course certificates.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl px-5 py-4 text-center min-w-[100px] shadow-sm">
            <div className="text-xl md:text-2xl font-bold leading-tight">{courses.length}</div>
            <div className="text-[10px] text-white/55 font-semibold uppercase mt-1 tracking-wide">Active Courses</div>
          </div>
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-xl px-5 py-4 text-center min-w-[100px] shadow-sm">
            <div className="text-xl md:text-2xl font-bold leading-tight">78%</div>
            <div className="text-[10px] text-white/55 font-semibold uppercase mt-1 tracking-wide">Avg Progress</div>
          </div>
        </div>
      </div>

      {/* ── Section Header ── */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-[16px] font-bold text-slate-800">Your Enrolled Courses</h3>
        <span className="text-[12px] text-slate-400 font-medium">
          Showing {courses.length} course{courses.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Course Cards ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-2xl h-[220px] p-6 space-y-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-50 rounded w-1/2" />
              </div>
              <div className="pt-6 h-3 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-[500px] mx-auto shadow-sm">
          <BookOpen size={36} className="mx-auto text-slate-300 mb-4" />
          <h4 className="text-[14px] font-bold text-slate-700">No enrolled courses</h4>
          <p className="text-[12px] text-slate-400 mt-1 max-w-[340px] mx-auto leading-relaxed">
            You are not enrolled in any courses yet. Switch back to the admin portal to create and publish a course.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-5 px-5 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white rounded-lg text-[12px] font-semibold transition-colors cursor-pointer border-none outline-none shadow-sm shadow-[#6C1D5F]/15"
          >
            Back to Admin Portal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, index) => {
            const progress = [35, 60, 95, 10, 80][index % 5];
            const modulesCount = c.modules?.length || [4, 6, 8, 5, 7][index % 5];

            return (
              <div
                key={c.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center border border-[#6C1D5F]/10">
                      <BookOpen size={16} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-50 border-slate-200 text-slate-500 uppercase tracking-wide">
                      {c.category || "General"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[14px] font-bold text-slate-800 line-clamp-2 min-h-[40px] leading-tight">
                      {c.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-400 line-clamp-2 leading-relaxed">
                      {c.description || "Start learning this topic and advance your career skills."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-semibold">{modulesCount} Modules</span>
                      <span className="text-slate-700 font-bold">{progress}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#6C1D5F] to-[#84117C] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/courses/${c.id}/curriculum`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 border border-slate-200 hover:border-[#6C1D5F] hover:bg-[#6C1D5F]/5 text-slate-600 hover:text-[#6C1D5F] rounded-xl text-[12px] font-bold shadow-sm transition-all cursor-pointer bg-white outline-none"
                  >
                    <PlayCircle size={13} /> Resume Lesson <ChevronRight size={12} className="opacity-60" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

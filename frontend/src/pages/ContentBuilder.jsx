import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import { Layers, Search, BookOpen, ChevronRight, ArrowRight, Star } from "lucide-react";

export default function ContentBuilder() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const data = await courseService.getAllCourses();
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to load courses for curriculum builder:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const categories = ["All", ...new Set(courses.map(c => c.categoryName || "General"))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (course.categoryName && course.categoryName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || (course.categoryName || "General") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Content & Curriculum Builder</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Select a course to build, structure, and manage its modules and lessons.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#6C1D5F] text-white border-[#6C1D5F] shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-2 border-[#6C1D5F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center w-full max-w-[448px] mx-auto">
              <Layers className="text-slate-300 mx-auto mb-4" size={40} />
           <h3 className="text-lg font-semibold text-slate-900 mb-2">No courses found</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Create a course first in the Courses Management tab before building its curriculum.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}/curriculum`)}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all group flex flex-col cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] bg-slate-100 flex-shrink-0 overflow-hidden border-b border-slate-100">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                      <BookOpen size={40} className="stroke-[1.5]" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#6C1D5F]/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                    {course.categoryName || "General"}
                  </span>
                  {course.featured && (
                    <span className="absolute top-3 right-3 p-1.5 bg-amber-500 rounded-full text-white shadow-sm">
                      <Star size={10} fill="currentColor" />
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-[#6C1D5F] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Difficulty: <span className="font-semibold text-slate-600">{course.difficulty || "Beginner"}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                      <Layers size={13} className="text-[#6C1D5F]" />
                      Manage Curriculum
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-[#6C1D5F] group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppLayout>
  );
}

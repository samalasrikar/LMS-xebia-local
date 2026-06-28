import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import categoryService from "../services/categoryService";
import {
  Search,
  Plus,
  Download,
  Upload,
  Edit,
  Users,
  Trash2,
  GraduationCap,
  CheckCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesData, categoriesData] = await Promise.all([
        courseService.getAllCourses(),
        categoryService.getAllCategories(),
      ]);
      setCategories(categoriesData || []);

      if (coursesData && coursesData.length > 0) {
        const mapped = coursesData.map((course) => ({
          id: `CRS-2024-${100 + course.id}`,
          dbId: course.id,
          title: course.title,
          category: course.categoryName || "General",
          duration: "10h 00m",
          difficulty: "Intermediate",
          status: "Published",
          createdDate: "Recently",
          thumbnail: course.thumbnail || DEFAULT_THUMBNAIL,
        }));
        setCourses(mapped);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (dbId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }
    try {
      await courseService.deleteCourse(dbId);
      loadData();
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("Failed to delete course.");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
            <p className="text-slate-500 text-sm mt-1">Manage, monitor, and update your educational catalog.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Upload size={14} />
              Import
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Download size={14} />
              Export
            </button>
            <Link
              to="/courses/create"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <Plus size={14} />
              Create Course
            </Link>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Search</label>
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-xs outline-none"
                  placeholder="Title or ID..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-xs outline-none"
              >
                <option>All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Trainer</label>
              <select className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-xs outline-none">
                <option>All Trainers</option>
                <option>Dr. Sarah Johnson</option>
                <option>Michael Chen</option>
                <option>Emily Watson</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Difficulty</label>
              <select className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-xs outline-none">
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Status</label>
              <select className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-xs outline-none">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modern Course Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thumbnail</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider min-w-[200px]">Title</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trainer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Created Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-xs text-slate-400">Loading courses...</td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-xs text-slate-400">No courses found.</td>
                  </tr>
                ) : courses
                  .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase()))
                  .filter(c => selectedCategory === "All Categories" || c.category === selectedCategory)
                  .map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <img alt={course.title} className="w-14 h-9 rounded-lg object-cover" src={course.thumbnail} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-xs">{course.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">ID: {course.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-full">
                          {course.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {course.trainerAvatar ? (
                            <img className="w-5 h-5 rounded-full object-cover" src={course.trainerAvatar} alt={course.trainer} />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-500">
                              {course.trainerInitials}
                            </div>
                          )}
                          <span className="text-xs text-slate-700 font-medium">{course.trainer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">{course.duration}</td>
                      <td className="px-6 py-4 font-bold text-xs text-slate-800">{course.price}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                          <span className={`w-1.5 h-1.5 rounded-full ${course.difficulty === "Beginner" ? "bg-green-500" :
                            course.difficulty === "Intermediate" ? "bg-amber-500" : "bg-red-500"
                            }`} />
                          {course.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${course.status === "Published"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{course.createdDate}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-purple-700 hover:bg-slate-100 rounded-lg transition-all" title="Edit">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-purple-700 hover:bg-slate-100 rounded-lg transition-all" title="View Students">
                            <Users size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.dbId)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">Showing <span className="font-bold text-slate-700">1 - {courses.length}</span> of <span className="font-bold text-slate-700">{courses.length}</span> courses</p>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-7 h-7 rounded-lg bg-purple-700 text-white text-xs font-bold shadow-sm">1</button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Courses</p>
              <p className="text-lg font-bold text-purple-900">{courses.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-700">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Published</p>
              <p className="text-lg font-bold text-green-700">{courses.filter(c => c.status === "Published").length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drafts</p>
              <p className="text-lg font-bold text-amber-700">{courses.filter(c => c.status === "Draft").length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
              <p className="text-lg font-bold text-indigo-900">12.4k</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

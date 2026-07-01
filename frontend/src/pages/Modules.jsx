import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import moduleService from "../services/moduleService";
import courseService from "../services/courseService";
import { 
  BookOpen, Plus, Edit2, Trash2, X, Save, CheckCircle, 
  AlertCircle, Search, Layers, ChevronRight 
} from "lucide-react";

export default function Modules() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [form, setForm] = useState({
    title: "",
    courseId: "",
    sortOrder: 1,
    description: ""
  });

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Status feedback
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [modulesData, coursesData] = await Promise.all([
        moduleService.getAllModules(),
        courseService.getAllCourses()
      ]);
      setModules(modulesData || []);
      setCourses(coursesData || []);
    } catch (err) {
      console.error("Failed to load modules/courses:", err);
      showAlert("error", "Failed to connect to modules service.");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const openCreateModal = () => {
    setEditingModule(null);
    setForm({
      title: "",
      courseId: courses[0]?.id ? String(courses[0].id) : "",
      sortOrder: modules.length + 1,
      description: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (mod) => {
    setEditingModule(mod);
    setForm({
      title: mod.title || "",
      courseId: mod.courseId ? String(mod.courseId) : "",
      sortOrder: mod.sortOrder || 1,
      description: mod.description || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        courseId: Number(form.courseId),
        sortOrder: Number(form.sortOrder),
        description: form.description
      };

      if (editingModule) {
        const updated = await moduleService.updateModule(editingModule.id, payload);
        setModules(prev => prev.map(m => m.id === editingModule.id ? { ...m, ...updated } : m));
        showAlert("success", "Module updated successfully.");
      } else {
        const created = await moduleService.createModule(payload);
        setModules(prev => [...prev, created]);
        showAlert("success", "Module created successfully.");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save module:", err);
      showAlert("error", "Error saving module. Please try again.");
    }
  };

  const requestDelete = (mod) => {
    setDeleteTarget(mod);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await moduleService.deleteModule(deleteTarget.id);
      setModules(prev => prev.filter(m => m.id !== deleteTarget.id));
      showAlert("success", "Module deleted successfully.");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete module:", err);
      showAlert("error", "Failed to delete module.");
    } finally {
      setDeleting(false);
    }
  };

  // Helper to map Course ID to Course Name
  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === Number(courseId));
    return course ? course.title : `Course #${courseId}`;
  };

  // Filter Modules
  const filteredModules = modules.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCourse = selectedCourse === "All" || String(m.courseId) === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <AppLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
        
        {/* Alert Messages */}
        {alert && (
          <div className={`px-4 py-3 border rounded-xl shadow-sm text-xs font-semibold flex items-center gap-2 transition-all ${
            alert.type === "success" 
              ? "bg-green-50 text-green-800 border-green-200" 
              : "bg-red-50 text-red-800 border-red-200"
          }`}>
            {alert.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            {alert.message}
          </div>
        )}

        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Modules Management</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Organize and structure course chapters or main learning modules.
            </p>
          </div>
          
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#6C1D5F] hover:bg-[#57174C] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus size={14} /> Add Module
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[448px] shrink-0 border border-slate-200 flex flex-col my-8"></div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Filter Course:</label>
            <select
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#6C1D5F] cursor-pointer"
            >
              <option value="All">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={String(c.id)}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Modules Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Module Title</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Associated Course</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sort Order</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <div className="w-8 h-8 border-2 border-[#6C1D5F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-xs text-slate-400">Loading modules...</p>
                    </td>
                  </tr>
                ) : filteredModules.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <BookOpen size={32} className="text-slate-200 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">No modules found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredModules.map(mod => (
                    <tr key={mod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-xs text-slate-800">{mod.title}</div>
                        {mod.description && (
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{mod.description}</div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold text-[#6C1D5F]">
                        {getCourseName(mod.courseId)}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                        {mod.sortOrder}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigate(`/courses/${mod.courseId}/curriculum`)}
                            className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/5 rounded-lg transition-colors cursor-pointer"
                            title="Manage curriculum in builder"
                          >
                            <Layers size={14} />
                          </button>
                          <button
                            onClick={() => openEditModal(mod)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => requestDelete(mod)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[448px] border border-slate-200 flex flex-col my-8">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingModule ? "Edit Module" : "Add Module"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Associated Course *</label>
                  <select
                    value={form.courseId}
                    onChange={e => setForm(p => ({ ...p, courseId: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                    required
                  >
                    <option value="" disabled>Select Course</option>
                    {courses.map(c => (
                      <option key={c.id} value={String(c.id)}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Module Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Overview of React Basics"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Sort Order</label>
                  <input
                    type="number"
                    min="1"
                    value={form.sortOrder}
                    onChange={e => setForm(p => ({ ...p, sortOrder: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Describe what this module covers..."
                    rows={3}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] resize-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#6C1D5F] hover:bg-[#57174C] text-white font-bold rounded-xl text-xs transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <Save size={13} /> {editingModule ? "Save Changes" : "Create Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DIALOG */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[384px] max-w-sm shrink-0 border border-slate-200 p-6 text-center">
            <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Delete Module?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? This action will permanently remove it.
            </p>
            <div className="flex items-center justify-center gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

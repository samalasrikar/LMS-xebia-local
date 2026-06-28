import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import categoryService from "../services/categoryService";
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  BookOpen,
  X,
} from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatImage, setNewCatImage] = useState("");
  const [newCatStatus, setNewCatStatus] = useState("Active");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view"
  const [selectedCatDbId, setSelectedCatDbId] = useState(null);

  const DEFAULT_CAT_IMAGES = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      if (data && data.length > 0) {
        const mapped = data.map((cat, idx) => ({
          id: `CAT-${1000 + cat.id}`,
          dbId: cat.id,
          name: cat.name,
          description: cat.description || "No description provided.",
          courses: 0,
          status: cat.status || "Active",
          created: "Recently",
          image: cat.image || (idx % 2 === 0 ? DEFAULT_CAT_IMAGES[0] : DEFAULT_CAT_IMAGES[1]),
        }));
        setCategories(mapped);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (modalMode === "view") {
      setShowAddModal(false);
      return;
    }

    if (!newCatName.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const payload = {
        name: newCatName.trim(),
        description: newCatDesc.trim(),
        image: newCatImage.trim(),
        status: newCatStatus
      };

      if (modalMode === "add") {
        await categoryService.createCategory(payload);
      } else if (modalMode === "edit") {
        await categoryService.updateCategory(selectedCatDbId, payload);
      }
      setNewCatName("");
      setNewCatDesc("");
      setNewCatImage("");
      setNewCatStatus("Active");
      setShowAddModal(false);
      fetchCategories();
    } catch (err) {
      console.error(`Failed to ${modalMode} category:`, err);
      setErrorMsg(`Error processing category. Please check your connection or unique name.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (dbId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    try {
      await categoryService.deleteCategory(dbId);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category.");
    }
  };

  const filteredCategories = categories
    .filter((cat) => cat.name.toLowerCase().includes(filterText.toLowerCase()))
    .filter((cat) => statusFilter === "All" || cat.status === statusFilter);

  return (
    <AppLayout>
      <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Category Management</h1>
            <p className="text-slate-500 text-sm mt-1">Organize and manage your learning curriculum buckets.</p>
          </div>
          <button 
            onClick={() => {
              setNewCatName("");
              setNewCatDesc("");
              setNewCatImage("");
              setNewCatStatus("Active");
              setModalMode("add");
              setErrorMsg("");
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus size={14} />
            Add Category
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center gap-4 shadow-sm">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" 
                placeholder="Filter by name..." 
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Status:</span>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setStatusFilter("All")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === "All" ? "bg-white shadow-sm text-purple-700" : "text-slate-500 hover:text-slate-800"}`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter("Active")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === "Active" ? "bg-white shadow-sm text-purple-700" : "text-slate-500 hover:text-slate-800"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setStatusFilter("Inactive")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === "Inactive" ? "bg-white shadow-sm text-purple-700" : "text-slate-500 hover:text-slate-800"}`}
              >
                Inactive
              </button>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={14} />
            Export
          </button>
        </div>

        {/* Modern Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Courses</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-xs text-slate-400">Loading categories...</td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-xs text-slate-400">No categories found.</td>
                  </tr>
                ) : filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-50 overflow-hidden border border-slate-100 shadow-sm">
                        <img 
                          className={`w-full h-full object-cover ${cat.status === "Inactive" ? "grayscale opacity-80" : ""}`}
                          src={cat.image} 
                          alt={cat.name} 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-xs text-slate-800 block">{cat.name}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">ID: {cat.id}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-slate-500 line-clamp-1">{cat.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-700">
                        <span className="material-symbols-outlined text-[16px] text-purple-700">school</span>
                        <span className="text-xs font-bold">{cat.courses}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        cat.status === "Active" 
                          ? "bg-teal-50 text-teal-700 border-teal-100" 
                          : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${cat.status === "Active" ? "bg-teal-500" : "bg-red-500"}`} />
                        {cat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{cat.created}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          type="button"
                          onClick={() => {
                            setNewCatName(cat.name);
                            setNewCatDesc(cat.description || "");
                            setNewCatImage(cat.image || "");
                            setNewCatStatus(cat.status || "Active");
                            setModalMode("view");
                            setErrorMsg("");
                            setShowAddModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-purple-700 cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setNewCatName(cat.name);
                            setNewCatDesc(cat.description || "");
                            setNewCatImage(cat.image || "");
                            setNewCatStatus(cat.status || "Active");
                            setSelectedCatDbId(cat.dbId);
                            setModalMode("edit");
                            setErrorMsg("");
                            setShowAddModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-purple-700 cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteCategory(cat.dbId)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 cursor-pointer"
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
            <p className="text-xs text-slate-500">Showing <span className="font-bold text-slate-700">1 - {filteredCategories.length}</span> of <span className="font-bold text-slate-700">{filteredCategories.length}</span> categories</p>
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

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Categories</p>
              <p className="text-lg font-bold text-slate-800">{categories.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <CheckCircle size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active</p>
              <p className="text-lg font-bold text-slate-800">{categories.filter(c => c.status === "Active").length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Courses/Cat</p>
              <p className="text-lg font-bold text-slate-800">8.4</p>
            </div>
          </div>
        </div>

        {/* Add Modal overlay */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-[440px] max-w-[95vw] mx-4 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {modalMode === "view" ? "Category Details" : modalMode === "edit" ? "Edit Category" : "Add New Category"}
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-3 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Category Name</label>
                  <input 
                    type="text" 
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Artificial Intelligence"
                    disabled={modalMode === "view"}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Description</label>
                  <textarea 
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Brief description of the category topic area..."
                    rows={3}
                    disabled={modalMode === "view"}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Image URL</label>
                  <input 
                    type="text" 
                    value={newCatImage}
                    onChange={(e) => setNewCatImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... (Optional)"
                    disabled={modalMode === "view"}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Status</label>
                  <select 
                    value={newCatStatus}
                    onChange={(e) => setNewCatStatus(e.target.value)}
                    disabled={modalMode === "view"}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:bg-slate-50 disabled:text-slate-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  {modalMode === "view" ? (
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                    >
                      Close
                    </button>
                  ) : (
                    <>
                      <button 
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? "Saving..." : modalMode === "edit" ? "Save Changes" : "Save Category"}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}

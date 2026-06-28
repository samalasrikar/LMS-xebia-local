import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import categoryService from "../services/categoryService";
import { 
  Info, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  PlayCircle, 
  FileText, 
  Edit, 
  Trash2, 
  Plus, 
  UploadCloud, 
  Video 
} from "lucide-react";

export default function CreateCourse() {
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [freeEnrollment, setFreeEnrollment] = useState(false);

  // UI/API states
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [module1Open, setModule1Open] = useState(true);
  const [module2Open, setModule2Open] = useState(false);

  // Load categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryService.getAllCategories();
        if (data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const handlePublishCourse = async (e) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      alert("Course title is required");
      return;
    }
    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    setSubmitting(true);
    try {
      const courseData = {
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim() || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
        categoryId: Number(categoryId)
      };

      await courseService.createCourse(courseData);
      alert("Course published successfully!");
      navigate("/courses");
    } catch (err) {
      console.error("Failed to create course:", err);
      alert("Failed to publish course: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <form onSubmit={handlePublishCourse} className="mx-auto max-w-6xl space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span>Courses</span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-purple-700 font-semibold">New Course</span>
        </nav>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Form Sections */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* General Info */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Info size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">General Information</h2>
                  <p className="text-slate-500 text-xs mt-0.5">Provide basic details about your new course offering.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-600">Course Title *</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50/50 h-12 px-4 text-sm outline-none transition-all" 
                    placeholder="e.g. Advanced UX Strategy 2024" 
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-600">Category *</label>
                  <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50/50 h-12 px-4 text-sm outline-none transition-all"
                    required
                  >
                    <option value="">Select a Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.dbId || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-600">Subtitle</label>
                  <input 
                    type="text" 
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50/50 h-12 px-4 text-sm outline-none transition-all" 
                    placeholder="Short catchphrase or summary" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-600">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50/50 p-4 text-sm outline-none transition-all" 
                    placeholder="Describe the course outcomes, target audience, and key learnings..." 
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Curriculum Builder */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Curriculum Builder</h2>
                    <p className="text-slate-500 text-xs mt-0.5">Structure your course into modules and lessons.</p>
                  </div>
                </div>
                <button type="button" className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all">
                  <Plus size={16} />
                  Add Module
                </button>
              </div>

              {/* Accordion Items */}
              <div className="space-y-4">
                {/* Module 1 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div 
                    className="bg-slate-50/50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setModule1Open(!module1Open)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab text-slate-400">
                        <span className="material-symbols-outlined align-middle select-none">drag_indicator</span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800">Module 1: Introduction to Visual Theory</h3>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <span className="text-xs">4 Lessons</span>
                      <ChevronDown size={18} className={`transition-transform duration-200 ${module1Open ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  
                  {module1Open && (
                    <div className="border-t border-slate-200 p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors rounded-lg group border border-transparent hover:border-slate-100">
                        <div className="flex items-center gap-3">
                          <PlayCircle size={18} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">Welcome to the Course</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" className="text-slate-400 hover:text-purple-700 p-1"><Edit size={14} /></button>
                          <button type="button" className="text-slate-400 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors rounded-lg group border border-transparent hover:border-slate-100 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">Understanding Color Harmonies</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" className="text-slate-400 hover:text-purple-700 p-1"><Edit size={14} /></button>
                          <button type="button" className="text-slate-400 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <button type="button" className="w-full mt-2 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold text-xs hover:border-purple-600 hover:text-purple-700 transition-all flex items-center justify-center gap-1.5">
                        <Plus size={14} />
                        Add Lesson
                      </button>
                    </div>
                  )}
                </div>

                {/* Module 2 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div 
                    className="bg-slate-50/50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setModule2Open(!module2Open)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab text-slate-400">
                        <span className="material-symbols-outlined align-middle select-none">drag_indicator</span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800">Module 2: Typography Systems</h3>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <span className="text-xs">2 Lessons</span>
                      <ChevronDown size={18} className={`transition-transform duration-200 ${module2Open ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  
                  {module2Open && (
                    <div className="border-t border-slate-200 p-4 bg-white">
                      <div className="text-slate-500 text-sm italic">Loading module content...</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar Options */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Media / Uploads */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Course Media</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Course Thumbnail URL</label>
                  <input
                    type="text"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50/50 h-10 px-3 text-xs outline-none transition-all mb-2"
                    placeholder="https://example.com/image.jpg (Optional)"
                  />
                  <div className="group relative w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
                    {thumbnail ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${thumbnail}')` }}
                      />
                    ) : (
                      <div className="relative z-10 flex flex-col items-center text-center p-4">
                        <UploadCloud size={28} className="text-purple-700 mb-2" />
                        <span className="font-semibold text-xs text-slate-600">Thumbnail Preview</span>
                        <span className="text-[10px] text-slate-400 mt-1">Image URL loads automatically</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Promo Video</label>
                  <div className="w-full h-24 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer gap-2">
                    <Video size={18} className="text-purple-700" />
                    <span className="font-semibold text-xs text-slate-600">Upload Video URL</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Pricing & Access</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 block">Base Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">$</span>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-7 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 h-11 text-sm outline-none px-3" 
                      placeholder="0.00" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 block">Discounted Price (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">$</span>
                    <input 
                      type="number" 
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className="w-full pl-7 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 h-11 text-sm outline-none px-3" 
                      placeholder="0.00" 
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={freeEnrollment}
                        onChange={() => setFreeEnrollment(!freeEnrollment)}
                      />
                      <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-purple-700 transition-colors" />
                      <div className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${freeEnrollment ? "translate-x-4" : ""}`} />
                    </div>
                    <span className="text-xs font-medium text-slate-600">Allow Free Enrollment</span>
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sticky Publish Bar */}
        <footer className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg sticky bottom-4 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-700 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-600">Unsaved Changes Detected</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200 hidden md:block" />
            <p className="text-xs text-slate-400 hidden md:block italic">Draft last saved: Recently</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              type="button" 
              onClick={() => navigate("/courses")}
              className="flex-1 md:flex-none px-6 h-11 rounded-xl border border-purple-700 text-purple-700 text-xs font-semibold hover:bg-purple-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={submitting}
              className="flex-1 md:flex-none px-6 h-11 rounded-xl bg-purple-700 text-white text-xs font-semibold hover:bg-purple-800 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer animate-[pulse_2s_infinite]"
            >
              {submitting ? "Publishing..." : "Publish Course"}
            </button>
          </div>
        </footer>
      </form>
    </AppLayout>
  );
}

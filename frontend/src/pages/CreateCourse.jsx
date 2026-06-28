import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import categoryService from "../services/categoryService";
import {
  Info,
  ChevronRight,
  ChevronDown,
  Trash2,
  CloudUpload,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../components/ui/dropdown-menu";

export default function CreateCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [duration, setDuration] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("Published");

  // UI / API states
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await categoryService.getAllCategories();
        if (data) setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }

      // If editing, fetch existing course data
      if (isEditMode) {
        setLoadingCourse(true);
        try {
          const course = await courseService.getCourseById(id);
          if (course) {
            setTitle(course.title || "");
            setDescription(course.description || "");
            setDifficulty(course.difficulty || "Beginner");
            setDuration(course.duration || "");
            setCategoryId(course.categoryId ? String(course.categoryId) : "");
            setThumbnail(course.thumbnail || "");
            setStatus(course.status || "Published");
          }
        } catch (err) {
          console.error("Failed to load course:", err);
          alert("Failed to load course data: " + (err.response?.data?.message || err.message));
        } finally {
          setLoadingCourse(false);
        }
      }
    }
    fetchData();
  }, [id, isEditMode]);

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishCourse = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) { alert("Course title is required"); return; }
    if (!categoryId)    { alert("Please select a category");  return; }

    setSubmitting(true);
    try {
      const courseData = {
        title: title.trim(),
        description: description.trim(),
        difficulty: difficulty,
        duration: duration.trim() || "10h 00m",
        thumbnail:
          thumbnail.trim() ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
        categoryId: Number(categoryId),
        status: "Published",
      };

      if (isEditMode) {
        await courseService.updateCourse(id, courseData);
      } else {
        await courseService.createCourse(courseData);
      }
      navigate("/courses");
    } catch (err) {
      console.error(`Failed to ${isEditMode ? "update" : "create"} course:`, err);
      alert(`Failed to ${isEditMode ? "update" : "publish"} course: ` + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) { alert("Course title is required"); return; }
    if (!categoryId)    { alert("Please select a category");  return; }

    setSubmitting(true);
    try {
      const courseData = {
        title: title.trim(),
        description: description.trim(),
        difficulty: difficulty,
        duration: duration.trim() || "10h 00m",
        thumbnail:
          thumbnail.trim() ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
        categoryId: Number(categoryId),
        status: "Draft",
      };

      if (isEditMode) {
        await courseService.updateCourse(id, courseData);
      } else {
        await courseService.createCourse(courseData);
      }
      navigate("/courses");
    } catch (err) {
      console.error(`Failed to save draft:`, err);
      alert(`Failed to save draft: ` + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <form onSubmit={handlePublishCourse} className="max-w-7xl mx-auto pb-32">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <span
            className="hover:text-[#6C1D5F] cursor-pointer transition-colors"
            onClick={() => navigate("/courses")}
          >
            Courses
          </span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#6C1D5F] font-bold">{isEditMode ? "Edit Course" : "New Course"}</span>
        </nav>

        <div className="grid grid-cols-12 gap-6 items-start">

          {/* ── Left Column ────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* General Information */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#6C1D5F] text-white flex items-center justify-center shadow-sm">
                  <Info size={22} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">General Information</h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Define the core identity of your learning experience.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Course Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 h-12 px-4 text-sm outline-none transition-all"
                    placeholder="e.g. Advanced UX Strategy 2024"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-sm font-semibold text-slate-700">Category *</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between h-12 px-4 rounded-xl border border-slate-200 font-normal text-slate-700 text-sm bg-slate-50/50 hover:bg-slate-100 transition-all text-left"
                      >
                        {categoryId
                          ? categories.find((cat) => String(cat.dbId || cat.id) === String(categoryId))?.name || "Select a Category"
                          : "Select a Category"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-slate-200 shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
                      <DropdownMenuRadioGroup value={String(categoryId)} onValueChange={(val) => setCategoryId(val)}>
                        {categories.map((cat) => (
                          <DropdownMenuRadioItem
                            key={cat.id}
                            value={String(cat.dbId || cat.id)}
                            className="text-slate-700 text-sm hover:bg-slate-50 py-2 px-3 rounded-lg cursor-pointer"
                          >
                            {cat.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Difficulty and Duration Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Difficulty */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-semibold text-slate-700">Difficulty</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between h-12 px-4 rounded-xl border border-slate-200 font-normal text-slate-700 text-sm bg-slate-50/50 hover:bg-slate-100 transition-all text-left"
                        >
                          {difficulty}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-slate-200 shadow-lg rounded-xl z-50">
                        <DropdownMenuRadioGroup value={difficulty} onValueChange={(val) => setDifficulty(val)}>
                          {["Beginner", "Intermediate", "Advanced"].map((level) => (
                            <DropdownMenuRadioItem
                              key={level}
                              value={level}
                              className="text-slate-700 text-sm hover:bg-slate-50 py-2 px-3 rounded-lg cursor-pointer"
                            >
                              {level}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Duration</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 h-12 px-4 text-sm outline-none transition-all"
                      placeholder="e.g., 10h 30m"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 p-4 text-sm outline-none transition-all min-h-[160px]"
                    placeholder="Describe outcomes, target audience, and key learnings..."
                    rows={5}
                  />
                </div>


              </div>
            </section>
          </div>

          {/* ── Right Column (sticky) ───────────────────────────────── */}
          <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-24">

            {/* Course Media */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-5">
                Course Media
              </h2>

              <div className="space-y-5">
                {/* Thumbnail */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-2 block">
                    Thumbnail Image
                  </label>
                  <label htmlFor="thumbnail-file-input" className="relative w-full h-44 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group block">
                    {thumbnail ? (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${thumbnail}')` }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setThumbnail("");
                          }}
                          className="absolute top-3 right-3 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all z-20 shadow-md flex items-center justify-center"
                          title="Remove Image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl mx-4">
                        <CloudUpload size={28} className="text-[#6C1D5F] mb-2" />
                        <span className="font-semibold text-xs text-slate-700">
                          Click to upload
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">
                          Recommended: 1600×900
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="thumbnail-file-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailFileChange}
                  />
                  <input
                    type="text"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full mt-2 rounded-xl border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 h-9 px-3 text-xs outline-none transition-all"
                    placeholder="Or paste image URL..."
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── Sticky Footer Bar ─────────────────────────────────────── */}
        <footer className="fixed bottom-6 left-[calc(260px+24px)] right-6 z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 px-5 py-3.5 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#793B74] rounded-full animate-pulse shadow-[0_0_8px_rgba(109,40,217,0.5)]" />
                <span className="text-xs font-semibold text-slate-700">Course Editor</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="px-6 h-10 rounded-xl border-2 border-slate-200 text-slate-500 text-xs font-bold hover:bg-[#F7F8FC] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={submitting}
                className="px-6 h-10 rounded-xl border-2 border-[#6C1D5F] text-[#6C1D5F] text-xs font-bold hover:bg-[#6C1D5F]/5 transition-all cursor-pointer"
              >
                {submitting ? "Saving..." : "Save Draft"}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 h-10 rounded-xl bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold shadow-lg shadow-[#6C1D5F]/20 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (isEditMode ? "Updating..." : "Publishing...") : (isEditMode ? (status === "Draft" ? "Publish Course" : "Update Course") : "Publish Course")}
              </button>
            </div>
          </div>
        </footer>
      </form>
    </AppLayout>
  );
}

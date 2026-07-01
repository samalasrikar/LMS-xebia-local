import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight, Upload, ImageOff, X, Plus, ChevronDown,
  Eye, Save, Send, Tag, Globe, ToggleLeft
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import categoryService from "../services/categoryService";

/* ─── Slug generator ─────────────────────────────────────────── */
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* ─── Toggle switch component ───────────────────────────────── */
function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
          checked ? "bg-[#6C1D5F]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

/* ─── Tag chip ───────────────────────────────────────────────── */
function TagChip({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1 bg-[#6C1D5F]/8 text-[#6C1D5F] text-[11px] font-semibold px-2.5 py-1 rounded-full">
      {label}
      <button type="button" onClick={onRemove} className="text-[#6C1D5F]/60 hover:text-[#6C1D5F] cursor-pointer">
        <X size={11} />
      </button>
    </span>
  );
}

/* ─── Section card ──────────────────────────────────────────── */
function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          {Icon && <Icon size={16} className="text-[#6C1D5F]" />}
          <span className="text-sm font-bold text-slate-800">{title}</span>
        </div>
        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-slate-100">{children}</div>}
    </div>
  );
}

export default function CreateCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  /* Form state */
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  /* Visibility toggles */
  const [statusActive, setStatusActive] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [allowEnrollment, setAllowEnrollment] = useState(true);

  /* SEO */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [keywords, setKeywords] = useState("");

  /* UI state */
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  /* Auto-slug from name */
  useEffect(() => {
    if (!slugManual) setSlug(toSlug(name));
  }, [name, slugManual]);

  /* Load categories for parent dropdown */
  useEffect(() => {
    categoryService.getAllCategories().then(setCategories).catch(() => {});
    if (isEdit) {
      categoryService.getAllCategories().then((cats) => {
        const cat = cats?.find((c) => String(c.id) === String(id));
        if (cat) {
          setName(cat.name || "");
          setShortDesc(cat.description || "");
          setImagePreview(cat.image || "");
          setStatusActive(cat.status === "Active");
        }
      }).catch(() => {});
    }
  }, [id, isEdit]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,$/, "");
      if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e, asDraft = false) => {
    e.preventDefault();
    if (!name.trim()) { setError("Category name is required."); return; }
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", shortDesc.trim());
      formData.append("status", asDraft ? "Inactive" : (statusActive ? "Active" : "Inactive"));
      formData.append("featured", featured);
      formData.append("allowEnrollment", allowEnrollment);
      if (slug) formData.append("slug", slug);
      if (parentCategory) formData.append("parentCategory", parentCategory);
      if (displayOrder) formData.append("displayOrder", displayOrder);
      if (fullDesc) formData.append("fullDescription", fullDesc);
      if (tags.length) formData.append("tags", tags.join(","));
      if (imageFile) formData.append("image", imageFile);
      if (metaTitle) formData.append("metaTitle", metaTitle);
      if (metaDesc) formData.append("metaDescription", metaDesc);
      if (keywords) formData.append("keywords", keywords);

      if (isEdit) {
        await categoryService.updateCategory(id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      navigate("/categories");
    } catch (err) {
      setError(err.response?.data?.message || "Error saving category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <form
        onSubmit={(e) => handleSubmit(e, false)}
        className="max-w-[1200px] mx-auto space-y-5 animate-[fadeIn_0.4s_ease-out]"
      >
        {/* Breadcrumb + page title */}
        <div>
          <nav className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-2">
            <span className="hover:text-[#6C1D5F] cursor-pointer" onClick={() => navigate("/")}>Xebia LMS</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="hover:text-[#6C1D5F] cursor-pointer" onClick={() => navigate("/categories")}>Categories</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-700 font-semibold">{isEdit ? "Edit Category" : "Create New Category"}</span>
          </nav>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {isEdit ? "Edit Category" : "Create New Category"}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {isEdit
                  ? "Update the category details and settings."
                  : "Define a new category to organise your course catalog."}
              </p>
            </div>
            {/* Status badge */}
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
              statusActive
                ? "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20"
                : "bg-amber-50 text-amber-600 border-amber-200"
            }`}>
              {statusActive ? "● Active" : "● Draft"}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-3 text-sm">
            {error}
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ── Left column (main form) ────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
                Basic Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Category Name */}
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Frontend Development"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all"
                  />
                </div>

                {/* Parent Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Parent Category</label>
                  <div className="relative">
                    <select
                      value={parentCategory}
                      onChange={(e) => setParentCategory(e.target.value)}
                      className="w-full appearance-none border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none bg-white pr-8"
                    >
                      <option value="">None (Root category)</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Display Order */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    placeholder="e.g. 1"
                    min="1"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all"
                  />
                </div>

                {/* Slug */}
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Slug (URL)</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl text-xs text-slate-400 whitespace-nowrap">
                      /categories/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }}
                      placeholder="auto-generated"
                      className="flex-1 border border-slate-200 rounded-r-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all bg-slate-50/50"
                    />
                  </div>
                  {!slugManual && (
                    <p className="text-[10px] text-slate-400">Auto-generated from name. Click to override.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
                Cover Image
              </h2>
              <label
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="block w-full h-44 border-2 border-dashed border-slate-200 hover:border-[#6C1D5F]/40 rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer transition-colors bg-slate-50/50 group"
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">Click to change</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Upload size={22} className="text-slate-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-600">Drop image here or click to upload</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP — max 5MB</p>
                    </div>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
                Description
              </h2>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Short Description</label>
                <textarea
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  rows={3}
                  placeholder="Brief description of this category..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all resize-none"
                />
                <p className="text-[10px] text-slate-400 text-right">{shortDesc.length} / 250</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Full Description</label>
                <textarea
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  rows={5}
                  placeholder="Detailed overview of what learners will find in this category..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Tag size={15} className="text-[#6C1D5F]" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2 min-h-[36px]">
                {tags.map((t) => (
                  <TagChip key={t} label={t} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))} />
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder={tags.length === 0 ? "Type a tag and press Enter..." : "Add another..."}
                  className="border-0 outline-none text-xs text-slate-700 placeholder:text-slate-300 flex-1 min-w-[140px] bg-transparent"
                />
              </div>
              <p className="text-[10px] text-slate-400">Press Enter or comma to add a tag</p>
            </div>

            {/* Status & Visibility */}
            <Section title="Status & Visibility" icon={ToggleLeft}>
              <div className="pt-2">
                <Toggle
                  checked={statusActive}
                  onChange={() => setStatusActive((v) => !v)}
                  label="Status of Catalog"
                  description="Make this category visible to learners"
                />
                <Toggle
                  checked={featured}
                  onChange={() => setFeatured((v) => !v)}
                  label="Featured Category"
                  description="Highlight this category on the homepage"
                />
                <Toggle
                  checked={allowEnrollment}
                  onChange={() => setAllowEnrollment((v) => !v)}
                  label="Allow Enrollment"
                  description="Let learners enroll in courses from this category"
                />
              </div>
            </Section>

            {/* SEO */}
            <Section title="SEO Optimization" icon={Globe} defaultOpen={false}>
              <div className="pt-2 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={`${name || "Category"} | Xebia LMS`}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 text-right">{metaTitle.length}/60</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Meta Description</label>
                  <textarea
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    rows={3}
                    placeholder="A brief description for search engines..."
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all resize-none"
                  />
                  <p className="text-[10px] text-slate-400 text-right">{metaDesc.length}/160</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Keywords</label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="react, javascript, frontend, web development"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/20 outline-none transition-all"
                  />
                </div>
              </div>
            </Section>
          </div>

          {/* ── Right column (preview + related) ──────────────── */}
          <div className="space-y-5">
            {/* Preview card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <Eye size={14} className="text-[#6C1D5F]" />
                <span className="text-xs font-bold text-slate-700">Preview</span>
              </div>
              {/* Card preview */}
              <div className="p-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  {imagePreview ? (
                    <div className="h-28 overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-28 bg-gradient-to-br from-[#6C1D5F]/10 to-[#6C1D5F]/5 flex items-center justify-center">
                      <ImageOff size={28} className="text-[#6C1D5F]/30" />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-bold text-slate-900 text-sm truncate">
                      {name || "Category Name"}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {shortDesc || "Short description will appear here..."}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500">
                      <span className="font-bold">0 Courses</span>
                      <span>·</span>
                      <span className={`font-bold ${statusActive ? "text-[#01AC9F]" : "text-amber-600"}`}>
                        {statusActive ? "Published" : "Draft"}
                      </span>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[9px] bg-[#6C1D5F]/8 text-[#6C1D5F] px-1.5 py-0.5 rounded-full font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#6C1D5F]/4 rounded-2xl border border-[#6C1D5F]/12 p-4 space-y-2">
              <p className="text-xs font-bold text-[#6C1D5F]">💡 Tips</p>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li>• Use clear, descriptive names for better discoverability</li>
                <li>• Add a cover image to make the category stand out</li>
                <li>• Set a display order to control how categories appear</li>
                <li>• Add relevant tags to improve search results</li>
              </ul>
            </div>

            {/* Publishing options */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-2">
              <p className="text-xs font-bold text-slate-700 mb-3">Publishing</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Status</span>
                  <span className={`font-bold ${statusActive ? "text-[#01AC9F]" : "text-amber-600"}`}>
                    {statusActive ? "Active" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Featured</span>
                  <span className={`font-bold ${featured ? "text-[#6C1D5F]" : "text-slate-400"}`}>
                    {featured ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Enrollment</span>
                  <span className={`font-bold ${allowEnrollment ? "text-[#01AC9F]" : "text-slate-400"}`}>
                    {allowEnrollment ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer actions ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            ← Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Save size={14} /> Save Draft
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                "Saving..."
              ) : (
                <>
                  <Send size={14} />
                  {isEdit ? "Save Changes" : "Publish Category"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Eye, Save, Send, Info, Palette, AlignLeft, ToggleRight, Search as SearchIcon,
  CheckCircle, X, TrendingUp, Link, List, Code, Image as ImageIcon, Upload,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import categoryService from "../services/categoryService";

/* ─── Step config ────────────────────────────────────────────────── */
const STEPS = [
  { num: 1, label: "Basic Info" },
  { num: 2, label: "Branding" },
  { num: 3, label: "Description" },
  { num: 4, label: "Status" },
  { num: 5, label: "SEO" },
];

/* ─── Preset colors ──────────────────────────────────────────────── */
const PRESET_COLORS = ["#6366f1","#22c55e","#7c3aed","#f59e0b","#2563eb","#0891b2","#e11d48","#059669","#d97706"];

/* ─── Quick-pick emojis ──────────────────────────────────────────── */
const EMOJIS = ["⚛️","☁️","🤖","🔐","📐","🛠️","📊","📱","🧪","🏗️"];

export default function CreateCategory() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(2); // show Branding step active
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* ── Form state ─────────────────────────────────────────────────── */
  const [form, setForm] = useState({
    name:           "Frontend Development",
    slug:           "frontend-development",
    parentCat:      "",
    displayOrder:   1,
    emoji:          "⚛️",
    accentColor:    "#6366f1",
    hexInput:       "#6366f1",
    shortDesc:      "Modern web development with React, Vue, Angular, and cutting-edge frontend tooling.",
    longDesc:       "This category covers the full spectrum of modern frontend development — from HTML, CSS, and JavaScript fundamentals to advanced frameworks like React, Vue, and Angular.\n\nLearners will gain hands-on experience with build tools, state management, component architecture, and performance optimization.",
    status:         "Published",
    visibleCatalog: true,
    featured:       true,
    allowEnroll:    true,
    showNav:        false,
    metaTitle:      "Frontend Development Courses | Xebia LMS",
    metaDesc:       "Explore top-rated frontend development courses covering React, Vue, Angular, and modern tooling. Built for engineers who want to level up fast.",
    focusKeyword:   "frontend development courses",
    tags:           ["React", "Vue.js", "Angular", "TypeScript"],
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const removeTag = (tag) => update("tags", form.tags.filter(t => t !== tag));

  /* ── Submit ─────────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!form.name.trim()) { setError("Category name is required."); return; }
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.shortDesc);
      fd.append("status", form.status);
      await categoryService.createCategory(fd);
      navigate("/categories");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create category.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Helpers ─────────────────────────────────────────────────────── */
  const seoBarWidth = (val, max) => Math.min(100, Math.round((val / max) * 100));
  const seoBarColor = (pct) => pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <AppLayout>
      {/* ─── Two-panel layout ─────────────────────────────────────── */}
      <div className="flex min-h-[calc(100vh-52px)] -m-7 xl:-m-8">

        {/* ─── LEFT: Form area ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-7 min-w-0">

          {/* Page header */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <button
                  onClick={() => navigate("/categories")}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50"
                >
                  <ArrowLeft size={12} /> Back
                </button>
                <div className="w-px h-4 bg-slate-200" />
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Draft
                </span>
              </div>
              <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Create New Category</h1>
              <p className="text-[13px] text-slate-400 mt-1">Define your category details, branding, SEO metadata, and publishing settings.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
                <Eye size={13} /> Preview
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
                <Save size={13} /> Save Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#6C1D5F] rounded-md hover:bg-[#4A1E47] disabled:opacity-60"
              >
                <Send size={13} /> {submitting ? "Saving…" : "Publish Category"}
              </button>
            </div>
          </div>

          {/* Step nav */}
          <div className="flex items-center gap-0 bg-white border border-slate-200 rounded-xl p-1.5 w-fit mb-6">
            {STEPS.map((step, i) => {
              const isDone   = i < currentStep - 1;
              const isActive = i === currentStep - 1;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap ${
                    isActive ? "bg-[#6C1D5F] text-white" :
                    isDone   ? "bg-emerald-50 text-emerald-700" :
                    "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                    isActive ? "bg-white/20 text-white" :
                    isDone   ? "bg-emerald-500 text-white" :
                    "bg-slate-200 text-slate-500"
                  }`}>
                    {isDone ? <CheckCircle size={10} /> : step.num}
                  </span>
                  {step.label}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-700">{error}</div>
          )}

          {/* ── CARD 1: Basic Information ─────────────────────────── */}
          <FormCard
            icon={<Info size={15} />}
            iconCls="bg-[#eef2ff] text-[#6C1D5F]"
            title="Basic Information"
            subtitle="Core identity fields for this category"
            badge={<span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full"><CheckCircle size={10} />Complete</span>}
          >
            <div className="grid grid-cols-2 gap-x-12 gap-y-0 divide-x divide-slate-100">
              <div className="pr-8 space-y-4">
                <FieldRow label="Category Name" required hint={`${form.name.length} / 60`}>
                  <input
                    className="field-input w-full"
                    value={form.name}
                    onChange={e => { update("name", e.target.value); update("slug", e.target.value.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")); }}
                    placeholder="e.g. Cloud & DevOps"
                  />
                </FieldRow>
                <FieldRow label="URL Slug" required hint="Auto-generated from category name. Click pencil to edit.">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-[13px]">
                    <span className="text-slate-400">xebia.com/categories/</span>
                    <span className="text-[#6C1D5F] font-semibold">{form.slug}</span>
                  </div>
                </FieldRow>
              </div>
              <div className="pl-8 space-y-4">
                <FieldRow label="Parent Category" hint="Leave empty to create a root-level category.">
                  <select className="field-select w-full" value={form.parentCat} onChange={e => update("parentCat", e.target.value)}>
                    <option value="">— None (Top-level) —</option>
                    <option>Engineering</option><option>Design</option><option>Business</option><option>Data Science</option>
                  </select>
                </FieldRow>
                <FieldRow label="Display Order" hint="Lower number = higher position in listing.">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] font-medium">#</span>
                    <input type="number" min="1" className="field-input w-full pl-7" value={form.displayOrder} onChange={e => update("displayOrder", e.target.value)} />
                  </div>
                </FieldRow>
              </div>
            </div>
          </FormCard>

          {/* ── CARD 2: Branding ─────────────────────────────────── */}
          <FormCard
            icon={<Palette size={15} />}
            iconCls="bg-purple-50 text-purple-600"
            title="Branding"
            subtitle="Visual identity — icon, color, and cover image"
            badge={<span className="inline-flex items-center text-[11px] font-semibold bg-[#eef2ff] text-[#6C1D5F] border border-[#c7d2fe] px-2 py-0.5 rounded-full">In Progress</span>}
          >
            {/* Emoji picker */}
            <FieldRow label="Category Icon / Emoji">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-3xl cursor-pointer hover:border-[#6C1D5F] transition-colors flex-shrink-0">
                  {form.emoji}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-slate-700 mb-2">Quick pick</div>
                  <div className="flex gap-2 flex-wrap">
                    {EMOJIS.map(e => (
                      <button
                        key={e}
                        onClick={() => update("emoji", e)}
                        className={`w-9 h-9 rounded-md border flex items-center justify-center text-lg transition-all ${
                          form.emoji === e
                            ? "border-[#6C1D5F] bg-[#eef2ff]"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                    <button className="px-2 py-1 text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md bg-white hover:bg-slate-50">Browse all…</button>
                  </div>
                </div>
              </div>
            </FieldRow>

            {/* Accent color */}
            <FieldRow label="Accent Color" required hint="Used for the top accent bar and background tint on the category card.">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => { update("accentColor", c); update("hexInput", c); }}
                      className={`w-7 h-7 rounded-md cursor-pointer border-2 transition-all flex-shrink-0 ${form.accentColor === c ? "border-slate-800" : "border-transparent"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="w-px h-7 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md border border-slate-200 flex-shrink-0" style={{ background: form.accentColor }} />
                  <input
                    value={form.hexInput}
                    onChange={e => { update("hexInput", e.target.value); if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) update("accentColor", e.target.value); }}
                    className="w-24 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-[12px] font-mono text-slate-700 outline-none focus:border-[#6C1D5F]"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </FieldRow>

            {/* Cover image upload */}
            <FieldRow label="Cover Image">
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#6C1D5F] transition-colors bg-slate-50">
                <ImageIcon size={28} className="text-slate-300 mx-auto mb-2" />
                <div className="text-[13px] font-semibold text-slate-700 mb-1">Drop an image here, or click to browse</div>
                <div className="text-[11px] text-slate-400 mb-3">PNG, JPG, WebP — recommended 1200 × 630px, max 2 MB</div>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 mx-auto">
                  <Upload size={12} /> Choose File
                </button>
              </div>
            </FieldRow>
          </FormCard>

          {/* ── CARD 3: Description ───────────────────────────────── */}
          <FormCard
            icon={<AlignLeft size={15} />}
            iconCls="bg-amber-50 text-amber-600"
            title="Description"
            subtitle="Short and detailed descriptions shown to learners"
          >
            <FieldRow label="Short Description" required hint="Used on category cards and listing pages. Keep it under 160 chars.">
              <textarea
                className="field-input w-full min-h-[72px] resize-none leading-relaxed"
                value={form.shortDesc}
                onChange={e => update("shortDesc", e.target.value)}
                placeholder="Briefly describe what this category covers..."
                maxLength={160}
              />
              <div className="flex items-center justify-between mt-1">
                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mr-4">
                  <div className={`h-full rounded-full ${seoBarColor(seoBarWidth(form.shortDesc.length, 160))}`} style={{ width: `${seoBarWidth(form.shortDesc.length, 160)}%` }} />
                </div>
                <span className="text-[11px] text-slate-400 flex-shrink-0">{form.shortDesc.length} / 160</span>
              </div>
            </FieldRow>

            <FieldRow label="Long Description">
              <div className="border border-slate-200 rounded-md overflow-hidden">
                {/* Mini toolbar */}
                <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-50 border-b border-slate-200">
                  {[["B","font-bold"], ["I","italic"], ["U","underline"]].map(([t, s]) => (
                    <button key={t} className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600">
                      <span className={`text-[13px] ${s}`}>{t}</span>
                    </button>
                  ))}
                  <div className="w-px h-4 bg-slate-200 mx-1" />
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500"><Link size={13} /></button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500"><List size={13} /></button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500"><Code size={13} /></button>
                  <div className="w-px h-4 bg-slate-200 mx-1" />
                  <select className="text-[12px] bg-transparent border-none outline-none text-slate-500 cursor-pointer">
                    <option>Paragraph</option><option>Heading 2</option><option>Heading 3</option>
                  </select>
                </div>
                <textarea
                  className="w-full px-3 py-2.5 text-[13px] text-slate-700 leading-relaxed outline-none min-h-[120px] resize-none border-none"
                  value={form.longDesc}
                  onChange={e => update("longDesc", e.target.value)}
                  placeholder="Write a detailed description for learners browsing this category…"
                />
              </div>
              <div className="text-right text-[11px] text-slate-400 mt-1">{form.longDesc.length} chars</div>
            </FieldRow>
          </FormCard>

          {/* ── CARD 4: Status & Visibility ───────────────────────── */}
          <FormCard
            icon={<ToggleRight size={15} />}
            iconCls="bg-emerald-50 text-emerald-600"
            title="Status & Visibility"
            subtitle="Control how and when this category is visible"
          >
            <FieldRow label="Publication Status">
              <select className="field-select max-w-[260px]" value={form.status} onChange={e => update("status", e.target.value)}>
                <option>Draft</option><option>Published</option><option>Archived</option><option>Scheduled</option>
              </select>
            </FieldRow>

            <div className="h-px bg-slate-100 my-4" />

            {[
              { field: "visibleCatalog", label: "Visible in Catalog",   desc: "Show this category on the public course catalog page" },
              { field: "featured",       label: "Featured Category",     desc: "Pin to the homepage featured categories section" },
              { field: "allowEnroll",    label: "Allow Enrollment",      desc: "Learners can directly enroll in courses under this category" },
              { field: "showNav",        label: "Show in Navigation",    desc: "Appear in the top navigation menu for learners" },
            ].map((sw) => (
              <div key={sw.field} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div>
                  <div className="text-[13px] font-semibold text-slate-800">{sw.label}</div>
                  <div className="text-[12px] text-slate-400 mt-0.5">{sw.desc}</div>
                </div>
                <div
                  className={`w-10 h-[22px] rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${form[sw.field] ? "bg-[#6C1D5F]" : "bg-slate-200"}`}
                  onClick={() => update(sw.field, !form[sw.field])}
                >
                  <div className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] shadow-sm transition-all ${form[sw.field] ? "left-[20px]" : "left-[2px]"}`} />
                </div>
              </div>
            ))}
          </FormCard>

          {/* ── CARD 5: SEO ───────────────────────────────────────── */}
          <FormCard
            icon={<SearchIcon size={15} />}
            iconCls="bg-blue-50 text-blue-600"
            title="SEO & Metadata"
            subtitle="Optimize search engine visibility for this category"
            badge={<div className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"><TrendingUp size={13} />SEO Score: 78/100</div>}
          >
            <FieldRow label="Meta Title" required hint="Ideal length: 50–60 characters">
              <input className="field-input w-full" value={form.metaTitle} onChange={e => update("metaTitle", e.target.value)} placeholder="Page title shown in search results" />
              <div className="mt-1.5">
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${seoBarColor(seoBarWidth(form.metaTitle.length, 60))}`} style={{ width: `${seoBarWidth(form.metaTitle.length, 60)}%` }} />
                </div>
                <div className="text-right text-[11px] text-slate-400 mt-0.5">{form.metaTitle.length} / 60</div>
              </div>
            </FieldRow>

            <FieldRow label="Meta Description" required hint="Ideal length: 120–160 characters">
              <textarea className="field-input w-full min-h-[72px] resize-none leading-relaxed" value={form.metaDesc} onChange={e => update("metaDesc", e.target.value)} placeholder="Brief description for search engine result snippets" />
              <div className="mt-1.5">
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${seoBarColor(seoBarWidth(form.metaDesc.length, 160))}`} style={{ width: `${seoBarWidth(form.metaDesc.length, 160)}%` }} />
                </div>
                <div className="text-right text-[11px] text-slate-400 mt-0.5">{form.metaDesc.length} / 160</div>
              </div>
            </FieldRow>

            <FieldRow label="Focus Keyword">
              <input className="field-input w-full" value={form.focusKeyword} onChange={e => update("focusKeyword", e.target.value)} placeholder="Primary keyword to optimize for" />
            </FieldRow>

            <FieldRow label="Tags & Keywords">
              <div className="flex flex-wrap gap-1.5 items-center bg-white border border-slate-200 rounded-md px-3 py-2 min-h-[40px]">
                {form.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded-full px-2.5 py-0.5 text-[12px] font-medium">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-[#6366f1] ml-0.5 hover:text-[#4338ca]"><X size={10} /></button>
                  </span>
                ))}
                <input className="border-none outline-none text-[12px] text-slate-700 bg-transparent min-w-[80px] flex-1" placeholder="Add tag…" />
              </div>
            </FieldRow>
          </FormCard>

          {/* Sticky save bar */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-8 py-3.5 -mx-8 mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Draft saved automatically
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate("/categories")} className="px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
                Cancel
              </button>
              <button className="px-3 py-1.5 text-[13px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
                <Save size={13} className="inline mr-1" /> Save Draft
              </button>
              <button onClick={handleSubmit} disabled={submitting} className="px-3 py-1.5 text-[13px] font-medium text-white bg-[#6C1D5F] rounded-md hover:bg-[#4A1E47] disabled:opacity-60">
                <Send size={13} className="inline mr-1" /> {submitting ? "Saving…" : "Publish Category"}
              </button>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Preview panel ────────────────────────────────── */}
        <div className="w-[320px] min-w-[320px] border-l border-slate-200 bg-white flex flex-col sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto flex-shrink-0">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
            <div className="text-[13px] font-bold text-slate-900">Live Preview</div>
            <button className="text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md px-2 py-1 hover:bg-slate-50">
              <Eye size={12} className="inline mr-1" /> Full preview
            </button>
          </div>

          <div className="p-5 space-y-5 flex-1">
            {/* Category card preview */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Category Card</div>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <div className="h-1" style={{ background: form.accentColor }} />
                <div className="p-4">
                  <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mb-3 bg-white border border-slate-100 w-[52px] h-[52px]">{form.emoji}</div>
                  <div className="text-[14px] font-bold text-slate-900 mb-0.5">{form.name || "Category Name"}</div>
                  <div className="text-[11px] text-slate-400 font-mono mb-2">xebia.com/categories/{form.slug || "slug"}</div>
                  <div className="text-[12px] text-slate-600 leading-snug mb-3 line-clamp-2">{form.shortDesc || "Short description will appear here."}</div>
                  <div className="flex gap-3 mb-3">
                    <div><div className="text-[14px] font-bold text-slate-900">0</div><div className="text-[10px] text-slate-400">Courses</div></div>
                    <div><div className="text-[14px] font-bold text-slate-900">0</div><div className="text-[10px] text-slate-400">Learners</div></div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${form.featured ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                      {form.featured ? "⭐ Featured" : "Standard"}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      form.status === "Published" ? "bg-emerald-50 text-emerald-700" :
                      form.status === "Draft"     ? "bg-amber-50 text-amber-700" :
                      "bg-slate-100 text-slate-500"
                    }`}>
                      {form.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Completeness checklist */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Completeness</div>
              <div className="space-y-2">
                {[
                  { label: "Category name",   done: !!form.name },
                  { label: "URL slug",        done: !!form.slug },
                  { label: "Emoji / icon",    done: !!form.emoji },
                  { label: "Accent color",    done: !!form.accentColor },
                  { label: "Short description", done: form.shortDesc.length >= 20 },
                  { label: "Meta title",      done: form.metaTitle.length >= 10 },
                  { label: "Meta description",done: form.metaDesc.length >= 40 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-[12px]">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                      {item.done ? <CheckCircle size={10} /> : <span className="text-[9px]">○</span>}
                    </div>
                    <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* SEO preview */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Search Preview</div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-[11px] text-emerald-700 mb-0.5 font-medium truncate">xebia.com › categories › {form.slug || "slug"}</div>
                <div className="text-[14px] font-semibold text-blue-600 mb-1 leading-snug line-clamp-2">{form.metaTitle || "Meta title"}</div>
                <div className="text-[12px] text-slate-500 leading-snug line-clamp-3">{form.metaDesc || "Meta description will appear here."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function FormCard({ icon, iconCls, title, subtitle, badge, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${iconCls}`}>{icon}</div>
          <div>
            <div className="text-[14px] font-bold text-slate-900">{title}</div>
            {subtitle && <div className="text-[12px] text-slate-400 mt-px">{subtitle}</div>}
          </div>
        </div>
        {badge}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function FieldRow({ label, required, hint, children }) {
  return (
    <div className="mb-4 last:mb-0">
      {label && (
        <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <div className="text-[11px] text-slate-400 mt-1">{hint}</div>}
    </div>
  );
}

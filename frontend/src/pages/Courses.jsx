import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Folder, BarChart2, Globe, Filter, ArrowUpDown,
  List, LayoutGrid, ChevronDown, X, Plus, Download, Upload,
  CheckSquare, Minus, CheckCircle, Star, Archive, Trash2,
  BookOpen, Pencil, Eye, Layers, BarChart, Copy, MoreHorizontal,
  ChevronLeft, ChevronRight, ChevronsUpDown,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import categoryService from "../services/categoryService";
import DeleteDialog from "../components/shared/DeleteDialog";

/* ─── Badge config ──────────────────────────────────────────────── */
const DIFF_BADGE = {
  Beginner:     "bg-slate-100 text-slate-600 border border-slate-200",
  Intermediate: "bg-amber-50 text-amber-700 border border-amber-200",
  Advanced:     "bg-orange-50 text-orange-700 border border-orange-200",
  Expert:       "bg-red-50 text-red-700 border border-red-200",
};

const STATUS_BADGE = {
  published: { cls: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500", label: "Published" },
  draft:     { cls: "bg-amber-50 text-amber-700 border border-amber-200",   dot: "bg-amber-500",   label: "Draft" },
  archived:  { cls: "bg-red-50 text-red-700 border border-red-200",         dot: "bg-red-500",     label: "Archived" },
};

const CAT_BADGE = {
  Frontend:    "bg-[#eef2ff] text-[#6C1D5F] border border-[#c7d2fe]",
  DevOps:      "bg-blue-50 text-blue-700 border border-blue-200",
  Cloud:       "bg-blue-50 text-blue-700 border border-blue-200",
  "AI/ML":     "bg-purple-50 text-purple-700 border border-purple-200",
  Design:      "bg-slate-100 text-slate-600 border border-slate-200",
  Business:    "bg-teal-50 text-teal-700 border border-teal-200",
  General:     "bg-slate-100 text-slate-600 border border-slate-200",
};
function getCatBadge(name = "") {
  const key = Object.keys(CAT_BADGE).find(k => name.toLowerCase().includes(k.toLowerCase()));
  return CAT_BADGE[key ?? "General"];
}

const TABS = [
  { label: "All Courses", filter: null },
  { label: "Published",   filter: "published",  badge: "badge-success" },
  { label: "Drafts",      filter: "draft",       badge: "badge-warning" },
  { label: "Archived",    filter: "archived",    badge: "badge-danger" },
  { label: "Featured",    filter: "featured",    badge: "badge-purple" },
];

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60";

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses]         = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchQuery, setSearch]      = useState("");
  const [activeTab, setActiveTab]     = useState(0);
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedDiff, setSelectedDiff] = useState("All");
  const [viewMode, setViewMode]       = useState("list"); // list | grid
  const [selected, setSelected]       = useState(new Set()); // checked row ids
  const [openDropdown, setOpenDropdown] = useState(null); // row id
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting]       = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesData, catsData] = await Promise.all([
        courseService.getAllCourses(),
        categoryService.getAllCategories(),
      ]);
      setCategories(catsData || []);
      if (coursesData?.length) {
        const mapped = coursesData.map((c) => ({
          id: c.id,
          title: c.title,
          category: c.categoryName || "General",
          duration: c.duration || "—",
          difficulty: c.difficulty || "Intermediate",
          status: (c.status || "published").toLowerCase(),
          featured: false,
          active: true,
          modules: 0,
          rating: "4.5",
          learners: 0,
          updated: "Recently",
          thumbnail: c.thumbnail || DEFAULT_THUMBNAIL,
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

  /* ─── Filtering ─────────────────────────────────────────────────── */
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab    = TABS[activeTab].filter === null || c.status === TABS[activeTab].filter;
    const matchCat    = selectedCat === "All" || c.category === selectedCat;
    const matchDiff   = selectedDiff === "All" || c.difficulty === selectedDiff;
    return matchSearch && matchTab && matchCat && matchDiff;
  });

  /* ─── Selection ─────────────────────────────────────────────────── */
  const toggleSelect = (id) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => setSelected(
    selected.size === filtered.length ? new Set() : new Set(filtered.map(c => c.id))
  );
  const toggleFeatured = (id) => setCourses(prev =>
    prev.map(c => c.id === id ? { ...c, featured: !c.featured } : c)
  );
  const toggleActive = (id) => setCourses(prev =>
    prev.map(c => c.id === id ? { ...c, active: !c.active } : c)
  );

  /* ─── Delete ─────────────────────────────────────────────────────── */
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await courseService.deleteCourse(deleteTarget.id);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  /* ─── Counts for tab badges ──────────────────────────────────────── */
  const counts = {
    published: courses.filter(c => c.status === "published").length,
    draft:     courses.filter(c => c.status === "draft").length,
    archived:  courses.filter(c => c.status === "archived").length,
    featured:  courses.filter(c => c.featured).length,
  };

  const allSelected   = filtered.length > 0 && selected.size === filtered.length;
  const someSelected  = selected.size > 0 && selected.size < filtered.length;

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">

        {/* ── Page Header ────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight">Courses</h1>
            <p className="text-[13px] text-slate-400 mt-1">Manage, publish, and organize all learning courses on your platform.</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors">
              <Download size={13} /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors">
              <Upload size={13} /> Import
            </button>
            <button
              onClick={() => navigate("/courses/create")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#6C1D5F] rounded-md hover:bg-[#4A1E47] transition-colors"
            >
              <Plus size={13} /> New Course
            </button>
          </div>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────────── */}
        <div className="grid grid-cols-5 gap-3.5">
          {[
            { label: "Total Courses",  value: courses.length,    color: "" },
            { label: "Published",      value: counts.published,  color: "text-emerald-600" },
            { label: "Drafts",         value: counts.draft,      color: "text-amber-600" },
            { label: "Featured",       value: counts.featured,   color: "text-purple-600" },
            { label: "Total Learners", value: "24.8k",           color: "" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl px-4 py-3.5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{s.label}</div>
              <div className={`text-[22px] font-bold tracking-tight leading-none ${s.color || "text-slate-900"}`}>
                {typeof s.value === "number" ? s.value : s.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ───────────────────────────────────────────────── */}
        <div className="flex border-b border-slate-200 -mb-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === i
                  ? "text-[#6C1D5F] border-[#6C1D5F] font-semibold"
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              {tab.label}
              {tab.filter && counts[tab.filter] > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-px rounded-full border ${
                  tab.filter === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  tab.filter === "draft"     ? "bg-amber-50 text-amber-700 border-amber-200" :
                  tab.filter === "archived"  ? "bg-red-50 text-red-700 border-red-200" :
                                               "bg-purple-50 text-purple-700 border-purple-200"
                }`}>
                  {counts[tab.filter]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Filter Bar ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 flex-wrap pt-1">
          {/* Search */}
          <div className="relative flex-1 max-w-[280px]">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-white border border-slate-200 rounded-md pl-8 pr-2.5 py-1.5 text-[13px] text-slate-700 outline-none focus:border-[#6C1D5F]"
            />
          </div>

          {/* Category dropdown */}
          <div className="relative">
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 text-[12px] font-medium text-slate-600 cursor-pointer outline-none hover:bg-slate-50"
            >
              <option value="All">Category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Difficulty */}
          <div className="relative">
            <select
              value={selectedDiff}
              onChange={e => setSelectedDiff(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 text-[12px] font-medium text-slate-600 cursor-pointer outline-none hover:bg-slate-50"
            >
              <option value="All">Difficulty</option>
              {["Beginner","Intermediate","Advanced","Expert"].map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50">
            <ArrowUpDown size={12} /> Sort: Updated <ChevronDown size={11} />
          </button>

          {/* Spacer */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[12px] text-slate-400 whitespace-nowrap">{filtered.length} results</span>
            <div className="flex border border-slate-200 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`w-[30px] h-[30px] flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-700" : "bg-white text-slate-400 hover:bg-slate-50"}`}
              >
                <List size={13} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`w-[30px] h-[30px] flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-700" : "bg-white text-slate-400 hover:bg-slate-50"}`}
              >
                <LayoutGrid size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Table Card ─────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          {/* Bulk action bar */}
          {selected.size > 0 && (
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#eef2ff] border-b border-[#c7d2fe]">
              <div
                className="w-[15px] h-[15px] rounded-[3px] bg-[#6C1D5F] border-[#6C1D5F] border flex items-center justify-center cursor-pointer flex-shrink-0"
                onClick={toggleAll}
              >
                <Minus size={9} className="text-white" />
              </div>
              <span className="text-[13px] font-semibold text-[#6C1D5F]">{selected.size} selected</span>
              <span className="text-[#c7d2fe]">|</span>
              <button className="flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
                <CheckCircle size={12} /> Publish
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
                <Star size={12} /> Feature
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
                <Archive size={12} /> Archive
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium text-red-600 border border-red-200 bg-red-50 rounded-md hover:bg-red-100">
                <Trash2 size={12} /> Delete
              </button>
              <button className="ml-auto text-[12px] font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md px-2 py-1 bg-white" onClick={() => setSelected(new Set())}>
                Clear selection
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-9 pl-4 py-2.5">
                    <div
                      className={`w-[15px] h-[15px] rounded-[3px] border flex items-center justify-center cursor-pointer ${
                        allSelected ? "bg-[#6C1D5F] border-[#6C1D5F]" :
                        someSelected ? "bg-[#6C1D5F] border-[#6C1D5F]" :
                        "border-slate-300 bg-white"
                      }`}
                      onClick={toggleAll}
                    >
                      {(allSelected || someSelected) && (
                        someSelected && !allSelected
                          ? <Minus size={9} className="text-white" />
                          : <CheckCircle size={9} className="text-white" />
                      )}
                    </div>
                  </th>
                  {[["Course","min-w-[260px]"], ["Category",""], ["Difficulty",""], ["Duration",""], ["Published",""], ["Active",""], ["Featured",""], ["Learners",""], ["Updated",""], ["","w-10"]].map(([h, cls]) => (
                    <th key={h} className={`px-3.5 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap ${cls}`}>
                      {h && (
                        <div className="flex items-center gap-1 cursor-pointer">
                          {h} {h && h !== "" && <ChevronsUpDown size={10} className="text-slate-300" />}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={11} className="py-8 text-center text-[13px] text-slate-400">Loading courses…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                          <BookOpen size={20} className="text-slate-400" />
                        </div>
                        <div className="text-[14px] font-semibold text-slate-700">No courses found</div>
                        <div className="text-[12px] text-slate-400">Try adjusting your filters or create a new course</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((course) => {
                    const isSelected = selected.has(course.id);
                    const statusKey = course.status.toLowerCase();
                    const status = STATUS_BADGE[statusKey] ?? STATUS_BADGE.draft;
                    const diffCls = DIFF_BADGE[course.difficulty] ?? DIFF_BADGE.Intermediate;
                    const catCls  = getCatBadge(course.category);
                    const isOpen  = openDropdown === course.id;

                    return (
                      <tr
                        key={course.id}
                        className={`transition-colors hover:bg-slate-50/60 ${isSelected ? "bg-[#fafaff]" : ""}`}
                      >
                        {/* Checkbox */}
                        <td className="w-9 pl-4 py-3">
                          <div
                            className={`w-[15px] h-[15px] rounded-[3px] border flex items-center justify-center cursor-pointer ${
                              isSelected ? "bg-[#6C1D5F] border-[#6C1D5F]" : "border-slate-300 bg-white hover:border-[#6C1D5F]"
                            }`}
                            onClick={() => toggleSelect(course.id)}
                          >
                            {isSelected && <CheckCircle size={9} className="text-white" />}
                          </div>
                        </td>

                        {/* Course */}
                        <td className="px-3.5 py-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-12 h-8 rounded-[4px] object-cover flex-shrink-0 border border-slate-200"
                            />
                            <div className="min-w-0">
                              <div className="text-[13px] font-semibold text-slate-900 truncate max-w-[200px]">{course.title}</div>
                              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                                <Layers size={10} /> {course.modules || "—"} modules
                                {course.rating && <><span className="text-slate-200">·</span> <Star size={10} className="text-amber-400 fill-amber-400" /> {course.rating}</>}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-3.5 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${catCls}`}>
                            {course.category}
                          </span>
                        </td>

                        {/* Difficulty */}
                        <td className="px-3.5 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${diffCls}`}>
                            {course.difficulty}
                          </span>
                        </td>

                        {/* Duration */}
                        <td className="px-3.5 py-3 text-[12px] text-slate-600">{course.duration}</td>

                        {/* Published status */}
                        <td className="px-3.5 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${status.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>

                        {/* Active toggle */}
                        <td className="px-3.5 py-3">
                          <div
                            className={`w-7 h-[15px] rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${course.active ? "bg-emerald-500" : "bg-slate-200"}`}
                            onClick={() => toggleActive(course.id)}
                          >
                            <div className={`w-[11px] h-[11px] rounded-full bg-white absolute top-[2px] transition-all shadow-sm ${course.active ? "left-[14px]" : "left-[2px]"}`} />
                          </div>
                        </td>

                        {/* Featured star */}
                        <td className="px-3.5 py-3 text-center">
                          <button onClick={() => toggleFeatured(course.id)}>
                            <Star
                              size={14}
                              className={course.featured ? "text-amber-400 fill-amber-400" : "text-slate-300 hover:text-amber-300"}
                            />
                          </button>
                        </td>

                        {/* Learners */}
                        <td className="px-3.5 py-3 text-[13px] font-bold text-slate-900">
                          {course.learners || "—"}
                        </td>

                        {/* Updated */}
                        <td className="px-3.5 py-3 text-[12px] text-slate-400">{course.updated}</td>

                        {/* Actions dropdown */}
                        <td className="px-3.5 py-3">
                          <div className="relative flex items-center justify-center">
                            <button
                              className="w-[26px] h-[26px] rounded-[4px] bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                              onClick={() => setOpenDropdown(isOpen ? null : course.id)}
                            >
                              <MoreHorizontal size={12} className="text-slate-500" />
                            </button>
                            {isOpen && (
                              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg min-w-[156px] z-50 overflow-hidden py-1">
                                {[
                                  { icon: Pencil,   label: "Edit Course",  action: () => { navigate(`/courses/${course.id}/edit`); setOpenDropdown(null); } },
                                  { icon: Eye,      label: "Preview",      action: () => setOpenDropdown(null) },
                                  { icon: Layers,   label: "Curriculum",   action: () => { navigate(`/courses/${course.id}/curriculum`); setOpenDropdown(null); } },
                                  { icon: BarChart, label: "Analytics",    action: () => setOpenDropdown(null) },
                                  { icon: Copy,     label: "Duplicate",    action: () => setOpenDropdown(null) },
                                  null,
                                  { icon: Trash2,   label: "Delete",       danger: true, action: () => { setDeleteTarget(course); setOpenDropdown(null); } },
                                ].map((item, i) => item === null ? (
                                  <div key={i} className="h-px bg-slate-100 my-1" />
                                ) : (
                                  <button
                                    key={item.label}
                                    onClick={item.action}
                                    className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium hover:bg-slate-50 transition-colors ${item.danger ? "text-red-600" : "text-slate-700"}`}
                                  >
                                    <item.icon size={12} className={item.danger ? "text-red-500" : "text-slate-400"} />
                                    {item.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer / pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
            <span className="text-[12px] text-slate-400">
              Showing <span className="font-semibold text-slate-700">1–{filtered.length}</span> of <span className="font-semibold text-slate-700">{courses.length}</span> courses
            </span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40" disabled>
                <ChevronLeft size={13} />
              </button>
              <button className="w-7 h-7 rounded-md border border-[#6C1D5F] bg-[#6C1D5F] text-white text-[12px] font-semibold">1</button>
              <button className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40" disabled>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Close dropdown on outside click */}
      {openDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
      )}

      <DeleteDialog
        show={!!deleteTarget}
        title="Delete Course"
        message="This will permanently remove the course and all its modules. This action cannot be undone."
        itemName={deleteTarget?.title}
        deleting={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </AppLayout>
  );
}

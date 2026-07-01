import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

const DIFFICULTIES = ["All Difficulties", "Beginner", "Intermediate", "Advanced", "Expert"];
const LANGUAGES = ["All Languages", "EN", "HI", "FR", "DE", "ES"];

export default function CourseFilters({
  // Tab props
  activeTab,
  onTabChange,
  tabCounts,
  // Search + filter props
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedLanguage,
  onLanguageChange,
  categories,
}) {
  const tabs = [
    { key: "all", label: "All Courses" },
    { key: "Published", label: "Published" },
    { key: "Draft", label: "Draft" },
    { key: "active", label: "Active" },
    { key: "featured", label: "Featured" },
  ];

  const activeFilterCount = [
    selectedCategory !== "All Categories",
    selectedDifficulty !== "All Difficulties",
    selectedLanguage !== "All Languages",
    searchQuery !== "",
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* ── Tab strip ──────────────────────────────────── */}
      <div className="flex items-center gap-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 overflow-x-auto">
        {tabs.map(({ key, label }) => {
          const count = tabCounts?.[key] ?? 0;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#6C1D5F] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Filter toolbar ─────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[180px]">
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none"
              placeholder="Search courses..."
            />
          </div>
        </div>

        {/* Category dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-600 focus:border-[#6C1D5F] outline-none cursor-pointer"
          >
            <option value="All Categories">Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Difficulty */}
        <div className="relative">
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-600 focus:border-[#6C1D5F] outline-none cursor-pointer"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Language */}
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-600 focus:border-[#6C1D5F] outline-none cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Filters button */}
        <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
          <SlidersHorizontal size={13} />
          Filters
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#6C1D5F] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex-1" />

        {/* Sort */}
        <div className="relative">
          <select
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-600 focus:border-[#6C1D5F] outline-none cursor-pointer"
            defaultValue="Sort: Updated"
          >
            {["Sort: Updated", "Sort: Newest", "Sort: A → Z", "Sort: Learners"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

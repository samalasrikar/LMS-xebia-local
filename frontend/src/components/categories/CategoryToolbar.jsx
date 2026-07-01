import { Search, LayoutGrid, List, ChevronDown, SlidersHorizontal } from "lucide-react";

export default function CategoryToolbar({
  filterText,
  onFilterChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
  totalAll,
}) {
  const sortOptions = ["Most Popular", "Newest First", "Oldest First", "A → Z", "Z → A"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-3.5 flex flex-wrap items-center gap-2.5">
      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full border border-slate-200 rounded-xl pl-8.5 pr-4 py-2 text-xs focus:border-[#6C1D5F] focus:ring-2 focus:ring-[#6C1D5F]/15 outline-none transition-all bg-slate-50/50"
            placeholder="Search categories..."
          />
        </div>
      </div>

      {/* Status filter */}
      <div className="relative">
        <SlidersHorizontal size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-7 py-2 text-xs font-semibold text-slate-600 focus:border-[#6C1D5F] outline-none cursor-pointer"
        >
          {["All", "Active", "Inactive"].map((s) => (
            <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-7 py-2 text-xs font-semibold text-slate-600 focus:border-[#6C1D5F] outline-none cursor-pointer"
        >
          {sortOptions.map((s) => (
            <option key={s} value={s}>Sort: {s}</option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      {/* Count badge */}
      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
        Showing {totalCount}{totalAll && totalAll !== totalCount ? ` of ${totalAll}` : ""} categories
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* View toggle */}
      <div className="flex bg-slate-100 p-0.5 rounded-xl">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            viewMode === "grid" ? "bg-white shadow-sm text-[#6C1D5F]" : "text-slate-400 hover:text-slate-600"
          }`}
          title="Grid view"
        >
          <LayoutGrid size={15} />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            viewMode === "list" ? "bg-white shadow-sm text-[#6C1D5F]" : "text-slate-400 hover:text-slate-600"
          }`}
          title="List view"
        >
          <List size={15} />
        </button>
      </div>
    </div>
  );
}

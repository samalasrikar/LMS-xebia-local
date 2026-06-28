import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";

export default function CourseFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  const [trainer, setTrainer] = useState("All Trainers");
  const [level, setLevel] = useState("All Levels");
  const [status, setStatus] = useState("All Status");

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Search</label>
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] rounded-xl text-xs outline-none"
              placeholder="Title or ID..."
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1.5 flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Category</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-[34px] px-3 border border-slate-200 font-normal text-slate-700 text-xs bg-slate-50/50 hover:bg-slate-100 rounded-xl transition-all text-left"
              >
                {selectedCategory}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-xl z-50 max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(val) => onCategoryChange(val)}>
                <DropdownMenuRadioItem
                  value="All Categories"
                  className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                >
                  All Categories
                </DropdownMenuRadioItem>
                {categories.map((cat) => (
                  <DropdownMenuRadioItem
                    key={cat.id}
                    value={cat.name}
                    className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                  >
                    {cat.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Trainer */}
        <div className="space-y-1.5 flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Trainer</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-[34px] px-3 border border-slate-200 font-normal text-slate-700 text-xs bg-slate-50/50 hover:bg-slate-100 rounded-xl transition-all text-left"
              >
                {trainer}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-xl z-50">
              <DropdownMenuRadioGroup value={trainer} onValueChange={(val) => setTrainer(val)}>
                {["All Trainers", "Dr. Sarah Johnson", "Michael Chen", "Emily Watson"].map((t) => (
                  <DropdownMenuRadioItem
                    key={t}
                    value={t}
                    className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                  >
                    {t}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Difficulty */}
        <div className="space-y-1.5 flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Difficulty</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-[34px] px-3 border border-slate-200 font-normal text-slate-700 text-xs bg-slate-50/50 hover:bg-slate-100 rounded-xl transition-all text-left"
              >
                {level}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-xl z-50">
              <DropdownMenuRadioGroup value={level} onValueChange={(val) => setLevel(val)}>
                {["All Levels", "Beginner", "Intermediate", "Advanced"].map((l) => (
                  <DropdownMenuRadioItem
                    key={l}
                    value={l}
                    className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                  >
                    {l}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status */}
        <div className="space-y-1.5 flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Status</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-[34px] px-3 border border-slate-200 font-normal text-slate-700 text-xs bg-slate-50/50 hover:bg-slate-100 rounded-xl transition-all text-left"
              >
                {status}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-xl z-50">
              <DropdownMenuRadioGroup value={status} onValueChange={(val) => setStatus(val)}>
                {["All Status", "Published", "Draft", "Archived"].map((s) => (
                  <DropdownMenuRadioItem
                    key={s}
                    value={s}
                    className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                  >
                    {s}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

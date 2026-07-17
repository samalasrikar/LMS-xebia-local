import React from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export default function BlockPickerDialog({
    blockPickerOpen,
    setBlockPickerOpen,
    blockSearch,
    setBlockSearch,
    filteredBlockCategories,
    selectedBlockType,
    setSelectedBlockType,
    handleSelectBlockType,
}) {
    return (
        <Dialog open={blockPickerOpen} onOpenChange={setBlockPickerOpen}>
            <DialogContent className="w-[95vw] sm:max-w-7xl rounded-xl shadow-2xl bg-white border border-slate-200 p-0 overflow-hidden">
                {/* Search */}
                <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-[#6C1D5F] focus-within:ring-1 focus-within:ring-[#6C1D5F]/30 transition-all">
                        <Search size={14} className="text-slate-400 shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            value={blockSearch}
                            onChange={e => setBlockSearch(e.target.value)}
                            placeholder="Search blocks..."
                            className="flex-1 bg-transparent text-[13px] outline-none text-slate-700 placeholder:text-slate-400"
                        />
                        {blockSearch && (
                            <button onClick={() => setBlockSearch("")} className="text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none">
                                <X size={12} />
                            </button>
                        )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 font-medium text-center">
                        Select a block type to add to this submodule
                    </p>
                </div>

                {/* Categories */}
                <ScrollArea className="max-h-[75vh]">
                    <div className="p-4 space-y-6">
                        {filteredBlockCategories.map(cat => (
                            <div key={cat.label} className="relative">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 sticky top-0 bg-white py-2 z-10">{cat.label}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {cat.items.map(item => {
                                        const Icon = item.icon;
                                        const isSelected = selectedBlockType === item.type;
                                        return (
                                            <button
                                                key={item.type}
                                                onClick={() => {
                                                    setSelectedBlockType(item.type);
                                                    handleSelectBlockType(item.type);
                                                }}
                                                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm cursor-pointer ${isSelected
                                                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5"
                                                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-[#6C1D5F] text-white" : "bg-slate-100 text-slate-500"
                                                    }`}>
                                                    <Icon size={15} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`text-[12px] font-bold leading-tight ${isSelected ? "text-[#6C1D5F]" : "text-slate-700"}`}>{item.label}</p>
                                                    <p className="text-[10.5px] text-slate-400 leading-snug mt-0.5 line-clamp-2">{item.desc}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {filteredBlockCategories.length === 0 && (
                            <div className="py-8 text-center text-slate-400">
                                <Search size={20} className="mx-auto mb-2 text-slate-300" />
                                <p className="text-[12px] font-medium">No blocks match "{blockSearch}"</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

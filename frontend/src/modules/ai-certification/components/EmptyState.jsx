import React from "react";
import { Inbox, RotateCcw } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "No records match your selected filters or search terms. Try modifying your criteria.",
  onReset
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#d5c1cc]/50 rounded-3xl min-h-[350px] shadow-sm animate-fadeIn">
      <div className="p-4 bg-slate-50 text-[#83727c] rounded-full mb-4">
        <Inbox size={42} className="stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold text-[#6C1D5F]">{title}</h3>
      <p className="text-sm text-[#51434c] max-w-sm mt-2 mb-6 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="
            inline-flex items-center gap-2 bg-[#6C1D5F] hover:bg-[#84117C] text-white
            text-sm font-bold px-5 py-2.5 rounded-2xl shadow-md transition-all
            hover:-translate-y-0.5 active:translate-y-0 cursor-pointer
          "
        >
          <RotateCcw size={16} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}

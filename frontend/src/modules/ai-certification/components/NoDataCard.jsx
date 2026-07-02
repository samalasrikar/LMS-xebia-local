import React from "react";
import { Info } from "lucide-react";

export default function NoDataCard({ message = "No data available for this chart context." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-center p-6 bg-slate-50 border border-dashed border-[#d5c1cc]/80 rounded-2xl">
      <Info size={24} className="text-[#83727c] mb-2" />
      <p className="text-xs font-semibold text-[#83727c] max-w-[200px]">
        {message}
      </p>
    </div>
  );
}

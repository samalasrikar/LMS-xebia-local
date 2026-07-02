import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  description = "An error occurred while fetching the analytics dashboard data. Please try again.",
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#ffdad6] rounded-3xl min-h-[350px] shadow-sm animate-fadeIn">
      <div className="p-4 bg-[#ffdad6]/40 text-[#ba1a1a] rounded-full mb-4">
        <AlertCircle size={42} className="stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold text-[#ba1a1a]">{title}</h3>
      <p className="text-sm text-[#51434c] max-w-sm mt-2 mb-6 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            inline-flex items-center gap-2 bg-[#ba1a1a] hover:bg-[#ba1a1a]/95 text-white
            text-sm font-bold px-5 py-2.5 rounded-2xl shadow-md transition-all
            hover:-translate-y-0.5 active:translate-y-0 cursor-pointer
          "
        >
          <RefreshCw size={16} />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
}

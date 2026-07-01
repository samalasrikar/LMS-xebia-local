import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-sm min-w-0">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#83727c]">
        <Search size={16} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-2.5 bg-white border border-[#d5c1cc] rounded-2xl
          text-sm text-slate-800 placeholder-[#83727c]/70
          focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F]
          shadow-sm transition-all duration-200
        "
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="
            absolute inset-y-0 right-0 pr-3 flex items-center text-[#83727c] hover:text-[#6C1D5F]
            transition-colors cursor-pointer
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

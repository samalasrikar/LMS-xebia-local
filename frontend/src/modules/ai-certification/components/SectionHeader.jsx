import React from "react";

export default function SectionHeader({ title, subtitle, extra }) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
      <div>
        <h3 className="text-lg font-bold text-[#6C1D5F] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#83727c] font-medium mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
  );
}

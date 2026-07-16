import React from "react";
import { Info } from "lucide-react";

export default function AnalyticsCard({
  title,
  subtitle,
  headerAction,
  className = "",
  tooltip,
  children
}) {
  return (
    <div className={`bg-white rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] overflow-visible flex flex-col justify-between ${className}`}>
      {(title || subtitle || headerAction || tooltip) && (
        <div className="px-6 py-4.5 border-b border-[#d5c1cc]/30 flex items-center justify-between select-none">
          <div>
            {title && (
              <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight leading-snug flex items-center gap-1.5">
                {title}
                {tooltip && (
                  <div className="relative inline-block group/tooltip cursor-help text-slate-400 hover:text-slate-655">
                    <Info size={13} />
                    <div className="absolute left-0 bottom-6 hidden group-hover/tooltip:block w-48 bg-slate-800 text-white text-[10px] font-medium p-2 rounded-lg shadow-lg z-50 pointer-events-none leading-relaxed normal-case font-normal">
                      {tooltip}
                    </div>
                  </div>
                )}
              </h2>
            )}
            {subtitle && (
              <p className="text-[11.5px] text-slate-400 mt-0.5 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

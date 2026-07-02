import React from "react";
import NoDataCard from "../NoDataCard";

export default function HeatMapCard({
  title,
  subtitle,
  data = []
}) {
  // Extract unique departments and capabilities
  const departments = React.useMemo(() => {
    return Array.from(new Set(data.map(item => item.department)));
  }, [data]);

  const capabilities = React.useMemo(() => {
    return Array.from(new Set(data.map(item => item.capability)));
  }, [data]);

  // Helper to find score for a dept and cap
  const getCellData = (dept, cap) => {
    return data.find(item => item.department === dept && item.capability === cap);
  };

  // Helper to color cells based on score
  const getCellColor = (score) => {
    if (!score) return "bg-[#F7F8FC] text-slate-400";
    if (score >= 90) return "bg-[#6C1D5F] text-white";
    if (score >= 80) return "bg-[#84117C]/80 text-white";
    if (score >= 70) return "bg-[#84117C]/50 text-slate-900 font-semibold";
    if (score >= 50) return "bg-[#91759E]/30 text-slate-800";
    return "bg-[#ba1a1a]/15 text-[#ba1a1a] font-bold";
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col justify-between h-full">
      <div className="mb-6">
        <h4 className="text-sm font-extrabold text-[#6C1D5F]">{title}</h4>
        {subtitle && <p className="text-xs text-[#83727c] font-medium mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex-1 overflow-x-auto min-h-[220px]">
        {data.length === 0 ? (
          <NoDataCard />
        ) : (
          <div className="min-w-[600px] select-none">
            {/* Headers row */}
            <div className="grid grid-cols-5 gap-2 mb-2 font-bold text-xs text-[#83727c] text-center">
              <div className="text-left font-extrabold pl-2 text-[#6C1D5F]">Department</div>
              {capabilities.map(cap => (
                <div key={cap} className="truncate px-1 py-1.5 bg-[#F7F8FC] rounded-lg">
                  {cap}
                </div>
              ))}
            </div>

            {/* Department rows */}
            <div className="space-y-2">
              {departments.map(dept => (
                <div key={dept} className="grid grid-cols-5 gap-2 items-center text-center">
                  <div className="text-left font-bold text-xs text-[#51434c] truncate pl-2">
                    {dept}
                  </div>
                  {capabilities.map(cap => {
                    const cell = getCellData(dept, cap);
                    const score = cell ? cell.score : null;
                    return (
                      <div
                        key={`${dept}-${cap}`}
                        className={`
                          py-3 rounded-xl text-sm font-bold shadow-sm transition-transform duration-200 hover:scale-105
                          ${getCellColor(score)}
                        `}
                        title={`${dept} - ${cap}: ${score ?? "N/A"}%`}
                      >
                        {score ? `${score}%` : "-"}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend scale */}
            <div className="flex items-center justify-end gap-4 mt-6 text-[10px] font-bold text-[#83727c]">
              <span>Ready Score Scale:</span>
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#ba1a1a]/15 text-[#ba1a1a]">&lt;50%</span>
                <span className="px-2 py-0.5 rounded bg-[#91759E]/30 text-slate-800">50-69%</span>
                <span className="px-2 py-0.5 rounded bg-[#84117C]/50 text-slate-900">70-79%</span>
                <span className="px-2 py-0.5 rounded bg-[#84117C]/80 text-white">80-89%</span>
                <span className="px-2 py-0.5 rounded bg-[#6C1D5F] text-white">90%+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

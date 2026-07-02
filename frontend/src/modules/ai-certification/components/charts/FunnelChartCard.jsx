import React from "react";
import NoDataCard from "../NoDataCard";

export default function FunnelChartCard({
  title,
  subtitle,
  data = [] // array of { stage: string, count: number, percent: number }
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col justify-between h-full">
      <div className="mb-6">
        <h4 className="text-sm font-extrabold text-[#6C1D5F]">{title}</h4>
        {subtitle && <p className="text-xs text-[#83727c] font-medium mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-[220px]">
        {data.length === 0 ? (
          <NoDataCard />
        ) : (
          <div className="space-y-3.5 max-w-lg mx-auto w-full">
            {data.map((item, idx) => {
              // Width decreases as the stage index increases to resemble a funnel
              const widthPct = 100 - idx * 12;
              const barColors = [
                "bg-[#6C1D5F]",
                "bg-[#84117C]",
                "bg-[#84117C]/80",
                "bg-[#01AC9F]",
                "bg-[#FF6200]"
              ];
              const cellColor = barColors[idx % barColors.length];

              return (
                <div key={item.stage} className="flex items-center gap-3">
                  {/* Left Label */}
                  <div className="w-28 text-right text-xs font-bold text-[#51434c] truncate">
                    {item.stage}
                  </div>

                  {/* Funnel Center Row */}
                  <div className="flex-1 flex justify-center">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className={`
                        py-2 rounded-xl text-white text-xs font-extrabold flex items-center justify-between px-4 shadow-sm
                        transition-all duration-300 hover:brightness-105 hover:scale-[1.02]
                        ${cellColor}
                      `}
                    >
                      <span>{item.count.toLocaleString()}</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">
                        {item.percent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

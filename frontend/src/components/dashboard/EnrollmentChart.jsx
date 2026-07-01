/* Monthly Enrollments bar chart — matching Banani design */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// 2024 bars (brand purple ramp), 2023 bars (lighter)
const DATA_2024 = [42, 52, 65, 58, 76, 63, 72, 88, 83, 76, 94, 100];
const DATA_2023 = [30, 38, 47, 42, 55, 48, 58, 65, 60, 56, 70, 78];

const COLOR_2024 = [
  "#dde4ff","#c7d2fe","#a5b4fc","#818cf8","#6366f1","#6366f1",
  "#6366f1","#4f46e5","#4338ca","#4338ca","#3730a3","#3730a3",
];
const COLOR_2023 = "#e0e7ff";

export default function EnrollmentChart() {
  const maxVal = Math.max(...DATA_2024, ...DATA_2023);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div>
          <div className="text-[13px] font-bold text-slate-900 tracking-tight">Monthly Enrollments</div>
          <div className="text-[11px] text-slate-400 mt-0.5">New learner registrations over time</div>
        </div>
        <div className="flex gap-1.5">
          {["30d","90d","1y"].map((l, i) => (
            <button
              key={l}
              className={`px-2.5 py-1 rounded-md text-[12px] font-medium border transition-colors ${
                i === 1
                  ? "bg-slate-100 text-slate-700 border-slate-200"
                  : "text-slate-400 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Chart body */}
      <div className="px-[18px] pt-4 pb-5">
        <div className="flex items-stretch" style={{ height: 110, gap: 6 }}>

          {/* Y-axis */}
          <div className="flex flex-col justify-between pb-5 flex-shrink-0" style={{ minWidth: 20 }}>
            {["4k","3k","2k","1k","0"].map((l) => (
              <span key={l} className="text-[9px] text-slate-400 leading-none">{l}</span>
            ))}
          </div>

          {/* Grouped bars */}
          <div className="flex-1 flex gap-1 items-end pb-5">
            {MONTHS.map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-0.5">
                {/* Bar container — relative, fixed height */}
                <div className="w-full flex items-end gap-0.5" style={{ height: 90 }}>
                  {/* 2023 bar */}
                  <div
                    className="flex-1 rounded-t-[3px]"
                    style={{ height: `${(DATA_2023[i] / maxVal) * 100}%`, background: COLOR_2023 }}
                  />
                  {/* 2024 bar */}
                  <div
                    className="flex-1 rounded-t-[3px]"
                    style={{ height: `${(DATA_2024[i] / maxVal) * 100}%`, background: COLOR_2024[i] }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3.5 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-[2px] bg-[#6366f1]" />
            <span className="text-[11px] text-slate-400">2024</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-[2px] bg-[#e0e7ff]" />
            <span className="text-[11px] text-slate-400">2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
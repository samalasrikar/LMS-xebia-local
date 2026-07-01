// Learner Activity Heatmap (calendar-style grid)
// Generates a 7×8 grid (days × weeks) with random activity for demo
const WEEKS = 8;
const DAYS = 7;
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_LABELS = ["May", "Jun", "Jul"];

function getIntensity(val) {
  if (val === 0) return "bg-slate-100";
  if (val < 3) return "bg-[#6C1D5F]/15";
  if (val < 6) return "bg-[#6C1D5F]/35";
  if (val < 9) return "bg-[#6C1D5F]/60";
  return "bg-[#6C1D5F]";
}

// Deterministic pseudo-random activity
function buildGrid() {
  const grid = [];
  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < DAYS; d++) {
      week.push(0);
    }
    grid.push(week);
  }
  return grid;
}

const GRID = buildGrid();

export default function LearnerHeatmap() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Learner Activity</h3>
        <span className="text-[10px] text-slate-400">Last 8 weeks</span>
      </div>

      {/* Month labels */}
      <div className="flex justify-between mb-1.5 px-5">
        {MONTH_LABELS.map((m) => (
          <span key={m} className="text-[9px] text-slate-400 font-medium">
            {m}
          </span>
        ))}
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pr-1">
          {DAY_LABELS.map((d, i) => (
            <span key={i} className="text-[9px] text-slate-400 w-3 text-center leading-none" style={{ height: "14px", lineHeight: "14px" }}>
              {i % 2 === 0 ? d : ""}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-1 flex-1">
          {GRID.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 flex-1">
              {week.map((val, di) => (
                <div
                  key={di}
                  title={`${val} learners active`}
                  className={`rounded-sm ${getIntensity(val)} transition-colors cursor-pointer hover:opacity-80`}
                  style={{ height: "14px" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[9px] text-slate-400">Less</span>
        {[0, 2, 5, 7, 10].map((v) => (
          <div
            key={v}
            className={`w-3 h-3 rounded-sm ${getIntensity(v)}`}
          />
        ))}
        <span className="text-[9px] text-slate-400">More</span>
      </div>
    </div>
  );
}

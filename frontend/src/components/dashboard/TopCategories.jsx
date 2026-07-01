/* Top Categories by enrollment — from Banani LMS Admin Dashboard */
const CATEGORIES = [
  { emoji: "⚛️", name: "Frontend Development", courses: 32, learners: "6,482", pct: 28, color: "#6C1D5F" },
  { emoji: "☁️", name: "Cloud & DevOps",        courses: 28, learners: "5,917", pct: 23, color: "#22c55e" },
  { emoji: "🤖", name: "AI & Machine Learning", courses: 19, learners: "4,251", pct: 18, color: "#7c3aed" },
  { emoji: "🔐", name: "Security & Compliance", courses: 15, learners: "3,140", pct: 13, color: "#f59e0b" },
  { emoji: "📐", name: "UX & Product Design",   courses: 12, learners: "2,890", pct: 11, color: "#2563eb" },
];

export default function TopCategories() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div>
          <div className="text-[13px] font-bold text-slate-900">Top Categories</div>
          <div className="text-[11px] text-slate-400 mt-0.5">By learner enrollment this month</div>
        </div>
        <button className="text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors">
          Manage
        </button>
      </div>

      {/* Category list */}
      <div className="px-[18px] py-1">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.name}
            className={`flex items-center gap-3 py-3 ${i < CATEGORIES.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            {/* Emoji icon */}
            <div className="w-8 h-8 rounded-md bg-slate-50 flex items-center justify-center text-base flex-shrink-0 border border-slate-100">
              {cat.emoji}
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-800 truncate">{cat.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {cat.courses} courses · {cat.learners} learners
              </div>
            </div>

            {/* Percentage + progress bar */}
            <div className="flex-shrink-0 text-right min-w-[72px]">
              <div className="text-[12px] font-bold text-slate-800 mb-1">{cat.pct}%</div>
              <div className="h-1.5 w-[72px] bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${cat.pct}%`, background: cat.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

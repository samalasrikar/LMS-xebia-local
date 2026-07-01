import { TABS } from "./courseConstants";

export default function CoursesTabs({ activeTab, setActiveTab, counts }) {
  return (
    <div className="flex border-b border-slate-200 -mb-1">
      {TABS.map((tab, i) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(i)}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
            activeTab === i
              ? "text-[#6C1D5F] border-[#6C1D5F] font-semibold"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          {tab.label}
          {tab.filter && counts[tab.filter] > 0 && (
            <span
              className={`text-[10px] font-bold px-1.5 py-px rounded-full border ${
                tab.filter === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                tab.filter === "draft"     ? "bg-amber-50 text-amber-700 border-amber-200" :
                tab.filter === "archived"  ? "bg-red-50 text-red-700 border-red-200" :
                                             "bg-purple-50 text-purple-700 border-purple-200"
              }`}
            >
              {counts[tab.filter]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

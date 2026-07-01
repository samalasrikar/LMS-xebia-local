import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/categoryService";
import courseService from "../../services/courseService";

const COLORS = ["#6C1D5F", "#01AC9F", "#6836a8", "#d97706", "#e11d48"];

export default function TopCategoriesPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [cats, courses] = await Promise.all([
          categoryService.getAllCategories(),
          courseService.getAllCourses(),
        ]);
        if (cats && courses) {
          const mapped = cats.map((cat) => ({
            name: cat.name,
            count: courses.filter((c) => Number(c.categoryId) === Number(cat.id)).length,
          }));
          const sorted = mapped.sort((a, b) => b.count - a.count).slice(0, 5);
          const max = sorted[0]?.count || 1;
          setItems(sorted.map((s) => ({ ...s, pct: Math.round((s.count / max) * 100) })));
        }
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Top Categories</h3>
        <button
          onClick={() => navigate("/categories")}
          className="text-[11px] font-semibold text-[#6C1D5F] hover:underline cursor-pointer"
        >
          Manage →
        </button>
      </div>
      <div className="space-y-3">
        {!loading && items.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">No categories found.</p>
        ) : (
          (loading ? Array(5).fill(null) : items).map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[160px]">
                  {loading ? <span className="inline-block w-28 h-3 bg-slate-100 rounded animate-pulse" /> : item.name}
                </span>
                <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                  {loading ? "—" : `${item.count} courses`}
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: loading ? "0%" : `${item.pct}%`,
                    background: COLORS[i % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

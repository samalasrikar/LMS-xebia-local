import { useState, useEffect } from "react";
import { MoreHorizontal, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import courseService from "../../services/courseService";
import dashboardService from "../../services/dashboardService";
/* ─── Category colour mapping ──────────────────────────────────────── */
const CATEGORY_COLORS = {
  Design:      { bg: "bg-[#ff83ec]/10", text: "text-[#9e2e93]" },
  Development: { bg: "bg-[#6C1D5F]/10", text: "text-[#6C1D5F]" },
  Dev:         { bg: "bg-[#6C1D5F]/10", text: "text-[#6C1D5F]" },
  Business:    { bg: "bg-[#56dacc]/10", text: "text-[#2ebdaf]"  },
  Marketing:   { bg: "bg-[#ff83ec]/10", text: "text-[#9e2e93]" },
  General:     { bg: "bg-[#f5f3f3]",    text: "text-[#51434c]"  },
};

function getCatColor(name) {
  const match = Object.keys(CATEGORY_COLORS).find((k) =>
    (name ?? "").toLowerCase().includes(k.toLowerCase())
  );
  return CATEGORY_COLORS[match ?? "General"];
}

export default function RecentCoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dashboardService.getRecentCourses();

        console.log(data);

        if (data) {
          setCourses(data);
        }
      } catch (err) {
        console.error("Failed to load recent courses:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#d5c1cc] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-[#6C1D5F]">Recent Courses</h3>
        <button className="text-[#6C1D5F] text-sm font-bold hover:underline underline-offset-4 cursor-pointer">
          Browse Catalog
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold text-[#83727c] border-b border-[#d5c1cc]/40 uppercase tracking-widest">
              <th className="pb-4">Course Details</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#d5c1cc]/30">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-[#51434c]">
                  Loading courses…
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-[#51434c]">
                  No courses found.
                </td>
              </tr>
            ) : (
              <>
              {console.log(courses)}
              {courses.map((course) => {
                const cat = getCatColor(course.categoryName);
                return (
                  <tr
                    key={course.id}
                    className="group hover:bg-[#f5f3f3]/50 transition-colors"
                  >
                    {/* Course name + description */}
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            w-12 h-12 rounded-xl bg-[#efeded] flex-shrink-0
                            flex items-center justify-center border border-[#d5c1cc]/30
                            group-hover:scale-105 transition-transform
                          "
                        >
                          <BookOpen size={20} className="text-[#6C1D5F]" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#6C1D5F] truncate max-w-[200px]">
                            {course.title}
                          </p>
                          <p className="text-[10px] text-[#83727c] mt-0.5 truncate max-w-[200px]">
                            {course.description || "No description provided."}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${cat.bg} ${cat.text}`}
                      >
                        {course.categoryName || "General"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#002f2a]" />
                        <span className="text-[11px] font-bold text-[#002f2a]">Active</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 text-right">
                      <button className="p-2 rounded-xl hover:bg-[#eae8e7] transition-colors cursor-pointer">
                        <MoreHorizontal size={18} className="text-[#83727c]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
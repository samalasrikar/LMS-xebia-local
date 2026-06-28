import { useState, useEffect } from "react";
import {
  MoreHorizontal,
  BookOpen,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import courseService from "../../services/courseService";

export default function RecentCoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecentCourses() {
      try {
        const data = await courseService.getAllCourses();
        if (data) {
          // Display last 3 courses in reverse order
          setCourses(data.slice(-3).reverse());
        }
      } catch (err) {
        console.error("Failed to load recent courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRecentCourses();
  }, []);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Courses</CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Manage recently updated courses
          </p>
        </div>

        <Button variant="ghost">
          View All
        </Button>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Status
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-sm text-slate-500">
                  Loading courses...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-sm text-slate-500">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-purple-100 p-2">
                        <BookOpen
                          size={18}
                          className="text-purple-700"
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {course.title}
                        </div>
                        <div className="text-sm text-slate-500 max-w-[250px] truncate">
                          {course.description || "No description provided."}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 text-slate-600 text-sm">
                    {course.categoryName || "General"}
                  </td>
                  <td className="px-6">
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="px-6 text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
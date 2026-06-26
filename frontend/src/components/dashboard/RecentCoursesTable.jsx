import {
  MoreHorizontal,
  ShieldCheck,
  Cloud,
  LineChart,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";

const courses = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Enterprise Security Basics",
    updated: "Updated 2 days ago",
    status: "Published",
    modules: "12 Modules",
  },
  {
    id: 2,
    icon: Cloud,
    title: "Cloud Infrastructure 101",
    updated: "Updated 1 week ago",
    status: "Published",
    modules: "8 Modules",
  },
  {
    id: 3,
    icon: LineChart,
    title: "Advanced Data Analytics",
    updated: "Draft saved yesterday",
    status: "Draft",
    modules: "4 Modules",
  },
];

export default function RecentCoursesTable() {
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
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Modules
              </th>

              <th className="px-6 py-4"></th>

            </tr>

          </thead>

          <tbody>

            {courses.map((course) => {

              const Icon = course.icon;

              return (

                <tr
                  key={course.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="rounded-lg bg-purple-100 p-2">

                        <Icon
                          size={18}
                          className="text-purple-700"
                        />

                      </div>

                      <div>

                        <div className="font-medium">
                          {course.title}
                        </div>

                        <div className="text-sm text-slate-500">
                          {course.updated}
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="px-6">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {course.status}
                    </span>

                  </td>

                  <td className="px-6 text-slate-500">
                    {course.modules}
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

              );

            })}

          </tbody>

        </table>

      </CardContent>

    </Card>
  );
}
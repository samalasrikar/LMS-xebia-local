import { MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";

const categories = [
  {
    id: 1,
    name: "Technical Training",
    courses: 42,
    status: "Active",
  },
  {
    id: 2,
    name: "HR & Compliance",
    courses: 15,
    status: "Active",
  },
  {
    id: 3,
    name: "Leadership & Management",
    courses: 8,
    status: "Draft",
  },
];

export default function RecentCategoriesTable() {

  return (

    <Card className="rounded-2xl">

      <CardHeader className="flex flex-row justify-between">

        <div>

          <CardTitle>
            Recent Categories
          </CardTitle>

          <p className="text-sm text-slate-500 mt-1">
            Latest LMS categories
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
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Courses
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Status
              </th>

              <th className="px-6 py-4"></th>

            </tr>

          </thead>

          <tbody>

            {categories.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-medium">
                  {item.name}
                </td>

                <td className="px-6 text-slate-500">
                  {item.courses}
                </td>

                <td className="px-6">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status}
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

            ))}

          </tbody>

        </table>

      </CardContent>

    </Card>

  );

}
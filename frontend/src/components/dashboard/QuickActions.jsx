import {
  FolderPlus,
  GraduationCap,
  BookPlus,
  UploadCloud,
} from "lucide-react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";

const actions = [

  {
    title: "New Category",
    icon: FolderPlus,
  },

  {
    title: "New Course",
    icon: GraduationCap,
  },

  {
    title: "New Module",
    icon: BookPlus,
  },

  {
    title: "Upload Content",
    icon: UploadCloud,
  },

];

export default function QuickActions() {

  return (

    <Card className="rounded-2xl border border-slate-200">

      <div className="border-b p-6">

        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used actions
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 p-6">

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <Button
              key={item.title}
              variant="outline"
              className="h-28 flex-col gap-3 rounded-xl"
            >

              <Icon
                size={24}
                className="text-purple-700"
              />

              <span>
                {item.title}
              </span>

            </Button>

          );

        })}

      </div>

    </Card>

  );

}
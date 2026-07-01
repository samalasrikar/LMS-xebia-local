import { useNavigate } from "react-router-dom";
import { Plus, FolderPlus, UserPlus, FileBarChart2 } from "lucide-react";

const ACTIONS = [
  {
    label: "Create New Course",
    icon: Plus,
    color: "#6C1D5F",
    bg: "bg-[#6C1D5F]/8",
    path: "/courses/create",
  },
  {
    label: "Add Category",
    icon: FolderPlus,
    color: "#01AC9F",
    bg: "bg-[#01AC9F]/10",
    path: "/categories/create",
  },
  {
    label: "Invite Instructor",
    icon: UserPlus,
    color: "#6836a8",
    bg: "bg-[#6836a8]/10",
    path: "/learners",
  },
  {
    label: "Generate Report",
    icon: FileBarChart2,
    color: "#d97706",
    bg: "bg-amber-50",
    path: "/analytics",
  },
];

export default function QuickActionsPanel() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {ACTIONS.map(({ label, icon: Icon, color, bg, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all group text-left cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
            >
              <Icon size={15} style={{ color }} />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

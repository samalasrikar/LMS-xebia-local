import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderTree,
  GraduationCap,
  BookOpen,
  Settings,
  HelpCircle,
} from "lucide-react";

import logo from "../../assets/xebia-logo.png";
import adminProfileIcon from "../../assets/admin_profile_icon.svg";

const menu = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: FolderTree,
  },
  {
    title: "Courses",
    path: "/courses",
    icon: GraduationCap,
  },
];

const footer = [
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    path: "/support",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[250px] flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <img
          src={logo}
          alt="Xebia LMS"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-semibold"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-4">
        {footer.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-semibold"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
          <img src={adminProfileIcon} alt="Admin" className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              admin@xebia.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
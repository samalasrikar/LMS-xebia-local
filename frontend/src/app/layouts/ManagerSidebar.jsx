import { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  BookOpen,
  Layers,
  FileText,
  Users,
  Search,
  Settings,
  GraduationCap,
  ChevronsUpDown,
  HelpCircle,
  X,
  Briefcase,
  Award,
  UserCheck,
  Calendar,
  ShieldCheck
} from "lucide-react";

import adminProfileIcon from "../../assets/admin_profile_icon.svg";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { title: "Manager Dashboard", path: "/manager", icon: LayoutDashboard },
      { title: "Learning Dashboard", path: "/manager/learning", icon: BookOpen },
      { title: "Admin Dashboard", path: "/manager/admin-dashboard", icon: Layers },
    ],
  },

  {
    label: "Content",
    items: [
      { title: "Categories", path: "/manager/categories", icon: FolderOpen },
      { title: "Courses", path: "/manager/courses", icon: FileText },
      { title: "Assessments", path: "/manager/assessments", icon: Award },
    ],
  },

  {
    label: "People",
    items: [
      { title: "Learners", path: "/manager/learners", icon: Users },
      { title: "Trainers", path: "/manager/trainers", icon: UserCheck },
      { title: "Batches", path: "/manager/batches", icon: Calendar },
    ],
  },

  {
    label: "System",
    items: [
      { title: "Reports & Analytics", path: "/manager/analytics", icon: BarChart3 },
      { title: "Approval Center", path: "/manager/approvals", icon: ShieldCheck },
      { title: "Settings", path: "/manager/settings", icon: Settings },
    ],
  },
];

export default function ManagerSidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path) => {
    if (path === "/manager") return location.pathname === "/manager";
    return location.pathname === path;
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-100 text-[#84117C] font-semibold px-0.5 rounded-[3px]">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[220px] flex-col border-r border-slate-200 bg-white md:flex z-40">
      {/* ── Logo ─────────────────────────────────── */}
      <div className="flex items-center gap-2.5 px-4 py-[18px] border-b border-slate-200 flex-shrink-0">
        <div className="w-[30px] h-[30px] rounded-lg bg-[#84117C] flex items-center justify-center flex-shrink-0">
          <Briefcase size={16} className="text-white" />
        </div>
        <div>
          <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none">Xebia LMS</div>
          <div className="text-[9px] text-[#84117C] font-semibold tracking-widest uppercase mt-0.5">Manager Portal</div>
        </div>
      </div>

      {/* ── Search ───────────────────────────────── */}
      <div className="mx-3 my-2.5 relative">
        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages..."
          className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-7 pr-6 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-[#84117C] focus:ring-1 focus:ring-[#84117C] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* ── Nav Groups ───────────────────────────── */}
      <nav className="flex-1 overflow-y-auto pb-2">
        {filteredGroups.length === 0 ? (
          <div className="px-4 py-8 text-center text-[12px] text-slate-400">
            No pages found.
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.label}>
              <div className="px-4 pt-3.5 pb-1.5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                {group.label}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={() => setSearchQuery("")}
                    className={() =>
                      `flex items-center gap-2.5 mx-1.5 px-3 py-1.5 my-px rounded-md text-[13px] font-medium transition-all ${active
                        ? "bg-[#84117C]/10 text-[#84117C] font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon
                      size={14}
                      className={`flex-shrink-0 ${active ? "text-[#84117C]" : "text-slate-400"}`}
                    />
                    <span className="flex-1 whitespace-nowrap">
                      {highlightText(item.title, searchQuery)}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          ))
        )}
      </nav>

      {/* ── User Footer ──────────────────────────── */}
      <div className="flex-shrink-0 border-t border-slate-200 p-3">
        <Link to="/manager/profile" className="flex items-center gap-2.5 cursor-pointer rounded-md p-1 hover:bg-slate-50 transition-colors text-slate-800 hover:text-slate-900 no-underline">
          <img
            src={adminProfileIcon}
            alt="Manager"
            className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0 text-left">
            <div className="text-[12px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
              Manager
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Manager Console</div>
          </div>
          <ChevronsUpDown size={13} className="text-slate-400 flex-shrink-0" />
        </Link>
      </div>
    </aside>
  );
}

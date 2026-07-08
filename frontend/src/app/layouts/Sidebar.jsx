import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  BookOpen,
  Layers,
  FileText,
  Users,
  Award,
  Trophy,
  Calendar,
  Search,
  Settings,
  Shield,
  Plug,
  GraduationCap,
  ChevronsUpDown,
  HelpCircle,
  TrendingUp,
  Brain,
  Clock,
  LineChart,
  X,
  ArrowRight,

  Briefcase,
  Target,

  LayoutTemplate,

} from "lucide-react";

import adminProfileIcon from "../../assets/admin_profile_icon.svg";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
      {
        title: "Analytics",
        path: "/analytics",
        icon: BarChart3,
        badge: "New",
        badgeAccent: true,
      },
    ],
  },

  {
    label: "Content",
    items: [
      { title: "Categories", path: "/categories", icon: FolderOpen },
      { title: "Courses", path: "/courses", icon: BookOpen },
      { title: "Module Management", path: "/module-management", icon: Layers },
      { title: "Curriculum Builder", path: "/curriculum", icon: LayoutTemplate },
      { title: "Content Library", path: "/content-library", icon: FileText },
    ],
  },

  {
    label: "Learning",
    items: [
      { title: "Learners", path: "/learners", icon: Users },
      { title: "Schedule", path: "/schedule", icon: Calendar },
    ],
  },

  {
    label: "System",
    items: [
      { title: "SEO & Meta", path: "/seo", icon: Search },
      { title: "Design System", path: "/design-system", icon: LayoutTemplate },
      { title: "Settings", path: "/settings", icon: Settings },
      { title: "Permissions", path: "/permissions", icon: Shield },
      { title: "Integrations", path: "/integrations", icon: Plug },
      { title: "Support", path: "/support", icon: HelpCircle },
    ],
  },
];




export default function Sidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  // Helper to highlight matching text case-insensitively
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-100 text-[#6C1D5F] font-semibold px-0.5 rounded-[3px]">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Filter groups and items based on search query
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
        <div className="w-[30px] h-[30px] rounded-lg bg-[#6C1D5F] flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <div>
          <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none">Xebia LMS</div>
          <div className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">Admin Portal</div>
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
          className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-7 pr-6 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all"
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
                        ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon
                      size={14}
                      className={`flex-shrink-0 ${active ? "text-[#6C1D5F]" : "text-slate-400"}`}
                    />
                    <span className="flex-1 whitespace-nowrap">
                      {highlightText(item.title, searchQuery)}
                    </span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-px rounded-full border ${item.badgeAccent
                          ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))
        )}
      </nav>

      {/* ── Student Panel Switch ── */}
      <div className="flex-shrink-0 border-t border-slate-200 p-3 bg-slate-50/50 flex flex-col gap-1.5">
        <NavLink
          to="/trainer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer border-none outline-none text-left"
        >
          <span className="flex items-center gap-2">
            <BookOpen size={14} className="shrink-0 text-slate-400" />
            <span>Trainer Workspace</span>
          </span>
          <ArrowRight size={12} className="opacity-40" />
        </NavLink>
        <NavLink
          to="/student"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12px] font-semibold transition-all shadow-sm shadow-[#6C1D5F]/15 hover:shadow-md cursor-pointer text-center w-full"
        >
          <GraduationCap size={13} className="shrink-0" />
          <span>Student Panel</span>
        </NavLink>
      </div>

      {/* ── User Footer ──────────────────────────── */}
      <div className="flex-shrink-0 border-t border-slate-200 p-3">
        <div className="flex items-center gap-2.5 cursor-pointer rounded-md p-1 hover:bg-slate-50 transition-colors">
          <img
            src={adminProfileIcon}
            alt="Admin"
            className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
              Admin
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Super Admin</div>
          </div>
          <ChevronsUpDown size={13} className="text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
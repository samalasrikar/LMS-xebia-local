import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
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
  PanelLeftClose,
  PanelLeftOpen,

} from "lucide-react";

import adminProfileIcon from "../../assets/admin_profile_icon.svg";

/* ─── Tooltip on hover ─── */
function NavTooltip({ label, children }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [top, setTop] = useState(0);

  const handleEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top + rect.height / 2);
    }
    setShow(true);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="fixed z-[9999] ml-2 -translate-y-1/2 pointer-events-none"
          style={{ left: "72px", top }}
        >
          <div className="bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {label}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}

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
      { title: "Events Management", path: "/admin/events", icon: Calendar },
    ],
  },

  {
    label: "System",
    items: [
      { title: "SEO & Meta", path: "/seo", icon: Search },
      { title: "Design System", path: "/design-system", icon: LayoutTemplate },
      { title: "Permissions", path: "/permissions", icon: Shield },
      { title: "Integrations", path: "/integrations", icon: Plug },
      { title: "Support", path: "/support", icon: HelpCircle },
    ],
  },
];




export default function Sidebar({ collapsed, setCollapsed }) {
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
    <aside className={`fixed left-0 top-0 hidden h-screen bg-white border-r border-slate-200 flex-col md:flex z-40 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[220px]"}`}>
      {/* ── Logo ─────────────────────────────────── */}
      <div className={`flex items-center gap-2.5 border-b border-slate-200 flex-shrink-0 transition-all duration-300 ${collapsed ? "px-0 justify-center py-4" : "px-4 py-[18px]"}`}>
        <div className="w-[30px] h-[30px] rounded-lg bg-[#6C1D5F] flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${collapsed ? "w-0 min-w-0 opacity-0" : "w-auto opacity-100"}`}>
          <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">Xebia LMS</div>
          <div className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5 whitespace-nowrap">Admin Portal</div>
        </div>
      </div>

      {/* ── Search ───────────────────────────────── */}
      {!collapsed && (
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
      )}

      {/* ── Nav Groups ───────────────────────────── */}
      <nav className="flex-1 overflow-y-auto pb-2">
        {filteredGroups.length === 0 ? (
          <div className="px-4 py-8 text-center text-[12px] text-slate-400">
            No pages found.
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <div className="px-4 pt-3.5 pb-1.5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                const renderItemLink = (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={() => setSearchQuery("")}
                    className={`flex items-center gap-2.5 mx-1.5 px-3 py-1.5 my-px rounded-md text-[13px] font-medium transition-all ${
                      collapsed ? "justify-center px-0 py-2.5" : "px-3 py-1.5"
                    } ${
                      active
                        ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      size={14}
                      className={`flex-shrink-0 ${active ? "text-[#6C1D5F]" : "text-slate-400"}`}
                    />
                    {!collapsed && (
                      <span className="flex-1 whitespace-nowrap">
                        {highlightText(item.title, searchQuery)}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-px rounded-full border ${
                          item.badgeAccent
                            ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );

                return collapsed ? (
                  <NavTooltip key={item.title} label={item.title}>
                    {renderItemLink}
                  </NavTooltip>
                ) : (
                  <div key={item.title}>{renderItemLink}</div>
                );
              })}
            </div>
          ))
        )}
      </nav>

      {/* ── User Footer ──────────────────────────── */}
      {!collapsed && (
        <div className="flex-shrink-0 border-t border-slate-200 p-3 bg-white">
          <Link to="/admin/profile" className="flex items-center gap-2.5 cursor-pointer rounded-md p-1 hover:bg-slate-50 transition-colors text-slate-800 hover:text-slate-900 no-underline">
            <img
              src={adminProfileIcon}
              alt="Admin"
              className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[12px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
                Admin
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Super Admin</div>
            </div>
            <ChevronsUpDown size={13} className="text-slate-400 flex-shrink-0" />
          </Link>
        </div>
      )}

      {/* Toggle button */}
      <div className={`border-t border-slate-200/80 py-2.5 ${collapsed ? "flex justify-center" : "px-2 bg-white"}`}>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={`
            flex items-center gap-2 rounded-xl text-[12px] font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-650
            transition-all cursor-pointer border-none outline-none
            ${collapsed ? "w-9 h-9 justify-center" : "w-full px-3.5 py-2"}
          `}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          {!collapsed && (
            <span className={`whitespace-nowrap transition-all duration-300`}>
              Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
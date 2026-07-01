import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  FolderTree,
  GraduationCap,
  BookOpen,
  Layers,
  Globe,
  Users,
  Award,
  ClipboardCheck,
  Calendar,
  Search,
  Settings,
  Shield,
  Puzzle,
  ChevronRight,
} from "lucide-react";

import logo from "../../assets/xebia-logo.png";
import adminProfileIcon from "../../assets/admin_profile_icon.svg";
import categoryService from "../../services/categoryService";
import courseService from "../../services/courseService";

export default function Sidebar() {
  const [categoryCount, setCategoryCount] = useState(null);
  const [courseCount, setCourseCount] = useState(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [cats, courses] = await Promise.all([
          categoryService.getAllCategories(),
          courseService.getAllCourses(),
        ]);
        setCategoryCount(cats ? cats.length : 0);
        setCourseCount(courses ? courses.length : 0);
      } catch (err) {
        console.error("Failed to fetch sidebar counts:", err);
      }
    }
    fetchCounts();
  }, []);

  const SECTIONS = [
    {
      label: "OVERVIEW",
      items: [
        { title: "Dashboard", path: "/", icon: LayoutDashboard, exact: true },
        { title: "Analytics", path: "/analytics", icon: BarChart2, badge: "" },
      ],
    },
    {
      label: "LEARN",
      items: [
        { title: "Categories", path: "/categories", icon: FolderTree, count: categoryCount },
        { title: "Courses", path: "/courses", icon: GraduationCap, count: courseCount },
        { title: "Modules", path: "/modules", icon: BookOpen },
        { title: "Content Builder", path: "/curriculum", icon: Layers },
        { title: "Learners", path: "/learners", icon: Users },
        { title: "Certifications", path: "/certifications", icon: Award },
        { title: "Assessments", path: "/assessments", icon: ClipboardCheck },
        { title: "Schedule", path: "/schedule", icon: Calendar },
      ],
    },
    {
      label: "SYSTEM",
      items: [
        { title: "SEO & Meta", path: "/seo", icon: Globe },
        { title: "Settings", path: "/settings", icon: Settings },
        { title: "Permissions", path: "/permissions", icon: Shield },
        { title: "Integrations", path: "/integrations", icon: Puzzle },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[220px] flex-col bg-[#1E0A2E] md:flex overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
          <img src={logo} alt="Xebia LMS" className="h-5 w-auto object-contain" />
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-none">Xebia LMS</p>
          <p className="text-white/40 text-[9px] font-medium leading-none mt-0.5">ADMIN PORTAL</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-white/8 rounded-lg px-3 py-2 border border-white/10">
          <Search size={13} className="text-white/40 flex-shrink-0" />
          <span className="text-white/30 text-[11px]">Search...</span>
        </div>
      </div>

      {/* Nav Sections */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5 scrollbar-none">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-[9px] font-bold text-white/30 tracking-widest uppercase px-2 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium transition-all group ${
                        isActive
                          ? "bg-white/15 text-white font-semibold shadow-sm"
                          : "text-white/55 hover:bg-white/8 hover:text-white/90"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={15}
                          className={isActive ? "text-[#E998D6]" : "text-white/40 group-hover:text-white/70"}
                        />
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[9px] font-bold bg-[#6C1D5F] text-white px-1.5 py-0.5 rounded-full leading-none">
                            {item.badge}
                          </span>
                        )}
                        {item.count != null && !item.badge && (
                          <span className="text-[9px] font-bold text-white/30 bg-white/10 px-1.5 py-0.5 rounded-full leading-none">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer — user card */}
      <div className="px-3 pb-4 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2.5 bg-white/8 rounded-xl px-3 py-2.5 border border-white/10">
          <img
            src={adminProfileIcon}
            alt="Admin"
            className="h-8 w-8 rounded-full flex-shrink-0 border border-white/20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-white truncate">Admin</p>
            <p className="text-[9px] text-white/40 truncate">admin@xebia.com</p>
          </div>
          <ChevronRight size={13} className="text-white/30 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
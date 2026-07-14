import { Bell, Search, HelpCircle, User, LogOut, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/shared/components/ui/dropdown-menu";
import adminProfileIcon from "../../assets/admin_profile_icon.svg";

const PATH_LABELS = {
  "/admin": "Dashboard",
  "/analytics/executive-summary": "Executive Summary",
  "/analytics/training-effectiveness": "Training Effectiveness",
  "/analytics/project-learning-investment": "Project Learning Investment",
  "/analytics/fresher-journey": "Fresher Journey",
  "/analytics/skill-gap": "Skill Gap",
  "/analytics/predictive-analytics": "Predictive Analytics",
  "/analytics/learning/coverage": "Learning Coverage",
  "/analytics/learning/hours": "Learning Hours",
  "/analytics/learning/categories": "Learning Categories",
  "/analytics/learning/trends": "Learning Trends",
  "/analytics/ai-transformation": "AI Transformation",
  "/analytics/certifications": "Certifications",
  "/analytics/flagship-programs": "Flagship Programs",
  "/analytics/learning-champions": "Learning Champions",
  "/analytics": "Analytics",
  "/categories": "Categories",
  "/courses": "Courses",
  "/module-management": "Module Management",
  "/content-library": "Content Library",
  "/learners": "Learners",
  "/certifications": "Certifications",
  "/assessments": "Assessments",
  "/schedule": "Schedule",
  "/seo": "SEO & Meta",
  "/settings": "Settings",
  "/permissions": "Permissions",
  "/integrations": "Integrations",
  "/support": "Support",
};

function getBreadcrumb(pathname) {
  // Match exact or prefix
  const label = Object.entries(PATH_LABELS).find(([key]) =>
    key !== "/admin" ? pathname.startsWith(key) : pathname === "/admin"
  );
  return label ? label[1] : "Page";
}

export default function Topbar() {
  const location = useLocation();
  const isManager = location.pathname.startsWith("/manager");
  const profileLink = isManager ? "/manager/profile" : "/admin/profile";
  const pageLabel = getBreadcrumb(location.pathname);

  return (
    <header className="sticky top-0 z-30 flex h-[52px] items-center justify-between border-b border-slate-200 bg-white px-8 flex-shrink-0">

      {/* ── Left: Header ─────────────────────── */}
      <div className="flex items-center gap-1.5">
        <span className="text-slate-900 font-bold text-[14px]">Xebia LMS</span>
      </div>

      {/* ── Right: Actions ───────────────────────── */}
      <div className="flex items-center gap-1.5">

        {/* Autosave pill */}
        <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium px-2.5 py-1 rounded-full border border-slate-200 bg-white">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          All changes saved
        </div>

        <div className="w-px h-[18px] bg-slate-200 mx-0.5" />

        {/* Search btn */}
        <button className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <Search size={14} />
        </button>

        {/* Bell btn */}
        <button className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 border-[1.5px] border-white" />
        </button>

        {/* Help btn */}
        <button className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <HelpCircle size={14} />
        </button>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src={adminProfileIcon}
              alt="Profile"
              className="w-[30px] h-[30px] rounded-full object-cover border-2 border-slate-200 ml-1 cursor-pointer outline-none"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-md rounded-lg p-1 min-w-[150px] z-50">
            <DropdownMenuItem asChild className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer">
              <Link to={profileLink} className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700">
                <User size={14} />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer">
              <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700">
                <Settings size={14} />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="focus:bg-rose-50 focus:text-rose-600 rounded-lg cursor-pointer">
              <Link to="/login" className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-rose-600 hover:text-rose-650">
                <LogOut size={14} />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";
import adminProfileIcon from "../../assets/admin_profile_icon.svg";

const PATH_METADATA = {
  "/trainer": {
    title: "Trainer Dashboard",
    breadcrumb: "Dashboard",
    description: "Welcome back, Instructor!",
  },
  "/trainer/assignments": {
    title: "Assignments Workspace",
    breadcrumb: "Assignments",
    description: "Manage, publish, and track homework assignments.",
  },
  "/trainer/quizzes": {
    title: "Quiz Center",
    breadcrumb: "Quizzes",
    description: "Create, import, and monitor knowledge checks.",
  },
  "/trainer/batches": {
    title: "Batch Management",
    breadcrumb: "Batches",
    description: "Configure student cohorts and course mappings.",
  },
  "/trainer/gradebook": {
    title: "Gradebook",
    breadcrumb: "Gradebook",
    description: "Evaluate submissions and track performance metrics.",
  },
};

export default function TrainerTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* ── Resolve current page metadata ── */
  const currentPath =
    location.pathname.endsWith("/") && location.pathname !== "/trainer/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

  const resolveMeta = (path) => {
    if (PATH_METADATA[path]) return PATH_METADATA[path];

    if (path.startsWith("/trainer/assignments/create") || path.startsWith("/trainer/assignments/edit")) {
      return { title: "Create Assignment", breadcrumb: "Assignments / Create", description: "Design a new coursework activity." };
    }
    if (path.startsWith("/trainer/assignments/review")) {
      return { title: "Submission Review", breadcrumb: "Assignments / Review", description: "Review and evaluate student work." };
    }
    if (path.startsWith("/trainer/quizzes/import")) {
      return { title: "Import Quiz Questions", breadcrumb: "Quizzes / Import", description: "Upload question banks via Excel." };
    }
    if (path.startsWith("/trainer/batches/create") || path.startsWith("/trainer/batches/edit")) {
      return { title: "Configure Batch", breadcrumb: "Batches / Configure", description: "Set up and manage a student cohort." };
    }

    return { title: "Trainer Workspace", breadcrumb: "Workspace", description: "" };
  };

  const meta = resolveMeta(currentPath);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const handler = () => setScrolled(main.scrollTop > 2);
    main.addEventListener("scroll", handler, { passive: true });
    return () => main.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 flex h-14 items-center border-b bg-white px-4 md:px-6 flex-shrink-0 transition-shadow duration-200 ${
        scrolled
          ? "border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]"
          : "border-slate-200/80"
      }`}
    >
      {/* ── Left: Breadcrumb + Title ── */}
      <div className="flex flex-col min-w-0 shrink-0 mr-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 leading-none">
          <span>Trainer Portal</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#6C1D5F] font-semibold truncate">
            {meta.breadcrumb}
          </span>
        </div>
        {/* Title + description */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <h1 className="text-[15px] font-bold text-slate-800 leading-tight truncate">
            {meta.title}
          </h1>
          {meta.description && (
            <span className="hidden xl:inline text-[11px] text-slate-400 font-medium border-l border-slate-200 pl-2 truncate">
              {meta.description}
            </span>
          )}
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-1.5 ml-auto shrink-0">
        {/* Autosave status indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold px-2.5 py-1 rounded-full border border-slate-100 bg-slate-50/50">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
          Workspace Sync Online
        </div>

        <Separator orientation="vertical" className="hidden sm:block h-5 mx-1" />

        {/* ── Profile dropdown ── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-slate-50 transition-colors cursor-pointer outline-none select-none border-none bg-transparent">
              <Avatar className="h-7 w-7">
                <AvatarImage src={adminProfileIcon} alt="Lead Instructor" />
                <AvatarFallback className="text-xs bg-[#6C1D5F] text-white">LI</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start leading-tight">
                <span className="text-[12.5px] font-semibold text-slate-700">Lead Instructor</span>
                <span className="text-[10.5px] text-[#6C1D5F] font-bold">Trainer</span>
              </div>
              <ChevronDown size={12} className="text-slate-400 hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl shadow-lg border border-slate-200 p-1"
          >
            <div className="px-3 py-2.5">
              <p className="text-[13px] font-bold text-slate-800">Lead Instructor</p>
              <p className="text-[11px] text-slate-400 mt-0.5">instructor@xebia.com</p>
            </div>
            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem asChild className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer">
              <Link to="/trainer" className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700">
                <User size={14} />
                My Workspace
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer">
              <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700">
                <Settings size={14} />
                Workspace Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem asChild className="focus:bg-rose-50 focus:text-rose-600 rounded-lg cursor-pointer">
              <Link to="/login" className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700 hover:text-rose-600">
                <LogOut size={14} className="text-rose-500" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

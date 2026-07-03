import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  Boxes,
  Network,
  FileText,
  Settings,
  CircleHelp,
  BarChart3,
  Briefcase,
  GraduationCap,
  Target,
  LineChart,
  LayoutTemplate,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Executive Summary",
    path: "/executive-summary",
    icon: LayoutDashboard,
  },
  {
    title: "Training Effectiveness",
    path: "/training-effectiveness",
    icon: BarChart3,
  },
  {
    title: "Project Learning Investment",
    path: "/project-learning-investment",
    icon: Briefcase,
  },
  {
    title: "Fresher Journey",
    path: "/fresher-journey",
    icon: GraduationCap,
  },
  {
    title: "Skill Gap",
    path: "/skill-gap",
    icon: Target,
  },
  {
    title: "Predictive Analytics",
    path: "/predictive-analytics",
    icon: LineChart,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: FolderTree,
  },
  {
    title: "Courses",
    path: "/courses",
    icon: BookOpen,
  },
  {
    title: "Module Management",
    path: "/module-management",
    icon: Boxes,
  },
  {
    title: "Curriculum Builder",
    path: "/curriculum",
    icon: LayoutTemplate,
  },
  {
    title: "Sub Modules",
    path: "/submodules",
    icon: Network,
  },
  {
    title: "Content",
    path: "/content",
    icon: FileText,
  },
];

export const footerItems = [
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    path: "/support",
    icon: CircleHelp,
  },
];

export default menuItems;
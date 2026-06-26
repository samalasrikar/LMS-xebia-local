import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  Boxes,
  Network,
  FileText,
  Settings,
  CircleHelp,
} from "lucide-react";

const menuItems = [
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
    icon: BookOpen,
  },
  {
    title: "Modules",
    path: "/modules",
    icon: Boxes,
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
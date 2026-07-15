import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import Topbar from "./Topbar";

const STORAGE_KEY = "lms-manager-sidebar-collapsed";

export default function ManagerLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
    } catch { /* ignore */ }
  }, [collapsed]);

  const marginLeft = collapsed ? "md:ml-[60px]" : "md:ml-[240px]";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <ManagerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${marginLeft} flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out`}>
        <Topbar />
        <main className="flex-1 overflow-y-auto p-7 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

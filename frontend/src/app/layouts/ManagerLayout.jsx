import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import Topbar from "./Topbar";

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <ManagerSidebar />

      <div className="md:ml-[220px] flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-7 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

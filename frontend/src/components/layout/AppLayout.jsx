import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      <Sidebar />

      <div className="md:ml-[220px] flex flex-col flex-1 min-w-0">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-7 xl:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
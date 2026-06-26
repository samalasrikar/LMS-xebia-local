import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="md:ml-[250px]">

        <Navbar />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>
  );
}
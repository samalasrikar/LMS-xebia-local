import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F8FC]">

      <Sidebar />

      <div className="md:ml-[220px]">

        <Navbar />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );
}
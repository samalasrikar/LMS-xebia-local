import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

export default function EnrollmentChart() {
  const [period, setPeriod] = useState("Monthly");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const response =
        await dashboardService.getEnrollmentAnalytics(period);

      setChartData(response || []);
    } catch (error) {
      console.error("Failed to load enrollment analytics:", error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const labels = chartData.map((item) => item.label);

  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#d5c1cc] flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#6C1D5F]">
            Enrollment Analytics
          </h3>
          <p className="text-sm text-[#51434c]">
            Tracking growth across all learning sectors
          </p>
        </div>

        <div className="bg-[#f5f3f3] p-1 rounded-xl flex gap-1">
          {["Weekly", "Monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                period === p
                  ? "bg-white shadow-sm text-[#6C1D5F] font-bold"
                  : "text-[#51434c] hover:bg-white/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[250px]">
        {loading ? (
          <p className="text-[#83727c]">Loading analytics...</p>
        ) : chartData.length === 0 ? (
          <p className="text-[#83727c]">No analytics data available</p>
        ) : (
          <div className="w-full">
            {/* Replace with Recharts/ApexCharts when API is ready */}
            <div className="grid grid-cols-7 gap-3 items-end">
              {chartData.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className="w-full bg-gradient-to-t from-[#6C1D5F] to-[#84117C] rounded-t-lg transition-all duration-300 hover:scale-x-105 hover:brightness-110 shadow-sm relative group cursor-pointer"
                    style={{
                      height: `${Math.max(12, item.value)}px`,
                    }}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                      {item.value} Learners
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {labels.length > 0 && (
        <div className="flex justify-between mt-3 px-2 text-[10px] text-[#83727c] font-bold uppercase tracking-widest">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}
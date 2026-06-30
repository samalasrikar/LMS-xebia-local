import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

      console.log("Enrollment API Response:", response);

      setChartData(response || []);
    } catch (error) {
      console.error(
        "Failed to load enrollment analytics:",
        error
      );

      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Toggle Buttons */}
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

      {/* Chart Section */}
      <div className="flex-1 min-h-[320px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#83727c]">
              Loading analytics...
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#83727c]">
              No analytics data available
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#ece7eb"
              />

              {/* X Axis */}
              <XAxis
                dataKey="month"
                tick={{
                  fill: "#83727c",
                  fontSize: 12,
                  fontWeight: 600,
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y Axis */}
              <YAxis
                tick={{
                  fill: "#83727c",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{ fill: "rgba(108,29,95,0.08)" }}
              />

              {/* Bars */}
              <Bar
                dataKey="enrollments"
                fill="#6C1D5F"
                radius={[8, 8, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
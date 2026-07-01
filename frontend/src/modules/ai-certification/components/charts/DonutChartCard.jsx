import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import NoDataCard from "../NoDataCard";

const DEFAULT_COLORS = ["#6C1D5F", "#84117C", "#01AC9F", "#FF6200", "#5C4F61", "#9D92B2"];

export default function DonutChartCard({
  title,
  subtitle,
  data = [],
  nameKey = "name",
  valueKey = "value",
  colors = DEFAULT_COLORS,
  height = 300
}) {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr[valueKey] || 0), 0);
  }, [data, valueKey]);

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col justify-between h-full relative">
      <div className="mb-4">
        <h4 className="text-sm font-extrabold text-[#6C1D5F]">{title}</h4>
        {subtitle && <p className="text-xs text-[#83727c] font-medium mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex-1 min-h-[220px] relative" style={{ height }}>
        {data.length === 0 ? (
          <NoDataCard />
        ) : (
          <>
            {/* Inner text showing total in the donut center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-[#83727c]">Total</span>
              <span className="text-xl font-extrabold text-[#6C1D5F]">{totalValue.toLocaleString()}</span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d5c1cc",
                    borderRadius: "12px",
                    boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)"
                  }}
                  itemStyle={{ fontSize: "12px", fontWeight: 600 }}
                />
                <Pie
                  data={data}
                  dataKey={valueKey}
                  nameKey={nameKey}
                  cx="50%"
                  cy="55%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  fill="#6C1D5F"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
}

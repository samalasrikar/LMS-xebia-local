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

// Premium color palette aligned with Xebia theme
const DEFAULT_COLORS = ["#6C1D5F", "#84117C", "#01AC9F", "#FF6200", "#5C4F61", "#9D92B2"];

export default function PieChartCard({
  title,
  subtitle,
  data = [],
  nameKey = "name",
  valueKey = "value",
  colors = DEFAULT_COLORS,
  height = 300
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col justify-between h-full">
      <div className="mb-4">
        <h4 className="text-sm font-extrabold text-[#6C1D5F]">{title}</h4>
        {subtitle && <p className="text-xs text-[#83727c] font-medium mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex-1 min-h-[220px]" style={{ height }}>
        {data.length === 0 ? (
          <NoDataCard />
        ) : (
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
                cy="50%"
                outerRadius={80}
                fill="#6C1D5F"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={{ stroke: "#d5c1cc", strokeWidth: 1 }}
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
        )}
      </div>
    </div>
  );
}

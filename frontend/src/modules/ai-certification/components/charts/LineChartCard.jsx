import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import NoDataCard from "../NoDataCard";

export default function LineChartCard({
  title,
  subtitle,
  data = [],
  xKey = "month",
  lines = [], // array of { key: string, color: string, name: string }
  height = 300
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col justify-between h-full">
      <div className="mb-6">
        <h4 className="text-sm font-extrabold text-[#6C1D5F]">{title}</h4>
        {subtitle && <p className="text-xs text-[#83727c] font-medium mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex-1 min-h-[220px]" style={{ height }}>
        {data.length === 0 ? (
          <NoDataCard />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ece7eb" />
              <XAxis
                dataKey={xKey}
                tick={{ fill: "#83727c", fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#83727c", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d5c1cc",
                  borderRadius: "12px",
                  boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)"
                }}
                itemStyle={{ fontSize: "12px", fontWeight: 600 }}
                labelStyle={{ fontSize: "11px", color: "#83727c", fontWeight: 700 }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", fontWeight: 600, color: "#51434c" }}
              />
              {lines.map((line, idx) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name || line.key}
                  stroke={line.color || "#6C1D5F"}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

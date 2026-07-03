import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, HelpCircle } from "lucide-react";

export default function AIKPICard({ title, value, icon: Icon, trend, tooltip, suffix = "", prefix = "" }) {
  const isDown = trend && String(trend).startsWith("-");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        bg-white p-6 rounded-3xl border border-[#d5c1cc]/80
        shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)]
        hover:shadow-[0_12px_24px_-10px_rgba(108,29,95,0.15)]
        transition-shadow duration-200 flex flex-col justify-between h-full relative overflow-hidden group
      "
    >
      {/* Decorative top accent line using brand gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6C1D5F] to-[#84117C]" />

      <div className="flex justify-between items-start mb-3">
        <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] rounded-2xl group-hover:bg-[#6C1D5F] group-hover:text-white transition-all duration-300">
          <Icon size={20} />
        </div>

        {trend && (
          <span
            className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              isDown
                ? "bg-[#ffdad6] text-[#ba1a1a]"
                : "bg-[#01AC9F]/10 text-[#01AC9F]"
            }`}
          >
            {isDown ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
            {trend}
          </span>
        )}
      </div>

      <div className="space-y-1 mt-2">
        <div className="flex items-center gap-1.5 text-[#51434c] text-xs font-bold">
          <span>{title}</span>
          {tooltip && (
            <div className="group/tip relative cursor-help">
              <HelpCircle size={12} className="text-[#83727c]/70 hover:text-[#6C1D5F]" />
              <div className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white
                text-[10px] rounded-lg opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible
                transition-all duration-200 z-50 shadow-md font-normal leading-normal text-center
              ">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        
        <p className="text-3xl font-extrabold text-[#6C1D5F] tracking-tight">
          {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
        </p>
      </div>
    </motion.div>
  );
}

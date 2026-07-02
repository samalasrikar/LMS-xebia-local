import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, AlertTriangle, ShieldCheck, Percent } from "lucide-react";

export default function CertificationCard({ title, value, type = "default", suffix = "" }) {
  const getIcon = () => {
    switch (type) {
      case "total": return <Award size={20} className="text-[#6C1D5F]" />;
      case "active": return <ShieldCheck size={20} className="text-[#01AC9F]" />;
      case "expired": return <AlertTriangle size={20} className="text-[#ba1a1a]" />;
      case "rate": return <Percent size={20} className="text-[#FF6200]" />;
      default: return <CheckCircle size={20} className="text-slate-500" />;
    }
  };

  const getBg = () => {
    switch (type) {
      case "total": return "bg-[#6C1D5F]/10 border-l-4 border-l-[#6C1D5F]";
      case "active": return "bg-[#01AC9F]/10 border-l-4 border-l-[#01AC9F]";
      case "expired": return "bg-[#ba1a1a]/10 border-l-4 border-l-[#ba1a1a]";
      case "rate": return "bg-[#FF6200]/10 border-l-4 border-l-[#FF6200]";
      default: return "bg-slate-50 border-l-4 border-l-slate-400";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        bg-white p-5 rounded-2xl border border-[#d5c1cc]/80
        shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)]
        hover:shadow-[0_12px_24px_-10px_rgba(108,29,95,0.15)]
        transition-all duration-200 flex items-center justify-between gap-4 h-full
        ${getBg()}
      `}
    >
      <div className="space-y-1">
        <p className="text-[#51434c] text-xs font-bold uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-extrabold text-slate-800 tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </p>
      </div>
      <div className="p-3 bg-white/80 rounded-xl shadow-sm border border-slate-100">
        {getIcon()}
      </div>
    </motion.div>
  );
}

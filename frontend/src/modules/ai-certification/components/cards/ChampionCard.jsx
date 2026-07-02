import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, CheckCircle, ShieldAlert } from "lucide-react";

export default function ChampionCard({ title, value, type = "default", suffix = "" }) {
  const getIcon = () => {
    switch (type) {
      case "learners": return <BookOpen size={18} className="text-[#6C1D5F]" />;
      case "champions": return <Award size={18} className="text-[#01AC9F]" />;
      case "certified": return <CheckCircle size={18} className="text-[#84117C]" />;
      case "awards": return <ShieldAlert size={18} className="text-[#FF6200]" />;
      default: return <Award size={18} className="text-slate-500" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case "learners": return "from-[#6C1D5F]/5 to-[#6C1D5F]/10 text-[#6C1D5F]";
      case "champions": return "from-[#01AC9F]/5 to-[#01AC9F]/10 text-[#01AC9F]";
      case "certified": return "from-[#84117C]/5 to-[#84117C]/10 text-[#84117C]";
      case "awards": return "from-[#FF6200]/5 to-[#FF6200]/10 text-[#FF6200]";
      default: return "from-slate-50 to-slate-100/50 text-slate-700";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        p-6 rounded-3xl border border-[#d5c1cc]/80 bg-gradient-to-br ${getGradient()}
        shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)]
        hover:shadow-[0_12px_24px_-10px_rgba(108,29,95,0.15)]
        transition-all duration-200 flex items-center gap-5 h-full
      `}
    >
      <div className="p-3.5 bg-white rounded-2xl shadow-sm flex-shrink-0">
        {getIcon()}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
        <p className="text-3xl font-black mt-1 tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </p>
      </div>
    </motion.div>
  );
}

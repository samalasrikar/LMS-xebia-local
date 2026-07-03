import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, Users, Hourglass, Award } from "lucide-react";

export default function ProgramCard({ title, value, type = "default", suffix = "" }) {
  const getIcon = () => {
    switch (type) {
      case "programs": return <BookOpen size={18} className="text-[#6C1D5F]" />;
      case "active": return <Award size={18} className="text-[#01AC9F]" />;
      case "participants": return <Users size={18} className="text-[#84117C]" />;
      case "hours": return <Hourglass size={18} className="text-[#FF6200]" />;
      case "rating": return <Star size={18} className="fill-amber-400 text-amber-400" />;
      default: return <BookOpen size={18} className="text-slate-500" />;
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case "programs": return "border-t-4 border-t-[#6C1D5F]";
      case "active": return "border-t-4 border-t-[#01AC9F]";
      case "participants": return "border-t-4 border-t-[#84117C]";
      case "hours": return "border-t-4 border-t-[#FF6200]";
      case "rating": return "border-t-4 border-t-amber-400";
      default: return "border-t-4 border-t-slate-400";
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
        transition-all duration-200 flex flex-col justify-between gap-3 h-full
        ${getAccentColor()}
      `}
    >
      <div className="flex justify-between items-start">
        <p className="text-[#51434c] text-xs font-bold uppercase tracking-wider">{title}</p>
        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
          {getIcon()}
        </div>
      </div>
      <div>
        <p className="text-2xl font-extrabold text-[#6C1D5F]">
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </p>
      </div>
    </motion.div>
  );
}

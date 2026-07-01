import React from "react";
import { Link, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

export default function CategoryDetailHero({
  cat,
  ACCENT,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-left">
      {/* Color accent bar */}
      <div className="h-1" style={{ background: ACCENT }} />
      <div className="p-5 flex items-start gap-4">
        {/* Emoji box */}
        <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-3xl flex-shrink-0">⚙️</div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <span className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">{cat.name}</span>
            <Badge className="bg-emerald-100 text-emerald-700 border-transparent gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              Active
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400 mb-2.5">
            <Link size={12} />
            <span>/categories/</span>
            <span className="text-[#6C1D5F] font-medium">{cat.slug || "backend-engineering"}</span>
          </div>
          <div className="text-[13.5px] text-slate-500 leading-relaxed mb-3 w-full">{cat.description}</div>
          <div className="flex flex-wrap gap-1.5">
            {["Java","Spring Boot","Node.js","REST APIs","Microservices","PostgreSQL"].map((t) => (
              <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[12px] font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Aside */}
        <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
            <div className="w-3.5 h-3.5 rounded-[3px]" style={{ background: ACCENT }} />
            <span className="text-[12.5px] font-bold text-slate-700 font-mono">{ACCENT}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400">
            <Clock size={12} />
            Updated 2 days ago
          </div>
        </div>
      </div>
    </div>
  );
}

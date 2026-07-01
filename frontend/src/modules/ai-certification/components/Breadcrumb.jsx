import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-[#83727c]">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#6C1D5F] transition-colors"
      >
        <Home size={13} />
        <span>LMS</span>
      </Link>

      <ChevronRight size={12} className="text-slate-300" />
      <span className="hover:text-[#6C1D5F] transition-colors">Analytics</span>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <ChevronRight size={12} className="text-slate-300" />
            {isLast ? (
              <span className="text-[#6C1D5F] font-bold">{item.label}</span>
            ) : (
              <Link
                to={item.path || "#"}
                className="hover:text-[#6C1D5F] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

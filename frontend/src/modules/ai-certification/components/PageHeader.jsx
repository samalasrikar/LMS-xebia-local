import React from "react";
import Breadcrumb from "./Breadcrumb";

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  extraActions,
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-[#d5c1cc]/40 pb-5">
      
      <div className="space-y-1.5 flex-1 min-w-0">
        <Breadcrumb items={breadcrumbs} />

        <h1 className="text-2xl md:text-3xl font-extrabold text-[#6C1D5F] tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-[#51434c] font-medium max-w-[42rem] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {extraActions && (
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3 shrink-0">
          {extraActions}
        </div>
      )}
    </div>
  );
}
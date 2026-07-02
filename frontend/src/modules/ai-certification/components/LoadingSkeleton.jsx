import React from "react";

export default function LoadingSkeleton({ type = "dashboard" }) {
  const shimmerClass = "animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%] bg-slate-100 rounded-2xl";

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-32 flex flex-col justify-between">
            <div className={`h-8 w-8 ${shimmerClass}`} />
            <div className="space-y-2">
              <div className={`h-3 w-16 ${shimmerClass}`} />
              <div className={`h-6 w-24 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "charts") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className={`h-5 w-40 ${shimmerClass}`} />
              <div className={`h-3 w-64 ${shimmerClass}`} />
            </div>
            <div className={`flex-1 mt-6 w-full ${shimmerClass}`} />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div className={`h-5 w-40 ${shimmerClass}`} />
          <div className={`h-8 w-48 ${shimmerClass}`} />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className={`h-10 w-10 rounded-full ${shimmerClass}`} />
              <div className="flex-1 space-y-2">
                <div className={`h-4 w-full ${shimmerClass}`} />
                <div className={`h-3 w-2/3 ${shimmerClass}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Complete Dashboard skeleton (default)
  return (
    <div className="space-y-8">
      {/* Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-32 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className={`h-10 w-10 ${shimmerClass}`} />
              <div className={`h-4 w-12 ${shimmerClass}`} />
            </div>
            <div className="space-y-1.5">
              <div className={`h-3 w-20 ${shimmerClass}`} />
              <div className={`h-6 w-16 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-[380px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className={`h-5 w-48 ${shimmerClass}`} />
            <div className={`h-3.5 w-72 ${shimmerClass}`} />
          </div>
          <div className={`flex-1 mt-6 w-full ${shimmerClass}`} />
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-[380px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className={`h-5 w-32 ${shimmerClass}`} />
            <div className={`h-3.5 w-48 ${shimmerClass}`} />
          </div>
          <div className={`flex-1 mt-6 w-full ${shimmerClass}`} />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 space-y-4 h-[350px] flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className={`h-5 w-36 ${shimmerClass}`} />
          <div className={`h-9 w-40 ${shimmerClass}`} />
        </div>
        <div className="flex-1 mt-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <div className={`h-4 ${shimmerClass}`} />
              <div className={`h-4 ${shimmerClass}`} />
              <div className={`h-4 ${shimmerClass}`} />
              <div className={`h-4 ${shimmerClass}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

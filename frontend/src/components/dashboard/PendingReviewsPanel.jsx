const REVIEWS = [];

export default function PendingReviewsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Pending Reviews</h3>
        <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
          0 pending
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center py-6">
        <p className="text-xs text-slate-400 text-center">No reviews pending.</p>
      </div>
      <button className="mt-auto w-full py-2 rounded-xl text-[11px] font-semibold text-[#6C1D5F] bg-[#6C1D5F]/5 hover:bg-[#6C1D5F]/12 transition-colors cursor-pointer">
        View All Reviews
      </button>
    </div>
  );
}

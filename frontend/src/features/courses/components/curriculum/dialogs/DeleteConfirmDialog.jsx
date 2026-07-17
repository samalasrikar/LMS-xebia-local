import React from "react";
import { AlertCircle } from "lucide-react";

export default function DeleteConfirmDialog({
    deleteTarget,
    setDeleteTarget,
    confirmDelete,
}) {
    if (!deleteTarget) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                        <AlertCircle size={20} className="text-red-600" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-slate-800 text-[14px] leading-tight">
                            Delete {deleteTarget.type === "module" ? "Module" : "Block"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">This action cannot be undone.</p>
                    </div>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 text-left">
                    Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>
                    {deleteTarget.type === "module" ? " and all its blocks?" : "?"}
                </p>
                <div className="flex justify-end gap-2.5 pt-1">
                    <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-[12px] font-semibold hover:bg-slate-50 transition-colors cursor-pointer bg-transparent">
                        Cancel
                    </button>
                    <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl text-[12px] font-bold shadow-sm transition-colors cursor-pointer border-none">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

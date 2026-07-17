import React from "react";
import { AlertCircle, HelpCircle, CheckCircle2, X } from "lucide-react";

export default function ToastNotification({
    toast,
    setToast,
}) {
    if (!toast) return null;

    return (
        <div className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border animate-in slide-in-from-bottom-2 duration-300 ${toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : toast.type === "info"
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}>
            {toast.type === "error"
                ? <AlertCircle size={14} className="shrink-0" />
                : toast.type === "info"
                    ? <HelpCircle size={14} className="shrink-0" />
                    : <CheckCircle2 size={14} className="shrink-0" />
            }
            <span className="text-[13px] font-semibold">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="ml-1 text-current opacity-50 hover:opacity-100 cursor-pointer bg-transparent border-none">
                <X size={12} />
            </button>
        </div>
    );
}

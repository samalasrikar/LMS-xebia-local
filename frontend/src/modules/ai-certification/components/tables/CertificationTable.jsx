import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";

export default function CertificationTable({
  certifications = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  return (
    <div className="bg-white rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F8FC] border-b border-[#d5c1cc]/50 text-xs font-bold text-[#83727c]">
              <th className="py-4 px-6 text-[#6C1D5F]">Certification</th>
              <th className="py-4 px-4">Employee</th>
              <th className="py-4 px-4">Provider</th>
              <th className="py-4 px-4">Department & Region</th>
              <th className="py-4 px-4 text-center">Issue / Expiry Date</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d5c1cc]/30 text-sm">
            {certifications.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#83727c] font-medium">
                  No certifications match the selected filters.
                </td>
              </tr>
            ) : (
              certifications.map((cert) => {
                const isActive = cert.status === "Active";

                return (
                  <tr
                    key={cert.id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-extrabold text-slate-800">
                      <div>
                        <p>{cert.name}</p>
                        <span className="inline-flex text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded mt-0.5">
                          {cert.level}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-700">
                      {cert.employeeName}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center text-xs font-bold text-slate-600 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {cert.provider}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-700 text-xs">{cert.department}</p>
                      <p className="text-[10px] text-[#83727c] font-semibold">{cert.region}</p>
                    </td>
                    <td className="py-4 px-4 text-center text-xs font-semibold text-[#51434c]">
                      <p>Issue: {cert.date}</p>
                      <p className="text-[#83727c]">Expiry: {cert.expiry}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full border ${
                          isActive
                            ? "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20"
                            : "bg-[#ba1a1a]/10 text-[#ba1a1a] border-[#ba1a1a]/20"
                        }`}
                      >
                        {isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {cert.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-[#F7F8FC] border-t border-[#d5c1cc]/50">
          <p className="text-xs text-[#83727c] font-semibold">
            Page <span className="font-bold text-[#6C1D5F]">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="
                p-1.5 rounded-xl border border-[#d5c1cc] bg-white text-[#83727c] hover:bg-slate-50
                disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer
              "
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
                p-1.5 rounded-xl border border-[#d5c1cc] bg-white text-[#83727c] hover:bg-slate-50
                disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

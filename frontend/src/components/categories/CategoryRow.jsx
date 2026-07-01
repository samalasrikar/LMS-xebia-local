import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, GraduationCap } from "lucide-react";

export default function CategoryRow({ cat, onView, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      {/* Image */}
      <td className="px-6 py-4">
        <div className="w-12 h-12 rounded-lg bg-[#F7F8FC] overflow-hidden border border-slate-100 shadow-sm">
          <img
            className={`w-full h-full object-cover ${
              cat.status === "Inactive" ? "grayscale opacity-80" : ""
            }`}
            src={cat.image}
            alt={cat.name}
          />
        </div>
      </td>

      {/* Name — clickable → detail page */}
      <td className="px-6 py-4">
        <button
          onClick={() => navigate(`/categories/${cat.dbId}`)}
          className="text-left hover:text-[#6C1D5F] transition-colors"
        >
          <span className="font-bold text-xs text-slate-800 block hover:text-[#6C1D5F]">{cat.name}</span>
          <span className="text-[10px] text-slate-400 mt-0.5">ID: {cat.id}</span>
        </button>
      </td>

      {/* Description */}
      <td className="px-6 py-4 max-w-xs">
        <p className="text-xs text-slate-500 line-clamp-1">{cat.description}</p>
      </td>

      {/* Courses */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-slate-700">
          <GraduationCap size={15} className="text-[#6C1D5F]" />
          <span className="text-xs font-bold">{cat.courses}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
            cat.status === "Active"
              ? "bg-[#01AC9F]/10 text-[#01AC9F] border-[#01AC9F]/20"
              : "bg-red-50 text-red-600 border-red-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              cat.status === "Active" ? "bg-[#01AC9F]" : "bg-red-500"
            }`}
          />
          {cat.status}
        </span>
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-xs text-slate-500">{cat.created}</td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => navigate(`/categories/${cat.dbId}`)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#6C1D5F] cursor-pointer"
            title="View detail"
          >
            <Eye size={14} />
          </button>
          <button
            type="button"
            onClick={() => onEdit(cat)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#6C1D5F] cursor-pointer"
          >
            <Edit size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(cat)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
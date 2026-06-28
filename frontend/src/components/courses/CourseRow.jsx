import { useNavigate } from "react-router-dom";
import { Edit, Users, Trash2, BookOpen } from "lucide-react";

export default function CourseRow({ course, onDelete }) {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4">
        <img alt={course.title} className="w-14 h-9 rounded-lg object-cover" src={course.thumbnail} />
      </td>
      <td className="px-6 py-4">
        <div className="font-bold text-slate-800 text-xs">{course.title}</div>
        <div className="text-[10px] text-slate-400 mt-0.5">ID: {course.id}</div>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-1 bg-[#F7F8FC] text-[#6C1D5F] text-[10px] font-bold rounded-full">
          {course.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => navigate(`/courses/${course.dbId}/curriculum`)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#6C1D5F]/8 hover:bg-[#6C1D5F]/15 text-[#6C1D5F] text-[10px] font-bold rounded-full transition-all cursor-pointer whitespace-nowrap"
          title="Open Curriculum Builder"
        >
          <BookOpen size={11} />
          Curriculum
        </button>
      </td>
      <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">{course.duration}</td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
          <span className={`w-1.5 h-1.5 rounded-full ${course.difficulty === "Beginner" ? "bg-green-500" :
            course.difficulty === "Intermediate" ? "bg-amber-500" : "bg-red-500"
            }`} />
          {course.difficulty}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${course.status === "Published"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
          {course.status}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-slate-500">{course.createdDate}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => navigate(`/courses/${course.dbId}/edit`)}
            className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => navigate(`/courses/${course.dbId}/curriculum`)}
            className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
            title="Curriculum Builder"
          >
            <BookOpen size={14} />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-all cursor-pointer" title="View Students">
            <Users size={14} />
          </button>
          <button
            onClick={() => onDelete(course)}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

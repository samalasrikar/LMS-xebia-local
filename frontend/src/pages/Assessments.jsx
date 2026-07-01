import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import assessmentService from "../services/assessmentService";
import { ClipboardCheck, Plus, Edit2, Trash2, X, Save, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", timeLimit: "30", passingScore: "70", type: "Multiple Choice" });
  const [submitting, setSubmitting] = useState(false);
  
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    setLoading(true);
    try {
      const data = await assessmentService.getAll();
      setAssessments(data || []);
    } catch (_) {
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const openAddModal = () => {
    setEditingAssessment(null);
    setForm({ title: "", description: "", timeLimit: "30", passingScore: "70", type: "Multiple Choice" });
    setIsModalOpen(true);
  };

  const openEditModal = (assessment) => {
    setEditingAssessment(assessment);
    setForm({
      title: assessment.title || "",
      description: assessment.description || "",
      timeLimit: assessment.timeLimit?.toString() || "30",
      passingScore: assessment.passingScore?.toString() || "70",
      type: assessment.type || "Multiple Choice"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingAssessment) {
        const updated = await assessmentService.update(editingAssessment.id, form);
        setAssessments(prev => prev.map(a => a.id === editingAssessment.id ? (updated || { ...a, ...form }) : a));
        showToast("Assessment updated successfully!");
      } else {
        const created = await assessmentService.create(form);
        setAssessments(prev => [...prev, created || { id: Date.now(), ...form }]);
        showToast("Assessment created successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingAssessment) {
        setAssessments(prev => prev.map(a => a.id === editingAssessment.id ? { ...a, ...form } : a));
        showToast("Assessment updated locally (API unavailable).", "info");
      } else {
        setAssessments(prev => [...prev, { id: Date.now(), ...form }]);
        showToast("Assessment created locally (API unavailable).", "info");
      }
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await assessmentService.delete(deleteTarget.id);
    } catch (_) {}
    setAssessments(prev => prev.filter(a => a.id !== deleteTarget.id));
    showToast("Assessment removed.");
    setDeleteTarget(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
        
        {toast && (
          <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 ${
            toast.type === "success" ? "bg-green-50 text-green-800 border border-green-200" :
            toast.type === "info" ? "bg-blue-50 text-blue-800 border border-blue-200" :
            "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {toast.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            {toast.msg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Assessments</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Design quizzes, exams, and practical challenges to evaluate student performance.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus size={14} /> Create Quiz
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex items-center justify-center text-slate-400 text-xs">
            Loading assessments...
          </div>
        ) : assessments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <ClipboardCheck size={24} className="text-blue-600" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">No assessments created</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Set up quiz questions, time limits, and passing criteria to test learners.
            </p>
            <button
              onClick={openAddModal}
              className="mt-6 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Create First Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{item.title}</h3>
                    <span className="shrink-0 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">{item.description || "No description provided."}</p>
                </div>
                <div className="px-5 py-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      <Clock size={12} className="text-slate-400" />
                      {item.timeLimit} min
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      <CheckCircle size={12} className="text-slate-400" />
                      {item.passingScore}% pass
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[448px] max-w-md shrink-0 border border-slate-200 flex flex-col my-8">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingAssessment ? "Edit Assessment" : "Create Assessment"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Assessment Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Mid-term Frontend Quiz"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Brief description of the assessment..."
                    rows={2}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] resize-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                  >
                    <option>Multiple Choice</option>
                    <option>Free Text / Essay</option>
                    <option>Coding Challenge</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Time Limit (mins)</label>
                    <input
                      type="number"
                      min="0"
                      value={form.timeLimit}
                      onChange={e => setForm(p => ({ ...p, timeLimit: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Passing Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={form.passingScore}
                      onChange={e => setForm(p => ({ ...p, passingScore: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] disabled:bg-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <Save size={14} />
                  {submitting ? "Saving..." : editingAssessment ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[384px] max-w-sm shrink-0 border border-slate-200 p-6 text-center">
            <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Delete Assessment</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? All associated question data will be lost.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-xs font-semibold cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

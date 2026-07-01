import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import certificationService from "../services/certificationService";
import { Award, Plus, Edit2, Trash2, X, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", validityMonths: "12", requirements: "" });
  const [submitting, setSubmitting] = useState(false);
  
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    setLoading(true);
    try {
      const data = await certificationService.getAll();
      setCerts(data || []);
    } catch (_) {
      setCerts([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const openAddModal = () => {
    setEditingCert(null);
    setForm({ title: "", description: "", validityMonths: "12", requirements: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setEditingCert(cert);
    setForm({
      title: cert.title || "",
      description: cert.description || "",
      validityMonths: cert.validityMonths?.toString() || "12",
      requirements: cert.requirements || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingCert) {
        const updated = await certificationService.update(editingCert.id, form);
        setCerts(prev => prev.map(c => c.id === editingCert.id ? (updated || { ...c, ...form }) : c));
        showToast("Template updated successfully!");
      } else {
        const created = await certificationService.create(form);
        setCerts(prev => [...prev, created || { id: Date.now(), ...form }]);
        showToast("Template created successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingCert) {
        setCerts(prev => prev.map(c => c.id === editingCert.id ? { ...c, ...form } : c));
        showToast("Template updated locally (API unavailable).", "info");
      } else {
        setCerts(prev => [...prev, { id: Date.now(), ...form }]);
        showToast("Template created locally (API unavailable).", "info");
      }
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await certificationService.delete(deleteTarget.id);
    } catch (_) {}
    setCerts(prev => prev.filter(c => c.id !== deleteTarget.id));
    showToast("Template removed.");
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Certifications</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Issue, configure, and monitor course completion certificates.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus size={14} /> Create Template
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex items-center justify-center text-slate-400 text-xs">
            Loading templates...
          </div>
        ) : certs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <Award size={24} className="text-amber-600" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">No certificates template found</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Create a certificate template and link it to your courses to automatically award certificates to learners on completion.
            </p>
            <button
              onClick={openAddModal}
              className="mt-6 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Create First Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(cert => (
              <div key={cert.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="p-5 border-b border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex flex-shrink-0 items-center justify-center">
                    <Award size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">{cert.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cert.description || "No description provided."}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
                    Valid: {cert.validityMonths === "0" ? "Lifetime" : `${cert.validityMonths} months`}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cert)}
                      className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(cert)}
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
                {editingCert ? "Edit Template" : "Create Template"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Template Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Master Developer Certification"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Describe what this certification is for..."
                    rows={3}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] resize-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Validity (Months)</label>
                    <select
                      value={form.validityMonths}
                      onChange={e => setForm(p => ({ ...p, validityMonths: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                    >
                      <option value="0">Lifetime (No Expiry)</option>
                      <option value="6">6 Months</option>
                      <option value="12">1 Year</option>
                      <option value="24">2 Years</option>
                      <option value="36">3 Years</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Completion Req.</label>
                    <select
                      value={form.requirements}
                      onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                    >
                      <option value="course_completion">Course Completion</option>
                      <option value="assessment_pass">Assessment Pass</option>
                      <option value="instructor_approval">Instructor Approval</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] disabled:bg-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <Save size={14} />
                  {submitting ? "Saving..." : editingCert ? "Update Template" : "Create Template"}
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
            <h3 className="font-bold text-slate-800 text-sm mb-1">Delete Template</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? Issued certificates will remain valid.
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

import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import learnerService from "../services/learnerService";
import {
  Users, UserPlus, Search, Edit2, Trash2, X, Save,
  CheckCircle, AlertCircle
} from "lucide-react";

export default function Learners() {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLearner, setEditingLearner] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Learner", status: "Active" });
  const [submitting, setSubmitting] = useState(false);
  
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadLearners();
  }, []);

  const loadLearners = async () => {
    setLoading(true);
    try {
      const data = await learnerService.getAll();
      setLearners(data || []);
    } catch (_) {
      setLearners([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const filtered = learners.filter(l => {
    const matchSearch = l.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openAddModal = () => {
    setEditingLearner(null);
    setForm({ name: "", email: "", phone: "", role: "Learner", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (learner) => {
    setEditingLearner(learner);
    setForm({
      name: learner.name || "",
      email: learner.email || "",
      phone: learner.phone || "",
      role: learner.role || "Learner",
      status: learner.status || "Active"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingLearner) {
        const updated = await learnerService.update(editingLearner.id, form);
        setLearners(prev => prev.map(l => l.id === editingLearner.id ? (updated || { ...l, ...form }) : l));
        showToast("Learner updated successfully!");
      } else {
        const created = await learnerService.create(form);
        setLearners(prev => [...prev, created || { id: Date.now(), ...form, joinedDate: new Date().toISOString() }]);
        showToast("Learner added successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingLearner) {
        setLearners(prev => prev.map(l => l.id === editingLearner.id ? { ...l, ...form } : l));
        showToast("Learner updated locally (API unavailable).", "info");
      } else {
        setLearners(prev => [...prev, { id: Date.now(), ...form, joinedDate: new Date().toISOString() }]);
        showToast("Learner added locally (API unavailable).", "info");
      }
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await learnerService.delete(deleteTarget.id);
    } catch (_) {}
    setLearners(prev => prev.filter(l => l.id !== deleteTarget.id));
    showToast("Learner removed.");
    setDeleteTarget(null);
  };

  const getInitials = (name = "") => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const getAvatarColor = (name = "") => {
    const colors = ["bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-amber-100 text-amber-700", "bg-red-100 text-red-700"];
    if (!name) return colors[0];
    return colors[name.charCodeAt(0) % colors.length];
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Learners</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage student accounts, enrollment details, and course progress.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <UserPlus size={14} /> Add Learner
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search learners by name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#6C1D5F] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#6C1D5F] cursor-pointer"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 flex items-center justify-center text-slate-400 text-xs">Loading learners...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#6C1D5F]/8 flex items-center justify-center mb-4">
                <Users size={24} className="text-[#6C1D5F]" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">
                {searchQuery || statusFilter !== "All" ? "No learners match your search" : "No learners registered"}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                {searchQuery || statusFilter !== "All" ? "Try adjusting your filters." : 'Click "Add Learner" to register one manually.'}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Learner</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(learner => (
                  <tr key={learner.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${getAvatarColor(learner.name)}`}>
                          {getInitials(learner.name)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{learner.name}</p>
                          <p className="text-[10px] text-slate-400">{learner.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <p className="text-xs text-slate-500">{learner.phone || "—"}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-600 font-medium">{learner.role || "Learner"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        learner.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {learner.status || "Active"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(learner)}
                          className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(learner)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {learners.length > 0 && (
          <p className="text-[11px] text-slate-400 text-right">
            Showing {filtered.length} of {learners.length} learners
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[448px] shrink-0 border border-slate-200 flex flex-col my-8">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingLearner ? "Edit Learner" : "Add Learner"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. John Smith"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="e.g. john.smith@company.com"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="e.g. +1 (555) 123-4567"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Role</label>
                    <select
                      value={form.role}
                      onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                    >
                      <option>Learner</option>
                      <option>Instructor</option>
                      <option>Manager</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Status</label>
                    <select
                      value={form.status}
                      onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
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
                  {submitting ? "Saving..." : editingLearner ? "Update Learner" : "Add Learner"}
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
            <h3 className="font-bold text-slate-800 text-sm mb-1">Remove Learner</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to remove <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-xs font-semibold cursor-pointer">Remove</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

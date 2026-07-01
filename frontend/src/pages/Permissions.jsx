import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import permissionService from "../services/permissionService";
import { Shield, Plus, Edit2, Trash2, X, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function Permissions() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", level: "Standard" });
  const [submitting, setSubmitting] = useState(false);
  
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const data = await permissionService.getAll();
      setRoles(data || []);
    } catch (_) {
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const openAddModal = () => {
    setEditingRole(null);
    setForm({ name: "", description: "", level: "Standard" });
    setIsModalOpen(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setForm({
      name: role.name || "",
      description: role.description || "",
      level: role.level || "Standard"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingRole) {
        const updated = await permissionService.update(editingRole.id, form);
        setRoles(prev => prev.map(r => r.id === editingRole.id ? (updated || { ...r, ...form }) : r));
        showToast("Role updated successfully!");
      } else {
        const created = await permissionService.create(form);
        setRoles(prev => [...prev, created || { id: Date.now(), ...form, isCustom: true }]);
        showToast("Role created successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingRole) {
        setRoles(prev => prev.map(r => r.id === editingRole.id ? { ...r, ...form } : r));
        showToast("Role updated locally (API unavailable).", "info");
      } else {
        setRoles(prev => [...prev, { id: Date.now(), ...form, isCustom: true }]);
        showToast("Role created locally (API unavailable).", "info");
      }
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await permissionService.delete(deleteTarget.id);
    } catch (_) {}
    setRoles(prev => prev.filter(r => r.id !== deleteTarget.id));
    showToast("Role removed.");
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Access Control & Permissions</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage system roles, resource-level policies, and access tokens.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus size={14} /> Create Role
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex items-center justify-center text-slate-400 text-xs">
            Loading roles...
          </div>
        ) : roles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <Shield size={24} className="text-red-600" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">No custom roles defined</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Create custom roles to grant granular permissions to instructors, editors, or reviewers.
            </p>
            <button
              onClick={openAddModal}
              className="mt-6 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Create First Role
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role Name</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Access Level</th>
                  <th className="text-right px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roles.map(role => (
                  <tr key={role.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Shield size={14} className={role.level === 'Admin' ? 'text-red-500' : 'text-slate-500'} />
                        </div>
                        <span className="text-xs font-bold text-slate-800">{role.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <p className="text-xs text-slate-500 line-clamp-1">{role.description || "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        role.level === 'Admin' ? 'bg-red-50 text-red-700 border border-red-200' :
                        role.level === 'Instructor' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {role.level}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(role)}
                          className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(role)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                          disabled={!role.isCustom}
                        >
                          <Trash2 size={14} className={!role.isCustom ? 'opacity-30' : ''} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[448px] max-w-md shrink-0 border border-slate-200 flex flex-col my-8">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingRole ? "Edit Role" : "Create Role"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Role Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Content Reviewer"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Brief description of what this role can do..."
                    rows={2}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] resize-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Base Access Level</label>
                  <select
                    value={form.level}
                    onChange={e => setForm(p => ({ ...p, level: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                  >
                    <option>Standard</option>
                    <option>Instructor</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] disabled:bg-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <Save size={14} />
                  {submitting ? "Saving..." : editingRole ? "Update" : "Create"}
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
            <h3 className="font-bold text-slate-800 text-sm mb-1">Delete Role</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete the <strong>{deleteTarget.name}</strong> role? Users with this role will be downgraded to Standard.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-xs font-semibold cursor-pointer">Delete Role</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

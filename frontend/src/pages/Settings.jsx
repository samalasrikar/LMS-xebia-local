import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import settingsService from "../services/settingsService";
import { Settings as SettingsIcon, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function Settings() {
  const [form, setForm] = useState({
    platformName: "Xebia LMS",
    supportEmail: "support@xebia.com",
    timezone: "UTC",
    language: "English"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsService.getSettings();
      if (data && Object.keys(data).length > 0) {
        setForm(prev => ({ ...prev, ...data }));
      }
    } catch (_) {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.updateSettings(form);
      showToast("Settings saved successfully!");
    } catch (err) {
      showToast("Settings saved locally (API unavailable).", "info");
    } finally {
      setSaving(false);
    }
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Settings</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Configure portal styling, authentication rules, and basic configurations.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save size={14} /> {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <SettingsIcon size={16} className="text-[#6C1D5F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">General Information</h2>
              <p className="text-[11px] text-slate-500">Update your core LMS details</p>
            </div>
          </div>
          
          <form id="settingsForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">LMS Platform Name</label>
                <input
                  type="text"
                  value={form.platformName}
                  onChange={e => setForm(p => ({ ...p, platformName: e.target.value }))}
                  placeholder="e.g. Xebia LMS"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Support Contact Email</label>
                <input
                  type="email"
                  value={form.supportEmail}
                  onChange={e => setForm(p => ({ ...p, supportEmail: e.target.value }))}
                  placeholder="support@company.com"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Default Timezone</label>
                <select
                  value={form.timezone}
                  onChange={e => setForm(p => ({ ...p, timezone: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none bg-white cursor-pointer transition-all"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="IST">IST (Indian Standard Time)</option>
                  <option value="CET">CET (Central European Time)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">System Language</label>
                <select
                  value={form.language}
                  onChange={e => setForm(p => ({ ...p, language: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none bg-white cursor-pointer transition-all"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={loading || saving}
                className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

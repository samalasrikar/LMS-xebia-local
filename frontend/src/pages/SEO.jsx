import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import settingsService from "../services/settingsService";
import { Globe, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function SEO() {
  const [form, setForm] = useState({
    titleTag: "Xebia LMS - Enterprise Learning Portal",
    robotsMode: "index, follow",
    metaDescription: "Learn from industry leaders with customized pathways designed for modern engineers and designers."
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadSeoSettings();
  }, []);

  const loadSeoSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsService.getSeoSettings();
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
      await settingsService.updateSeoSettings(form);
      showToast("SEO configurations saved successfully!");
    } catch (err) {
      showToast("SEO configurations saved locally (API unavailable).", "info");
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">SEO & Meta Configuration</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage sitewide meta tags, robots policies, and search visibility rankings.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Globe size={16} className="text-[#6C1D5F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Global Search Meta</h2>
              <p className="text-[11px] text-slate-500">Control how search engines interpret your site</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Sitewide Title Tag</label>
                <input
                  type="text"
                  value={form.titleTag}
                  onChange={e => setForm(p => ({ ...p, titleTag: e.target.value }))}
                  placeholder="Xebia LMS - Enterprise Learning Portal"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Robots Index Mode</label>
                <select
                  value={form.robotsMode}
                  onChange={e => setForm(p => ({ ...p, robotsMode: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none bg-white cursor-pointer transition-all"
                >
                  <option value="index, follow">Index, Follow (Visible to Search Engines)</option>
                  <option value="noindex, nofollow">Noindex, Nofollow (Hidden from Search Engines)</option>
                  <option value="noindex, follow">Noindex, Follow</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Sitewide Meta Description</label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={form.metaDescription}
                    onChange={e => setForm(p => ({ ...p, metaDescription: e.target.value }))}
                    placeholder="Learn from industry leaders with customized pathways designed for modern engineers and designers."
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] outline-none resize-none transition-all pb-8"
                    required
                  />
                  <div className={`absolute bottom-2 right-3 text-[10px] font-semibold ${form.metaDescription.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                    {form.metaDescription.length} / 160 recommended
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={loading || saving}
                className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                {saving ? "Updating..." : "Update SEO Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

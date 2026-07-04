import { useState, useRef, useEffect } from "react";
import AppLayout from "@/app/layouts/AppLayout";
import { Save, RotateCcw, Globe, Share2, BarChart3, Lightbulb, Info, History, ChevronRight, CheckCircle2, X } from "lucide-react";

const DEFAULTS = {
  siteTitle: "Xebia LMS - Global Training Platform",
  metaTitle: "Best Enterprise Learning Management System | Xebia",
  metaDesc:
    "Empower your workforce with Xebia LMS. The enterprise-grade training platform designed for high-performance learning and professional growth.",
  keywords: "lms, enterprise learning, xebia, corporate training",
  canonicalUrl: "https://lms.xebia.com/",
  robots: "index, follow",
  twitterCard: "summary_large_image",
  gaId: "G-XB12345678",
  gtmId: "GTM-NWK909",
};

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-slide-up">
      <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
      <span className="text-[13px] font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
        <X size={14} />
      </button>
    </div>
  );
}

export default function SEOMeta() {
  const [form, setForm] = useState({ ...DEFAULTS });
  const [saved, setSaved] = useState({ ...DEFAULTS });
  const [ogPreview, setOgPreview] = useState(null);
  const [lastSaved, setLastSaved] = useState("12 mins ago by Alex");
  const [toast, setToast] = useState(null);
  const fileRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    setSaved({ ...form });
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setLastSaved(`Just now at ${timeStr} by Admin`);
    setToast("SEO configuration saved successfully!");
  };

  const handleDiscard = () => {
    setForm({ ...saved });
    setOgPreview(null);
    setToast("Changes discarded.");
  };

  const handleOgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOgPreview(url);
  };

  const charCount = form.metaDesc.length;
  const isDirty = JSON.stringify(form) !== JSON.stringify(saved) || ogPreview !== null;

  return (
    <AppLayout>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-400 font-medium">
          <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-semibold">SEO &amp; Meta</span>
        </nav>

        {/* Page header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              SEO &amp; Meta Configuration
            </h1>
            <p className="text-[13px] text-slate-400 mt-1">
              Configure search engine optimization settings and tracking tools for your LMS portal.
            </p>
          </div>
          {isDirty && (
            <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-semibold rounded-full">
              Unsaved changes
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Left Column: Form Fields */}
          <div className="space-y-6">
            {/* General Meta Tags */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-slate-800">General Meta Tags</h2>
                  <p className="text-[12px] text-slate-400">Basic configuration for search engine crawlers.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Site Title</label>
                  <input
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    type="text"
                    value={form.siteTitle}
                    onChange={set("siteTitle")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Meta Title</label>
                  <input
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    type="text"
                    value={form.metaTitle}
                    onChange={set("metaTitle")}
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Meta Description</label>
                  <textarea
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    rows="3"
                    value={form.metaDesc}
                    onChange={set("metaDesc")}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-slate-400 font-medium">Recommended: 150–160 characters</span>
                    <span className={`text-[10px] font-bold ${charCount > 160 ? "text-red-500" : "text-primary"}`}>
                      {charCount}/160
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Keywords</label>
                  <input
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    type="text"
                    value={form.keywords}
                    onChange={set("keywords")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Canonical URL</label>
                  <input
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    type="text"
                    value={form.canonicalUrl}
                    onChange={set("canonicalUrl")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Robots</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    value={form.robots}
                    onChange={set("robots")}
                  >
                    <option>index, follow</option>
                    <option>noindex, nofollow</option>
                    <option>index, nofollow</option>
                    <option>noindex, follow</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Social Graph */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Share2 size={20} />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-slate-800">Social Graph</h2>
                  <p className="text-[12px] text-slate-400">
                    Define how your site appears on Twitter, Facebook, and LinkedIn.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Open Graph Image</label>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleOgUpload} />
                  {ogPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={ogPreview} alt="OG Preview" className="w-full h-40 object-cover" />
                      <button
                        onClick={() => { setOgPreview(null); fileRef.current.value = ""; }}
                        className="absolute top-2 right-2 bg-slate-900/70 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                      <span className="absolute bottom-2 left-2 bg-slate-900/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Preview
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileRef.current.click()}
                      className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-primary">
                        <span className="material-symbols-outlined text-xl">cloud_upload</span>
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-800">Click to upload or drag and drop</p>
                        <p className="text-[11px] text-slate-400">PNG, JPG or WebP (Recommended: 1200 × 630px)</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-slate-700">Twitter Card Type</label>
                    <select
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      value={form.twitterCard}
                      onChange={set("twitterCard")}
                    >
                      <option>summary_large_image</option>
                      <option>summary</option>
                      <option>app</option>
                      <option>player</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Analytics */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-slate-800">Tracking &amp; Analytics</h2>
                  <p className="text-[12px] text-slate-400">Connect your external monitoring tools.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Google Analytics ID</label>
                  <div className="relative">
                    <input
                      className="w-full pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      value={form.gaId}
                      onChange={set("gaId")}
                      placeholder="G-XXXXXXXXXX"
                    />
                    <Info size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Google Tag Manager ID</label>
                  <div className="relative">
                    <input
                      className="w-full pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      type="text"
                      value={form.gtmId}
                      onChange={set("gtmId")}
                      placeholder="GTM-XXXXXXX"
                    />
                    <Info size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <button
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all mb-2 cursor-pointer"
              >
                <Save size={16} />
                Save Configuration
              </button>
              <button
                onClick={handleDiscard}
                className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw size={16} />
                Discard Changes
              </button>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400 justify-center font-medium">
                <History size={13} />
                Last saved: {lastSaved}
              </div>
            </div>

            {/* Live Search Preview */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-slate-800">Search Preview</h3>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold text-[9px] rounded-full uppercase tracking-wider">
                  Google Desktop
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-lg space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-400">
                    X
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-700 leading-none font-medium">
                      {form.siteTitle || "Xebia LMS"}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none mt-0.5">{form.canonicalUrl}</span>
                  </div>
                </div>
                <h4 className="text-[16px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight">
                  {form.metaTitle || "Title goes here..."}
                </h4>
                <p className="text-[12px] text-[#4d5156] leading-relaxed">
                  {form.metaDesc || "Description goes here..."}
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Readability Score</span>
                  <span className={`font-bold ${charCount >= 100 && charCount <= 160 ? "text-emerald-600" : charCount > 160 ? "text-red-500" : "text-amber-500"}`}>
                    {charCount >= 100 && charCount <= 160 ? "Excellent" : charCount > 160 ? "Too long" : "Too short"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${charCount > 160 ? "bg-red-400" : charCount >= 100 ? "bg-emerald-500" : "bg-amber-400"}`}
                    style={{ width: `${Math.min((charCount / 160) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 italic leading-relaxed">
                  Tip: Including your primary keyword "Enterprise Learning" in the first 60 characters improves ranking.
                </p>
              </div>
            </div>

            {/* SEO Tips */}
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-1.5 text-[13px]">
                <Lightbulb size={16} />
                SEO Best Practices
              </h4>
              <ul className="text-[12px] text-slate-600 space-y-2 list-disc pl-4">
                <li>Avoid "Keyword Stuffing" in descriptions.</li>
                <li>Ensure your OG Image is high quality (min 1200×630px).</li>
                <li>Keep meta titles under 60 characters for best display.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
      `}</style>
    </AppLayout>
  );
}

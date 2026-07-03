import AppLayout from "../../components/layout/AppLayout";
import { Layers, Copy, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function DesignSystem() {
  const [copied, setCopied] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const colors = [
    { name: "Primary Brand (Velvet)", hex: "#6C1D5F", desc: "Main brand color, active navigation, key CTA accents.", variable: "var(--color-primary)" },
    { name: "Primary Brand Dark", hex: "#4A1E47", desc: "Sidebar background, high-elevation header backgrounds.", variable: "var(--color-primary-dark)" },
    { name: "Secondary Accent", hex: "#84117C", desc: "Secondary action items, badges, secondary accents.", variable: "var(--color-secondary)" },
    { name: "Canvas Surface", hex: "#F5F7FA", desc: "Lowest canvas surface background layer.", variable: "var(--color-blueish-grey)" },
    { name: "Card Background", hex: "#FFFFFF", desc: "General container backgrounds, white blocks.", variable: "var(--color-surface-container-lowest)" },
    { name: "Divider Outline", hex: "#E2E8F0", desc: "Borders, lines, grid division borders.", variable: "var(--color-outline-variant)" }
  ];

  const typography = [
    { name: "Display LG", size: "36px", weight: "700 Bold", lh: "44px", spacing: "-0.02em", sample: "Welcome to Xebia LMS" },
    { name: "Headline LG", size: "24px", weight: "600 Semi-Bold", lh: "32px", spacing: "-0.01em", sample: "Connected Ecosystem" },
    { name: "Headline MD", size: "20px", weight: "600 Semi-Bold", lh: "28px", spacing: "0.00em", sample: "General Settings" },
    { name: "Body LG", size: "16px", weight: "400 Regular", lh: "24px", spacing: "0.00em", sample: "Manage your external tools and synchronization preferences." },
    { name: "Body MD", size: "14px", weight: "400 Regular", lh: "20px", spacing: "0.00em", sample: "lms, enterprise learning, xebia, corporate training" },
    { name: "Label MD", size: "13px", weight: "500 Medium", lh: "18px", spacing: "0.01em", sample: "GOOGLE DESKTOP PREVIEW" },
    { name: "Label SM", size: "11px", weight: "600 Semi-Bold", lh: "16px", spacing: "0.03em", sample: "128 RESULTS" }
  ];

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-400 font-medium">
          <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-semibold">Design System</span>
        </nav>

        {/* Page Header */}
        <div>
          <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
            LMS Design System Spec
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Visual tokens, components, and style guidelines implemented in the Xebia LMS Admin Dashboard.
          </p>
        </div>

        {/* Brand & Style Overview */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
            <Layers size={18} className="text-primary" /> Brand Personality
          </h2>
          <p className="text-[13px] text-slate-600 leading-relaxed max-w-4xl">
            The design system is engineered for a high-performance Learning Management System (LMS) admin environment.
            The brand personality is <strong className="text-slate-800">authoritative yet enabling</strong>, balancing Xebia's energetic brand colors with a disciplined, data-centric layout. 
            The aesthetic follows a <strong className="text-slate-800">Corporate Modern</strong> style, prioritizing high information density without sacrificing legibility. 
          </p>
        </div>

        {/* Colors Swatches */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-[16px] font-bold text-slate-800">Color System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((c) => (
              <div key={c.hex} className="border border-slate-100 rounded-xl overflow-hidden flex flex-col bg-slate-50/20">
                <div className="h-20 w-full shadow-inner relative" style={{ backgroundColor: c.hex }}>
                  <button
                    onClick={() => handleCopy(c.hex)}
                    className="absolute bottom-2 right-2 bg-white/95 text-slate-800 p-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {copied === c.hex ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
                    {copied === c.hex ? "Copied" : c.hex}
                  </button>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-[13px]">{c.name}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{c.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-500 uppercase tracking-wider">Tailwind Token</span>
                    <code className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">
                      {c.variable}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Scale */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-[16px] font-bold text-slate-800">Typography Scales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Token Name</th>
                  <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Size</th>
                  <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Weight</th>
                  <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Line Height / Spacing</th>
                  <th className="py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sample Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {typography.map((t) => (
                  <tr key={t.name} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-3 text-[12px] font-bold text-slate-800 font-mono">{t.name}</td>
                    <td className="py-3 text-[12px] text-slate-600">{t.size}</td>
                    <td className="py-3 text-[12px] text-slate-600">{t.weight}</td>
                    <td className="py-3 text-[12px] text-slate-600">{t.lh} / {t.spacing}</td>
                    <td className="py-3">
                      <span
                        style={{
                          fontSize: t.size,
                          fontWeight: t.weight.includes("Bold") ? "700" : t.weight.includes("Semi-Bold") ? "600" : t.weight.includes("Medium") ? "500" : "400",
                          lineHeight: t.lh,
                          letterSpacing: t.spacing
                        }}
                        className="text-slate-800 truncate block max-w-sm"
                      >
                        {t.sample}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-[16px] font-bold text-slate-800">Component Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Buttons & Radii */}
            <div className="space-y-4 border border-slate-100 p-4 rounded-xl">
              <h3 className="text-[13px] font-bold text-slate-700">Buttons & Radii</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary text-white text-[13px] font-bold rounded-lg hover:bg-primary-dark transition-all cursor-pointer">
                  Primary Button
                </button>
                <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-lg transition-all cursor-pointer">
                  Secondary Button
                </button>
                <button className="px-4 py-2 text-primary hover:bg-primary/5 text-[13px] font-bold rounded-lg transition-all cursor-pointer">
                  Ghost Button
                </button>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed mt-2">
                Card borders use <code className="font-mono text-slate-800">12px (rounded-xl)</code>, inputs and buttons use <code className="font-mono text-slate-800">8px (rounded-lg)</code>.
              </div>
            </div>

            {/* Badges & Status Chips */}
            <div className="space-y-4 border border-slate-100 p-4 rounded-xl">
              <h3 className="text-[13px] font-bold text-slate-700">Badges & Status</h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold uppercase">
                  Connected
                </span>
                <span className="px-2.5 py-0.5 bg-slate-50 text-slate-400 border border-slate-200 rounded-full text-[10px] font-bold uppercase">
                  Disconnected
                </span>
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-[10px] font-bold uppercase">
                  Pending
                </span>
                <span className="px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded-full text-[10px] font-bold uppercase">
                  Failed
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed mt-2">
                Always use uppercase text at <code className="font-mono text-slate-800">11px / semi-bold</code> for badges to maintain accessibility.
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

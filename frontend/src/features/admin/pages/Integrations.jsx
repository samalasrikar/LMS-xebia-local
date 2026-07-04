import { useState, useEffect } from "react";
import AppLayout from "@/app/layouts/AppLayout";
import {
  Search, Eye, EyeOff, Plug, AlertTriangle, ArrowRight,
  Plus, ChevronRight, X, CheckCircle2, Clock, AlertCircle,
  Copy, Check, Webhook, Trash2,
} from "lucide-react";

// ─── Sample log entries ─────────────────────────────────────────────────────
const SAMPLE_LOGS = [
  { id: 1, time: "2026-07-03 14:58:12", integration: "Google Meet", event: "POST /v2/meetings", status: "200", latency: "142ms", type: "success" },
  { id: 2, time: "2026-07-03 14:55:04", integration: "Slack",        event: "POST /api/chat.postMessage", status: "200", latency: "95ms",  type: "success" },
  { id: 3, time: "2026-07-03 14:50:31", integration: "Zoom",         event: "POST /v2/webinars",          status: "401", latency: "310ms", type: "error"   },
  { id: 4, time: "2026-07-03 14:47:18", integration: "GitHub",       event: "GET /repos/xebia-lms",       status: "200", latency: "88ms",  type: "success" },
  { id: 5, time: "2026-07-03 14:44:00", integration: "Jira",         event: "GET /rest/api/3/issue",      status: "403", latency: "220ms", type: "error"   },
  { id: 6, time: "2026-07-03 14:40:55", integration: "Outlook",      event: "POST /me/sendMail",           status: "202", latency: "178ms", type: "success" },
  { id: 7, time: "2026-07-03 14:38:12", integration: "Slack",        event: "POST /api/chat.postMessage", status: "200", latency: "102ms", type: "success" },
  { id: 8, time: "2026-07-03 14:35:44", integration: "Google Meet",  event: "DELETE /v2/meetings/8821",   status: "204", latency: "130ms", type: "success" },
];

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl animate-slide-up">
      <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
      <span className="text-[13px] font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Modal shell ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-[90vw] md:w-[650px] max-w-full rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-modal-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[16px] font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

// ─── View Logs Modal ────────────────────────────────────────────────────────
function LogsModal({ onClose }) {
  const [filter, setFilter] = useState("all");

  const filtered = SAMPLE_LOGS.filter((l) => filter === "all" || l.type === filter);

  return (
    <Modal title="API Request Logs" onClose={onClose}>
      <div className="p-6 space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {["all", "success", "error"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-[12px] font-bold capitalize transition-all cursor-pointer ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-slate-400 flex items-center gap-1">
            <Clock size={12} /> Last 24 hours
          </span>
        </div>

        {/* Log table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-[12px]">
            <thead className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-2.5 text-left">Time</th>
                <th className="px-4 py-2.5 text-left">Integration</th>
                <th className="px-4 py-2.5 text-left">Event</th>
                <th className="px-4 py-2.5 text-left">Status</th>
                <th className="px-4 py-2.5 text-left">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-2.5 font-semibold text-slate-700">{log.integration}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-600 whitespace-nowrap">{log.event}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        log.type === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {log.type === "success" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-400">{log.latency}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400 text-[13px]">
                    No logs found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[13px] rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Custom Webhook Modal ────────────────────────────────────────────────────
function WebhookModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("POST");
  const [events, setEvents] = useState({ course_complete: true, user_enroll: false, user_register: false });
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleEvent = (key) => setEvents((prev) => ({ ...prev, [key]: !prev[key] }));

  const generateSecret = () => {
    const s = "whsec_" + Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setSecret(s);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!url.trim()) e.url = "URL is required.";
    else if (!/^https?:\/\/.+/.test(url)) e.url = "Must be a valid http(s) URL.";
    if (!secret) e.secret = "Generate or enter a signing secret.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;
    onCreate({ name, url, method, events, secret });
    onClose();
  };

  return (
    <Modal title="Create Custom Webhook" onClose={onClose}>
      <div className="p-6 space-y-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-700">Webhook Name</label>
          <input
            className={`w-full px-3 py-2 border rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-primary transition-all ${errors.name ? "border-red-400" : "border-slate-200 focus:border-primary"}`}
            placeholder="e.g. Notify HR System"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-[11px]">{errors.name}</p>}
        </div>

        {/* URL + Method */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-700">Endpoint URL</label>
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-[13px] bg-white focus:outline-none font-mono font-bold text-slate-700 flex-shrink-0"
            >
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
            </select>
            <input
              className={`flex-1 px-3 py-2 border rounded-lg text-[13px] font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-all ${errors.url ? "border-red-400" : "border-slate-200 focus:border-primary"}`}
              placeholder="https://your-service.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          {errors.url && <p className="text-red-500 text-[11px]">{errors.url}</p>}
        </div>

        {/* Events */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-slate-700">Trigger Events</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { key: "course_complete", label: "Course Completed", desc: "Fires when a learner finishes a course" },
              { key: "user_enroll",     label: "User Enrolled",    desc: "Fires when a user enrolls in a course" },
              { key: "user_register",   label: "User Registered",  desc: "Fires when a new user account is created" },
            ].map(({ key, label, desc }) => (
              <label
                key={key}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  events[key] ? "bg-primary/5 border-primary/25" : "bg-slate-50 border-slate-100 hover:border-slate-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={events[key]}
                  onChange={() => toggleEvent(key)}
                  className="mt-0.5 accent-primary w-4 h-4"
                />
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{label}</p>
                  <p className="text-[11px] text-slate-400">{desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Signing Secret */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-slate-700">Signing Secret</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                className={`w-full px-3 py-2 pr-10 border rounded-lg text-[12px] font-mono focus:outline-none focus:ring-1 focus:ring-primary transition-all ${errors.secret ? "border-red-400" : "border-slate-200 focus:border-primary"}`}
                type={showSecret ? "text" : "password"}
                placeholder="Generate or paste secret…"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary cursor-pointer"
              >
                {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button
              onClick={generateSecret}
              className="px-3 py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-primary hover:text-primary transition-all cursor-pointer whitespace-nowrap"
            >
              Generate
            </button>
            {secret && (
              <button
                onClick={copySecret}
                className="px-3 py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                title="Copy secret"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            )}
          </div>
          {errors.secret && <p className="text-red-500 text-[11px]">{errors.secret}</p>}
          <p className="text-[11px] text-slate-400">Used to verify that payloads are from Xebia LMS.</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-[13px] font-bold cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1.5"
          >
            <Plus size={14} /> Create Webhook
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
const INITIAL_INTEGRATIONS = [
  {
    id: "meet", name: "Google Meet",
    description: "Automatically generate meeting links for scheduled learner sessions and office hours.",
    status: "CONNECTED", version: "v2.4.0", keyType: "API Key",
    keyValue: "gm_live_90af231a4c9b882fe",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9AmYtF_QDEd_jBfBECtv_p7Jr5VETs797NlcRdO4HDvufDOMMrQyQqZfYYsduc6G-c2abaItlguzhCwelBSe4hXJ9hw_BD6trtICI8hyzqdocvBwgvss31QWACbuwlc_pODZjqA9CoO0Pg5Esv0U6iGytPFf5_JpIIF5fvmIEE08Sie31tPH3hb4G1mfyaqwIHpr0fvYBxXPHg4D-3GZOABtZFA3OBhVCWPTVQL3VN1eVc-Thp65q",
    lastSync: "2 minutes ago", health: "Live",
  },
  {
    id: "zoom", name: "Zoom",
    description: "Host webinars and interactive classrooms with enterprise-grade video conferencing.",
    status: "DISCONNECTED", version: "v1.0.2", keyType: "API Key", keyValue: "",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1b0fFE6jUGoo80AeutCJpff66WrKzDlS7LNRFU2GjVBh5aXYG8PnwIpdMxBZPu5Fq2acUJErH3HFvUguCcMj_iwgvrvhy3gZtmvyQlqhn_JrPFnv79RRvyR0cd_OOAKkxKnOIc7wNIs1EYbH79CMkXScMcmyJNgR7_Poxg7hJ3vsHP_nP_QsvTW2J7Yu2rRtAutsI3TwxHL-wR96sObrvUvuGKYiJ4R_qGw2EtvgMvk3KjgVfDykI",
    lastSync: "Never synced", health: "Offline",
  },
  {
    id: "slack", name: "Slack",
    description: "Send course updates and learner activity notifications directly to designated Slack channels.",
    status: "CONNECTED", version: "v3.1.0", keyType: "Webhook URL",
    keyValue: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXX",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg7RmA_6Td_BP3757C1DQdeGUZQt1GN1afQxePB79TynwREqCmJnqJ3osglbAxGusJFdkdsJ8YPIK3gvCrAAP7V30c3Z3GtR9HX6e2ZdHGEGichvhvkVF72bT-1MrK7lvZGgqrVGftR41MVTGANbKmo5VVFwuMTzD9xFVFFUqrhtcoXSOZgi11Y1x7F1qghXy20RddtEQ37CKVvghly31StwVeUkZ2DBBEQfshezWPsNUCLbpaO8Sm",
    lastSync: "1 hour ago", health: "Live",
  },
  {
    id: "github", name: "GitHub",
    description: "Track coding assignments and repository contributions directly within the LMS profile.",
    status: "CONNECTED", version: "v1.2.0", keyType: "Personal Access Token",
    keyValue: "ghp_5k2Lp90vXyZaQ81c9001bfa982a",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3uJYVcMh74Yh7N5jGY11m2cLG4uCwO3kY2iviDHPrxw0cXcp443V14NinGTFNjYOHQ85UrKPnjb7xc3r1e6ENBDpMH0paJBHG47ZQxmB48aZeY2WXLB7vOnwJVHTpfmgPxQRDDQ1zAWfO-iUO9_EIQAhkMzgn-GtVUKn-RFxIrYYb2AQfoHRDYha06QAUbe1Egtz1K3McLEK1wRxhDql3ylfQX_qwUgQVnawEXZR4IZNra68rcz6q",
    lastSync: "Today, 09:12 AM", health: "Live",
  },
  {
    id: "jira", name: "Jira Software",
    description: "Sync project milestones and internal team tasks for curriculum development teams.",
    status: "DISCONNECTED", version: "v2.0.1", keyType: "Site URL", keyValue: "",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFt9bdFrkvTrSqrCteVWWHk7AFI0Z8-Hf056LMk1694SvagPT2F9Obstc4tUFVsiq9Z3xnvBq3OZLT423IMsAt5_Rx_EEeF1jDo3W4Xd8-48FBWcYyGhWaKgR-qa6AJAmYbvpfkOoWIXQ3mgkC0UkA-ja6_iZX8SLh4VSGXBtp8-bjS6DkkUAlUHVbLfUWfUqES6I-KT0HkUdtlhTih4up9ltYBMHwOnek8fEhV-2g8XKtlSuAIWIA",
    lastSync: "Never synced", health: "Offline",
  },
  {
    id: "outlook", name: "Microsoft Outlook",
    description: "Synchronize calendars and send personalized email invitations through your enterprise account.",
    status: "CONNECTED", version: "v4.1.2", keyType: "Account",
    keyValue: "admin@xebia-learning.com",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZgvguZJ-tdMmmOi-wP5xaZVJURaLcbdoxHWyidbueTjHwyvf_eHDBrCjcZkCaoDWnuJT0N6_EZ58BQke7cB-RuCrpE7qW0WNeGEwbqZQrppZWVJyWqllQmjhsq0Tnp5d9u2uKv60gs7YndBkJghlnkxjM9itXFWS97-DyrBCHRvyU-u4xMS1IspxxnzaqQOm5cXoj-LOa5C7e5bKoG5-BhunssMAMW_0lV9rXUjM6x18ohcmdY3rq",
    lastSync: "15 minutes ago", health: "Live",
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);
  const [webhooks, setWebhooks] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [toast, setToast] = useState(null);

  const toggleVisibility = (id) =>
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleConnect = (id) => {
    const input = document.getElementById(`input-${id}`);
    const val = input ? input.value.trim() : "";
    if (!val) {
      setToast("Please enter a credential before connecting.");
      return;
    }
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "CONNECTED", keyValue: val, lastSync: "Just now", health: "Live" }
          : item
      )
    );
    setToast(`${integrations.find((i) => i.id === id)?.name} connected successfully!`);
  };

  const handleDisconnect = (id) => {
    const name = integrations.find((i) => i.id === id)?.name;
    if (!window.confirm(`Disconnect ${name}? All synced data will stop updating.`)) return;
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "DISCONNECTED", keyValue: "", lastSync: "Never synced", health: "Offline" }
          : item
      )
    );
    setToast(`${name} disconnected.`);
  };

  const handleSync = (id) => {
    const name = integrations.find((i) => i.id === id)?.name;
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, lastSync: "Just now" } : item
      )
    );
    setToast(`${name} synced successfully!`);
  };

  const handleCreateWebhook = (data) => {
    setWebhooks((prev) => [{ id: Date.now(), ...data }, ...prev]);
    setToast(`Webhook "${data.name}" created successfully!`);
  };

  const handleDeleteWebhook = (id) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
    setToast("Webhook removed.");
  };

  const filtered = integrations.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = integrations.filter((i) => i.status === "CONNECTED").length;

  return (
    <AppLayout>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {showLogs && <LogsModal onClose={() => setShowLogs(false)} />}
      {showWebhookModal && (
        <WebhookModal
          onClose={() => setShowWebhookModal(false)}
          onCreate={handleCreateWebhook}
        />
      )}

      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-400 font-medium">
          <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-semibold">Integrations</span>
        </nav>

        {/* Page Header */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              Connected Ecosystem
            </h1>
            <p className="text-[13px] text-slate-400 mt-1">
              Manage your external tools and synchronization settings to automate your learning environment.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLogs(true)}
              className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              View Logs
            </button>
            <button
              onClick={() => setShowWebhookModal(true)}
              className="px-3.5 py-1.5 bg-primary text-white rounded-lg text-[13px] font-bold shadow-sm hover:bg-primary-dark transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} /> Custom Webhook
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Plug size={18} /></div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Healthy
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Active Integrations</p>
            <p className="text-[28px] font-bold text-slate-800">{activeCount}/{integrations.length}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-[18px]">sync</span>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">
                Auto
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">API Calls (24h)</p>
            <p className="text-[28px] font-bold text-slate-800">45.2k</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><AlertTriangle size={18} /></div>
              <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase">
                2 Issues
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Sync Failures</p>
            <p className="text-[28px] font-bold text-slate-800">0.03%</p>
          </div>

          <div className="bg-primary/5 p-5 rounded-xl border border-primary/15 shadow-sm flex flex-col justify-between group">
            <div>
              <p className="font-bold text-[14px] text-primary">Explore Xebia API</p>
              <p className="text-[11px] text-slate-500 mt-1">Build custom solutions with our robust SDK and webhooks.</p>
            </div>
            <a href="#" className="text-primary font-bold text-[12px] flex items-center gap-1 mt-3 group-hover:translate-x-1 transition-transform">
              Read Docs <ArrowRight size={12} />
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 max-w-md">
          <Search size={16} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-[13px] w-full outline-none"
          />
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="p-5 flex-1 space-y-4">
                {/* Logo + badge */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden border border-slate-100 p-2">
                    <img className="w-full h-full object-contain" src={item.logo} alt={item.name} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.status === "CONNECTED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-slate-50 text-slate-400 border-slate-200"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">{item.version}</span>
                  </div>
                </div>

                {/* Name + description */}
                <div>
                  <h3 className="font-bold text-slate-800 text-[15px]">{item.name}</h3>
                  <p className="text-[12px] text-slate-400 leading-relaxed mt-1">{item.description}</p>
                </div>

                {/* Key / Input */}
                {item.status === "CONNECTED" ? (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {item.keyType}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-1.5 text-[12px] font-mono focus:outline-none"
                          readOnly
                          type={visibleKeys[item.id] ? "text" : "password"}
                          value={item.keyValue}
                        />
                        <button
                          onClick={() => toggleVisibility(item.id)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary cursor-pointer transition-colors"
                        >
                          {visibleKeys[item.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                      <span>Last Sync: {item.lastSync}</span>
                      <span className="text-emerald-600 flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Configure {item.keyType}
                    </label>
                    <input
                      id={`input-${item.id}`}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder={`Enter ${item.keyType}…`}
                      type="text"
                    />
                  </div>
                )}
              </div>

              {/* Actions footer */}
              <div className="p-4 bg-slate-50/50 rounded-b-xl border-t border-slate-100 flex gap-2">
                {item.status === "CONNECTED" ? (
                  <>
                    <button
                      onClick={() => handleSync(item.id)}
                      className="flex-1 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      Sync Now
                    </button>
                    <button
                      onClick={() => handleDisconnect(item.id)}
                      className="flex-1 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-lg text-[12px] font-bold hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(item.id)}
                    className="w-full py-1.5 bg-primary text-white rounded-lg text-[12px] font-bold hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    Connect {item.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Webhooks list */}
        {webhooks.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <Plus size={16} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-800">Custom Webhooks</h3>
              <span className="ml-auto text-[12px] font-bold text-slate-400">{webhooks.length} configured</span>
            </div>
            <div className="divide-y divide-slate-100">
              {webhooks.map((wh) => (
                <div key={wh.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    <Plus size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-slate-800">{wh.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{wh.method} {wh.url}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase flex-shrink-0">
                    Active
                  </span>
                  <button
                    onClick={() => handleDeleteWebhook(wh.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
                    title="Remove webhook"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }

        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .animate-modal-in { animation: modal-in 0.2s ease-out; }
      `}</style>
    </AppLayout>
  );
}

import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import integrationService from "../services/integrationService";
import { Puzzle, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function Integrations() {
  const [integrations, setIntegrations] = useState([
    { id: "zoom", name: "Zoom Meetings", description: "Host live virtual classes and meetings directly from the LMS.", connected: false, icon: "📹" },
    { id: "slack", name: "Slack", description: "Send automated notifications and course updates to Slack channels.", connected: true, icon: "💬" },
    { id: "github", name: "GitHub", description: "Link repositories to course assignments for automatic evaluation.", connected: false, icon: "💻" },
    { id: "stripe", name: "Stripe", description: "Accept payments for premium courses and certifications.", connected: false, icon: "💳" }
  ]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    // API load is simulated since initial state has the data structure
    try {
      const data = await integrationService.getAll();
      if (data && data.length > 0) setIntegrations(data);
    } catch (_) {
      // Keep initial state
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const toggleIntegration = async (id, currentStatus) => {
    setLoading(true);
    const newStatus = !currentStatus;
    
    try {
      await integrationService.update(id, { connected: newStatus });
      setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: newStatus } : i));
      showToast(`Integration ${newStatus ? 'connected' : 'disconnected'} successfully!`);
    } catch (err) {
      // Optimistic update
      setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: newStatus } : i));
      showToast(`Integration updated locally (API unavailable).`, "info");
    } finally {
      setLoading(false);
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Integrations & Add-ons</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Connect external services like Zoom, Slack, or GitHub to sync training schedules and repositories.
            </p>
          </div>
          <button
            onClick={loadIntegrations}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map(integration => (
            <div key={integration.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-inner">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{integration.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mt-1 inline-block ${
                      integration.connected ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {integration.connected ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                </div>
                
                {/* Custom Toggle Switch */}
                <button
                  onClick={() => toggleIntegration(integration.id, integration.connected)}
                  disabled={loading}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C1D5F] focus-visible:ring-offset-2 ${
                    integration.connected ? 'bg-[#6C1D5F]' : 'bg-slate-200'
                  }`}
                  role="switch"
                  aria-checked={integration.connected}
                >
                  <span className="sr-only">Toggle {integration.name}</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      integration.connected ? 'translate-x-2' : '-translate-x-2'
                    }`}
                  />
                </button>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                {integration.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  className="text-xs font-semibold text-[#6C1D5F] hover:text-[#4A1E47] transition-colors cursor-pointer disabled:opacity-50"
                  disabled={!integration.connected}
                >
                  Configure Settings &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

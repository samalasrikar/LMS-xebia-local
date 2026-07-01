import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import scheduleService from "../services/scheduleService";
import { Calendar, Plus, Edit2, Trash2, X, Save, CheckCircle, AlertCircle, Video } from "lucide-react";

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({ title: "", type: "Live Session", date: "", time: "", duration: "60" });
  const [submitting, setSubmitting] = useState(false);
  
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await scheduleService.getAll();
      setEvents(data || []);
    } catch (_) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({ title: "", type: "Live Session", date: "", time: "", duration: "60" });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      type: event.type || "Live Session",
      date: event.date || "",
      time: event.time || "",
      duration: event.duration?.toString() || "60"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingEvent) {
        const updated = await scheduleService.update(editingEvent.id, form);
        setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? (updated || { ...ev, ...form }) : ev));
        showToast("Event updated successfully!");
      } else {
        const created = await scheduleService.create(form);
        setEvents(prev => [...prev, created || { id: Date.now(), ...form }]);
        showToast("Event created successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingEvent) {
        setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...form } : ev));
        showToast("Event updated locally (API unavailable).", "info");
      } else {
        setEvents(prev => [...prev, { id: Date.now(), ...form }]);
        showToast("Event created locally (API unavailable).", "info");
      }
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await scheduleService.delete(deleteTarget.id);
    } catch (_) {}
    setEvents(prev => prev.filter(ev => ev.id !== deleteTarget.id));
    showToast("Event removed.");
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
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Schedule & Calendar</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Plan live sessions, webinar bootcamps, and cohort schedules.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus size={14} /> Schedule Event
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex items-center justify-center text-slate-400 text-xs">
            Loading schedule...
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <Calendar size={24} className="text-indigo-600" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">No scheduled events</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Schedule virtual classes, cohorts, or deadlines. Learners will see these on their calendars.
            </p>
            <button
              onClick={openAddModal}
              className="mt-6 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Schedule First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="p-5 border-b border-slate-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex flex-shrink-0 items-center justify-center">
                    {event.type === "Live Session" ? <Video size={18} className="text-indigo-600" /> : <Calendar size={18} className="text-indigo-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm truncate">{event.title}</h3>
                    <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{event.type}</p>
                  </div>
                </div>
                <div className="px-5 py-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-700">{event.date || "No Date"}</span>
                    <span className="text-[10px] text-slate-500">{event.time || "No Time"} • {event.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(event)}
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
                {editingEvent ? "Edit Event" : "Schedule Event"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Event Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Q3 Roadmap Review"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Event Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
                  >
                    <option>Live Session</option>
                    <option>Webinar</option>
                    <option>Deadline</option>
                    <option>Cohort Meeting</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Time *</label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Duration (mins)</label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={form.duration}
                    onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] disabled:bg-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <Save size={14} />
                  {submitting ? "Saving..." : editingEvent ? "Update Event" : "Schedule Event"}
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
            <h3 className="font-bold text-slate-800 text-sm mb-1">Cancel Event</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to cancel <strong>{deleteTarget.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer">Keep Event</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg text-xs font-semibold cursor-pointer">Cancel Event</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

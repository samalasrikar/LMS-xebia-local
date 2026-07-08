import { useState } from "react";
import { PlayCircle, Calendar, CheckCircle2, AlertCircle, Plus, Search, Filter, Download, X } from "lucide-react";

export default function BatchManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [batches, setBatches] = useState([
    { id: 1, name: "Cohort A (Q3)", course: "Advanced Cloud Architecture", trainer: "Sarah Jenkins", learners: 42, timeline: "Oct 01 - Dec 24, 2026", status: "Active" },
    { id: 2, name: "UI Bootcamp (Batch 4)", course: "Advanced UI Design Systems", trainer: "Arjun Mehta", learners: 35, timeline: "Oct 10 - Nov 28, 2026", status: "Active" },
    { id: 3, name: "AWS Foundations", course: "AWS Cloud Deployments", trainer: "Maria Davis", learners: 80, timeline: "Nov 05 - Dec 15, 2026", status: "Upcoming" },
    { id: 4, name: "Leadership 101", course: "Leadership & Empathy", trainer: "John Smith", learners: 25, timeline: "Sep 01 - Sep 30, 2026", status: "Completed" }
  ]);

  const [newBatch, setNewBatch] = useState({ name: "", course: "", trainer: "", learners: 0, timeline: "", status: "Active" });

  const handleCreateBatch = (e) => {
    e.preventDefault();
    setBatches([...batches, { ...newBatch, id: Date.now() }]);
    setShowCreateModal(false);
    setNewBatch({ name: "", course: "", trainer: "", learners: 0, timeline: "", status: "Active" });
  };

  const filteredBatches = batches.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Batch Management</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Oversee and coordinate active learning cohorts across various programs.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Create Batch</span>
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PlayCircle size={18} />
          </div>
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Active Batches</span>
            <h3 className="text-[20px] font-extrabold text-slate-800 mt-0.5">24</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Upcoming Batches</span>
            <h3 className="text-[20px] font-extrabold text-slate-800 mt-0.5">12</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Completed</span>
            <h3 className="text-[20px] font-extrabold text-slate-800 mt-0.5">158</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
            <AlertCircle size={18} />
          </div>
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Pending Approvals</span>
            <h3 className="text-[20px] font-extrabold text-slate-800 mt-0.5">08</h3>
          </div>
        </div>
      </div>

      {/* Directory Filter & Search */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search batches, courses, or trainers..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3">Batch Name</th>
                <th className="p-3">Course</th>
                <th className="p-3">Trainer</th>
                <th className="p-3 text-center">Learners</th>
                <th className="p-3">Timeline</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px] text-slate-600">
              {filteredBatches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 font-semibold text-slate-800">{b.name}</td>
                  <td className="p-3 text-slate-500">{b.course}</td>
                  <td className="p-3 font-medium text-slate-800">{b.trainer}</td>
                  <td className="p-3 text-center font-semibold text-slate-800">{b.learners}</td>
                  <td className="p-3 text-slate-400">{b.timeline}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${
                      b.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                      b.status === "Upcoming" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-primary hover:underline cursor-pointer font-semibold">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Batch Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative bg-white w-full max-w-[448px] rounded-xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-[16px] font-bold text-slate-800">Create New Cohort</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cohort / Batch Name</label>
                <input
                  type="text"
                  required
                  value={newBatch.name}
                  onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                  placeholder="e.g. Cohort B (Q4)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Course Program</label>
                <input
                  type="text"
                  required
                  value={newBatch.course}
                  onChange={(e) => setNewBatch({ ...newBatch, course: e.target.value })}
                  placeholder="e.g. Advanced Cloud Architecture"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trainer Name</label>
                  <input
                    type="text"
                    required
                    value={newBatch.trainer}
                    onChange={(e) => setNewBatch({ ...newBatch, trainer: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Learners Size</label>
                  <input
                    type="number"
                    required
                    value={newBatch.learners}
                    onChange={(e) => setNewBatch({ ...newBatch, learners: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Timeline Schedule</label>
                <input
                  type="text"
                  required
                  value={newBatch.timeline}
                  onChange={(e) => setNewBatch({ ...newBatch, timeline: e.target.value })}
                  placeholder="e.g. Nov 10 - Dec 28, 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-[12px] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[12px] font-semibold cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 size={13} />
                  <span>Create</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Users, Activity, CheckCircle, Clock, Search, Filter, Plus, Download, Upload, CheckCircle2 } from "lucide-react";
import assignmentService from "@/features/assignments/services/assignmentService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

export default function LearnersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [showAddModal, setShowAddModal] = useState(false);
  const [learners, setLearners] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, activeStudents: 0, completedStudents: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    assignmentService.getStudentsStats().then(res => {
      if (res && res.data) {
        setStats(res.data);
      }
    }).catch(() => {});
  }, [showAddModal]);

  useEffect(() => {
    assignmentService.getStudentsPaginated({
      q: searchQuery,
      dept: deptFilter,
      page: currentPage,
      size: itemsPerPage
    }).then(res => {
      if (res && res.data) {
        const pageData = res.data;
        setTotalPages(pageData.totalPages || 1);
        setTotalElements(pageData.totalElements || 0);
        setLearners((pageData.content || []).map(l => ({
          id: l.id,
          name: l.name,
          email: l.email || `${l.name.toLowerCase().replace(" ", ".")}@xebia.com`,
          dept: l.dept || "Engineering",
          course: l.course || "Cloud Native Engineering",
          progress: l.progress || 0,
          hours: l.hours || "0h",
          status: l.status || "Active"
        })));
      }
    });
  }, [searchQuery, deptFilter, currentPage, showAddModal]);

  const [newLearner, setNewLearner] = useState({ name: "", email: "", dept: "Engineering", course: "", progress: 0, hours: "0h", status: "Active" });

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(0);
  };

  const handleDeptFilterChange = (val) => {
    setDeptFilter(val);
    setCurrentPage(0);
  };

  const filteredLearners = learners;

  const handleAddLearner = (e) => {
    e.preventDefault();
    const studentData = {
      name: newLearner.name,
      email: newLearner.email,
      dept: newLearner.dept,
      course: newLearner.course,
      progress: newLearner.progress,
      hours: newLearner.hours,
      status: newLearner.status,
      batch: "Cohort A (Q3)"
    };
    assignmentService.createStudent(studentData).then(() => {
      setShowAddModal(false);
      setNewLearner({ name: "", email: "", dept: "Engineering", course: "", progress: 0, hours: "0h", status: "Active" });
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and top buttons */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Learners</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Manage, import, and review learner enrollment metrics across departments.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 cursor-pointer">
            <Upload size={13} />
            <span>Import</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 cursor-pointer">
            <Download size={13} />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Learner</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Total Learners</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.totalStudents}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Active Learners</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.activeStudents}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Activity size={18} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Completed Courses</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.completedStudents}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <CheckCircle size={18} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Learning Hours</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">248,312</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, ID or email..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          {/* Department Select */}
          <Select value={deptFilter} onValueChange={handleDeptFilterChange}>
            <SelectTrigger className="h-8 w-44 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] rounded-lg hover:bg-slate-100 transition-all font-semibold select-none flex items-center gap-1.5 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
              <span className="flex items-center gap-1.5">
                <Filter size={11} className="text-slate-400" />
                <SelectValue placeholder="Department" />
              </span>
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-250 shadow-md">
              <SelectItem value="All Departments">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Learners Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3">Learner</th>
                <th className="p-3">Department</th>
                <th className="p-3">Course</th>
                <th className="p-3">Progress</th>
                <th className="p-3 text-center">Study Hours</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px] text-slate-600">
              {filteredLearners.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{l.name}</div>
                    <div className="text-[10px] text-slate-400">{l.email}</div>
                  </td>
                  <td className="p-3">{l.dept}</td>
                  <td className="p-3 font-medium text-slate-700 max-w-[200px] truncate">{l.course || "No courses assigned"}</td>
                  <td className="p-3 min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                        <div className="bg-primary h-full" style={{ width: `${l.progress}%` }}></div>
                      </div>
                      <span className="font-semibold text-slate-700 text-[11px]">{l.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-center font-semibold text-slate-800">{l.hours}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${l.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                      {l.status}
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
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-4 py-3 border-t border-slate-200 bg-slate-50/50">
            <span>Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalElements)} of {totalElements} entries</span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
                className="px-3 py-1 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer text-[12px] font-semibold transition-all"
              >
                Prev
              </button>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}
                className="px-3 py-1 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer text-[12px] font-semibold transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Learner Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-[448px] rounded-xl shadow-2xl bg-white border border-slate-200 p-6 flex flex-col gap-4">
          <DialogHeader className="pb-2 border-b border-slate-100">
            <DialogTitle className="text-[16px] font-bold text-slate-800">Add New Learner</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddLearner} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={newLearner.name}
                onChange={(e) => setNewLearner({ ...newLearner, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={newLearner.email}
                onChange={(e) => setNewLearner({ ...newLearner, email: e.target.value })}
                placeholder="e.g. john.doe@xebia.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 flex flex-col">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department</label>
                <Select
                  value={newLearner.dept}
                  onValueChange={(val) => setNewLearner({ ...newLearner, dept: val })}
                >
                  <SelectTrigger className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 h-9 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-250 shadow-md">
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Initial Course</label>
                <input
                  type="text"
                  value={newLearner.course}
                  onChange={(e) => setNewLearner({ ...newLearner, course: e.target.value })}
                  placeholder="e.g. AWS Basics"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-[12px] font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[12px] font-semibold cursor-pointer flex items-center gap-1"
              >
                <CheckCircle2 size={13} />
                <span>Save Learner</span>
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

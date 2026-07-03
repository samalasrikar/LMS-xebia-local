import { Calendar, Download, Users, TrendingUp, Timer, Heart, Sparkles, MoreVertical, ArrowRight, Eye, Inbox } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

export default function FresherJourney() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        {/* Dashboard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900">Fresher Journey</h1>
            <p className="text-slate-500 text-[13px] mt-1">Monitor onboarding performance and trainee milestones across the institution.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 gap-2 shadow-sm">
              <Calendar size={14} className="text-slate-400" />
              <span className="text-[12px] font-medium text-slate-700">Oct 1, 2023 - Oct 31, 2023</span>
            </div>
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-sm text-[12px]">
              <Download size={14} className="text-slate-500" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Freshers</span>
                <h4 className="text-[24px] font-bold text-slate-900">486</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F]">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="text-red-500 text-xs font-bold">-0.8%</span>
              <span className="text-[11px] text-slate-400">from last month</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Onboarding Progress</span>
                <h4 className="text-[24px] font-bold text-slate-900">78.5%</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="text-emerald-600 text-xs font-bold">+1.2%</span>
              <span className="text-[11px] text-slate-400">vs target</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Time to Competency</span>
                <h4 className="text-[24px] font-bold text-slate-900">42 Days</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Timer size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="text-slate-500 text-xs font-bold">Stable</span>
              <span className="text-[11px] text-slate-400">benchmarking</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Retention Rate</span>
                <h4 className="text-[24px] font-bold text-slate-900">94.2%</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-600">
                <Heart size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="text-emerald-600 text-xs font-bold">+0.5%</span>
              <span className="text-[11px] text-slate-400">year over year</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Journey Funnel Chart Container */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-md font-bold text-slate-950">Journey Funnel</h2>
                <p className="text-xs text-slate-500">Visualizing the progression stages of new freshers.</p>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 opacity-80 w-full h-[320px]">
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-slate-400 bg-slate-100 rounded-full">
                  <TrendingUp size={22} className="text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Aggregating funnel data...</p>
                <p className="text-xs text-slate-400 mt-1">Pending Model Selection</p>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="bg-[#6C1D5F] text-white rounded-lg p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={20} className="text-white" />
                <h3 className="text-lg font-bold">Journey Insights</h3>
              </div>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="font-bold text-sm mb-1">Optimization Opportunity</p>
                    <p className="text-xs opacity-90 leading-relaxed">Processing recent performance data to identify bottlenecks in the Phase 2 transition...</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="font-bold text-sm mb-1">Retention Signal</p>
                    <p className="text-xs opacity-90 leading-relaxed">Predictive analysis suggests high alignment in the current cohort based on initial assessment scores.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="font-bold text-sm mb-1">Benchmark Comparison</p>
                    <p className="text-xs opacity-90 leading-relaxed">Competency curve is currently aligning with the institution's historical 5-year average.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full text-center text-white font-bold text-xs hover:underline">View All Insights</button>
            </div>
          </div>

          {/* Performance Trend Chart Container */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-md font-bold text-slate-950">Performance Trend</h2>
                <p className="text-xs text-slate-500">Monthly average performance score vs completion rate.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-4 text-[11px] font-semibold text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6C1D5F]"></div>
                  <span className="uppercase tracking-wider">Score</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-2"></div>
                  <span className="uppercase tracking-wider">Completion</span>
                </div>
                <select className="bg-slate-50 border border-slate-200 rounded text-xs px-2 py-1 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F]">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
            </div>
            <div className="p-6 flex-1">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 opacity-80 h-[280px]">
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-slate-400 bg-slate-100 rounded-full">
                  <TrendingUp size={22} className="text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Rendering trends...</p>
                <p className="text-xs text-slate-400 mt-1">Pending Model Selection</p>
              </div>
            </div>
          </div>

          {/* Recent Freshers Table */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-md font-bold text-slate-950">Recent Onboarded Freshers</h2>
              <button className="text-[#6C1D5F] font-bold text-xs flex items-center gap-1 hover:underline">
                <span>View Full Directory</span>
                <ArrowRight size={12} />
              </button>
            </div>
            <div className="p-6 flex-1">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="pb-4">Student Name</th>
                      <th className="pb-4">Department</th>
                      <th className="pb-4">Start Date</th>
                      <th className="pb-4">Progress</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center text-xs font-bold text-[#6C1D5F]">JD</div>
                          <div>
                            <p className="font-bold text-slate-900">Jane Doe</p>
                            <p className="text-[11px] text-slate-400 font-medium">ID: #FR-8821</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-xs text-slate-600">Computer Science</td>
                      <td className="py-4 text-xs text-slate-600">Oct 12, 2023</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-[#6C1D5F] h-1.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#6C1D5F]/10 text-[#6C1D5F]">ACTIVE</span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 text-right">
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400 hover:text-slate-600">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">MS</div>
                          <div>
                            <p className="font-bold text-slate-900">Marcus Smith</p>
                            <p className="text-[11px] text-slate-400 font-medium">ID: #FR-8822</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-xs text-slate-600">Business Admin</td>
                      <td className="py-4 text-xs text-slate-600">Oct 15, 2023</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-[#6C1D5F] h-1.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">IN_REVIEW</span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 text-right">
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400 hover:text-slate-600">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">AL</div>
                          <div>
                            <p className="font-bold text-slate-900">Aria Lee</p>
                            <p className="text-[11px] text-slate-400 font-medium">ID: #FR-8823</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-xs text-slate-600">Visual Design</td>
                      <td className="py-4 text-xs text-slate-600">Oct 18, 2023</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">ADVANCING</span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 text-right">
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400 hover:text-slate-600">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-12 flex flex-col items-center justify-center text-slate-400 opacity-60">
                <Inbox size={32} className="mb-2" />
                <p className="text-xs">Syncing additional trainee records...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
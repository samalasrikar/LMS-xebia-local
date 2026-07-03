import { Filter, BarChart3, AlertCircle, CheckSquare, AlertTriangle, Grid, Lightbulb, TrendingUp, Clock, Eye } from "lucide-react";
import useScrollToSection from "../../hooks/useScrollToSection";

export default function SkillGap() {
  useScrollToSection();

  return (
    <div className="max-w-[1400px] mx-auto w-full space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[21px] font-bold text-slate-900">Skill Gap Analysis</h1>
          <p className="text-slate-550 text-[13px] mt-1">Identify and address competency deficits across teams.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 font-medium text-[12px] text-slate-650 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] w-48 shadow-sm cursor-pointer">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Business Analytics</option>
            <option>UX Research</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 font-medium text-[12px] text-slate-650 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] w-48 shadow-sm cursor-pointer">
            <option>Last 6 Months</option>
            <option>Academic Year 2023</option>
            <option>Quarterly Review</option>
          </select>
          <button className="bg-slate-100 border border-slate-200 p-2.5 rounded-lg text-slate-650 hover:text-slate-950 hover:bg-slate-200 transition-colors shadow-sm cursor-pointer">
            <Filter size={14} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div id="current-skills" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover-lift">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Skill Score</span>
            <div className="p-2 bg-[#6C1D5F]/10 rounded-lg text-[#6C1D5F]">
              <BarChart3 size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">4.1 / 5.0</div>
            <div className="mt-2 flex items-center gap-1 text-slate-400">
              <AlertCircle size={14} className="text-slate-400" />
              <span className="text-[11px]">Pending sync</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover-lift">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Identified Gaps</span>
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <AlertCircle size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">12 Gaps</div>
            <div className="mt-2 flex items-center gap-1 text-red-500 font-medium">
              <TrendingUp size={14} className="text-red-500" />
              <span className="text-[11px]">Requires attention</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover-lift">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Learning Completion</span>
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <CheckSquare size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">84.5%</div>
            <div className="mt-2 flex items-center gap-1 text-slate-400">
              <Clock size={14} className="text-slate-400" />
              <span className="text-[11px]">Current tracking</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover-lift">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Critical Roles Gap</span>
              <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                <AlertTriangle size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">3 Roles</div>
            <div className="mt-2 flex items-center gap-1 text-slate-400">
              <Eye size={14} className="text-slate-400" />
              <span className="text-[11px]">Strategic monitor</span>
            </div>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill Proficiency Heatmap */}
          <div id="required-skills" className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-md font-bold text-slate-950">Skill Proficiency Heatmap</h2>
              <div className="flex gap-2.5 items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Proficiency</span>
                <span className="w-3 h-3 rounded-sm bg-[#6C1D5F]/20"></span>
                <span className="w-3 h-3 rounded-sm bg-[#6C1D5F]/60"></span>
                <span className="w-3 h-3 rounded-sm bg-[#6C1D5F]"></span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              {/* Heatmap Grid */}
              <div className="grid grid-cols-5 gap-2 text-center text-xs font-semibold">
                <div></div>
                <div className="text-slate-500 py-1 text-[11px]">Python</div>
                <div className="text-slate-500 py-1 text-[11px]">React</div>
                <div className="text-slate-500 py-1 text-[11px]">UI/UX</div>
                <div className="text-slate-500 py-1 text-[11px]">DevOps</div>

                <div className="text-left font-bold text-slate-700 py-2 text-[11px]">Engineering</div>
                <div className="bg-[#6C1D5F] text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">90%</div>
                <div className="bg-[#6C1D5F] text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">85%</div>
                <div className="bg-[#6C1D5F]/40 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">40%</div>
                <div className="bg-[#6C1D5F]/60 text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">65%</div>

                <div className="text-left font-bold text-slate-700 py-2 text-[11px]">Design</div>
                <div className="bg-[#6C1D5F]/20 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">25%</div>
                <div className="bg-[#6C1D5F]/40 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">45%</div>
                <div className="bg-[#6C1D5F] text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">95%</div>
                <div className="bg-[#6C1D5F]/20 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">15%</div>

                <div className="text-left font-bold text-slate-700 py-2 text-[11px]">Marketing</div>
                <div className="bg-[#6C1D5F]/40 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">50%</div>
                <div className="bg-[#6C1D5F]/20 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">20%</div>
                <div className="bg-[#6C1D5F]/60 text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">70%</div>
                <div className="bg-[#6C1D5F]/20 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">10%</div>

                <div className="text-left font-bold text-slate-700 py-2 text-[11px]">Product Mgt</div>
                <div className="bg-[#6C1D5F]/60 text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">60%</div>
                <div className="bg-[#6C1D5F]/60 text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">60%</div>
                <div className="bg-[#6C1D5F]/60 text-white p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">75%</div>
                <div className="bg-[#6C1D5F]/40 text-slate-800 p-2 rounded-md hover:scale-[1.03] transition-transform cursor-pointer flex items-center justify-center font-bold">55%</div>
              </div>
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 opacity-60 w-full h-[120px] mt-6">
                <div className="w-10 h-10 mb-2 flex items-center justify-center text-slate-400 bg-slate-100 rounded-full">
                  <Grid size={18} className="text-slate-400" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Interactive Heatmap loading...</p>
                <p className="text-[10px] text-slate-400 mt-1">Detailed breakdown by competency and team hierarchy will appear here.</p>
              </div>
            </div>
          </div>

          {/* Top Skill Shortages */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="px-6 py-4 border-b border-slate-200">
              <h4 className="text-md font-bold text-slate-950">Top Skill Shortages</h4>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6 p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Advanced Python</span>
                  <span className="font-bold text-red-500">Critical</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Project Management</span>
                  <span className="font-bold text-[#6C1D5F]">Moderate</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-[#6C1D5F] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Data Visualization</span>
                  <span className="font-bold text-blue-500">High</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Public Speaking</span>
                  <span className="font-bold text-emerald-600">Low</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table & Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Team-wise Skill Breakdown Table */}
          <div id="department-comparison" className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-md font-bold text-slate-950">Team-wise Skill Breakdown</h2>
              <div>
                <button className="text-[#6C1D5F] font-bold text-xs hover:underline">Export CSV</button>
              </div>
            </div>
            <div className="p-6 flex-1">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="pb-4">Team Name</th>
                      <th className="pb-4">Avg Score</th>
                      <th className="pb-4">Top Gap</th>
                      <th className="pb-4">Completion</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-800 font-bold">Engineering Hub</td>
                      <td className="py-4 text-sm text-slate-700">4.2 / 5</td>
                      <td className="py-4 text-xs text-slate-600">Cloud Architecture</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div className="w-[45%] h-full bg-[#6C1D5F] rounded-full"></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">45%</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#6C1D5F]/10 text-[#6C1D5F]">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-800 font-bold">Design Studio</td>
                      <td className="py-4 text-sm text-slate-700">4.5 / 5</td>
                      <td className="py-4 text-xs text-slate-600">Interaction Design</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div className="w-[82%] h-full bg-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">82%</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">Stable</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-800 font-bold">Marketing &amp; Comms</td>
                      <td className="py-4 text-sm text-slate-700">3.2 / 5</td>
                      <td className="py-4 text-xs text-slate-600">SEO Automation</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div className="w-[12%] h-full bg-red-500 rounded-full"></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">12%</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200">Critical</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm text-slate-800 font-bold">Human Resources</td>
                      <td className="py-4 text-sm text-slate-700">3.8 / 5</td>
                      <td className="py-4 text-xs text-slate-600">Data Compliance</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div className="w-[60%] h-full bg-[#6C1D5F] rounded-full"></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-600">60%</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#6C1D5F]/10 text-[#6C1D5F]">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Gap Insights Card */}
          <div id="recommendations" className="bg-[#6C1D5F] text-white rounded-lg p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb size={20} className="text-white" />
                <h3 className="text-lg font-bold">Gap Insights</h3>
              </div>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="text-xs opacity-90 leading-relaxed">AI-driven mapping suggests a 22% skills overlap between the Data and Engineering teams.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="text-xs opacity-90 leading-relaxed">Python proficiency has decreased by 5% since the last audit due to lack of advanced workshops.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="text-xs opacity-90 leading-relaxed">Upskilling completion in Soft Skills is outperforming technical tracks by 1.5x.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                  <div>
                    <p className="text-xs opacity-90 leading-relaxed">Recommended action: Prioritize "Cloud Security" for the DevOps role profile.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full py-3 bg-white text-[#6C1D5F] rounded-lg font-bold hover:bg-slate-50 transition-colors text-xs">Generate Full Report</button>
            </div>
          </div>
        </div>


      </div>
  );
}
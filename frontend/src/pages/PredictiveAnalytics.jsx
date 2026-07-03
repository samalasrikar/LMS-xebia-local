import { RefreshCw, TrendingDown, TrendingUp, CheckCircle, Activity, Compass, Lightbulb, ArrowRight, Filter, MoreVertical, Inbox } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

export default function PredictiveAnalytics() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        {/* Content Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900">Predictive Analytics</h1>
            <p className="text-slate-500 text-[13px] mt-1">Leveraging ML models to forecast academic performance and institutional risks.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ANALYSIS MODEL</label>
              <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] w-64 shadow-sm">
                <option>Academic Performance Predictor v2.1</option>
                <option>Churn Risk Assessment Model</option>
                <option>Resource Allocation Optimizer</option>
              </select>
            </div>
            <button className="bg-[#6C1D5F] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#4A1E47] transition-colors shadow-sm text-xs mt-4">
              <RefreshCw size={14} />
              <span>Run Simulation</span>
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-32 hover-lift">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Predicted Churn Risk</span>
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <TrendingDown size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">8.4%</div>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-32 hover-lift">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Est. Improvement</span>
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">+14.2%</div>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-32 hover-lift">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Projected Completion</span>
              <div className="p-2 bg-[#6C1D5F]/10 text-[#6C1D5F] rounded-lg">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">92.5%</div>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-32 hover-lift">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resource Forecast</span>
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Activity size={20} />
              </div>
            </div>
            <div className="text-[24px] font-bold text-slate-900">1.2x Eff.</div>
          </div>
        </div>

        {/* Main Analytics Bento */}
        <div className="grid grid-cols-12 gap-6">
          {/* Performance Prediction Model (Large Placeholder) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-md font-bold text-slate-950">Performance Prediction Model</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Comparative analysis of historical vs. projected student outcomes.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600">QUARTERLY</button>
                  <button className="px-3 py-1 text-[10px] font-bold text-slate-400 border border-slate-200 rounded-lg hover:bg-slate-50">ANNUAL</button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 opacity-80 h-[280px]">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center text-slate-400 bg-slate-100 rounded-full">
                    <Compass size={22} className="text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Chart visualization initializing...</p>
                  <p className="text-xs text-slate-400 mt-1">Pending Model Selection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Probability Distribution */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col justify-between">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-md font-bold text-slate-950">Risk Probability Distribution</h2>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 opacity-80 h-[200px]">
                  <div className="w-12 h-12 mb-2 flex items-center justify-center text-slate-400 bg-slate-100 rounded-full">
                    <Activity size={22} className="text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Distribution Map Loading...</p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">High Risk Zone</span>
                    <span className="text-red-500">Calculating...</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Insights Section */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="bg-[#6C1D5F] text-white rounded-lg p-6 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb size={20} className="text-white" />
                  <h3 className="text-lg font-bold">Predictive Insights</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                    <div>
                      <p className="text-xs opacity-90 leading-relaxed">Identifying correlation patterns between mid-term attendance and final exam success rates across STEM courses.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                    <div>
                      <p className="text-xs opacity-90 leading-relaxed">Anomaly detection flagged 12% shift in instructor engagement metrics for the Faculty of Social Sciences.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0"></div>
                    <div>
                      <p className="text-xs opacity-90 leading-relaxed">Predictive model suggests a potential 5% increase in retention if early-warning notifications are triggered by week 4.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="text-white font-bold text-xs flex items-center gap-2 hover:underline">
                  <span>Generate Full Strategy Report</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* High-Risk Employees Prediction Table */}
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col justify-between">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-md font-bold text-slate-950">High-Risk Students/Staff Prediction</h2>
                <div>
                  <button className="text-[#6C1D5F] font-bold text-xs flex items-center gap-1 hover:underline">
                    <Filter size={12} />
                    <span>Filter by Department</span>
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                        <th className="pb-4">IDENTIFIER</th>
                        <th className="pb-4">RISK SCORE</th>
                        <th className="pb-4">PROBABILITY</th>
                        <th className="pb-4">PRIMARY FACTOR</th>
                        <th className="pb-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      <tr className="hover:bg-slate-50 transition-colors text-slate-400 italic">
                        <td className="py-4">---</td>
                        <td className="py-4">---</td>
                        <td className="py-4">---</td>
                        <td className="py-4">---</td>
                        <td className="py-4 text-right text-[#6C1D5F] hover:underline cursor-pointer not-italic font-bold">
                          View Profile
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors text-slate-400 italic">
                        <td className="py-4">---</td>
                        <td className="py-4">---</td>
                        <td className="py-4">---</td>
                        <td className="py-4">---</td>
                        <td className="py-4 text-right text-[#6C1D5F] hover:underline cursor-pointer not-italic font-bold">
                          View Profile
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-lg text-center border border-slate-150">
                  <p className="text-xs text-slate-500 italic">Models are still training. No specific risk candidates identified for the current period.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </AppLayout>
  );
}
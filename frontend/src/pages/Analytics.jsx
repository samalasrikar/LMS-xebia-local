import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import analyticsService from "../services/analyticsService";
import { TrendingUp, Users, BookOpen, DollarSign, AlertCircle, RefreshCw, BarChart2 } from "lucide-react";

export default function Analytics() {
  const [metrics, setMetrics] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to fetch real analytics from API
      const metricsData = await analyticsService.getDashboardMetrics();
      const revData = await analyticsService.getRevenueData(timeRange);
      const enrollData = await analyticsService.getEnrollmentData(timeRange);
      
      setMetrics(metricsData || null);
      setRevenueData(revData || []);
      setEnrollmentData(enrollData || []);
    } catch (err) {
      console.warn("Analytics API unavailable, reverting to empty state.");
      // Render zero state instead of failing completely since API is missing
      setMetrics({
        totalLearners: 0,
        activeCourses: 0,
        completionRate: 0,
        revenue: 0
      });
      setRevenueData([]);
      setEnrollmentData([]);
      setError("Unable to reach analytics server. Displaying empty dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
        
        {error && (
          <div className="px-4 py-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl shadow-sm text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Monitor key performance indicators and engagement metrics.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#6C1D5F] cursor-pointer shadow-sm"
            >
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
            
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="flex items-center justify-center p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Key Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Learners</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users size={16} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? '—' : metrics?.totalLearners || 0}</div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Courses</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <BookOpen size={16} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? '—' : metrics?.activeCourses || 0}</div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completion Rate</span>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? '—' : `${metrics?.completionRate || 0}%`}</div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Revenue</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? '—' : `$${metrics?.revenue || 0}`}</div>
          </div>
        </div>

        {/* Charts & Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Revenue Chart Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-sm text-slate-800">Revenue Growth</h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] bg-slate-50/50 rounded-xl border border-dashed border-slate-200 p-6">
              {loading ? (
                <div className="text-xs text-slate-400">Loading chart data...</div>
              ) : revenueData.length === 0 ? (
                <div className="text-center flex flex-col items-center gap-2 text-slate-400">
                  <BarChart2 size={32} className="opacity-50" />
                  <p className="text-xs font-medium">No revenue data available for this period.</p>
                </div>
              ) : (
                <div className="w-full text-xs text-slate-400 flex flex-col h-full gap-2">
                   {revenueData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span>{d.date || `Point ${i}`}</span>
                         <span className="font-bold text-slate-700">${d.value || 0}</span>
                      </div>
                   ))}
                </div>
              )}
            </div>
          </div>

          {/* Enrollments Chart Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-sm text-slate-800">New Enrollments</h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] bg-slate-50/50 rounded-xl border border-dashed border-slate-200 p-6">
              {loading ? (
                <div className="text-xs text-slate-400">Loading chart data...</div>
              ) : enrollmentData.length === 0 ? (
                <div className="text-center flex flex-col items-center gap-2 text-slate-400">
                  <TrendingUp size={32} className="opacity-50" />
                  <p className="text-xs font-medium">No enrollment data available for this period.</p>
                </div>
              ) : (
                <div className="w-full text-xs text-slate-400 flex flex-col h-full gap-2">
                   {enrollmentData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span>{d.date || `Point ${i}`}</span>
                         <span className="font-bold text-slate-700">{d.value || 0} enrollments</span>
                      </div>
                   ))}
                </div>
              )}
            </div>
          </div>
          
        </div>

      </div>
    </AppLayout>
  );
}

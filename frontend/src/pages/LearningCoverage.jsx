import React, { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import CoverageFilters from "../components/learning/coverage/CoverageFilters";
import CoverageStatsGrid from "../components/learning/coverage/CoverageStatsGrid";
import CoverageCharts from "../components/learning/coverage/CoverageCharts";
import CoverageTable from "../components/learning/coverage/CoverageTable";
import {
  getCoverageSummary,
  getCoverageCharts,
  getCoverageTable,
} from "../services/learningService";
import { AlertTriangle, Loader2, RefreshCw, Database } from "lucide-react";

export default function LearningCoverage() {
  // Filters State
  const initialFilters = {
    search: "",
    datePreset: "All",
    region: "All",
    businessUnit: "All",
    department: "All",
    practice: "All",
  };
  const [filters, setFilters] = useState(initialFilters);

  // Data States
  const [summary, setSummary] = useState({});
  const [chartsData, setChartsData] = useState({});
  const [tableData, setTableData] = useState([]);

  // UI Status States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Developer Simulator States
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const loadData = async (filterParams = filters, errorSim = simulateError, emptySim = simulateEmpty) => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, chartsRes, tableRes] = await Promise.all([
        getCoverageSummary(filterParams, errorSim, emptySim),
        getCoverageCharts(filterParams, errorSim, emptySim),
        getCoverageTable(filterParams, errorSim, emptySim),
      ]);
      setSummary(summaryRes);
      setChartsData(chartsRes);
      setTableData(tableRes);
    } catch (err) {
      console.error("Dashboard Loading Error:", err);
      setError(err.message || "Something went wrong while fetching coverage analytics.");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when filters or simulator states change
  useEffect(() => {
    loadData(filters, simulateError, simulateEmpty);
  }, [filters, simulateError, simulateEmpty]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto w-full animate-fadeIn">
        {/* Dashboard Header with Sandbox Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#d5c1cc] shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-[#6C1D5F] tracking-tight">
              Learning Coverage Dashboard
            </h1>
            <p className="text-sm text-[#51434c] font-medium mt-1">
              Real-time tracking of employee enrollment, course completions, and capability metrics.
            </p>
          </div>

          {/* API Simulator Sandbox */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
              <Database size={12} className="text-[#6C1D5F]" />
              API Sandbox
            </span>
            <div className="flex gap-2">
              {/* Simulate Error Toggle */}
              <button
                onClick={() => setSimulateError(!simulateError)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                  simulateError
                    ? "bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a] shadow-xs"
                    : "bg-white border-slate-200 text-slate-600 hover:text-[#ba1a1a] hover:bg-slate-100"
                }`}
              >
                Simulate Error
              </button>

              {/* Simulate Empty Toggle */}
              <button
                onClick={() => setSimulateEmpty(!simulateEmpty)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                  simulateEmpty
                    ? "bg-amber-100 border-amber-500 text-amber-800 shadow-xs"
                    : "bg-white border-slate-200 text-slate-600 hover:text-amber-700 hover:bg-slate-100"
                }`}
              >
                Simulate Empty
              </button>

              {/* Manual Refresh */}
              <button
                onClick={() => loadData(filters, simulateError, simulateEmpty)}
                disabled={loading}
                className="p-1.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
                title="Refresh Analytics"
              >
                <RefreshCw size={14} className={loading ? "animate-spin text-[#6C1D5F]" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Filters Row */}
        <CoverageFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />

        {/* Loading Spinner Overlaid or Full Page */}
        {loading && !simulateError && Object.keys(summary).length === 0 ? (
          <div className="min-h-[400px] bg-white rounded-3xl border border-[#d5c1cc] flex flex-col items-center justify-center gap-3">
            <Loader2 size={36} className="text-[#6C1D5F] animate-spin" />
            <p className="text-sm font-semibold text-[#51434c] tracking-wide animate-pulse">
              Retrieving analytics models...
            </p>
          </div>
        ) : error ? (
          /* 2. Error Boundary Panel */
          <div className="min-h-[400px] bg-[#ffdad6]/20 rounded-3xl border border-[#ba1a1a]/30 p-8 flex flex-col items-center justify-center text-center max-w-[600px] mx-auto space-y-4">
            <div className="p-4 bg-[#ffdad6] rounded-full text-[#ba1a1a] animate-bounce">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#ba1a1a] uppercase tracking-wide">
                Something went wrong
              </h3>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                {error}
              </p>
            </div>
            <button
              onClick={() => loadData(filters, simulateError, simulateEmpty)}
              className="px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#6C1D5F]/90 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Normal Display Layer */
          <div className="space-y-8">
            {/* 3. Coverage KPI Cards */}
            <CoverageStatsGrid summary={summary} loading={loading} />

            {/* 4. Coverage Charts */}
            <CoverageCharts chartsData={chartsData} loading={loading} />

            {/* 5. Detailed Table Row */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <div>
                  <h3 className="text-lg font-bold text-[#6C1D5F]">Coverage Directory</h3>
                  <p className="text-xs text-[#51434c]">Granular learning path completion records</p>
                </div>
              </div>
              <CoverageTable employees={tableData} loading={loading} />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-[11px] text-[#83727c] font-medium pt-4 pb-2 border-t border-slate-200">
          <p>© 2026 Xebia LMS Enterprise. Premium Analytics v4.2.0</p>
          <div className="flex gap-6 mt-3 md:mt-0 uppercase tracking-widest">
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Security</span>
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">System Status</span>
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Help Desk</span>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}

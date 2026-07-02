import React from "react";
import { Award, Zap, Trophy, Medal } from "lucide-react";
import AppLayout from "../../../../components/layout/AppLayout";
import useDashboardData from "../../hooks/useDashboardData";
import DashboardContainer from "../../components/DashboardContainer";
import PageHeader from "../../components/PageHeader";
import FilterPanel from "../../components/filters/FilterPanel";
import ChampionCard from "../../components/cards/ChampionCard";
import BarChartCard from "../../components/charts/BarChartCard";
import ChampionTable from "../../components/tables/ChampionTable";
import SearchBar from "../../components/SearchBar";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorState from "../../components/ErrorState";
import EmptyState from "../../components/EmptyState";

export default function LearningChampions() {
  const {
    filters,
    setFilters,
    search,
    setSearch,
    resetFilters,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    isEmpty,
    setIsEmpty,
    paginatedChampions,
    championPage,
    setChampionPage,
    totalChampionPages,
    champions,
    kpis,
    charts
  } = useDashboardData();

  // Compile Leaderboard top 10 list from current filtered champions
  const leaderboardEmployees = React.useMemo(() => {
    return [...champions]
      .sort((a, b) => b.learningHours - a.learningHours || b.readinessScore - a.readinessScore)
      .slice(0, 10);
  }, [champions]);

  const breadcrumbs = [{ label: "Learning Champions" }];

  return (
    <AppLayout>
      <DashboardContainer>
      <PageHeader
        title="Learning Champions & Leaderboard"
        description="Celebrate our top learners, certifiers, and digital transformation champions across practices."
        breadcrumbs={breadcrumbs}
      />

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isError={isError}
        setIsError={setIsError}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
      />

      {isError ? (
        <ErrorState onRetry={resetFilters} />
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : isEmpty ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* ── Champion KPI Cards Row ────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ChampionCard
              title="Top Learners"
              value={kpis.champions.topLearners}
              type="learners"
            />
            <ChampionCard
              title="AI Champions"
              value={kpis.champions.aiChampionsCount}
              type="champions"
            />
            <ChampionCard
              title="Certified Employees"
              value={kpis.champions.certifiedEmployees}
              type="certified"
            />
            <ChampionCard
              title="Recognition Awards"
              value={kpis.champions.recognitionAwards}
              type="awards"
            />
          </div>

          {/* ── Visual Charts Row: Performance Distribution ────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BarChartCard
              title="Top 5 Learners (Hours)"
              subtitle="Highest self-paced learning time completed"
              data={charts.championLearningHours}
              xKey="name"
              bars={[{ key: "hours", color: "#6C1D5F", name: "Hours Completed" }]}
            />
            <BarChartCard
              title="Top 5 Readiness Scores"
              subtitle="Leading individual AI competency index scores"
              data={charts.championReadiness}
              xKey="name"
              bars={[{ key: "score", color: "#84117C", name: "Readiness Score (%)" }]}
            />
            <BarChartCard
              title="Top 5 Certifications Points"
              subtitle="Total points scored (20 pts per certification)"
              data={charts.championCertScore}
              xKey="name"
              bars={[{ key: "certs", color: "#01AC9F", name: "Certification Score" }]}
            />
          </div>

          {/* ── Leaderboard and Champion List Section ───────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top 10 Leaderboard Panel */}
            <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col">
              <div className="mb-6 flex items-center gap-2">
                <Trophy size={18} className="text-amber-500 fill-amber-500" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#6C1D5F]">Top 10 Learning Champions</h4>
                  <p className="text-[10px] text-[#83727c] font-semibold">Ranked by hours & AI readiness</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {leaderboardEmployees.length === 0 ? (
                  <div className="text-center py-12 text-[#83727c] text-xs font-semibold">
                    No leaderboard data available.
                  </div>
                ) : (
                  leaderboardEmployees.map((emp, index) => {
                    const isTop3 = index < 3;
                    const rankIcons = [
                      <Trophy size={14} className="text-amber-500 fill-amber-500" />,
                      <Medal size={14} className="text-slate-400 fill-slate-400" />,
                      <Medal size={14} className="text-amber-700 fill-amber-700" />
                    ];

                    return (
                      <div
                        key={emp.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#6C1D5F]/5 border border-slate-100 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs
                            ${isTop3 ? "bg-white shadow border border-slate-200" : "text-slate-500"}
                          `}>
                            {isTop3 ? rankIcons[index] : index + 1}
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-slate-800">{emp.name}</p>
                            <p className="text-[9px] text-[#83727c] font-bold">{emp.department} - {emp.bu}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-black text-[#6C1D5F]">{emp.learningHours} hrs</p>
                          <span className="inline-flex items-center gap-0.5 text-[8px] font-black bg-[#01AC9F]/10 text-[#01AC9F] px-1 rounded">
                            <Zap size={8} className="fill-[#01AC9F]" />
                            {emp.readinessScore}%
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Champions Data Table (Full search/pagination) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-extrabold text-[#6C1D5F]">Champions Registry</h4>
                  <p className="text-[10px] text-[#83727c] font-semibold">Verify training paths and milestones</p>
                </div>
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search champions..."
                />
              </div>

              <ChampionTable
                champions={paginatedChampions}
                currentPage={championPage}
                totalPages={totalChampionPages}
                onPageChange={setChampionPage}
              />
            </div>
          </div>
        </div>
      )}
      </DashboardContainer>
    </AppLayout>
  );
}

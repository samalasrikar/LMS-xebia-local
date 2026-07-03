import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  LayoutDashboard,
  BarChart3,
  Briefcase,
  GraduationCap,
  Target,
  LineChart,
  TrendingUp,
  Clock,
  FolderOpen,
  Brain,
  Award,
  BookOpen,
  Trophy,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  FileText,
  ChevronsLeft,
  ChevronsRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "../ui/button";

const ANALYTICS_CATEGORIES = [
  {
    id: "executive-summary",
    title: "Executive Summary",
    path: "/analytics/executive-summary",
    icon: LayoutDashboard,
    badgeCount: 4,
    reports: [
      { id: "organization-overview", title: "Organization Overview", keywords: ["learning reach", "delivery", "registrants", "active courses", "reach", "organizations", "overall"] },
      { id: "kpi-summary", title: "KPI Summary", keywords: ["kpi", "certifications", "ai readiness", "effectiveness", "metrics", "summary"] },
      { id: "enrollment-overview", title: "Enrollment Overview", keywords: ["enrollment", "trend", "active learners", "monthly", "charts", "tables"] },
      { id: "executive-insights", title: "Executive Insights", keywords: ["insights", "recommendations", "executive"] }
    ]
  },
  {
    id: "training-effectiveness",
    title: "Training Effectiveness",
    path: "/analytics/training-effectiveness",
    icon: BarChart3,
    badgeCount: 4,
    reports: [
      { id: "course-completion", title: "Course Completion", keywords: ["course completion", "rate", "completions", "effectiveness"] },
      { id: "assessment-performance", title: "Assessment Performance", keywords: ["assessment", "score", "grades", "exams"] },
      { id: "learner-engagement", title: "Learner Engagement", keywords: ["engagement", "active", "participation", "retention"] },
      { id: "learning-paths", title: "Learning Paths", keywords: ["path", "curriculum", "tracks", "journeys"] }
    ]
  },
  {
    id: "project-learning-investment",
    title: "Project Learning Investment",
    path: "/analytics/project-learning-investment",
    icon: Briefcase,
    badgeCount: 4,
    reports: [
      { id: "budget-allocation", title: "Budget Allocation", keywords: ["budget", "investment", "allocation", "spend", "cost"] },
      { id: "roi", title: "ROI", keywords: ["roi", "return", "value", "benefit"] },
      { id: "cost-analysis", title: "Cost Analysis", keywords: ["cost", "analysis", "expense", "utilization"] },
      { id: "resource-utilization", title: "Resource Utilization", keywords: ["resource", "utilization", "staff", "bench"] }
    ]
  },
  {
    id: "fresher-journey",
    title: "Fresher Journey",
    path: "/analytics/fresher-journey",
    icon: GraduationCap,
    badgeCount: 4,
    reports: [
      { id: "onboarding", title: "Onboarding", keywords: ["onboarding", "fresher", "new joiner", "hire"] },
      { id: "learning-journey", title: "Learning Journey", keywords: ["journey", "funnel", "pipeline", "academy"] },
      { id: "milestones", title: "Milestones", keywords: ["milestones", "achievements", "goals", "feedback"] },
      { id: "progress-timeline", title: "Progress Timeline", keywords: ["timeline", "progress", "days", "duration"] }
    ]
  },
  {
    id: "skill-gap",
    title: "Skill Gap Analysis",
    path: "/analytics/skill-gap",
    icon: Target,
    badgeCount: 4,
    reports: [
      { id: "current-skills", title: "Current Skills", keywords: ["current skills", "proficiency", "heatmap", "capability"] },
      { id: "required-skills", title: "Required Skills", keywords: ["required skills", "target", "competency", "breakdown"] },
      { id: "recommendations", title: "Recommendations", keywords: ["recommendations", "training suggestions", "gap"] },
      { id: "department-comparison", title: "Department Comparison", keywords: ["department comparison", "team", "division", "breakdown"] }
    ]
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    path: "/analytics/predictive-analytics",
    icon: LineChart,
    badgeCount: 4,
    reports: [
      { id: "at-risk-learners", title: "At-risk Learners", keywords: ["at-risk", "risk score", "churn", "drop-off"] },
      { id: "completion-prediction", title: "Completion Prediction", keywords: ["prediction", "forecast", "outcome", "projected"] },
      { id: "enrollment-forecast", title: "Enrollment Forecast", keywords: ["forecast", "enrollment", "probability", "model"] },
      { id: "ai-recommendations", title: "AI Recommendations", keywords: ["recommendations", "ai suggestions", "insights"] }
    ]
  },
  {
    id: "learning-coverage",
    title: "Learning Coverage",
    path: "/analytics/learning/coverage",
    icon: TrendingUp,
    badgeCount: 4,
    reports: [
      { id: "overall-coverage", title: "Overall Coverage", keywords: ["overall coverage", "metrics", "summary", "stats"] },
      { id: "department-coverage", title: "Department Coverage", keywords: ["department coverage", "division", "breakdown"] },
      { id: "course-coverage", title: "Course Coverage", keywords: ["course coverage", "project", "practice", "radar"] },
      { id: "batch-coverage", title: "Batch Coverage", keywords: ["batch coverage", "directory", "table", "employees"] }
    ]
  },
  {
    id: "learning-hours",
    title: "Learning Hours",
    path: "/analytics/learning/hours",
    icon: Clock,
    badgeCount: 4,
    reports: [
      { id: "total-hours", title: "Total Hours", keywords: ["total hours", "kpi", "mode", "distribution"] },
      { id: "department-hours", title: "Department Hours", keywords: ["department hours", "hours", "division", "breakdown"] },
      { id: "course-hours", title: "Course Hours", keywords: ["course hours", "practice", "top practices"] },
      { id: "weekly-trends", title: "Weekly Trends", keywords: ["weekly", "monthly", "trends", "growth"] }
    ]
  },
  {
    id: "learning-categories",
    title: "Learning Categories",
    path: "/analytics/learning/categories",
    icon: FolderOpen,
    badgeCount: 4,
    reports: [
      { id: "technical", title: "Technical", keywords: ["technical", "coding", "engineering", "cloud"] },
      { id: "leadership", title: "Leadership", keywords: ["leadership", "management", "soft skills"] },
      { id: "compliance", title: "Compliance", keywords: ["compliance", "security", "legal", "safety"] },
      { id: "soft-skills", title: "Soft Skills", keywords: ["soft skills", "communication", "presentation"] }
    ]
  },
  {
    id: "learning-trends",
    title: "Learning Trends",
    path: "/analytics/learning/trends",
    icon: LineChart,
    badgeCount: 4,
    reports: [
      { id: "monthly", title: "Monthly", keywords: ["monthly", "enrollments", "completions", "history"] },
      { id: "quarterly", title: "Quarterly", keywords: ["quarterly", "trends", "users", "growth"] },
      { id: "annual", title: "Annual", keywords: ["annual", "trends", "historical", "velocity"] },
      { id: "growth", title: "Growth", keywords: ["growth", "velocity", "active users", "momentum"] }
    ]
  },
  {
    id: "ai-transformation",
    title: "AI Transformation",
    path: "/analytics/ai-transformation",
    icon: Brain,
    badgeCount: 4,
    reports: [
      { id: "ai-adoption", title: "AI Adoption", keywords: ["adoption", "pilot", "production", "copilot"] },
      { id: "ai-learning", title: "AI Learning", keywords: ["learning", "hours", "guided", "self-paced"] },
      { id: "ai-readiness", title: "AI Readiness", keywords: ["readiness", "score", "index", "maturity"] },
      { id: "ai-insights", title: "AI Insights", keywords: ["insights", "champions", "heatmap"] }
    ]
  },
  {
    id: "certifications",
    title: "Certifications",
    path: "/analytics/certifications",
    icon: Award,
    badgeCount: 4,
    reports: [
      { id: "active", title: "Active", keywords: ["active", "certifications", "registry", "achieved"] },
      { id: "expired", title: "Expired", keywords: ["expired", "renewal", "compliance"] },
      { id: "renewals", title: "Renewals", keywords: ["renewals", "upcoming", "vouchers"] },
      { id: "success-rate", title: "Success Rate", keywords: ["success rate", "completion", "funnel", "pass rate"] }
    ]
  },
  {
    id: "flagship-programs",
    title: "Flagship Programs",
    path: "/analytics/flagship-programs",
    icon: BookOpen,
    badgeCount: 4,
    reports: [
      { id: "leadership", title: "Leadership", keywords: ["leadership", "academy", "program", "feedback"] },
      { id: "graduate", title: "Graduate", keywords: ["graduate", "program", "fresher", "cohort"] },
      { id: "internship", title: "Internship", keywords: ["internship", "program", "trainee"] },
      { id: "innovation", title: "Innovation", keywords: ["innovation", "domain", "distribution", "hours"] }
    ]
  },
  {
    id: "learning-champions",
    title: "Learning Champions",
    path: "/analytics/learning-champions",
    icon: Trophy,
    badgeCount: 4,
    reports: [
      { id: "top-learners", title: "Top Learners", keywords: ["top learners", "employees", "points", "leaderboard"] },
      { id: "top-trainers", title: "Top Trainers", keywords: ["top trainers", "instructors", "faculty"] },
      { id: "top-departments", title: "Top Departments", keywords: ["top departments", "readiness", "hours"] },
      { id: "leaderboard", title: "Leaderboard", keywords: ["leaderboard", "rank", "champions"] }
    ]
  }
];

export default function AnalyticsSidebar({
  loading = false,
  isCollapsed = false,
  onToggleCollapse,
  onRefresh,
  onAddCustomReport
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("lms_analytics_expanded_categories");
      return saved ? JSON.parse(saved) : { "executive-summary": true };
    } catch {
      return { "executive-summary": true };
    }
  });

  // Automatically expand category when navigating to it
  useEffect(() => {
    const currentCategory = ANALYTICS_CATEGORIES.find(
      (cat) => cat.path === location.pathname
    );
    if (currentCategory) {
      setExpandedCategories((prev) => {
        const next = { ...prev, [currentCategory.id]: true };
        localStorage.setItem("lms_analytics_expanded_categories", JSON.stringify(next));
        return next;
      });
    }
  }, [location.pathname]);

  const toggleExpand = (catId) => {
    setExpandedCategories((prev) => {
      const next = { ...prev, [catId]: !prev[catId] };
      localStorage.setItem("lms_analytics_expanded_categories", JSON.stringify(next));
      return next;
    });
  };

  const handleReportClick = (catPath, reportId) => {
    navigate(`${catPath}?report=${reportId}`);
  };

  // Extract query parameter to check which child is active
  const searchParams = new URLSearchParams(location.search);
  const activeReport = searchParams.get("report");

  // Search logic to search category titles, report titles, and indexed report keywords (KPIs, sections)
  const filteredCategories = searchQuery.trim()
    ? ANALYTICS_CATEGORIES.map((cat) => {
        const matchingReports = cat.reports.filter((rep) => {
          const matchTitle = rep.title.toLowerCase().includes(searchQuery.toLowerCase());
          const matchKeywords = rep.keywords.some((kw) =>
            kw.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return matchTitle || matchKeywords;
        });

        const catMatches = cat.title.toLowerCase().includes(searchQuery.toLowerCase());

        return {
          ...cat,
          reports: catMatches ? cat.reports : matchingReports
        };
      }).filter((cat) => cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || cat.reports.length > 0)
    : ANALYTICS_CATEGORIES;

  return (
    <aside className={`bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 ${
      isCollapsed ? "w-[60px]" : "w-[300px]"
    }`}>
      {isCollapsed ? (
        <>
          {/* ── Collapsed Header ── */}
          <div className="p-3 border-b border-slate-200/60 flex items-center justify-center shrink-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              aria-label="Expand Sidebar"
              className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          </div>

          {/* ── Collapsed Icons List ── */}
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-3 custom-scrollbar flex flex-col items-center select-none">
            {ANALYTICS_CATEGORIES.map((c) => {
              const CategoryIcon = c.icon;
              const isCategoryActive = location.pathname === c.path;
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(c.path)}
                  title={c.title}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-205 border-0 outline-none cursor-pointer ${
                    isCategoryActive
                      ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-bold"
                      : "text-slate-500 hover:bg-slate-100 hover:text-[#6C1D5F]"
                  }`}
                >
                  <CategoryIcon size={16} />
                </button>
              );
            })}
          </div>
          {/* ── Collapsed Back to Admin Switch ── */}
          <div className="flex-shrink-0 border-t border-[#d5c1cc]/60 p-3 bg-white flex justify-center w-full">
            <Link
              to="/admin"
              title="Back to Admin"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#6C1D5F] hover:bg-[#521347] text-white transition-all cursor-pointer shadow-sm shadow-[#6C1D5F]/15"
            >
              <ArrowLeft size={16} />
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* ── Header Toolbar ── */}
          <div className="p-4 border-b border-slate-200/60 flex flex-col gap-2.5 shrink-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Analytics Explorer
              </span>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onRefresh}
                  title="Refresh Dashboard"
                  aria-label="Refresh Dashboard"
                  className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onAddCustomReport}
                  title="Add Custom Report"
                  aria-label="Add Custom Report"
                  className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <Plus className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onToggleCollapse}
                  title="Collapse Sidebar"
                  aria-label="Collapse Sidebar"
                  className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <ChevronsLeft className="size-3.5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports, KPIs..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F] focus:border-[#6C1D5F] outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* ── Tree Categories Content ── */}
          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar select-none py-3 font-sans">
            {filteredCategories.map((c) => {
              const isExpanded = !!expandedCategories[c.id];
              const isCategoryActive = location.pathname === c.path;
              const CategoryIcon = c.icon;

              return (
                <div key={c.id} className="space-y-0.5 px-3">
                  <div
                    onClick={() => navigate(c.path)}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all border border-transparent ${
                      isCategoryActive
                        ? "bg-[#6C1D5F]/10 border border-[#6C1D5F]/10 font-semibold"
                        : "hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    {/* Collapse Chevron Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(c.id);
                      }}
                      className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-slate-650 hover:bg-slate-100 transition-all shrink-0"
                    >
                      {isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                    </button>

                    <CategoryIcon
                      size={13.5}
                      className={`shrink-0 ${isCategoryActive ? "text-[#6C1D5F]" : "text-slate-450"}`}
                    />

                    <span
                      className={`text-[12px] truncate flex-1 font-semibold ${
                        isCategoryActive ? "text-[#6C1D5F]" : "text-slate-700"
                      }`}
                    >
                      {c.title}
                    </span>

                    {/* Badges showing child reports count */}
                    <span className="text-[9.5px] font-bold text-slate-400 bg-slate-100 rounded-full px-1.5 py-0.5 shrink-0">
                      {c.badgeCount}
                    </span>
                  </div>

                  {/* Child Reports Tree Node (only if category expanded) */}
                  {isExpanded && (
                    <div className="ml-[21px] border-l border-slate-200/80 my-0.5">
                      {c.reports.map((r) => {
                        const isReportActive = isCategoryActive && activeReport === r.id;
                        return (
                          <div key={r.id} className="relative">
                            {/* Connector horizontal tick */}
                            <div className="absolute left-0 top-[14px] w-2.5 h-px bg-slate-200" />
                            <div
                              onClick={() => handleReportClick(c.path, r.id)}
                              className={`group/rep ml-2.5 mr-1.5 my-0.5 flex items-center gap-1.5 pl-2 pr-1.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                                isReportActive
                                  ? "bg-[#6C1D5F] text-white shadow-xs"
                                  : "hover:bg-white hover:shadow-xs"
                              }`}
                            >
                              <FileText
                                size={11}
                                className={`shrink-0 ${isReportActive ? "text-white" : "text-slate-400"}`}
                              />
                              <span
                                className={`text-[11.5px] truncate flex-1 ${
                                  isReportActive
                                    ? "font-semibold text-white"
                                    : "text-slate-600 group-hover/rep:text-slate-900"
                                }`}
                              >
                                {r.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredCategories.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-[11px] text-slate-400">No matching reports found</p>
              </div>
            )}
          </div>
          {/* ── Expanded Back to Admin Switch ── */}
          <div className="flex-shrink-0 border-t border-[#d5c1cc]/60 p-3 bg-white">
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12px] font-semibold transition-all shadow-sm shadow-[#6C1D5F]/15 hover:shadow-md cursor-pointer text-center w-full"
            >
              <ArrowLeft size={13} className="shrink-0" />
              <span>Back to Admin</span>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}

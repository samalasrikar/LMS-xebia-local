// Learning Trends Dashboard – Mock Data & Filter Logic

import {
  YEARS, QUARTERS, REGIONS, DEPARTMENTS, BUSINESS_UNITS, PRACTICES
} from "../../ai-certification/utils/mockData";

export { YEARS, QUARTERS, REGIONS, DEPARTMENTS, BUSINESS_UNITS, PRACTICES };

// Baseline monthly trend records
export const BASELINE_TRENDS = [
  { id: "TR001", month: "January", enrollments: 1850, completions: 1520, hours: 12400, activeUsers: 2100, newUsers: 320, dropoffRate: 8.2, avgSessionMin: 42, year: "2026" },
  { id: "TR002", month: "February", enrollments: 2100, completions: 1780, hours: 14200, activeUsers: 2350, newUsers: 380, dropoffRate: 7.5, avgSessionMin: 45, year: "2026" },
  { id: "TR003", month: "March", enrollments: 2480, completions: 2100, hours: 16800, activeUsers: 2680, newUsers: 450, dropoffRate: 6.8, avgSessionMin: 48, year: "2026" },
  { id: "TR004", month: "April", enrollments: 2750, completions: 2350, hours: 19200, activeUsers: 2950, newUsers: 410, dropoffRate: 6.2, avgSessionMin: 50, year: "2026" },
  { id: "TR005", month: "May", enrollments: 3200, completions: 2780, hours: 22500, activeUsers: 3400, newUsers: 520, dropoffRate: 5.8, avgSessionMin: 52, year: "2026" },
  { id: "TR006", month: "June", enrollments: 3650, completions: 3100, hours: 26000, activeUsers: 3800, newUsers: 580, dropoffRate: 5.2, avgSessionMin: 55, year: "2026" },
  { id: "TR007", month: "January", enrollments: 1200, completions: 950, hours: 8200, activeUsers: 1500, newUsers: 220, dropoffRate: 10.5, avgSessionMin: 35, year: "2025" },
  { id: "TR008", month: "February", enrollments: 1380, completions: 1100, hours: 9400, activeUsers: 1650, newUsers: 260, dropoffRate: 9.8, avgSessionMin: 37, year: "2025" },
  { id: "TR009", month: "March", enrollments: 1580, completions: 1300, hours: 10800, activeUsers: 1850, newUsers: 300, dropoffRate: 9.2, avgSessionMin: 39, year: "2025" },
  { id: "TR010", month: "April", enrollments: 1750, completions: 1450, hours: 12200, activeUsers: 2050, newUsers: 280, dropoffRate: 8.6, avgSessionMin: 41, year: "2025" },
  { id: "TR011", month: "May", enrollments: 1920, completions: 1620, hours: 13600, activeUsers: 2250, newUsers: 340, dropoffRate: 8.0, avgSessionMin: 43, year: "2025" },
  { id: "TR012", month: "June", enrollments: 2150, completions: 1800, hours: 15200, activeUsers: 2500, newUsers: 390, dropoffRate: 7.4, avgSessionMin: 44, year: "2025" }
];

// Filter helper
export function filterDataset(filters = {}, search = "") {
  const { year, quarter } = filters;

  let trends = [...BASELINE_TRENDS];

  if (year && year !== "All Years") {
    trends = trends.filter(t => t.year === year);
  }

  // Quarter maps to month ranges
  if (quarter && quarter !== "All Quarters") {
    const quarterMonths = {
      Q1: ["January", "February", "March"],
      Q2: ["April", "May", "June"],
      Q3: ["July", "August", "September"],
      Q4: ["October", "November", "December"]
    };
    const months = quarterMonths[quarter] || [];
    if (months.length > 0) {
      trends = trends.filter(t => months.includes(t.month));
    }
  }

  if (search) {
    const s = search.toLowerCase();
    trends = trends.filter(t =>
      t.month.toLowerCase().includes(s) ||
      t.id.toLowerCase().includes(s)
    );
  }

  // Trend seed for dynamic metrics
  const trendSeed = (year === "2026" ? 1.2 : year === "2024" ? 0.8 : 1.0) *
                    (quarter === "Q1" ? 0.95 : quarter === "Q2" ? 1.05 : 1.0);

  // KPIs
  const totalEnrollments = trends.reduce((sum, t) => sum + t.enrollments, 0);
  const totalCompletions = trends.reduce((sum, t) => sum + t.completions, 0);
  const completionRate = totalEnrollments > 0 ? Math.round((totalCompletions / totalEnrollments) * 100) : 0;
  const learningVelocity = Math.round(totalEnrollments / Math.max(trends.length, 1));
  const latestActive = trends.length > 0 ? trends[trends.length - 1].activeUsers : 0;
  const firstActive = trends.length > 0 ? trends[0].activeUsers : 1;
  const activeGrowth = firstActive > 0 ? Math.round(((latestActive - firstActive) / firstActive) * 100) : 0;
  const avgSession = trends.length > 0
    ? Math.round(trends.reduce((sum, t) => sum + t.avgSessionMin, 0) / trends.length)
    : 0;
  const engagementScore = Math.min(100, Math.round((completionRate * 0.4 + (100 - (trends.reduce((sum, t) => sum + t.dropoffRate, 0) / Math.max(trends.length, 1))) * 0.3 + Math.min(avgSession, 60) / 60 * 100 * 0.3)));

  const kpis = {
    totalEnrollments,
    completionRate,
    learningVelocity,
    activeGrowth: `+${activeGrowth}%`,
    avgSessionDuration: `${avgSession} min`,
    engagementScore
  };

  // Charts
  const enrollmentVsCompletion = trends.map(t => ({
    month: t.month.slice(0, 3),
    enrollments: t.enrollments,
    completions: t.completions
  }));

  const activeUsersGrowth = trends.map(t => ({
    month: t.month.slice(0, 3),
    activeUsers: t.activeUsers,
    newUsers: t.newUsers
  }));

  const monthlyLearningHours = trends.map(t => ({
    month: t.month.slice(0, 3),
    hours: t.hours
  }));

  const dropoffTrend = trends.map(t => ({
    month: t.month.slice(0, 3),
    rate: t.dropoffRate
  }));

  // Engagement score distribution (donut)
  const engagementDistribution = [
    { name: "Highly Engaged", value: Math.round(45 * trendSeed) },
    { name: "Moderately Engaged", value: Math.round(30 * trendSeed) },
    { name: "Low Engagement", value: Math.round(15 * trendSeed) },
    { name: "At Risk", value: Math.round(10 * trendSeed) }
  ];

  // Dept-wise monthly activity heatmap
  const heatmapData = [
    { department: "Engineering", capability: "Jan", score: Math.round(92 * trendSeed) },
    { department: "Engineering", capability: "Feb", score: Math.round(88 * trendSeed) },
    { department: "Engineering", capability: "Mar", score: Math.round(94 * trendSeed) },
    { department: "Engineering", capability: "Apr", score: Math.round(90 * trendSeed) },

    { department: "Consulting", capability: "Jan", score: Math.round(78 * trendSeed) },
    { department: "Consulting", capability: "Feb", score: Math.round(82 * trendSeed) },
    { department: "Consulting", capability: "Mar", score: Math.round(85 * trendSeed) },
    { department: "Consulting", capability: "Apr", score: Math.round(80 * trendSeed) },

    { department: "Product & Design", capability: "Jan", score: Math.round(70 * trendSeed) },
    { department: "Product & Design", capability: "Feb", score: Math.round(74 * trendSeed) },
    { department: "Product & Design", capability: "Mar", score: Math.round(78 * trendSeed) },
    { department: "Product & Design", capability: "Apr", score: Math.round(72 * trendSeed) },

    { department: "Sales & Marketing", capability: "Jan", score: Math.round(55 * trendSeed) },
    { department: "Sales & Marketing", capability: "Feb", score: Math.round(58 * trendSeed) },
    { department: "Sales & Marketing", capability: "Mar", score: Math.round(62 * trendSeed) },
    { department: "Sales & Marketing", capability: "Apr", score: Math.round(60 * trendSeed) },

    { department: "HR & Operations", capability: "Jan", score: Math.round(45 * trendSeed) },
    { department: "HR & Operations", capability: "Feb", score: Math.round(50 * trendSeed) },
    { department: "HR & Operations", capability: "Mar", score: Math.round(52 * trendSeed) },
    { department: "HR & Operations", capability: "Apr", score: Math.round(48 * trendSeed) }
  ];

  return {
    trends,
    kpis,
    charts: {
      enrollmentVsCompletion,
      activeUsersGrowth,
      monthlyLearningHours,
      dropoffTrend,
      engagementDistribution,
      heatmapData
    }
  };
}

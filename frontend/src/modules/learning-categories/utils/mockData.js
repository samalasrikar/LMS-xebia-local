// Learning Categories Dashboard – Mock Data & Filter Logic

import {
  YEARS, QUARTERS, REGIONS, DEPARTMENTS, BUSINESS_UNITS, PRACTICES
} from "../../ai-certification/utils/mockData";

export { YEARS, QUARTERS, REGIONS, DEPARTMENTS, BUSINESS_UNITS, PRACTICES };

// Baseline learning categories
export const BASELINE_CATEGORIES = [
  { id: "CAT001", name: "Generative AI & LLMs", type: "Technical", coursesCount: 24, enrollments: 1850, completions: 1540, completionRate: 83, avgRating: 4.8, totalHours: 12400, trending: true, region: "All Regions", department: "All Departments" },
  { id: "CAT002", name: "Cloud Architecture (AWS)", type: "Technical", coursesCount: 18, enrollments: 1420, completions: 1200, completionRate: 85, avgRating: 4.6, totalHours: 9800, trending: true, region: "All Regions", department: "All Departments" },
  { id: "CAT003", name: "Azure Cloud Solutions", type: "Technical", coursesCount: 15, enrollments: 1100, completions: 890, completionRate: 81, avgRating: 4.5, totalHours: 7600, trending: false, region: "All Regions", department: "All Departments" },
  { id: "CAT004", name: "DevOps & CI/CD", type: "Technical", coursesCount: 12, enrollments: 980, completions: 820, completionRate: 84, avgRating: 4.7, totalHours: 6500, trending: true, region: "All Regions", department: "All Departments" },
  { id: "CAT005", name: "Data Engineering & Pipelines", type: "Technical", coursesCount: 14, enrollments: 860, completions: 680, completionRate: 79, avgRating: 4.4, totalHours: 5800, trending: false, region: "All Regions", department: "All Departments" },
  { id: "CAT006", name: "Agile & Scrum Mastery", type: "Methodology", coursesCount: 10, enrollments: 1240, completions: 1120, completionRate: 90, avgRating: 4.7, totalHours: 4200, trending: false, region: "All Regions", department: "All Departments" },
  { id: "CAT007", name: "Leadership & Management", type: "Soft Skill", coursesCount: 8, enrollments: 720, completions: 650, completionRate: 90, avgRating: 4.5, totalHours: 3100, trending: false, region: "All Regions", department: "All Departments" },
  { id: "CAT008", name: "Full-Stack Development", type: "Technical", coursesCount: 16, enrollments: 1350, completions: 1080, completionRate: 80, avgRating: 4.6, totalHours: 8900, trending: true, region: "All Regions", department: "All Departments" },
  { id: "CAT009", name: "Cybersecurity Fundamentals", type: "Technical", coursesCount: 9, enrollments: 540, completions: 420, completionRate: 78, avgRating: 4.3, totalHours: 3600, trending: false, region: "All Regions", department: "All Departments" },
  { id: "CAT010", name: "Product Design Thinking", type: "Methodology", coursesCount: 6, enrollments: 480, completions: 400, completionRate: 83, avgRating: 4.8, totalHours: 2800, trending: false, region: "All Regions", department: "All Departments" },
  { id: "CAT011", name: "GCP Cloud Engineering", type: "Technical", coursesCount: 11, enrollments: 680, completions: 550, completionRate: 81, avgRating: 4.4, totalHours: 4500, trending: true, region: "All Regions", department: "All Departments" },
  { id: "CAT012", name: "Communication & Presentation", type: "Soft Skill", coursesCount: 5, enrollments: 390, completions: 360, completionRate: 92, avgRating: 4.6, totalHours: 1800, trending: false, region: "All Regions", department: "All Departments" }
];

// Filter helper
export function filterDataset(filters = {}, search = "") {
  const { year, quarter } = filters;

  let categories = [...BASELINE_CATEGORIES];

  if (search) {
    const s = search.toLowerCase();
    categories = categories.filter(c =>
      c.name.toLowerCase().includes(s) ||
      c.type.toLowerCase().includes(s) ||
      c.id.toLowerCase().includes(s)
    );
  }

  // Trend seed for dynamic metrics
  const trendSeed = (year === "2026" ? 1.2 : year === "2024" ? 0.8 : 1.0) *
                    (quarter === "Q1" ? 0.95 : quarter === "Q2" ? 1.05 : 1.0);

  // Apply trend seed to make metrics dynamic
  const scaledCategories = categories.map(c => ({
    ...c,
    enrollments: Math.round(c.enrollments * trendSeed),
    completions: Math.round(c.completions * trendSeed),
    totalHours: Math.round(c.totalHours * trendSeed)
  }));

  // KPIs
  const totalCategories = scaledCategories.length;
  const totalCourses = scaledCategories.reduce((sum, c) => sum + c.coursesCount, 0);
  const avgCompletionRate = totalCategories > 0
    ? Math.round(scaledCategories.reduce((sum, c) => sum + c.completionRate, 0) / totalCategories)
    : 0;
  const totalEnrollments = scaledCategories.reduce((sum, c) => sum + c.enrollments, 0);
  const topRatedScore = scaledCategories.length > 0
    ? Math.max(...scaledCategories.map(c => c.avgRating))
    : 0;
  const trendingCount = scaledCategories.filter(c => c.trending).length;

  const kpis = {
    totalCategories,
    totalCourses,
    avgCompletionRate,
    totalEnrollments,
    topRatedScore,
    trendingCount
  };

  // Charts
  // Category-wise enrollments bar chart
  const categoryEnrollments = scaledCategories
    .map(c => ({ name: c.name.length > 18 ? c.name.slice(0, 16) + "…" : c.name, enrollments: c.enrollments }))
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 8);

  // Category type distribution (donut)
  const typeMap = {};
  scaledCategories.forEach(c => {
    typeMap[c.type] = (typeMap[c.type] || 0) + c.enrollments;
  });
  const typeDistribution = Object.entries(typeMap).map(([name, value]) => ({ name, value }));

  // Monthly enrollment trend
  const enrollmentTrend = [
    { month: "Jan", enrollments: Math.round(1800 * trendSeed), completions: Math.round(1500 * trendSeed) },
    { month: "Feb", enrollments: Math.round(2100 * trendSeed), completions: Math.round(1750 * trendSeed) },
    { month: "Mar", enrollments: Math.round(2500 * trendSeed), completions: Math.round(2100 * trendSeed) },
    { month: "Apr", enrollments: Math.round(2900 * trendSeed), completions: Math.round(2400 * trendSeed) },
    { month: "May", enrollments: Math.round(3400 * trendSeed), completions: Math.round(2850 * trendSeed) },
    { month: "Jun", enrollments: Math.round(3900 * trendSeed), completions: Math.round(3300 * trendSeed) }
  ];

  // Completion rate by category (vertical bar)
  const completionByCategory = scaledCategories
    .map(c => ({ name: c.name.length > 16 ? c.name.slice(0, 14) + "…" : c.name, rate: c.completionRate }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 8);

  return {
    categories: scaledCategories,
    kpis,
    charts: {
      categoryEnrollments,
      typeDistribution,
      enrollmentTrend,
      completionByCategory
    }
  };
}

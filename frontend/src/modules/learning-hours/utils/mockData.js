// Learning Hours Dashboard – Mock Data & Filter Logic

import {
  YEARS, QUARTERS, REGIONS, DEPARTMENTS, BUSINESS_UNITS, PRACTICES
} from "../../ai-certification/utils/mockData";

export { YEARS, QUARTERS, REGIONS, DEPARTMENTS, BUSINESS_UNITS, PRACTICES };

// Baseline employee learning hour records
export const BASELINE_LEARNING_HOURS = [
  { id: "LH001", name: "Ananya Sharma", email: "ananya.sharma@xebia.com", department: "Engineering", region: "India", bu: "Data & AI", practice: "Generative AI", selfPacedHours: 68, guidedHours: 56, totalHours: 124, targetHours: 120, quarter: "Q1", year: "2026", status: "On Track" },
  { id: "LH002", name: "David Miller", email: "david.miller@xebia.com", department: "Consulting", region: "North America", bu: "Cloud & DevOps", practice: "AWS Cloud", selfPacedHours: 52, guidedHours: 46, totalHours: 98, targetHours: 100, quarter: "Q1", year: "2026", status: "On Track" },
  { id: "LH003", name: "Sophie Dubois", email: "sophie.dubois@xebia.com", department: "Product & Design", region: "Europe", bu: "Intelligent Platforms", practice: "Generative AI", selfPacedHours: 72, guidedHours: 38, totalHours: 110, targetHours: 100, quarter: "Q1", year: "2026", status: "Exceeded" },
  { id: "LH004", name: "Rajesh Kumar", email: "rajesh.kumar@xebia.com", department: "Engineering", region: "India", bu: "Software Engineering", practice: "Fullstack Dev", selfPacedHours: 45, guidedHours: 40, totalHours: 85, targetHours: 100, quarter: "Q2", year: "2026", status: "Behind" },
  { id: "LH005", name: "Yuki Tanaka", email: "yuki.tanaka@xebia.com", department: "Consulting", region: "Asia Pacific", bu: "Agile Transformation", practice: "All Practices", selfPacedHours: 38, guidedHours: 34, totalHours: 72, targetHours: 80, quarter: "Q1", year: "2025", status: "Behind" },
  { id: "LH006", name: "John Doe", email: "john.doe@xebia.com", department: "Engineering", region: "North America", bu: "Data & AI", practice: "Data Engineering", selfPacedHours: 82, guidedHours: 58, totalHours: 140, targetHours: 120, quarter: "Q1", year: "2026", status: "Exceeded" },
  { id: "LH007", name: "Marc Jansen", email: "marc.jansen@xebia.com", department: "Engineering", region: "Europe", bu: "Cloud & DevOps", practice: "DevOps Automation", selfPacedHours: 48, guidedHours: 44, totalHours: 92, targetHours: 100, quarter: "Q2", year: "2026", status: "On Track" },
  { id: "LH008", name: "Priya Patel", email: "priya.patel@xebia.com", department: "HR & Operations", region: "India", bu: "Intelligent Platforms", practice: "All Practices", selfPacedHours: 30, guidedHours: 34, totalHours: 64, targetHours: 80, quarter: "Q1", year: "2025", status: "Behind" },
  { id: "LH009", name: "Fatima Al-Sayed", email: "fatima.alsayed@xebia.com", department: "Consulting", region: "Middle East", bu: "Software Engineering", practice: "Fullstack Dev", selfPacedHours: 50, guidedHours: 38, totalHours: 88, targetHours: 90, quarter: "Q2", year: "2025", status: "On Track" },
  { id: "LH010", name: "Thomas Wright", email: "thomas.wright@xebia.com", department: "Sales & Marketing", region: "North America", bu: "Agile Transformation", practice: "All Practices", selfPacedHours: 28, guidedHours: 28, totalHours: 56, targetHours: 80, quarter: "Q1", year: "2026", status: "Behind" },
  { id: "LH011", name: "Aarav Mehta", email: "aarav.mehta@xebia.com", department: "Engineering", region: "India", bu: "Data & AI", practice: "Generative AI", selfPacedHours: 65, guidedHours: 50, totalHours: 115, targetHours: 110, quarter: "Q1", year: "2026", status: "Exceeded" },
  { id: "LH012", name: "Sarah Connor", email: "sarah.connor@xebia.com", department: "Product & Design", region: "North America", bu: "Software Engineering", practice: "Fullstack Dev", selfPacedHours: 58, guidedHours: 46, totalHours: 104, targetHours: 100, quarter: "Q2", year: "2026", status: "Exceeded" },
];

// Filter helper
export function filterDataset(filters = {}, search = "") {
  const { year, quarter, region, department, bu, practice } = filters;

  let records = [...BASELINE_LEARNING_HOURS];

  if (year && year !== "All Years") {
    records = records.filter(r => r.year === year);
  }
  if (quarter && quarter !== "All Quarters") {
    records = records.filter(r => r.quarter === quarter);
  }
  if (region && region !== "All Regions") {
    records = records.filter(r => r.region === region);
  }
  if (department && department !== "All Departments") {
    records = records.filter(r => r.department === department);
  }
  if (bu && bu !== "All BUs") {
    records = records.filter(r => r.bu === bu);
  }
  if (practice && practice !== "All Practices") {
    records = records.filter(r => r.practice === practice);
  }
  if (search) {
    const s = search.toLowerCase();
    records = records.filter(r =>
      r.name.toLowerCase().includes(s) ||
      r.email.toLowerCase().includes(s) ||
      r.id.toLowerCase().includes(s) ||
      r.practice.toLowerCase().includes(s)
    );
  }

  // Trend seed for dynamic metrics
  const trendSeed = (year === "2026" ? 1.2 : year === "2024" ? 0.8 : 1.0) *
                    (quarter === "Q1" ? 0.95 : quarter === "Q2" ? 1.05 : 1.0);

  // KPIs
  const totalHours = records.reduce((sum, r) => sum + r.totalHours, 0);
  const avgHours = records.length > 0 ? Math.round(totalHours / records.length) : 0;
  const selfPacedTotal = records.reduce((sum, r) => sum + r.selfPacedHours, 0);
  const selfPacedPct = totalHours > 0 ? Math.round((selfPacedTotal / totalHours) * 100) : 0;
  const targetTotal = records.reduce((sum, r) => sum + r.targetHours, 0);
  const targetAchievement = targetTotal > 0 ? Math.round((totalHours / targetTotal) * 100) : 0;
  const activeLearners = records.filter(r => r.totalHours > 0).length;

  const kpis = {
    totalHours,
    avgHoursPerEmployee: avgHours,
    selfPacedPct,
    targetAchievement,
    activeLearners,
    monthlyGrowth: `+${Math.round(12 * trendSeed)}%`
  };

  // Charts
  const monthlyHoursTrend = [
    { month: "Jan", selfPaced: Math.round(3200 * trendSeed), guided: Math.round(2100 * trendSeed) },
    { month: "Feb", selfPaced: Math.round(3800 * trendSeed), guided: Math.round(2500 * trendSeed) },
    { month: "Mar", selfPaced: Math.round(4500 * trendSeed), guided: Math.round(3100 * trendSeed) },
    { month: "Apr", selfPaced: Math.round(5200 * trendSeed), guided: Math.round(3800 * trendSeed) },
    { month: "May", selfPaced: Math.round(6100 * trendSeed), guided: Math.round(4200 * trendSeed) },
    { month: "Jun", selfPaced: Math.round(7500 * trendSeed), guided: Math.round(5000 * trendSeed) }
  ];

  // Department-wise aggregation
  const deptMap = {};
  records.forEach(r => {
    deptMap[r.department] = (deptMap[r.department] || 0) + r.totalHours;
  });
  const deptHours = Object.entries(deptMap)
    .map(([name, hours]) => ({ name, hours }))
    .sort((a, b) => b.hours - a.hours);

  // Practice-wise aggregation
  const practiceMap = {};
  records.forEach(r => {
    if (r.practice !== "All Practices") {
      practiceMap[r.practice] = (practiceMap[r.practice] || 0) + r.totalHours;
    }
  });
  const practiceHours = Object.entries(practiceMap)
    .map(([name, hours]) => ({ name, hours }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 6);

  // Learning mode distribution (donut)
  const modeDistribution = [
    { name: "Self-Paced", value: selfPacedTotal },
    { name: "Instructor-Guided", value: totalHours - selfPacedTotal }
  ];

  // Target vs actual by BU
  const buMap = {};
  records.forEach(r => {
    if (!buMap[r.bu]) buMap[r.bu] = { actual: 0, target: 0 };
    buMap[r.bu].actual += r.totalHours;
    buMap[r.bu].target += r.targetHours;
  });
  const buComparison = Object.entries(buMap)
    .map(([name, data]) => ({ name: name.length > 16 ? name.slice(0, 14) + "…" : name, actual: data.actual, target: data.target }));

  return {
    records,
    kpis,
    charts: {
      monthlyHoursTrend,
      deptHours,
      practiceHours,
      modeDistribution,
      buComparison
    }
  };
}

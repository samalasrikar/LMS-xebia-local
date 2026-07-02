// Premium Mock Data for AI & Certification Analytics Dashboards

export const YEARS = ["2026", "2025", "2024"];
export const QUARTERS = ["All Quarters", "Q1", "Q2", "Q3", "Q4"];
export const REGIONS = ["All Regions", "India", "North America", "Europe", "Asia Pacific", "Middle East"];
export const DEPARTMENTS = ["All Departments", "Engineering", "Consulting", "Product & Design", "Sales & Marketing", "HR & Operations"];
export const BUSINESS_UNITS = ["All BUs", "Cloud & DevOps", "Data & AI", "Software Engineering", "Agile Transformation", "Intelligent Platforms"];
export const PRACTICES = ["All Practices", "Generative AI", "Data Engineering", "AWS Cloud", "Azure Cloud", "GCP Cloud", "DevOps Automation", "Fullstack Dev"];

// Raw Baseline Champions
export const BASELINE_CHAMPIONS = [
  { id: "EMP001", name: "Ananya Sharma", email: "ananya.sharma@xebia.com", department: "Engineering", region: "India", bu: "Data & AI", practice: "Generative AI", learningHours: 124, certsCount: 5, readinessScore: 92, avatar: "", recognition: "AI Pioneer", active: true },
  { id: "EMP002", name: "David Miller", email: "david.miller@xebia.com", department: "Consulting", region: "North America", bu: "Cloud & DevOps", practice: "AWS Cloud", learningHours: 98, certsCount: 4, readinessScore: 88, avatar: "", recognition: "Cloud Guru", active: true },
  { id: "EMP003", name: "Sophie Dubois", email: "sophie.dubois@xebia.com", department: "Product & Design", region: "Europe", bu: "Intelligent Platforms", practice: "Generative AI", learningHours: 110, certsCount: 3, readinessScore: 95, avatar: "", recognition: "Design Champion", active: true },
  { id: "EMP004", name: "Rajesh Kumar", email: "rajesh.kumar@xebia.com", department: "Engineering", region: "India", bu: "Software Engineering", practice: "Fullstack Dev", learningHours: 85, certsCount: 4, readinessScore: 82, avatar: "", recognition: "L&D Leader", active: true },
  { id: "EMP005", name: "Yuki Tanaka", email: "yuki.tanaka@xebia.com", department: "Consulting", region: "Asia Pacific", bu: "Agile Transformation", practice: "All Practices", learningHours: 72, certsCount: 2, readinessScore: 89, avatar: "", recognition: "Agile Coach", active: true },
  { id: "EMP006", name: "John Doe", email: "john.doe@xebia.com", department: "Engineering", region: "North America", bu: "Data & AI", practice: "Data Engineering", learningHours: 140, certsCount: 6, readinessScore: 97, avatar: "", recognition: "Data Wizard", active: true },
  { id: "EMP007", name: "Marc Jansen", email: "marc.jansen@xebia.com", department: "Engineering", region: "Europe", bu: "Cloud & DevOps", practice: "DevOps Automation", learningHours: 92, certsCount: 3, readinessScore: 86, avatar: "", recognition: "Automation Hero", active: true },
  { id: "EMP008", name: "Priya Patel", email: "priya.patel@xebia.com", department: "HR & Operations", region: "India", bu: "Intelligent Platforms", practice: "All Practices", learningHours: 64, certsCount: 2, readinessScore: 80, avatar: "", recognition: "Talent Catalyst", active: true },
  { id: "EMP009", name: "Fatima Al-Sayed", email: "fatima.alsayed@xebia.com", department: "Consulting", region: "Middle East", bu: "Software Engineering", practice: "Fullstack Dev", learningHours: 88, certsCount: 3, readinessScore: 91, avatar: "", recognition: "Client Champion", active: true },
  { id: "EMP010", name: "Thomas Wright", email: "thomas.wright@xebia.com", department: "Sales & Marketing", region: "North America", bu: "Agile Transformation", practice: "All Practices", learningHours: 56, certsCount: 1, readinessScore: 78, avatar: "", recognition: "Value Ambassador", active: true },
  { id: "EMP011", name: "Aarav Mehta", email: "aarav.mehta@xebia.com", department: "Engineering", region: "India", bu: "Data & AI", practice: "Generative AI", learningHours: 115, certsCount: 4, readinessScore: 94, avatar: "", recognition: "AI Star", active: true },
  { id: "EMP012", name: "Sarah Connor", email: "sarah.connor@xebia.com", department: "Product & Design", region: "North America", bu: "Software Engineering", practice: "Fullstack Dev", learningHours: 104, certsCount: 3, readinessScore: 90, avatar: "", recognition: "Innovation Lead", active: true },
];

// Raw Baseline Certifications
export const BASELINE_CERTIFICATIONS = [
  { id: "CERT001", name: "AWS Certified Solutions Architect", category: "Cloud", provider: "AWS", employeeName: "David Miller", department: "Consulting", region: "North America", bu: "Cloud & DevOps", practice: "AWS Cloud", date: "2026-02-15", expiry: "2029-02-15", status: "Active", level: "Associate" },
  { id: "CERT002", name: "Google Cloud Professional Data Engineer", category: "Cloud", provider: "Google", employeeName: "John Doe", department: "Engineering", region: "North America", bu: "Data & AI", practice: "GCP Cloud", date: "2025-11-10", expiry: "2027-11-10", status: "Active", level: "Professional" },
  { id: "CERT003", name: "Microsoft Certified: Azure AI Engineer Associate", category: "AI & ML", provider: "Microsoft", employeeName: "Ananya Sharma", department: "Engineering", region: "India", bu: "Data & AI", practice: "Generative AI", date: "2026-01-22", expiry: "2028-01-22", status: "Active", level: "Associate" },
  { id: "CERT004", name: "Certified Kubernetes Administrator (CKA)", category: "Cloud", provider: "CNCF", employeeName: "Marc Jansen", department: "Engineering", region: "Europe", bu: "Cloud & DevOps", practice: "DevOps Automation", date: "2024-05-14", expiry: "2027-05-14", status: "Active", level: "Professional" },
  { id: "CERT005", name: "TensorFlow Developer Certificate", category: "AI & ML", provider: "Google", employeeName: "Aarav Mehta", department: "Engineering", region: "India", bu: "Data & AI", practice: "Data Engineering", date: "2024-03-01", expiry: "2026-03-01", status: "Expired", level: "Specialty" },
  { id: "CERT006", name: "Scrum Alliance Certified ScrumMaster", category: "Agile", provider: "Scrum Alliance", employeeName: "Yuki Tanaka", department: "Consulting", region: "Asia Pacific", bu: "Agile Transformation", practice: "All Practices", date: "2025-08-20", expiry: "2027-08-20", status: "Active", level: "Foundation" },
  { id: "CERT007", name: "NVIDIA Deep Learning Institute Certificate", category: "AI & ML", provider: "NVIDIA", employeeName: "Sophie Dubois", department: "Product & Design", region: "Europe", bu: "Intelligent Platforms", practice: "Generative AI", date: "2026-04-05", expiry: "2028-04-05", status: "Active", level: "Specialty" },
  { id: "CERT008", name: "AWS Certified Machine Learning - Specialty", category: "AI & ML", provider: "AWS", employeeName: "Ananya Sharma", department: "Engineering", region: "India", bu: "Data & AI", practice: "Generative AI", date: "2025-09-18", expiry: "2028-09-18", status: "Active", level: "Specialty" },
  { id: "CERT009", name: "HashiCorp Certified: Terraform Associate", category: "Cloud", provider: "HashiCorp", employeeName: "David Miller", department: "Consulting", region: "North America", bu: "Cloud & DevOps", practice: "DevOps Automation", date: "2023-12-10", expiry: "2025-12-10", status: "Expired", level: "Associate" },
  { id: "CERT010", name: "SAFe 6.0 Program Consultant (SPC)", category: "Agile", provider: "Scaled Agile", employeeName: "Thomas Wright", department: "Sales & Marketing", region: "North America", bu: "Agile Transformation", practice: "All Practices", date: "2025-02-12", expiry: "2026-02-12", status: "Expired", level: "Professional" },
  { id: "CERT011", name: "Meta Certified Lead Front-End Developer", category: "Frontend", provider: "Meta", employeeName: "Rajesh Kumar", department: "Engineering", region: "India", bu: "Software Engineering", practice: "Fullstack Dev", date: "2025-06-25", expiry: "2027-06-25", status: "Active", level: "Professional" },
  { id: "CERT012", name: "PMI Agile Certified Practitioner (PMI-ACP)", category: "Agile", provider: "PMI", employeeName: "Fatima Al-Sayed", department: "Consulting", region: "Middle East", bu: "Software Engineering", practice: "All Practices", date: "2025-10-05", expiry: "2028-10-05", status: "Active", level: "Associate" }
];

// Raw Baseline Flagship Programs
export const BASELINE_PROGRAMS = [
  { id: "PROG001", name: "Generative AI Academy", category: "AI & ML", participantsCount: 450, completionRate: 88, learningHours: 12000, feedbackRating: 4.8, status: "Active", year: "2026", quarter: "Q1" },
  { id: "PROG002", name: "Cloud Pioneer Academy (AWS/GCP/Azure)", category: "Cloud", participantsCount: 620, completionRate: 92, learningHours: 18500, feedbackRating: 4.6, status: "Active", year: "2025", quarter: "Q4" },
  { id: "PROG003", name: "Fullstack React & Next.js Accelerator", category: "Software Engineering", participantsCount: 280, completionRate: 85, learningHours: 9200, feedbackRating: 4.5, status: "Active", year: "2026", quarter: "Q1" },
  { id: "PROG004", name: "Agile Leadership Mastery", category: "Agile", participantsCount: 150, completionRate: 96, learningHours: 3500, feedbackRating: 4.7, status: "Completed", year: "2025", quarter: "Q3" },
  { id: "PROG005", name: "Data Engineering BootCamp", category: "Data", participantsCount: 310, completionRate: 82, learningHours: 11000, feedbackRating: 4.3, status: "Active", year: "2026", quarter: "Q2" },
  { id: "PROG006", name: "Copilot Developer Enablement", category: "AI & ML", participantsCount: 890, completionRate: 94, learningHours: 5400, feedbackRating: 4.9, status: "Active", year: "2026", quarter: "Q1" },
  { id: "PROG007", name: "DevOps & Platform Engineering Foundation", category: "Cloud", participantsCount: 410, completionRate: 79, learningHours: 8900, feedbackRating: 4.4, status: "Completed", year: "2025", quarter: "Q2" },
  { id: "PROG008", name: "UI/UX & Product Design Thinking", category: "Product & Design", participantsCount: 120, completionRate: 90, learningHours: 4200, feedbackRating: 4.7, status: "Completed", year: "2024", quarter: "Q4" }
];

// Helper to filter items based on unified selections
export function filterDataset(filters = {}, search = "") {
  const { year, quarter, region, department, bu, practice } = filters;

  // 1. Filter Champions
  let champions = [...BASELINE_CHAMPIONS];
  if (region && region !== "All Regions") {
    champions = champions.filter(c => c.region === region);
  }
  if (department && department !== "All Departments") {
    champions = champions.filter(c => c.department === department);
  }
  if (bu && bu !== "All BUs") {
    champions = champions.filter(c => c.bu === bu);
  }
  if (practice && practice !== "All Practices") {
    champions = champions.filter(c => c.practice === practice);
  }
  if (search) {
    const s = search.toLowerCase();
    champions = champions.filter(c => c.name.toLowerCase().includes(s) || c.recognition.toLowerCase().includes(s) || c.id.toLowerCase().includes(s));
  }

  // 2. Filter Certifications
  let certs = [...BASELINE_CERTIFICATIONS];
  if (region && region !== "All Regions") {
    certs = certs.filter(c => c.region === region);
  }
  if (department && department !== "All Departments") {
    certs = certs.filter(c => c.department === department);
  }
  if (bu && bu !== "All BUs") {
    certs = certs.filter(c => c.bu === bu);
  }
  if (practice && practice !== "All Practices") {
    certs = certs.filter(c => c.practice === practice);
  }
  if (search) {
    const s = search.toLowerCase();
    certs = certs.filter(c => c.name.toLowerCase().includes(s) || c.employeeName.toLowerCase().includes(s) || c.provider.toLowerCase().includes(s));
  }

  // 3. Filter Programs
  let programs = [...BASELINE_PROGRAMS];
  if (year && year !== "All Years") {
    programs = programs.filter(p => p.year === year);
  }
  if (quarter && quarter !== "All Quarters") {
    programs = programs.filter(p => p.quarter === quarter);
  }
  if (search) {
    const s = search.toLowerCase();
    programs = programs.filter(p => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
  }

  // Generates interactive trends based on filters
  const trendSeed = (year === "2026" ? 1.2 : year === "2024" ? 0.8 : 1.0) * (quarter === "Q1" ? 0.95 : quarter === "Q2" ? 1.05 : 1.0);

  // Compile AI Page Metrics
  const aiKPIs = {
    readiness: Math.min(100, Math.round(78 * trendSeed)),
    adoption: Math.min(100, Math.round(62 * trendSeed)),
    learningHours: Math.round(45000 * trendSeed),
    certifiedEmployees: Math.round(380 * trendSeed),
    enabledEmployees: Math.round(1450 * trendSeed),
    maturityScore: parseFloat((3.6 * trendSeed).toFixed(1))
  };

  // Compile Certification Page Metrics
  const activeCerts = certs.filter(c => c.status === "Active").length;
  const expiredCerts = certs.filter(c => c.status === "Expired").length;
  const totalCertsCount = certs.length;
  const certCompletionRate = totalCertsCount > 0 ? Math.round((activeCerts / totalCertsCount) * 100) : 82;

  const certKPIs = {
    totalCertifications: Math.round(520 * trendSeed),
    activeCertifications: Math.round(440 * trendSeed),
    expiredCertifications: Math.round(80 * trendSeed),
    certifiedEmployees: Math.round(390 * trendSeed),
    completionRate: certCompletionRate
  };

  // Compile Flagship Page Metrics
  const progKPIs = {
    totalPrograms: programs.length,
    activePrograms: programs.filter(p => p.status === "Active").length,
    participants: programs.reduce((sum, p) => sum + p.participantsCount, 0),
    completionRate: programs.length > 0 ? Math.round(programs.reduce((sum, p) => sum + p.completionRate, 0) / programs.length) : 85,
    learningHours: programs.reduce((sum, p) => sum + p.learningHours, 0),
    feedbackRating: programs.length > 0 ? parseFloat((programs.reduce((sum, p) => sum + p.feedbackRating, 0) / programs.length).toFixed(2)) : 4.6
  };

  // Compile Learning Champions Page Metrics
  const champKPIs = {
    topLearners: champions.length,
    aiChampionsCount: champions.filter(c => c.bu === "Data & AI" || c.practice === "Generative AI").length,
    certifiedEmployees: Math.round(champions.reduce((sum, c) => sum + (c.certsCount > 0 ? 1 : 0), 0)),
    recognitionAwards: champions.filter(c => c.recognition !== "None").length
  };

  // Trends
  const aiReadinessTrend = [
    { month: "Jan", readiness: Math.round(62 * trendSeed), target: 70 },
    { month: "Feb", readiness: Math.round(64 * trendSeed), target: 72 },
    { month: "Mar", readiness: Math.round(68 * trendSeed), target: 75 },
    { month: "Apr", readiness: Math.round(71 * trendSeed), target: 78 },
    { month: "May", readiness: Math.round(75 * trendSeed), target: 80 },
    { month: "Jun", readiness: Math.round(79 * trendSeed), target: 85 }
  ];

  const aiAdoptionTrend = [
    { month: "Jan", pilot: 120, production: 40 },
    { month: "Feb", pilot: 150, production: 55 },
    { month: "Mar", pilot: 180, production: 75 },
    { month: "Apr", pilot: 220, production: 98 },
    { month: "May", pilot: 290, production: 140 },
    { month: "Jun", pilot: 350, production: 190 }
  ];

  const capabilityDistribution = [
    { name: "Generative AI Foundations", value: Math.round(45 * trendSeed) },
    { name: "Advanced ML & Deep Learning", value: Math.round(20 * trendSeed) },
    { name: "Cloud AI Implementations", value: Math.round(25 * trendSeed) },
    { name: "Responsible AI & Ethics", value: Math.round(10 * trendSeed) }
  ];

  const aiLearningTrend = [
    { month: "Jan", selfPaced: 1200, guided: 800 },
    { month: "Feb", selfPaced: 1500, guided: 1100 },
    { month: "Mar", selfPaced: 1900, guided: 1500 },
    { month: "Apr", selfPaced: 2400, guided: 2200 },
    { month: "May", selfPaced: 3100, guided: 2800 },
    { month: "Jun", selfPaced: 4200, guided: 3500 }
  ];

  const deptReadiness = [
    { name: "Engineering", score: Math.min(100, Math.round(88 * trendSeed)) },
    { name: "Consulting", score: Math.min(100, Math.round(76 * trendSeed)) },
    { name: "Product & Design", score: Math.min(100, Math.round(70 * trendSeed)) },
    { name: "Sales & Marketing", score: Math.min(100, Math.round(55 * trendSeed)) },
    { name: "HR & Operations", score: Math.min(100, Math.round(48 * trendSeed)) }
  ];

  const certTechDistribution = [
    { name: "AWS", value: Math.round(180 * trendSeed) },
    { name: "Azure", value: Math.round(140 * trendSeed) },
    { name: "GCP", value: Math.round(90 * trendSeed) },
    { name: "AI/ML", value: Math.round(70 * trendSeed) },
    { name: "Others", value: Math.round(40 * trendSeed) }
  ];

  const certRegionDistribution = [
    { name: "India", value: Math.round(250 * trendSeed) },
    { name: "North America", value: Math.round(120 * trendSeed) },
    { name: "Europe", value: Math.round(90 * trendSeed) },
    { name: "Asia Pacific", value: Math.round(40 * trendSeed) },
    { name: "Middle East", value: Math.round(20 * trendSeed) }
  ];

  const certDeptDistribution = [
    { name: "Engineering", certifications: Math.round(290 * trendSeed) },
    { name: "Consulting", certifications: Math.round(140 * trendSeed) },
    { name: "Product & Design", certifications: Math.round(60 * trendSeed) },
    { name: "HR & Operations", certifications: Math.round(20 * trendSeed) },
    { name: "Sales & Marketing", certifications: Math.round(10 * trendSeed) }
  ];

  const certBUDistribution = [
    { name: "Data & AI", value: Math.round(160 * trendSeed) },
    { name: "Cloud & DevOps", value: Math.round(150 * trendSeed) },
    { name: "Software Engineering", value: Math.round(120 * trendSeed) },
    { name: "Agile Trans.", value: Math.round(60 * trendSeed) },
    { name: "Intel Platforms", value: Math.round(30 * trendSeed) }
  ];

  const certProjectDistribution = [
    { name: "GenAI Portal", certifications: Math.round(28 * trendSeed) },
    { name: "Banking Mig.", certifications: Math.round(22 * trendSeed) },
    { name: "HR Modern.", certifications: Math.round(15 * trendSeed) },
    { name: "Smart Cloud", certifications: Math.round(18 * trendSeed) },
    { name: "E-Commerce", certifications: Math.round(12 * trendSeed) }
  ];

  const flagshipParticipationTrend = [
    { month: "Jan", activeParticipants: Math.round(340 * trendSeed) },
    { month: "Feb", activeParticipants: Math.round(420 * trendSeed) },
    { month: "Mar", activeParticipants: Math.round(590 * trendSeed) },
    { month: "Apr", activeParticipants: Math.round(710 * trendSeed) },
    { month: "May", activeParticipants: Math.round(890 * trendSeed) },
    { month: "Jun", activeParticipants: Math.round(1050 * trendSeed) }
  ];

  const flagshipCompletionTrend = [
    { month: "Jan", rate: 82 },
    { month: "Feb", rate: 84 },
    { month: "Mar", rate: 85 },
    { month: "Apr", rate: 89 },
    { month: "May", rate: 91 },
    { month: "Jun", rate: 94 }
  ];

  const flagshipDistribution = [
    { name: "Cloud & DevOps", value: 35 },
    { name: "Data & AI", value: 40 },
    { name: "Software Eng.", value: 15 },
    { name: "Agile & Product", value: 10 }
  ];

  const flagshipLearningHoursTrend = [
    { month: "Jan", selfGuidedHours: 2400, workshopHours: 1200 },
    { month: "Feb", selfGuidedHours: 3100, workshopHours: 1500 },
    { month: "Mar", selfGuidedHours: 4500, workshopHours: 2200 },
    { month: "Apr", selfGuidedHours: 5800, workshopHours: 3100 },
    { month: "May", selfGuidedHours: 7200, workshopHours: 4000 },
    { month: "Jun", selfGuidedHours: 9500, workshopHours: 5500 }
  ];

  const championLearningHours = champions
    .map(c => ({ name: c.name.split(" ")[0], hours: c.learningHours }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  const championReadiness = champions
    .map(c => ({ name: c.name.split(" ")[0], score: c.readinessScore }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const championCertScore = champions
    .map(c => ({ name: c.name.split(" ")[0], certs: c.certsCount * 20 }))
    .sort((a, b) => b.certs - a.certs)
    .slice(0, 5);

  const heatmapData = [
    { department: "Engineering", capability: "GenAI Foundations", score: 94 },
    { department: "Engineering", capability: "Advanced ML/DL", score: 86 },
    { department: "Engineering", capability: "Cloud AI", score: 90 },
    { department: "Engineering", capability: "Responsible AI", score: 80 },

    { department: "Consulting", capability: "GenAI Foundations", score: 88 },
    { department: "Consulting", capability: "Advanced ML/DL", score: 72 },
    { department: "Consulting", capability: "Cloud AI", score: 82 },
    { department: "Consulting", capability: "Responsible AI", score: 84 },

    { department: "Product & Design", capability: "GenAI Foundations", score: 85 },
    { department: "Product & Design", capability: "Advanced ML/DL", score: 60 },
    { department: "Product & Design", capability: "Cloud AI", score: 70 },
    { department: "Product & Design", capability: "Responsible AI", score: 92 },

    { department: "Sales & Marketing", capability: "GenAI Foundations", score: 74 },
    { department: "Sales & Marketing", capability: "Advanced ML/DL", score: 45 },
    { department: "Sales & Marketing", capability: "Cloud AI", score: 50 },
    { department: "Sales & Marketing", capability: "Responsible AI", score: 88 },

    { department: "HR & Operations", capability: "GenAI Foundations", score: 62 },
    { department: "HR & Operations", capability: "Advanced ML/DL", score: 30 },
    { department: "HR & Operations", capability: "Cloud AI", score: 40 },
    { department: "HR & Operations", capability: "Responsible AI", score: 94 }
  ];

  return {
    champions,
    certs,
    programs,
    kpis: {
      ai: aiKPIs,
      certs: certKPIs,
      programs: progKPIs,
      champions: champKPIs
    },
    charts: {
      aiReadinessTrend,
      aiAdoptionTrend,
      capabilityDistribution,
      aiLearningTrend,
      deptReadiness,
      heatmapData,
      certTechDistribution,
      certRegionDistribution,
      certDeptDistribution,
      certBUDistribution,
      certProjectDistribution,
      flagshipParticipationTrend,
      flagshipCompletionTrend,
      flagshipDistribution,
      flagshipLearningHoursTrend,
      championLearningHours,
      championReadiness,
      championCertScore
    }
  };
}

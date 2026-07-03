// Learning Service - Mock API Layer for Dashboard Analytics

const mockEmployees = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@xebia.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    region: "India",
    businessUnit: "Digital",
    department: "Engineering",
    practice: "Frontend",
    project: "Phoenix",
    learningPath: "React Development v19",
    hours: 32,
    completion: 85,
    status: "In Progress",
    dateJoined: "2024-01-15"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@xebia.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    region: "AMER",
    businessUnit: "Cloud",
    department: "Engineering",
    practice: "DevOps",
    project: "Helios",
    learningPath: "DevOps Foundation",
    hours: 40,
    completion: 100,
    status: "Completed",
    dateJoined: "2023-11-10"
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@xebia.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    region: "EMEA",
    businessUnit: "Agile",
    department: "Consulting",
    practice: "Agile Coaching",
    project: "Apollo",
    learningPath: "Scrum Master Certification",
    hours: 12,
    completion: 30,
    status: "In Progress",
    dateJoined: "2024-02-01"
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    email: "yuki.tanaka@xebia.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    region: "APAC",
    businessUnit: "Digital",
    department: "Operations",
    practice: "QA",
    project: "Aura",
    learningPath: "Certified Kubernetes Administrator (CKA)",
    hours: 0,
    completion: 0,
    status: "Not Started",
    dateJoined: "2024-03-15"
  },
  {
    id: 5,
    name: "Priya Patel",
    email: "priya.patel@xebia.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    region: "India",
    businessUnit: "Data",
    department: "Engineering",
    practice: "Backend",
    project: "Zenith",
    learningPath: "Java Spring Boot Microservices",
    hours: 45,
    completion: 100,
    status: "Completed",
    dateJoined: "2023-09-20"
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael.brown@xebia.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    region: "AMER",
    businessUnit: "Salesforce",
    department: "Consulting",
    practice: "DevOps",
    project: "Titan",
    learningPath: "Cloud Architecture (AWS)",
    hours: 28,
    completion: 70,
    status: "In Progress",
    dateJoined: "2023-12-05"
  },
  {
    id: 7,
    name: "Emma Wilson",
    email: "emma.wilson@xebia.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    region: "EMEA",
    businessUnit: "Cloud",
    department: "Engineering",
    practice: "Cloud Native",
    project: "Chronos",
    learningPath: "Google Cloud Professional Architect",
    hours: 15,
    completion: 45,
    status: "In Progress",
    dateJoined: "2024-01-22"
  },
  {
    id: 8,
    name: "Sanjay Dutta",
    email: "sanjay.dutta@xebia.com",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
    region: "India",
    businessUnit: "Digital",
    department: "QA",
    practice: "QA",
    project: "Phoenix",
    learningPath: "Playwright Automation Foundation",
    hours: 8,
    completion: 20,
    status: "In Progress",
    dateJoined: "2024-02-18"
  },
  {
    id: 9,
    name: "David Miller",
    email: "david.miller@xebia.com",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    region: "AMER",
    businessUnit: "Data",
    department: "Engineering",
    practice: "Backend",
    project: "Helios",
    learningPath: "Data Engineering with Snowflake",
    hours: 0,
    completion: 0,
    status: "Not Started",
    dateJoined: "2024-04-01"
  },
  {
    id: 10,
    name: "Sophie Dubois",
    email: "sophie.dubois@xebia.com",
    avatar: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150",
    region: "EMEA",
    businessUnit: "Digital",
    department: "Marketing",
    practice: "Frontend",
    project: "Nebula",
    learningPath: "SEO & Digital Analytics",
    hours: 18,
    completion: 100,
    status: "Completed",
    dateJoined: "2023-08-14"
  },
  {
    id: 11,
    name: "Carlos Gomez",
    email: "carlos.gomez@xebia.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    region: "AMER",
    businessUnit: "Agile",
    department: "HR",
    practice: "Agile Coaching",
    project: "Apollo",
    learningPath: "Agile HR Practitioner",
    hours: 24,
    completion: 90,
    status: "In Progress",
    dateJoined: "2023-10-30"
  },
  {
    id: 12,
    name: "Anna Kovacs",
    email: "anna.kovacs@xebia.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    region: "EMEA",
    businessUnit: "Salesforce",
    department: "Engineering",
    practice: "Frontend",
    project: "Titan",
    learningPath: "Salesforce LWC Development",
    hours: 36,
    completion: 100,
    status: "Completed",
    dateJoined: "2023-11-25"
  }
];

// Helper to filter employees based on criteria
const filterEmployeesList = (filters = {}) => {
  const { search, region, businessUnit, department, practice, datePreset } = filters;

  return mockEmployees.filter((emp) => {
    // Search filter (name, email, project, learningPath)
    if (search) {
      const q = search.toLowerCase();
      const match =
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.project.toLowerCase().includes(q) ||
        emp.learningPath.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Dropdown filters
    if (region && region !== "All") {
      if (emp.region !== region) return false;
    }
    if (businessUnit && businessUnit !== "All") {
      if (emp.businessUnit !== businessUnit) return false;
    }
    if (department && department !== "All") {
      if (emp.department !== department) return false;
    }
    if (practice && practice !== "All") {
      if (emp.practice !== practice) return false;
    }

    // DatePreset filter (rough joined date filters for demonstration)
    if (datePreset && datePreset !== "All") {
      const joinedYear = new Date(emp.dateJoined).getFullYear();
      if (datePreset === "This Year" && joinedYear !== 2024) return false;
      if (datePreset === "Last Year" && joinedYear !== 2023) return false;
    }

    return true;
  });
};

// Delay simulation helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCoverageSummary = async (filters = {}, simulateError = false, simulateEmpty = false) => {
  await delay(800);
  if (simulateError) {
    throw new Error("API Failure: Summary could not be retrieved.");
  }
  if (simulateEmpty) {
    return {
      totalEmployees: 0,
      employeesCovered: 0,
      coveragePercentage: 0,
      pendingEmployees: 0,
    };
  }

  const filtered = filterEmployeesList(filters);
  const total = filtered.length;
  const covered = filtered.filter((e) => e.status === "Completed" || e.status === "In Progress").length;
  const pending = total - covered;
  const percentage = total > 0 ? Math.round((covered / total) * 1000) / 10 : 0;

  return {
    totalEmployees: total,
    employeesCovered: covered,
    coveragePercentage: percentage,
    pendingEmployees: pending,
  };
};

export const getCoverageCharts = async (filters = {}, simulateError = false, simulateEmpty = false) => {
  await delay(800);
  if (simulateError) {
    throw new Error("API Failure: Chart data could not be retrieved.");
  }
  if (simulateEmpty) {
    return {
      regionData: [],
      departmentData: [],
      projectData: [],
      practiceData: [],
    };
  }

  const filtered = filterEmployeesList(filters);

  // 1. Region Aggregation
  const regions = {};
  filtered.forEach((e) => {
    regions[e.region] = (regions[e.region] || 0) + 1;
  });
  const regionData = Object.keys(regions).map((name) => ({
    name,
    value: regions[name],
  }));

  // 2. Department Aggregation
  const depts = {};
  filtered.forEach((e) => {
    depts[e.department] = (depts[e.department] || 0) + 1;
  });
  const departmentData = Object.keys(depts).map((name) => ({
    name,
    value: depts[name],
  }));

  // 3. Project Aggregation
  const projs = {};
  filtered.forEach((e) => {
    projs[e.project] = (projs[e.project] || 0) + 1;
  });
  const projectData = Object.keys(projs).map((name) => ({
    name,
    value: projs[name],
  }));

  // 4. Practice Aggregation
  const practices = {};
  filtered.forEach((e) => {
    practices[e.practice] = (practices[e.practice] || 0) + 1;
  });
  const practiceData = Object.keys(practices).map((name) => ({
    name,
    value: practices[name],
  }));

  return {
    regionData,
    departmentData,
    projectData,
    practiceData,
  };
};

export const getCoverageTable = async (filters = {}, simulateError = false, simulateEmpty = false) => {
  await delay(800);
  if (simulateError) {
    throw new Error("API Failure: Table data could not be retrieved.");
  }
  if (simulateEmpty) {
    return [];
  }

  return filterEmployeesList(filters);
};

import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { Search, Clock, Award } from "lucide-react";

// Categorized LMS Icons
const ICON_CATEGORIES = [
  {
    id: "recommended",
    label: "Recommended",
    icon: "Award",
    icons: [
      { name: "GraduationCap", label: "Graduation Cap", keywords: ["education", "degree", "university", "school", "student"] },
      { name: "BookOpen", label: "Book Open", keywords: ["reading", "education", "study", "learning", "course"] },
      { name: "Laptop", label: "Laptop", keywords: ["technology", "computer", "coding", "software", "development"] },
      { name: "Database", label: "Database", keywords: ["sql", "data", "storage", "server", "backend"] },
      { name: "Cpu", label: "CPU / AI", keywords: ["hardware", "processor", "technology", "ai", "machine learning"] },
      { name: "Briefcase", label: "Briefcase", keywords: ["business", "work", "job", "office", "professional"] },
      { name: "Palette", label: "Palette", keywords: ["design", "ui", "ux", "art", "creative"] },
      { name: "Award", label: "Certificate", keywords: ["achievement", "qualification", "completion", "success"] },
    ]
  },
  {
    id: "technology",
    label: "Technology",
    icon: "Laptop",
    icons: [
      { name: "Laptop", label: "Laptop", keywords: ["computer", "screen", "developer", "coding"] },
      { name: "Monitor", label: "Desktop", keywords: ["monitor", "screen", "display", "workstation"] },
      { name: "Server", label: "Server", keywords: ["hosting", "cloud", "backend", "infrastructure", "aws", "azure"] },
      { name: "Cloud", label: "Cloud", keywords: ["internet", "network", "storage", "aws", "azure", "saas"] },
      { name: "Database", label: "Database", keywords: ["sql", "nosql", "postgres", "data", "storage"] },
      { name: "Brain", label: "AI Brain", keywords: ["intelligence", "mind", "cognitive", "artificial intelligence"] },
      { name: "Bot", label: "Robot", keywords: ["automation", "chatgpt", "ai", "chatbot"] },
      { name: "Webhook", label: "API / Webhook", keywords: ["api", "integration", "endpoint", "connector"] },
      { name: "Code", label: "Code Block", keywords: ["programming", "source", "html", "developer"] },
      { name: "Terminal", label: "Terminal", keywords: ["cli", "console", "command line", "bash", "shell"] },
      { name: "Cpu", label: "CPU / Processor", keywords: ["hardware", "chip", "silicon", "computing"] },
      { name: "Network", label: "Network", keywords: ["connection", "lan", "internet", "topology"] },
      { name: "Shield", label: "Security", keywords: ["cybersecurity", "protection", "firewall", "safe"] },
      { name: "Infinity", label: "DevOps", keywords: ["ci/cd", "pipeline", "loop", "automation"] },
    ]
  },
  {
    id: "programming",
    label: "Programming",
    icon: "Code2",
    icons: [
      { name: "Coffee", label: "Java / Coffee", keywords: ["java", "jvm", "backend", "drink", "cup"] },
      { name: "FileCode", label: "Python / Script", keywords: ["python", "script", "file", "code"] },
      { name: "Code2", label: "JavaScript / Code", keywords: ["javascript", "js", "ts", "frontend", "programming"] },
      { name: "Atom", label: "React / Atom", keywords: ["react", "components", "native", "physics", "science"] },
      { name: "Leaf", label: "Spring / Leaf", keywords: ["spring boot", "java", "nature", "green"] },
      { name: "Braces", label: "HTML / Braces", keywords: ["html", "markup", "json", "code"] },
      { name: "Brackets", label: "CSS / Brackets", keywords: ["css", "styling", "layout"] },
      { name: "GitBranch", label: "Git / Source Control", keywords: ["git", "github", "versioning", "repository"] },
      { name: "Box", label: "Docker / Container", keywords: ["docker", "package", "container", "shipping"] },
      { name: "Compass", label: "Kubernetes / Steering", keywords: ["k8s", "orchestration", "kubernetes", "navigation"] },
    ]
  },
  {
    id: "datascience",
    label: "Data Science",
    icon: "LineChart",
    icons: [
      { name: "LineChart", label: "Analytics", keywords: ["trends", "graph", "metrics", "dashboard"] },
      { name: "BarChart3", label: "Charts", keywords: ["statistics", "bar chart", "visualisation"] },
      { name: "TrendingUp", label: "Graph", keywords: ["growth", "progression", "positive", "metrics"] },
      { name: "Sigma", label: "Statistics", keywords: ["math", "sum", "sigma", "calculation"] },
      { name: "Binary", label: "Machine Learning", keywords: ["binary", "data", "ai", "algorithm"] },
      { name: "Network", label: "Neural Network", keywords: ["deep learning", "nodes", "connections"] },
      { name: "Table", label: "Dataset", keywords: ["excel", "csv", "rows", "columns", "spreadsheet"] },
    ]
  },
  {
    id: "business",
    label: "Business",
    icon: "Briefcase",
    icons: [
      { name: "Briefcase", label: "Briefcase", keywords: ["job", "portfolio", "career", "professional"] },
      { name: "Building2", label: "Office", keywords: ["company", "hq", "enterprise", "building"] },
      { name: "Users", label: "Meeting", keywords: ["collaboration", "team", "people", "discussion"] },
      { name: "Coins", label: "Finance", keywords: ["money", "cash", "currency", "wealth"] },
      { name: "Megaphone", label: "Marketing", keywords: ["advertising", "announcement", "social media", "promo"] },
      { name: "TrendingUp", label: "Growth / Strategy", keywords: ["scaling", "vision", "success"] },
    ]
  },
  {
    id: "education",
    label: "Education",
    icon: "GraduationCap",
    icons: [
      { name: "GraduationCap", label: "Graduation Cap", keywords: ["degree", "diploma", "alumni", "university"] },
      { name: "BookOpen", label: "Book Open", keywords: ["reading", "studying", "documentation", "syllabus"] },
      { name: "Library", label: "Library", keywords: ["books", "resource center", "knowledge base"] },
      { name: "Award", label: "Certificate", keywords: ["accreditation", "credential", "badge"] },
      { name: "Presentation", label: "Classroom", keywords: ["lecture", "slides", "blackboard", "teaching"] },
      { name: "UserCheck", label: "Student", keywords: ["learner", "enrolled", "candidate"] },
      { name: "School", label: "School Building", keywords: ["academy", "college", "campus"] },
      { name: "Notebook", label: "Notebook", keywords: ["writing", "journal", "notes", "memo"] },
      { name: "Search", label: "Learning Search", keywords: ["discovery", "research", "study"] },
    ]
  },
  {
    id: "design",
    label: "Design",
    icon: "Palette",
    icons: [
      { name: "Palette", label: "Palette", keywords: ["colors", "branding", "art", "theme"] },
      { name: "Brush", label: "Brush", keywords: ["painting", "drawing", "illustration"] },
      { name: "Figma", label: "Figma / Vectors", keywords: ["figma", "vector", "prototype", "ui"] },
      { name: "Layers", label: "Layers", keywords: ["design", "photoshop", "components"] },
      { name: "PenTool", label: "Pen Tool", keywords: ["illustrator", "vector", "bezier"] },
      { name: "Sparkles", label: "UI Design", keywords: ["interface", "effects", "aesthetic"] },
      { name: "Fingerprint", label: "UX Research", keywords: ["user experience", "validation", "identity"] },
    ]
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: "Settings",
    icons: [
      { name: "Settings", label: "Gear / Config", keywords: ["settings", "engine", "system", "setup"] },
      { name: "Wrench", label: "Tools", keywords: ["repair", "maintenance", "utility"] },
      { name: "Compass", label: "Drafting Compass", keywords: ["geometry", "blueprint", "architecture"] },
      { name: "Map", label: "Map / Blueprint", keywords: ["navigation", "planning", "blueprint"] },
      { name: "Hammer", label: "Construction", keywords: ["build", "builder", "hardware"] },
    ]
  },
  {
    id: "science",
    label: "Science",
    icon: "FlaskConical",
    icons: [
      { name: "Atom", label: "Physics / Atom", keywords: ["nuclear", "atom", "science", "react"] },
      { name: "FlaskConical", label: "Chemistry", keywords: ["laboratory", "beaker", "experiment"] },
      { name: "Dna", label: "Biology / DNA", keywords: ["genetics", "health", "science"] },
      { name: "Calculator", label: "Mathematics", keywords: ["calculus", "finance", "numbers"] },
      { name: "TestTube", label: "Lab / Research", keywords: ["chemistry", "clinical", "sample"] },
      { name: "Microscope", label: "Microscope", keywords: ["magnification", "research", "biology"] },
    ]
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: "HeartPulse",
    icons: [
      { name: "Activity", label: "Hospital / Pulse", keywords: ["ecg", "heartbeat", "pulse", "health"] },
      { name: "HeartPulse", label: "Medical", keywords: ["medicine", "first aid", "health"] },
      { name: "Stethoscope", label: "Doctor", keywords: ["clinical", "physician", "checkup"] },
      { name: "Pills", label: "Pharmacy", keywords: ["pills", "tablets", "prescription", "meds"] },
      { name: "Heart", label: "Heart / Cardiac", keywords: ["love", "cardio", "health"] },
    ]
  },
  {
    id: "finance",
    label: "Finance",
    icon: "Coins",
    icons: [
      { name: "Building", label: "Bank", keywords: ["finance", "vault", "banking"] },
      { name: "Wallet", label: "Wallet", keywords: ["cash", "cards", "savings"] },
      { name: "DollarSign", label: "Money", keywords: ["usd", "cash", "currency"] },
      { name: "CreditCard", label: "Credit Card", keywords: ["payment", "visa", "checkout"] },
      { name: "TrendingUp", label: "Investment", keywords: ["stock market", "shares", "portfolio"] },
      { name: "Receipt", label: "Tax / Invoice", keywords: ["billing", "accounting", "ledger"] },
    ]
  },
  {
    id: "general",
    label: "General",
    icon: "Folder",
    icons: [
      { name: "Folder", label: "Folder", keywords: ["directories", "catalog", "storage"] },
      { name: "FolderOpen", label: "Folder Open", keywords: ["expand", "explore", "active"] },
      { name: "File", label: "File", keywords: ["document", "page", "resource"] },
      { name: "FileText", label: "Document", keywords: ["pdf", "text", "description", "report"] },
      { name: "Image", label: "Image", keywords: ["photo", "banner", "graphics"] },
      { name: "Video", label: "Video", keywords: ["media", "player", "mp4", "recording"] },
      { name: "Music", label: "Audio", keywords: ["sound", "mp3", "podcast"] },
      { name: "FileSpreadsheet", label: "PDF / Spreadsheet", keywords: ["xlsx", "csv", "pdf", "table"] },
      { name: "Download", label: "Download", keywords: ["fetch", "retrieve", "save"] },
      { name: "Upload", label: "Upload", keywords: ["send", "file upload", "submit"] },
      { name: "Settings", label: "Settings", keywords: ["config", "admin", "preferences"] },
    ]
  }
];

// Helper component for dynamic icon display
const DynamicIcon = ({ name, size = 16, className = "" }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
};

export default function IconPicker({ onSelect, onClose }) {
  const [activeTab, setActiveTab] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [history, setHistory] = useState([]);
  
  const pickerRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lms_icon_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load icon history", e);
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle icon selection
  const handleSelect = (iconName) => {
    // Find icon detail
    let found = null;
    for (const cat of ICON_CATEGORIES) {
      const match = cat.icons.find(i => i.name === iconName);
      if (match) { found = match; break; }
    }
    if (!found) {
      found = { name: iconName, label: iconName, keywords: [] };
    }

    // Save to history
    const updatedHistory = [found, ...history.filter(h => h.name !== iconName)].slice(0, 16);
    setHistory(updatedHistory);
    localStorage.setItem("lms_icon_history", JSON.stringify(updatedHistory));

    onSelect(iconName);
  };

  // Filter icons based on search query
  const getFilteredIcons = () => {
    if (!searchQuery.trim()) {
      if (activeTab === "history") {
        return history;
      }
      const activeCategory = ICON_CATEGORIES.find(c => c.id === activeTab);
      return activeCategory ? activeCategory.icons : [];
    }

    const query = searchQuery.toLowerCase();
    const results = [];
    const seen = new Set();

    ICON_CATEGORIES.forEach(cat => {
      cat.icons.forEach(item => {
        if (seen.has(item.name)) return;
        const matches = item.name.toLowerCase().includes(query) ||
                        item.label.toLowerCase().includes(query) ||
                        item.keywords.some(k => k.includes(query));
        if (matches) {
          results.push(item);
          seen.add(item.name);
        }
      });
    });
    return results;
  };

  const filteredIcons = getFilteredIcons();

  return (
    <div 
      ref={pickerRef}
      className="bg-white border border-slate-200 w-[490px] rounded-xl flex flex-col p-4 shadow-xl z-50 text-left font-sans select-none animate-[fadeIn_0.15s_ease-out]"
    >
      {/* Search Input */}
      <div className="relative mb-3 flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search icons (e.g. cloud, code, data)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg text-slate-700 placeholder-slate-400 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] transition-all"
          />
        </div>
      </div>

      {/* Main Content Area: Sidebar + Grid */}
      <div className="flex h-52 min-h-0">
        {/* Sidebar categories */}
        <div className="w-[140px] border-r border-slate-100 pr-2 overflow-y-auto flex flex-col gap-0.5 scrollbar-thin select-none">
          <button
            type="button"
            onClick={() => { setSearchQuery(""); setActiveTab("history"); }}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold transition-all text-left cursor-pointer ${
              activeTab === "history" && !searchQuery
                ? "bg-[#6C1D5F]/5 text-[#6C1D5F]"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Clock size={13} className="opacity-70" />
            <span>History</span>
          </button>
          
          <div className="h-px bg-slate-100 my-1" />

          {ICON_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => { setSearchQuery(""); setActiveTab(cat.id); }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold transition-all text-left cursor-pointer ${
                activeTab === cat.id && !searchQuery
                  ? "bg-[#6C1D5F]/5 text-[#6C1D5F]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <DynamicIcon name={cat.icon} size={13} className="opacity-70" />
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Icons Grid */}
        <div className="flex-1 pl-3 overflow-y-auto min-w-0">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
            {searchQuery ? "Search Results" : activeTab === "history" ? "Recently Used" : ICON_CATEGORIES.find(c => c.id === activeTab)?.label}
          </div>
          
          {filteredIcons.length === 0 ? (
            <div className="text-slate-400 text-xs py-12 text-center">
              {activeTab === "history" && !searchQuery ? "No history yet" : "No icons found"}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-1.5">
              {filteredIcons.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onMouseEnter={() => setHoveredIcon(item)}
                  onClick={() => handleSelect(item.name)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-100 bg-white hover:border-[#6C1D5F] hover:bg-[#6C1D5F]/5 text-slate-650 hover:text-[#6C1D5F] transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <DynamicIcon name={item.name} size={18} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Preview Footer */}
      <div className="border-t border-slate-100 pt-2.5 mt-3 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-center flex-shrink-0 text-[#6C1D5F]">
          {hoveredIcon ? <DynamicIcon name={hoveredIcon.name} size={20} /> : <Award size={20} className="text-slate-400" />}
        </div>
        <div className="text-left min-w-0 flex-1">
          <div className="text-[12px] font-bold text-slate-800 truncate leading-tight">
            {hoveredIcon ? hoveredIcon.label : "Select LMS Icon"}
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {hoveredIcon ? `lucide-react: ${hoveredIcon.name}` : "Choose a professional category branding asset"}
          </div>
        </div>
      </div>
    </div>
  );
}

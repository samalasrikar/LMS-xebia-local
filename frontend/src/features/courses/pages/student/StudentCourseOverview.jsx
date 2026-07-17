import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Lock,
  CheckCircle,
  Clock,
  BookOpen,
  User,
  Layers,
  Globe,
  Sparkles,
  Download,
  MessageSquare,
  ArrowRight,
  PlayCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

/* ── Mock Data ─────────────────────────────────────────────────── */
const COURSE = {
  title: "Advanced Web Development: The Full Stack Journey",
  instructor: "Dr. Sarah Jenkins",
  tags: ["Development", "Web 3.0"],
  overview:
    "Master the complexities of modern full-stack architecture. This comprehensive program covers everything from advanced React patterns and microservices to distributed database systems. You'll build production-ready applications while learning industry-standard DevOps practices and security protocols.",
  difficulty: "Advanced",
  language: "English",
  duration: "48 Hours",
  lessons: "124 Total",
  progress: 65,
  completedModules: 4,
  totalModules: 8,
  estimatedFinish: "12 July 2024",
  bannerGradient: "from-[#4A1E47] via-[#6C1D5F] to-[#84117C]",
};

const MODULES = [
  {
    id: 1,
    title: "Module 1: Foundations of Scale",
    lessons: 12,
    duration: "6H 30M",
    status: "completed",
    items: [
      { title: "Introduction to Scalable Systems", duration: "14:20", status: "completed" },
      { title: "Load Balancing Fundamentals", duration: "22:15", status: "completed" },
      { title: "Caching Strategies", duration: "18:45", status: "completed" },
    ],
  },
  {
    id: 2,
    title: "Module 2: Advanced Design Patterns",
    lessons: 18,
    duration: "8H 15M",
    status: "in_progress",
    progressPercent: 45,
    items: [
      { title: "Observer & Pub-Sub in Modern Apps", duration: "18:12", status: "in_progress" },
      { title: "Factory and Dependency Injection", duration: "24:30", status: "locked" },
      { title: "Strategy Pattern in React", duration: "20:15", status: "locked" },
    ],
  },
  {
    id: 3,
    title: "Module 3: Database Architectures",
    lessons: 15,
    duration: "10H 00M",
    status: "locked",
    items: [
      { title: "SQL vs NoSQL Deep Dive", duration: "28:10", status: "locked" },
      { title: "Database Sharding", duration: "22:45", status: "locked" },
    ],
  },
  {
    id: 4,
    title: "Module 4: API Design & GraphQL",
    lessons: 14,
    duration: "7H 45M",
    status: "locked",
    items: [],
  },
  {
    id: 5,
    title: "Module 5: Authentication & Security",
    lessons: 10,
    duration: "5H 30M",
    status: "locked",
    items: [],
  },
  {
    id: 6,
    title: "Module 6: DevOps & CI/CD",
    lessons: 16,
    duration: "9H 00M",
    status: "locked",
    items: [],
  },
  {
    id: 7,
    title: "Module 7: Testing Strategies",
    lessons: 12,
    duration: "6H 15M",
    status: "locked",
    items: [],
  },
  {
    id: 8,
    title: "Module 8: Deployment & Monitoring",
    lessons: 11,
    duration: "5H 45M",
    status: "locked",
    items: [],
  },
];

import { useEffect } from "react";
import courseService from "@/features/courses/services/courseService";

export default function StudentCourseOverview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(courseId);
        setCourse(data);
        if (data && data.modules && data.modules.length > 0) {
          setExpandedModules([data.modules[0].id]);
        }
      } catch (err) {
        console.error("Failed to load course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const toggleModule = (id) => {
    setExpandedModules((prev) => 
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} className="text-emerald-500" />;
      case "in_progress":
        return (
          <div className="w-5 h-5 rounded-full border-2 border-[#6C1D5F] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#6C1D5F]" />
          </div>
        );
      case "locked":
      default:
        return <Lock size={18} className="text-slate-300" />;
    }
  };

  const getLessonIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-emerald-500" />;
      case "in_progress":
        return (
          <div className="w-5 h-5 rounded-full bg-[#6C1D5F] flex items-center justify-center">
            <Play size={10} className="text-white ml-0.5" fill="white" />
          </div>
        );
      case "locked":
      default:
        return <Lock size={14} className="text-slate-300" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6C1D5F]" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-16 text-center text-slate-500">
        Course not found.
      </div>
    );
  }

  // Fallbacks for missing dynamic data
  const progress = 65; // Mock progress since backend might not have it yet
  const bannerGradient = "from-[#4A1E47] via-[#6C1D5F] to-[#84117C]";

  return (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className={`relative rounded-2xl overflow-hidden h-[240px] bg-gradient-to-r ${bannerGradient}`}>
        {/* Decorative overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-[40px] border-white" />
          <div className="absolute right-40 bottom-10 w-40 h-40 rounded-full border-[20px] border-white" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border border-white/20 shadow-sm">
                {course.category || "General"}
              </span>
              <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border border-white/10 flex items-center gap-1.5 shadow-sm">
                <Globe size={12} /> {course.language || "English"}
              </span>
            </div>
          </div>
          <div className="max-w-2xl space-y-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight drop-shadow-sm">
              {course.title}
            </h1>
            <div className="flex items-center gap-6 text-[13px] font-medium text-white/90">
              <span className="flex items-center gap-2">
                <User size={16} className="text-white/70" />
                {course.instructor || "LMS Admin"}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-white/70" />
                {course.duration || "Self Paced"}
              </span>
              <span className="flex items-center gap-2">
                <Layers size={16} className="text-white/70" />
                {course.modules?.length || 0} Modules
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ── Left Column: Syllabus (Modules) ────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <BookOpen size={18} className="text-[#6C1D5F]" />
              Course Syllabus
            </h2>
            <button 
              onClick={() => setExpandedModules(course.modules?.map(m => m.id) || [])}
              className="text-[12px] font-bold text-[#6C1D5F] hover:underline cursor-pointer bg-transparent border-none"
            >
              Expand All
            </button>
          </div>

          <div className="space-y-4">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, idx) => (
                <div
                  key={module.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors cursor-pointer border-none outline-none"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="shrink-0">{getStatusIcon(module.status || "locked")}</div>
                      <div>
                        <h3 className="font-bold text-[14.5px] text-slate-800">
                          {module.title || `Module ${idx + 1}`}
                        </h3>
                        <div className="flex items-center gap-3 text-[11.5px] text-slate-400 font-medium mt-1">
                          <span>{module.subModules?.length || 0} lessons</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{module.duration || "Varies"}</span>
                        </div>
                      </div>
                    </div>
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </button>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Overview + Curriculum */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Overview Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-5">
            <h2 className="text-[18px] font-bold text-slate-800">Course Overview</h2>
            <p className="text-[13.5px] text-slate-500 leading-relaxed">{course.overview || "No overview provided."}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</span>
                <p className="text-[13px] font-bold text-slate-800 mt-1">{course.difficulty || "Beginner"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language</span>
                <p className="text-[13px] font-bold text-slate-800 mt-1">{course.language || "English"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
                <p className="text-[13px] font-bold text-slate-800 mt-1">{course.duration || "N/A"}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lessons</span>
                <p className="text-[13px] font-bold text-slate-800 mt-1">{course.lessons || "0 Total"}</p>
              </div>
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-800">Course Curriculum</h2>
                <p className="text-[12.5px] text-slate-400 mt-0.5">
                  Explore {course.totalModules || course.modules?.length || 0} modules designed to take you from expert to visionary.
                </p>
              </div>
              <button 
                onClick={() => setExpandedModules(course.modules?.map(m => m.id) || [])}
                className="text-[12px] font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none"
              >
                Expand All
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Module Accordion */}
            <div className="space-y-3">
              {(course.modules || []).map((mod, modIdx) => {
                const isExpanded = expandedModules.includes(mod.id);
                const isCompleted = mod.status === "completed";
                const isInProgress = mod.status === "in_progress";

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                      isInProgress
                        ? "bg-[#6C1D5F]/[0.03] border-[#6C1D5F]/15"
                        : "bg-white border-slate-200/80"
                    }`}
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full flex items-center gap-3 p-4 text-left cursor-pointer bg-transparent border-none outline-none transition-colors hover:bg-slate-50/50 ${
                        isInProgress ? "hover:bg-[#6C1D5F]/[0.05]" : ""
                      }`}
                    >
                      {getStatusIcon(mod.status || "locked")}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-[14px] font-bold ${
                            isInProgress ? "text-slate-800" : "text-slate-800"
                          }`}
                        >
                          {mod.title || `Module ${modIdx + 1}`}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 uppercase tracking-wider">
                          {mod.subModules?.length || 0} LESSONS • {mod.duration || "N/A"} •{" "}
                          {isCompleted
                            ? "COMPLETED"
                            : isInProgress
                            ? `${mod.progressPercent || 0}% PROGRESS`
                            : "LOCKED"}
                        </p>
                      </div>

                      {/* AI Summarize button for completed modules */}
                      {isCompleted && (
                        <span
                          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6C1D5F] text-white text-[11px] font-bold hover:bg-[#521347] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Module summary generated by AI.", {
                              description: "The summary has been downloaded to your device."
                            });
                          }}
                        >
                          <Sparkles size={12} />
                          Summarize Module
                        </span>
                      )}

                      {isExpanded ? (
                        <ChevronUp size={18} className="text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-slate-400 shrink-0" />
                      )}
                    </button>

                    {/* Expanded Lessons */}
                    {isExpanded && mod.subModules && mod.subModules.length > 0 && (
                      <div className="border-t border-slate-100 bg-slate-50/30">
                        {mod.subModules.map((lesson, idx) => {
                          const lessonCompleted = lesson.status === "completed";
                          const lessonInProgress = lesson.status === "in_progress";
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (lesson.status !== "locked") {
                                  navigate(
                                    `/student/courses/${courseId}/modules/${mod.id}/lessons/${lesson.id || idx + 1}`
                                  );
                                }
                              }}
                              className={`w-full flex items-center gap-3 px-6 py-3.5 text-left border-b border-slate-50 last:border-0 transition-colors bg-transparent border-none outline-none ${
                                lesson.status === "locked"
                                  ? "opacity-60 cursor-default"
                                  : "hover:bg-slate-50 cursor-pointer"
                              }`}
                            >
                              {/* Left accent bar for in-progress */}
                              {lessonInProgress && (
                                <div className="w-[3px] h-8 bg-[#6C1D5F] rounded-full absolute left-0" />
                              )}
                              <div className="relative flex items-center">
                                {getLessonIcon(lesson.status || "locked")}
                              </div>
                              <span
                                className={`flex-1 text-[13px] font-medium ${
                                  lesson.status === "locked" ? "text-slate-400" : "text-slate-700"
                                }`}
                              >
                                {lesson.title}
                              </span>
                              {lessonInProgress && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                                  IN PROGRESS
                                </span>
                              )}
                              <span className="text-[12px] text-slate-400 font-medium tabular-nums">
                                {lesson.duration || "N/A"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Footer */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6C1D5F] to-[#84117C] flex items-center justify-center text-white font-bold text-[14px] shrink-0">
              SJ
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[13px] font-bold text-slate-700">
                Have questions about the curriculum?
              </p>
              <p className="text-[11.5px] text-slate-400">
                {COURSE.instructor} is available for office hours every Thursday.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                   const element = document.createElement("a");
                   element.href = "/syllabus-template.pdf";
                   element.download = "Syllabus.pdf";
                   document.body.appendChild(element);
                   element.click();
                   document.body.removeChild(element);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-[12px] font-bold hover:bg-slate-50 transition-all cursor-pointer outline-none"
              >
                <Download size={14} />
                Download Syllabus
              </button>
              <button 
                onClick={() => navigate("/student/community")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6C1D5F] text-white text-[12px] font-bold hover:bg-[#521347] transition-all cursor-pointer border-none outline-none shadow-sm shadow-[#6C1D5F]/15"
              >
                <MessageSquare size={14} />
                Message Instructor
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Progress Sidebar */}
        <div className="space-y-5">
          {/* Your Progress Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-800">Your Progress</h3>
              <span className="text-2xl font-black text-[#6C1D5F]">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6C1D5F] to-[#84117C] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-slate-500 font-medium">Completed Modules</span>
                <span className="font-bold text-[#6C1D5F]">
                  {course.completedModules || 0} / {course.totalModules || course.modules?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-slate-500 font-medium">Estimated Finish</span>
                <span className="font-bold text-slate-700">{course.estimatedFinish || "N/A"}</span>
              </div>
            </div>

            {/* Resume Learning Button */}
            <button
              onClick={() => {
                 // Try to route to the first available module if no specific state
                 const mod = course.modules && course.modules.length > 0 ? course.modules[0] : null;
                 const lessonId = mod?.subModules?.[0]?.id || 1;
                 const modId = mod?.id || 1;
                 navigate(`/student/courses/${courseId}/modules/${modId}/lessons/${lessonId}`);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6C1D5F] text-white text-[13px] font-bold hover:bg-[#521347] transition-all cursor-pointer border-none outline-none shadow-sm shadow-[#6C1D5F]/15"
            >
              Resume Learning
              <PlayCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import courseService from "../services/courseService";
import moduleService from "../services/moduleService";
import subModuleService from "../services/subModuleService";
import contentService from "../services/contentService";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Plus, 
  Folder, 
  FileText, 
  Video, 
  X, 
  GripVertical, 
  Save,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export default function CurriculumBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Course Data
  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);

  // Curriculum Data
  const [modules, setModules] = useState([]);
  const [loadingCurriculum, setLoadingCurriculum] = useState(true);

  // UI Control States
  const [expandedModules, setExpandedModules] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Module Modal State
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null); // null if adding new
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [submittingModule, setSubmittingModule] = useState(false);

  // Sub-module Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSubModule, setEditingSubModule] = useState(null); // null if adding new
  const [parentModuleId, setParentModuleId] = useState(null);
  const [subModuleTitle, setSubModuleTitle] = useState("");
  const [subModuleDescription, setSubModuleDescription] = useState("");
  const [contentType, setContentType] = useState("video"); // video or pdf
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [submittingSubModule, setSubmittingSubModule] = useState(false);

  // Video URL Validation and Preview States
  const [videoUrlError, setVideoUrlError] = useState("");
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  // Refs for local file selection
  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Local file change handlers
  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Video URL Validation and embed utilities
  const validateUrlFormat = (url) => {
    if (!url.trim()) {
      setVideoUrlError("");
      return false;
    }
    try {
      new URL(url);
      setVideoUrlError("");
      return true;
    } catch (_) {
      setVideoUrlError("Please enter a valid, fully-formatted URL (e.g., https://...)");
      return false;
    }
  };

  const handleVideoUrlChange = (val) => {
    setVideoUrl(val);
    setShowVideoPreview(false); // Reset preview on edit
    validateUrlFormat(val);
  };

  const getEmbedInfo = (url) => {
    if (!url) return null;
    try {
      const parsedUrl = new URL(url);
      const host = parsedUrl.hostname.toLowerCase();
      
      // YouTube
      if (host.includes("youtube.com") || host.includes("youtu.be")) {
        let videoId = "";
        if (host.includes("youtu.be")) {
          videoId = parsedUrl.pathname.substring(1);
        } else if (parsedUrl.pathname.startsWith("/embed/")) {
          videoId = parsedUrl.pathname.substring(7);
        } else {
          videoId = parsedUrl.searchParams.get("v");
        }
        if (videoId) {
          return { type: "youtube", url: `https://www.youtube.com/embed/${videoId}` };
        }
      }
      
      // Vimeo
      if (host.includes("vimeo.com")) {
        let videoId = "";
        if (host.includes("player.vimeo.com")) {
          videoId = parsedUrl.pathname.substring(15);
        } else {
          videoId = parsedUrl.pathname.substring(1);
        }
        if (videoId) {
          return { type: "vimeo", url: `https://player.vimeo.com/video/${videoId}` };
        }
      }

      // Direct MP4 / Cloud storage or default direct player
      return { type: "direct", url };
    } catch (_) {
      return null;
    }
  };

  // Delete Confirm State
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'module'|'submodule', id, title }

  useEffect(() => {
    if (id) {
      loadCourseData();
      loadCurriculumData();
    }
  }, [id]);

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  const loadCourseData = async () => {
    setLoadingCourse(true);
    try {
      const data = await courseService.getCourseById(id);
      setCourse(data);
    } catch (err) {
      console.error("Failed to load course details:", err);
      showError("Could not retrieve course details.");
    } finally {
      setLoadingCourse(false);
    }
  };

  const loadCurriculumData = async () => {
    setLoadingCurriculum(true);
    try {
      const [allModules, allSubModules, allContents] = await Promise.all([
        moduleService.getAllModules(),
        subModuleService.getAllSubModules(),
        contentService.getAllContents(),
      ]);

      // Filter modules for this specific course
      const courseModules = allModules.filter(m => m.courseId === Number(id));

      // Populated structure
      const populated = courseModules.map(mod => {
        const subMods = allSubModules
          .filter(sm => sm.moduleId === mod.id)
          .map(sm => {
            const content = allContents.find(c => c.subModuleId === sm.id);
            return {
              ...sm,
              content,
            };
          });

        return {
          ...mod,
          subModules: subMods,
        };
      });

      setModules(populated);

      // Auto-expand all modules initially
      const expandMap = {};
      populated.forEach(m => {
        expandMap[m.id] = true;
      });
      setExpandedModules(prev => ({ ...expandMap, ...prev }));
    } catch (err) {
      console.error("Failed to load curriculum:", err);
      showError("Failed to fetch curriculum structure.");
    } finally {
      setLoadingCurriculum(false);
    }
  };

  const toggleModuleExpand = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // ─── MODULE ACTIONS ────────────────────────────────────────────────────────

  const openAddModuleModal = () => {
    setEditingModule(null);
    setModuleTitle("");
    setModuleDescription("");
    setIsModuleModalOpen(true);
  };

  const openEditModuleModal = (mod) => {
    setEditingModule(mod);
    setModuleTitle(mod.title);
    setModuleDescription(mod.description || "");
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) {
      showError("Module title is required.");
      return;
    }

    setSubmittingModule(true);
    try {
      if (editingModule) {
        // Edit Mode
        await moduleService.updateModule(editingModule.id, {
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: Number(id)
        });
        showSuccess("Module updated successfully!");
      } else {
        // Create Mode
        await moduleService.createModule({
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: Number(id)
        });
        showSuccess("Module created successfully!");
      }
      setIsModuleModalOpen(false);
      loadCurriculumData();
    } catch (err) {
      console.error("Failed to save module:", err);
      showError(err.response?.data?.message || "Failed to save module.");
    } finally {
      setSubmittingModule(false);
    }
  };

  // ─── SUBMODULE ACTIONS ─────────────────────────────────────────────────────

  const openAddSubModuleDrawer = (moduleId) => {
    setEditingSubModule(null);
    setParentModuleId(moduleId);
    setSubModuleTitle("");
    setSubModuleDescription("");
    setContentType("video");
    setVideoUrl("");
    setPdfUrl("");
    setTextContent("");
    setUploadedFileName("");
    setIsDrawerOpen(true);
  };

  const openEditSubModuleDrawer = (subMod) => {
    setEditingSubModule(subMod);
    setParentModuleId(subMod.moduleId);
    setSubModuleTitle(subMod.title);
    setSubModuleDescription(subMod.description || "");
    
    if (subMod.content) {
      if (subMod.content.pdfUrl) {
        setContentType("pdf");
        setPdfUrl(subMod.content.pdfUrl);
        setVideoUrl("");
        setTextContent("");
        setUploadedFileName("document_simulated.pdf");
      } else if (subMod.content.videoUrl) {
        setContentType("video");
        setVideoUrl(subMod.content.videoUrl);
        setPdfUrl("");
        setTextContent("");
        setUploadedFileName("video_lesson_simulated.mp4");
      } else {
        setContentType("text");
        setTextContent(subMod.content.content || "");
        setVideoUrl("");
        setPdfUrl("");
        setUploadedFileName("");
      }
    } else {
      setContentType("video");
      setVideoUrl("");
      setPdfUrl("");
      setTextContent("");
      setUploadedFileName("");
    }
    setIsDrawerOpen(true);
  };

  const handleSaveSubModule = async (e) => {
    e.preventDefault();
    if (!subModuleTitle.trim()) {
      showError("Sub-module title is required.");
      return;
    }

    setSubmittingSubModule(true);
    try {
      let savedSubModule;
      if (editingSubModule) {
        // Update SubModule details
        savedSubModule = await subModuleService.updateSubModule(editingSubModule.id, {
          title: subModuleTitle.trim(),
          description: subModuleDescription.trim(),
          moduleId: parentModuleId
        });

        // Update or Create Content
        const targetVideoUrl = contentType === "video" ? videoUrl.trim() : "";
        const targetPdfUrl = contentType === "pdf" ? pdfUrl.trim() : "";
        const targetTextContent = contentType === "text" ? textContent.trim() : `Content details for ${subModuleTitle.trim()}`;

        if (editingSubModule.content) {
          await contentService.updateContent(editingSubModule.content.id, {
            title: `${subModuleTitle.trim()} Content`,
            content: targetTextContent,
            videoUrl: targetVideoUrl,
            pdfUrl: targetPdfUrl,
            subModuleId: editingSubModule.id
          });
        } else if (targetVideoUrl || targetPdfUrl || contentType === "text") {
          await contentService.createContent({
            title: `${subModuleTitle.trim()} Content`,
            content: targetTextContent,
            videoUrl: targetVideoUrl,
            pdfUrl: targetPdfUrl,
            subModuleId: editingSubModule.id
          });
        }
        showSuccess("Sub-module updated successfully!");
      } else {
        // Create SubModule
        savedSubModule = await subModuleService.createSubModule({
          title: subModuleTitle.trim(),
          description: subModuleDescription.trim(),
          moduleId: parentModuleId
        });

        // Create associated Content if URL exists or is text content
        const targetVideoUrl = contentType === "video" ? videoUrl.trim() : "";
        const targetPdfUrl = contentType === "pdf" ? pdfUrl.trim() : "";
        const targetTextContent = contentType === "text" ? textContent.trim() : `Content details for ${subModuleTitle.trim()}`;

        if (targetVideoUrl || targetPdfUrl || contentType === "text") {
          await contentService.createContent({
            title: `${subModuleTitle.trim()} Content`,
            content: targetTextContent,
            videoUrl: targetVideoUrl,
            pdfUrl: targetPdfUrl,
            subModuleId: savedSubModule.id
          });
        }
        showSuccess("Sub-module created successfully!");
      }

      setIsDrawerOpen(false);
      loadCurriculumData();
    } catch (err) {
      console.error("Failed to save sub-module:", err);
      showError(err.response?.data?.message || "Failed to save sub-module.");
    } finally {
      setSubmittingSubModule(false);
    }
  };

  // ─── DELETIONS ─────────────────────────────────────────────────────────────

  const requestDelete = (type, target) => {
    setDeleteTarget({
      type,
      id: target.id,
      title: target.title
    });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "module") {
        await moduleService.deleteModule(deleteTarget.id);
        showSuccess("Module deleted successfully.");
      } else if (deleteTarget.type === "submodule") {
        await subModuleService.deleteSubModule(deleteTarget.id);
        showSuccess("Sub-module deleted successfully.");
      }
      loadCurriculumData();
    } catch (err) {
      console.error("Failed to delete:", err);
      showError("Deletion failed. Make sure the entity is empty and try again.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handlePublishCourse = async () => {
    if (!course) return;
    try {
      await courseService.updateCourse(course.id, {
        ...course,
        status: "Published"
      });
      showSuccess("Course published successfully!");
      loadCourseData();
    } catch (err) {
      console.error("Publish failed:", err);
      showError("Failed to publish course.");
    }
  };

  return (
    <>
      <AppLayout>
        <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
              <ChevronRight size={12} />
              <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
              {course && (
                <>
                  <ChevronRight size={12} />
                  <span className="truncate max-w-[200px]">{course.title}</span>
                </>
              )}
              <ChevronRight size={12} />
              <span className="text-primary font-semibold">Curriculum Builder</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Curriculum Builder</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/curriculum")}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Courses
            </button>
            <button
              onClick={handlePublishCourse}
              disabled={course?.status === "Published"}
              className="px-4 py-2 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] disabled:bg-slate-200 disabled:text-slate-400 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              Publish Course
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl text-xs font-medium animate-fadeIn">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-medium animate-fadeIn">
            {errorMessage}
          </div>
        )}

        {/* Course Information Section */}
        {loadingCourse ? (
          <div className="p-8 bg-white border border-slate-200 rounded-2xl animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          </div>
        ) : course ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-4 flex-1">
              <h2 className="text-base font-bold text-slate-800">Course Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Course Title</span>
                  <span className="text-sm font-semibold text-slate-700">{course.title}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Category</span>
                  <span className="text-sm font-semibold text-slate-700">{course.categoryName || "General"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Level</span>
                  <span className="text-sm font-semibold text-slate-700">{course.difficulty || "Intermediate"}</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</span>
                <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">{course.description || "No description provided."}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/courses/${course.id}/edit`)}
              className="px-3.5 py-1.5 border border-[#6C1D5F] text-[#6C1D5F] hover:bg-[#F7F8FC] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Edit size={14} /> Edit Course Details
            </button>
          </div>
        ) : null}

        {/* Curriculum Structure Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-800">Curriculum Structure</h2>
            <button
              onClick={openAddModuleModal}
              className="px-3.5 py-1.5 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus size={16} /> Add Module
            </button>
          </div>

          {loadingCurriculum ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Loading curriculum details...
            </div>
          ) : modules.length === 0 ? (
            <div className="space-y-4">
              <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl text-slate-400 text-sm">
                No modules created yet. Click "Add Module" to start structuring your course.
              </div>
              <button
                onClick={openAddModuleModal}
                className="w-full flex items-center justify-center gap-1.5 py-3 border-2 border-dashed border-[#6C1D5F]/30 hover:border-[#6C1D5F] rounded-xl text-[#6C1D5F] hover:bg-[#6C1D5F]/5 font-semibold text-xs transition-all cursor-pointer"
              >
                <Plus size={16} /> Add Module
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((mod) => (
                <Card key={mod.id} className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                  
                  {/* Module Header Container */}
                  <div className="p-4 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                    {/* Drag handle */}
                    <GripVertical size={16} className="text-slate-400 cursor-grab opacity-60 hover:opacity-100 shrink-0" />
                    
                    {/* Expand/Collapse Chevron */}
                    <button 
                      onClick={() => toggleModuleExpand(mod.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer shrink-0"
                    >
                      {expandedModules[mod.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    
                    {/* Folder Icon */}
                    <div className="p-2 bg-[#ffd7f3] rounded-lg text-[#800b79] shrink-0">
                      <Folder size={18} fill="currentColor" className="opacity-80" />
                    </div>
                    
                    {/* Title and Description/Sub-module Count */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 truncate">{mod.title}</h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {mod.subModules?.length || 0} Sub-module{(mod.subModules?.length || 0) === 1 ? "" : "s"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openAddSubModuleDrawer(mod.id)}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-[#6C1D5F] hover:text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Plus size={10} /> Add Sub-module
                      </button>
                      <button
                        onClick={() => openEditModuleModal(mod)}
                        className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Module"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => requestDelete("module", mod)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Module"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Section */}
                  {expandedModules[mod.id] && (
                    <>
                      <Separator />
                      <div className="bg-slate-50/50 p-4 pl-12 space-y-3 border-t border-slate-100">
                        {/* Sub-modules List */}
                        {mod.subModules && mod.subModules.length > 0 ? (
                          <div className="space-y-2">
                            {mod.subModules.map((sub) => (
                              <div 
                                key={sub.id} 
                                className="group bg-white rounded-xl border border-slate-150 p-3.5 flex items-center gap-3 hover:border-[#6C1D5F] hover:shadow-sm transition-all"
                              >
                                <GripVertical size={14} className="text-slate-350 cursor-grab opacity-40 hover:opacity-100 shrink-0" />
                                <div className="p-1.5 bg-[#ffd7f3]/40 rounded-lg text-[#800b79] shrink-0">
                                  {sub.content?.pdfUrl ? (
                                    <FileText size={14} className="opacity-80" />
                                  ) : sub.content?.videoUrl ? (
                                    <Video size={14} className="opacity-80" />
                                  ) : (
                                    <FileText size={14} className="opacity-80" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-slate-700 truncate">{sub.title}</h4>
                                  <p className="text-[10px] text-slate-400 font-medium">
                                    {sub.content?.pdfUrl ? "PDF Document" : sub.content?.videoUrl ? "Video Lesson" : sub.content?.content ? "Text Content" : "No content attached"}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => openEditSubModuleDrawer(sub)}
                                    className="p-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Sub-module"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => requestDelete("submodule", sub)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Sub-module"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl bg-white">
                            No sub-modules in this module yet.
                          </div>
                        )}

                        {/* Add Sub-module Button */}
                        <button
                          onClick={() => openAddSubModuleDrawer(mod.id)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-[#6C1D5F]/20 hover:border-[#6C1D5F] rounded-xl text-[#6C1D5F] hover:bg-[#6C1D5F]/5 font-semibold text-xs transition-all cursor-pointer bg-white"
                        >
                          <Plus size={14} /> Add Sub-module
                        </button>
                      </div>
                    </>
                  )}
                </Card>
              ))}

              {/* Dashed Add Module button under all modules */}
              <button
                onClick={openAddModuleModal}
                className="w-full flex items-center justify-center gap-1.5 py-3 border-2 border-dashed border-[#6C1D5F]/30 hover:border-[#6C1D5F] rounded-xl text-[#6C1D5F] hover:bg-[#6C1D5F]/5 font-semibold text-xs transition-all mt-4 mb-6 cursor-pointer"
              >
                <Plus size={16} /> Add Module
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>

      {/* ─── MODULE FORM MODAL ───────────────────────────────────────────────── */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md min-w-[320px] md:w-[448px] border border-slate-200 flex flex-col animate-scaleUp">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingModule ? "Edit Module" : "Add Module"}
              </h3>
              <button 
                onClick={() => setIsModuleModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSaveModule} className="p-5 space-y-4 flex-1">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500">Module Title</label>
                <input
                  type="text"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  placeholder="e.g. Module 1: Foundations of Design"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] focus:border-[#6C1D5F] transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500">Description (Optional)</label>
                <textarea
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  placeholder="Provide a brief summary of what this module covers."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] focus:border-[#6C1D5F] transition-all resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModuleModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingModule}
                  className="px-4 py-2 bg-[#6C1D5F] text-white hover:bg-[#4A1E47] disabled:bg-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Save size={14} />
                  {submittingModule ? "Saving..." : "Save Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── SUBMODULE DIALOG ────────────────────────────────────────────────── */}
      <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[750px] lg:max-w-[800px] w-full max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingSubModule ? "Edit Sub-module" : "Add Sub-module"}
            </DialogTitle>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X size={18} />
            </button>
          </DialogHeader>

          <form onSubmit={handleSaveSubModule} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
            <div className="space-y-1">
              <Label htmlFor="subModuleTitle">Sub-module Title</Label>
              <Input
                id="subModuleTitle"
                type="text"
                value={subModuleTitle}
                onChange={(e) => setSubModuleTitle(e.target.value)}
                placeholder="Enter sub-module title"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="subModuleDescription">Description (Optional)</Label>
              <Textarea
                id="subModuleDescription"
                value={subModuleDescription}
                onChange={(e) => setSubModuleDescription(e.target.value)}
                placeholder="Enter brief description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Type</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setContentType("video")}
                  className={`flex items-center justify-center gap-1 py-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    contentType === "video"
                      ? "border-2 border-[#6C1D5F] bg-[#ffd7f3]/40 text-[#800b79]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Video size={12} /> Video
                </button>
                <button
                  type="button"
                  onClick={() => setContentType("pdf")}
                  className={`flex items-center justify-center gap-1 py-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    contentType === "pdf"
                      ? "border-2 border-[#6C1D5F] bg-[#ffd7f3]/40 text-[#800b79]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FileText size={12} /> PDF
                </button>
                <button
                  type="button"
                  onClick={() => setContentType("text")}
                  className={`flex items-center justify-center gap-1 py-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    contentType === "text"
                      ? "border-2 border-[#6C1D5F] bg-[#ffd7f3]/40 text-[#800b79]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FileText size={12} /> Text
                </button>
              </div>
            </div>

            {contentType === "video" ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        id="videoUrl"
                        type="url"
                        value={videoUrl}
                        onChange={(e) => handleVideoUrlChange(e.target.value)}
                        placeholder="e.g. https://www.youtube.com/watch?v=... or direct MP4 URL"
                        className={videoUrlError ? "border-red-500 focus-visible:ring-red-200" : ""}
                      />
                    </div>
                    {videoUrl.trim() && !videoUrlError && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowVideoPreview(true)}
                        className="cursor-pointer font-semibold border-slate-300 hover:bg-slate-50 shrink-0"
                      >
                        Preview
                      </Button>
                    )}
                  </div>
                  {videoUrlError && (
                    <p className="text-[11px] text-red-500 font-medium animate-fadeIn">{videoUrlError}</p>
                  )}
                </div>

                {/* Embedded Video Preview Area */}
                {showVideoPreview && videoUrl.trim() && !videoUrlError && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <Label>Video Preview</Label>
                    {(() => {
                      const embedInfo = getEmbedInfo(videoUrl);
                      if (!embedInfo) return <p className="text-xs text-slate-400">Preview not available for this URL format.</p>;
                      
                      if (embedInfo.type === "youtube" || embedInfo.type === "vimeo") {
                        return (
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                            <iframe
                              src={embedInfo.url}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Video Preview"
                            />
                          </div>
                        );
                      }
                      
                      return (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 flex items-center justify-center">
                          <video
                            controls
                            src={embedInfo.url}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : contentType === "pdf" ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="pdfUrl">PDF URL</Label>
                  <Input
                    id="pdfUrl"
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="e.g. https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  />
                </div>

                {/* Upload Section */}
                <div className="space-y-1.5">
                  <Label>Upload PDF File</Label>
                  <input 
                    type="file" 
                    ref={pdfInputRef} 
                    onChange={handlePdfFileChange} 
                    accept="application/pdf" 
                    className="hidden" 
                  />
                  {pdfUrl ? (
                    <div className="border border-green-200 rounded-xl p-4 bg-green-50/50 flex items-center justify-between gap-3 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-lg text-green-700">
                          <FileText size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]" title={uploadedFileName || "document_simulated.pdf"}>
                            {uploadedFileName || "document_simulated.pdf"}
                          </p>
                          <p className="text-[10px] text-green-700 font-medium">Uploaded Successfully</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setPdfUrl(""); setUploadedFileName(""); if (pdfInputRef.current) pdfInputRef.current.value = ""; }}
                        className="px-2.5 py-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg text-[10px] font-bold transition-all cursor-pointer border border-slate-200 bg-white"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => pdfInputRef.current?.click()}
                      className="border border-dashed border-slate-300 hover:border-[#6C1D5F] rounded-xl p-6 text-center bg-slate-50/50 hover:bg-white transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#ffd7f3]/50 flex items-center justify-center text-[#800b79] mx-auto group-hover:scale-105 transition-transform">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Click to upload file</p>
                        <p className="text-[10px] text-slate-400">Select any PDF file from your system</p>
                      </div>
                      <span className="inline-block text-[9px] text-slate-400 font-bold uppercase tracking-wider">PDF format only</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="textContent">Text Content</Label>
                  <Textarea
                    id="textContent"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter the text content for this sub-module..."
                    rows={8}
                  />
                </div>
              </div>
            )}
          </form>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDrawerOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveSubModule}
              disabled={submittingSubModule}
              className="bg-[#6C1D5F] hover:bg-[#4A1E47] text-white cursor-pointer"
            >
              <Save size={14} className="mr-1.5" />
              {submittingSubModule ? "Saving..." : "Save Sub-module"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── DELETE CONFIRM DIALOG ───────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm min-w-[300px] md:w-[380px] border border-slate-200 p-5 space-y-4 animate-scaleUp">
            <h3 className="font-bold text-slate-800 text-sm">Delete {deleteTarget.type === "module" ? "Module" : "Sub-module"}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteTarget.title}"</span>? 
              This action cannot be undone and will delete all nested items.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3.5 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

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
  ChevronDown,
  ExternalLink,
  Play,
  HelpCircle,
  Link2
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
  
  // Content Types: "Video", "PDF", "Document", "Quiz", "External Link"
  const [contentType, setContentType] = useState("Video"); 
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [submittingSubModule, setSubmittingSubModule] = useState(false);

  // Video URL Validation and Preview States
  const [youtubeUrlError, setYoutubeUrlError] = useState("");
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  // Live Iframe Preview Modal State
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  // Refs for local file selection
  const pdfInputRef = useRef(null);

  // Local file change handler
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

  // Helper to extract YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Validate YouTube Link
  const validateYouTubeUrl = (url) => {
    if (!url.trim()) {
      setYoutubeUrlError("");
      return false;
    }
    const ytId = getYouTubeId(url);
    if (ytId) {
      setYoutubeUrlError("");
      return true;
    } else {
      setYoutubeUrlError("Please enter a valid YouTube link (e.g., https://www.youtube.com/watch?v=...)");
      return false;
    }
  };

  const handleYoutubeUrlChange = (val) => {
    setYoutubeUrl(val);
    setShowVideoPreview(false);
    validateYouTubeUrl(val);
  };

  useEffect(() => {
    if (id) {
      loadCourseData();
      loadCurriculumData();
    }
  }, [id]);

  const loadCourseData = async () => {
    setLoadingCourse(true);
    try {
      const data = await courseService.getCourseById(id);
      setCourse(data);
    } catch (err) {
      console.error("Failed to load course details:", err);
      showError("Failed to load course details.");
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
        contentService.getAllContents()
      ]);

      // Filter modules for this specific course
      const courseModules = allModules.filter(m => m.courseId === Number(id));

      // Populate sub-modules and contents
      const populated = courseModules.map(mod => {
        const subMods = allSubModules
          .filter(sub => sub.moduleId === mod.id)
          .map(sub => {
            const content = allContents.find(c => c.subModuleId === sub.id);
            return { ...sub, content };
          });

        return {
          ...mod,
          subModules: subMods,
        };
      });

      // Sort modules by sortOrder if available
      populated.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setModules(populated);

      // Auto-expand all modules initially
      const expandMap = {};
      populated.forEach(m => {
        expandMap[m.id] = true;
      });
      setExpandedModules(prev => ({ ...expandMap, ...prev }));
    } catch (err) {
      console.error("Failed to load curriculum:", err);
      showError("Failed to load modules and contents.");
    } finally {
      setLoadingCurriculum(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    setSuccessMessage("");
    setTimeout(() => setErrorMessage(""), 5000);
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
        await moduleService.updateModule(editingModule.id, {
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: Number(id),
          sortOrder: editingModule.sortOrder || 1
        });
        showSuccess("Module updated successfully!");
      } else {
        await moduleService.createModule({
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: Number(id),
          sortOrder: modules.length + 1
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
    setContentType("Video");
    setYoutubeUrl("");
    setPdfUrl("");
    setTextContent("");
    setExternalLink("");
    setUploadedFileName("");
    setYoutubeUrlError("");
    setShowVideoPreview(false);
    setIsDrawerOpen(true);
  };

  const openEditSubModuleDrawer = (subMod) => {
    setEditingSubModule(subMod);
    setParentModuleId(subMod.moduleId);
    setSubModuleTitle(subMod.title);
    setSubModuleDescription(subMod.description || "");
    setYoutubeUrlError("");
    setShowVideoPreview(false);
    
    if (subMod.content) {
      // Determine content type based on stored fields
      if (subMod.content.youtubeUrl) {
        setContentType("Video");
        setYoutubeUrl(subMod.content.youtubeUrl);
        setPdfUrl("");
        setTextContent("");
        setExternalLink("");
      } else if (subMod.content.pdfUrl) {
        setContentType("PDF");
        setPdfUrl(subMod.content.pdfUrl);
        setYoutubeUrl("");
        setTextContent("");
        setExternalLink("");
        setUploadedFileName("document_simulated.pdf");
      } else if (subMod.content.videoUrl && (subMod.content.videoUrl.startsWith("http") && !subMod.content.videoUrl.includes("youtu"))) {
        // Fallback for non-youtube links
        setContentType("External Link");
        setExternalLink(subMod.content.videoUrl);
        setYoutubeUrl("");
        setPdfUrl("");
        setTextContent("");
      } else if (subMod.content.content && subMod.content.content.startsWith("QUIZ:")) {
        setContentType("Quiz");
        setTextContent(subMod.content.content.replace("QUIZ:", ""));
        setYoutubeUrl("");
        setPdfUrl("");
        setExternalLink("");
      } else {
        setContentType("Document");
        setTextContent(subMod.content.content || "");
        setYoutubeUrl("");
        setPdfUrl("");
        setExternalLink("");
      }
    } else {
      setContentType("Video");
      setYoutubeUrl("");
      setPdfUrl("");
      setTextContent("");
      setExternalLink("");
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

    if (contentType === "Video") {
      const ytId = getYouTubeId(youtubeUrl);
      if (!ytId) {
        showError("A valid YouTube URL is required for Video content.");
        return;
      }
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

        // Map UI values to Content schema
        const targetYoutubeUrl = contentType === "Video" ? youtubeUrl.trim() : "";
        const targetPdfUrl = contentType === "PDF" ? pdfUrl.trim() : "";
        
        let targetTextContent = "";
        let targetVideoUrl = ""; // Used for external links

        if (contentType === "Document") {
          targetTextContent = textContent.trim();
        } else if (contentType === "Quiz") {
          targetTextContent = `QUIZ:${textContent.trim()}`;
        } else if (contentType === "External Link") {
          targetVideoUrl = externalLink.trim();
          targetTextContent = `External resource link: ${externalLink.trim()}`;
        } else {
          targetTextContent = `Content details for ${subModuleTitle.trim()}`;
        }

        if (editingSubModule.content) {
          await contentService.updateContent(editingSubModule.content.id, {
            title: `${subModuleTitle.trim()} Content`,
            content: targetTextContent,
            videoUrl: targetVideoUrl,
            pdfUrl: targetPdfUrl,
            youtubeUrl: targetYoutubeUrl,
            subModuleId: editingSubModule.id
          });
        } else {
          await contentService.createContent({
            title: `${subModuleTitle.trim()} Content`,
            content: targetTextContent,
            videoUrl: targetVideoUrl,
            pdfUrl: targetPdfUrl,
            youtubeUrl: targetYoutubeUrl,
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

        const targetYoutubeUrl = contentType === "Video" ? youtubeUrl.trim() : "";
        const targetPdfUrl = contentType === "PDF" ? pdfUrl.trim() : "";
        
        let targetTextContent = "";
        let targetVideoUrl = "";

        if (contentType === "Document") {
          targetTextContent = textContent.trim();
        } else if (contentType === "Quiz") {
          targetTextContent = `QUIZ:${textContent.trim()}`;
        } else if (contentType === "External Link") {
          targetVideoUrl = externalLink.trim();
          targetTextContent = `External resource link: ${externalLink.trim()}`;
        } else {
          targetTextContent = `Content details for ${subModuleTitle.trim()}`;
        }

        await contentService.createContent({
          title: `${subModuleTitle.trim()} Content`,
          content: targetTextContent,
          videoUrl: targetVideoUrl,
          pdfUrl: targetPdfUrl,
          youtubeUrl: targetYoutubeUrl,
          subModuleId: savedSubModule.id
        });
        
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

  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'module'|'submodule', id, title }

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
        showSuccess("Module deleted successfully!");
      } else {
        await subModuleService.deleteSubModule(deleteTarget.id);
        showSuccess("Sub-module deleted successfully!");
      }
      setDeleteTarget(null);
      loadCurriculumData();
    } catch (err) {
      console.error("Failed to delete:", err);
      showError("Failed to delete the selected item.");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-[1000px] mx-auto w-full pb-12 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Alerts */}
        {successMessage && (
          <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-sm">
            <Play className="w-3.5 h-3.5 rotate-90 fill-green-800" /> {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-sm">
            <X className="w-3.5 h-3.5" /> {errorMessage}
          </div>
        )}

        {/* Top Navigation Row */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <Link 
              to="/courses"
              className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Courses / Curriculum</span>
              <h1 className="text-lg font-bold text-slate-800 mt-0.5 truncate max-w-[400px]">
                {loadingCourse ? "Loading course..." : course?.title}
              </h1>
            </div>
          </div>
          
          <button
            onClick={openAddModuleModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#6C1D5F] hover:bg-[#57174C] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus size={14} /> Add Module
          </button>
        </div>

        {/* Modules & Submodules Outline */}
        <div className="space-y-4">
          {loadingCurriculum ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-[#6C1D5F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Loading curriculum builder...</p>
            </div>
          ) : modules.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-sm">
              <Folder className="text-slate-350 mx-auto mb-4" size={40} />
              <h3 className="font-bold text-slate-800 text-sm">Create Modules</h3>
              <p className="text-xs text-slate-400 mt-1">
                No modules created yet. Click "Add Module" to start structuring your course.
              </p>
            </div>
          ) : (
            modules.map((mod) => (
              <Card key={mod.id} className="overflow-hidden border border-slate-200 shadow-sm">
                
                {/* Module Header */}
                <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0" onClick={() => toggleModuleExpand(mod.id)}>
                    <div className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors">
                      {expandedModules[mod.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-700 rounded-xl shrink-0">
                      <Folder size={16} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-slate-800 truncate">{mod.title}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {mod.subModules?.length || 0} Lesson{(mod.subModules?.length || 0) === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 ml-4">
                    <button
                      onClick={() => openEditModuleModal(mod)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Module"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => requestDelete("module", mod)}
                      className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Module"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Sub-modules List Area */}
                {expandedModules[mod.id] && (
                  <div className="bg-slate-50/50 p-4 pl-12 space-y-3 border-t border-slate-100">
                    {mod.subModules && mod.subModules.length > 0 ? (
                      <div className="space-y-2">
                        {mod.subModules.map((sub) => {
                          const youtubeId = sub.content?.youtubeUrl ? getYouTubeId(sub.content.youtubeUrl) : null;
                          return (
                            <div 
                              key={sub.id} 
                              className="group bg-white rounded-xl border border-slate-200 p-3.5 flex items-center gap-4 hover:border-[#6C1D5F] hover:shadow-sm transition-all"
                            >
                              <GripVertical size={14} className="text-slate-350 cursor-grab opacity-40 hover:opacity-100 shrink-0" />
                              
                              {/* Left Icon or Thumbnail */}
                              {youtubeId ? (
                                <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0 shadow-sm animate-fadeIn">
                                  <img 
                                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} 
                                    alt="YouTube thumbnail"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-red-600 shadow-sm">
                                      <Play size={8} className="fill-red-600 ml-0.5" />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-2 bg-[#ffd7f3]/40 rounded-lg text-[#800b79] shrink-0">
                                  {sub.content?.pdfUrl ? (
                                    <FileText size={16} className="opacity-80" />
                                  ) : sub.content?.videoUrl ? (
                                    <Link2 size={16} className="opacity-80" />
                                  ) : (
                                    <FileText size={16} className="opacity-80" />
                                  )}
                                </div>
                              )}

                              {/* Title & Info */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-slate-700 truncate">{sub.title}</h4>
                                {youtubeId ? (
                                  <p className="text-[10px] text-red-600 font-semibold mt-0.5 truncate flex items-center gap-1">
                                    <Video size={10} /> {sub.content.youtubeUrl}
                                  </p>
                                ) : (
                                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                    {sub.content?.pdfUrl ? "PDF Document" : sub.content?.videoUrl ? "External Resource Link" : sub.content?.content?.startsWith("QUIZ:") ? "Quiz Content" : "Text Document"}
                                  </p>
                                )}
                              </div>

                              {/* Action Items */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {youtubeId && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setPreviewVideoUrl(sub.content.youtubeUrl)}
                                    className="p-1 h-7 text-xs font-bold hover:text-red-600 flex items-center gap-1 shrink-0 bg-transparent shadow-none"
                                  >
                                    <Play size={12} className="fill-red-600 text-red-650" /> Preview Video
                                  </Button>
                                )}
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
                          );
                        })}
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
                )}
              </Card>
            ))
          )}
        </div>

      </div>

      {/* ─── MODULE MODAL ────────────────────────────────────────────────────── */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] sm:w-[448px] max-w-md shrink-0 border border-slate-200 flex flex-col my-8">
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
              <div className="space-y-1.5">
                <Label htmlFor="modTitle">Module Title</Label>
                <Input
                  id="modTitle"
                  type="text"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  placeholder="e.g. Module 1: Foundations of Design"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="modDesc">Description (Optional)</Label>
                <Textarea
                  id="modDesc"
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  placeholder="Provide a brief summary of what this module covers."
                  rows={4}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModuleModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingModule}
                  className="px-4 py-2.5 bg-[#6C1D5F] text-white hover:bg-[#57174C] disabled:bg-slate-350 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Save size={13} />
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
            <div className="space-y-1.5">
              <Label htmlFor="subModuleTitle">Sub-module Title *</Label>
              <Input
                id="subModuleTitle"
                type="text"
                value={subModuleTitle}
                onChange={(e) => setSubModuleTitle(e.target.value)}
                placeholder="Enter sub-module title"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subModuleDescription">Description (Optional)</Label>
              <Textarea
                id="subModuleDescription"
                value={subModuleDescription}
                onChange={(e) => setSubModuleDescription(e.target.value)}
                placeholder="Enter brief description"
                rows={3}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subModuleContentType">Content Type *</Label>
              <select
                id="subModuleContentType"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white cursor-pointer transition-all"
              >
                <option value="Video">Video</option>
                <option value="PDF">PDF</option>
                <option value="Document">Document</option>
                <option value="Quiz">Quiz</option>
                <option value="External Link">External Link</option>
              </select>
            </div>

            {contentType === "Video" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="youtubeUrl">YouTube Video URL *</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        id="youtubeUrl"
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        className={youtubeUrlError ? "border-red-500 focus-visible:ring-red-200" : ""}
                        required
                      />
                    </div>
                    {youtubeUrl.trim() && !youtubeUrlError && (
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => window.open(youtubeUrl, '_blank')}
                          className="cursor-pointer font-bold border-slate-300 hover:text-red-650 hover:bg-slate-50 shrink-0 flex items-center gap-1.5"
                        >
                          <ExternalLink size={14} /> Open
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowVideoPreview(true)}
                          className="cursor-pointer font-bold border-slate-300 hover:bg-slate-50 shrink-0"
                        >
                          Preview
                        </Button>
                      </div>
                    )}
                  </div>
                  {youtubeUrlError && (
                    <p className="text-[11px] text-red-500 font-semibold animate-fadeIn">{youtubeUrlError}</p>
                  )}
                </div>

                {/* Embedded Video Preview Area */}
                {showVideoPreview && youtubeUrl.trim() && !youtubeUrlError && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <Label>Video Thumbnail & Preview</Label>
                    {(() => {
                      const ytId = getYouTubeId(youtubeUrl);
                      if (!ytId) return <p className="text-xs text-slate-400">Preview not available.</p>;
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thumbnail Image</span>
                            <div className="aspect-video bg-slate-900 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                              <img 
                                src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                                alt="Live Thumbnail"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Embed Video</span>
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                              <iframe
                                src={`https://www.youtube.com/embed/${ytId}`}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Video Preview"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {contentType === "PDF" && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="pdfUrl">PDF URL</Label>
                  <Input
                    id="pdfUrl"
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="e.g. https://www.example.com/doc.pdf"
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
                    <div className="border border-green-250 rounded-xl p-4 bg-green-50/50 flex items-center justify-between gap-3 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-lg text-green-700">
                          <FileText size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]" title={uploadedFileName || "document_simulated.pdf"}>
                            {uploadedFileName || "document_simulated.pdf"}
                          </p>
                          <p className="text-[10px] text-green-700 font-bold">Uploaded Successfully</p>
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
                      className="border border-dashed border-slate-350 hover:border-[#6C1D5F] rounded-xl p-6 text-center bg-slate-50/50 hover:bg-white transition-all cursor-pointer space-y-2 group"
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
            )}

            {contentType === "Document" && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="docText">Document Content</Label>
                  <Textarea
                    id="docText"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter article text or markdown documentation..."
                    rows={8}
                    required
                  />
                </div>
              </div>
            )}

            {contentType === "Quiz" && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="quizText">Quiz Instructions & Questions</Label>
                  <Textarea
                    id="quizText"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter instructions or Quiz JSON config..."
                    rows={8}
                    required
                  />
                </div>
              </div>
            )}

            {contentType === "External Link" && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="extLink">External Website URL *</Label>
                  <Input
                    id="extLink"
                    type="url"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="e.g. https://www.google.com"
                    required
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
              className="cursor-pointer font-bold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveSubModule}
              disabled={submittingSubModule}
              className="bg-[#6C1D5F] hover:bg-[#57174C] text-white cursor-pointer font-bold"
            >
              <Save size={14} className="mr-1.5" />
              {submittingSubModule ? "Saving..." : "Save Sub-module"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── LIVE VIDEO PLAYOVER MODAL ────────────────────────────────────────── */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 rounded-2xl w-full max-w-[90vw] md:max-w-2xl overflow-hidden flex flex-col shrink-0 relative animate-scaleUp">
            
            <button 
              onClick={() => setPreviewVideoUrl(null)}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer z-10"
            >
              <X size={18} />
            </button>
            
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(previewVideoUrl)}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
              />
            </div>
            <div className="p-4 bg-slate-950 flex justify-between items-center text-white">
              <span className="text-xs truncate font-bold">{previewVideoUrl}</span>
              <Button
                variant="outline"
                className="text-xs font-semibold text-slate-800 bg-white border-none hover:bg-slate-100 hover:text-black shrink-0"
                onClick={() => window.open(previewVideoUrl, '_blank')}
              >
                Open in YouTube
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRM DIALOG ───────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm min-w-[300px] md:w-[380px] border border-slate-200 p-5 space-y-4 shrink-0 animate-scaleUp">
            <h3 className="font-bold text-slate-800 text-sm">Delete {deleteTarget.type === "module" ? "Module" : "Sub-module"}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteTarget.title}"</span>? 
              This action cannot be undone and will delete all nested items.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-650 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};



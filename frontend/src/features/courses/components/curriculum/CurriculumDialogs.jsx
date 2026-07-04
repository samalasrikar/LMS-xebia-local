import React from "react";
import {
  Search,
  X,
  FolderOpen,
  BookOpen,
  FileText,
  GraduationCap,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import SafeMediaEmbed from "./SafeMediaEmbed";
import EmptyState from "@/shared/components/EmptyState";

export default function CurriculumDialogs({
  // Block picker
  blockPickerOpen,
  setBlockPickerOpen,
  blockSearch,
  setBlockSearch,
  filteredBlockCategories,
  selectedBlockType,
  setSelectedBlockType,
  // Block config dialog states & handlers
  blockConfigOpen,
  setBlockConfigOpen,
  blockConfigType,
  handleSelectBlockType,
  handleSaveBlock,
  showToast,

  // Module modal
  isModuleModalOpen,
  setIsModuleModalOpen,
  editingModule,
  moduleTitle,
  setModuleTitle,
  moduleDescription,
  setModuleDescription,
  submittingModule,
  handleSaveModule,

  // Submodule modal
  isDrawerOpen,
  setIsDrawerOpen,
  editingSubModule,
  subModuleTitle,
  setSubModuleTitle,
  subModuleDescription,
  setSubModuleDescription,
  videoUrl,
  videoUrlError,
  handleVideoUrlChange,
  pdfUrl,
  setPdfUrl,
  pdfInputRef,
  handlePdfFileChange,
  uploadedFileName,
  setUploadedFileName,
  textContent,
  setTextContent,
  submittingSubModule,
  handleSaveSubModule,

  // Course Selector
  courseDialogOpen,
  setCourseDialogOpen,
  courseDialogTab,
  setCourseDialogTab,
  courseSearch,
  setCourseSearch,
  allCourses,
  loadingAllCourses,
  id,
  handleSelectCourse,
  newCourseTitle,
  setNewCourseTitle,
  newCourseDescription,
  setNewCourseDescription,
  newCourseCategory,
  setNewCourseCategory,
  creatingCourse,
  handleCreateAndSelectCourse,

  // Delete Target
  deleteTarget,
  setDeleteTarget,
  confirmDelete,

  // Toast
  toast,
  setToast,
}) {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          BLOCK PICKER DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={blockPickerOpen} onOpenChange={setBlockPickerOpen}>
        <DialogContent className="max-w-[520px] rounded-xl shadow-2xl bg-white border border-slate-200 p-0 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-[#6C1D5F] focus-within:ring-1 focus-within:ring-[#6C1D5F]/30 transition-all">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={blockSearch}
                onChange={e => setBlockSearch(e.target.value)}
                placeholder="Search blocks..."
                className="flex-1 bg-transparent text-[13px] outline-none text-slate-700 placeholder:text-slate-400"
              />
              {blockSearch && (
                <button onClick={() => setBlockSearch("")} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X size={12} />
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium text-center">
              Select a block type to add to this submodule
            </p>
          </div>

          {/* Categories */}
          <ScrollArea className="max-h-[400px]">
            <div className="p-3 space-y-4">
              {filteredBlockCategories.map(cat => (
                <div key={cat.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1.5">{cat.label}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {cat.items.map(item => {
                      const Icon = item.icon;
                      const isSelected = selectedBlockType === item.type;
                      return (
                        <button
                          key={item.type}
                          onClick={() => {
                            setSelectedBlockType(item.type);
                            handleSelectBlockType(item.type);
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm cursor-pointer ${
                            isSelected
                              ? "border-[#6C1D5F] bg-[#6C1D5F]/5"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-[#6C1D5F] text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            <Icon size={15} />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-[12px] font-bold leading-tight ${isSelected ? "text-[#6C1D5F]" : "text-slate-700"}`}>{item.label}</p>
                            <p className="text-[10.5px] text-slate-400 leading-snug mt-0.5 line-clamp-2">{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {filteredBlockCategories.length === 0 && (
                <div className="py-8 text-center text-slate-400">
                  <Search size={20} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-[12px] font-medium">No blocks match "{blockSearch}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          MODULE DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={isModuleModalOpen} onOpenChange={setIsModuleModalOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6">
          <DialogHeader className="border-b border-slate-100 pb-4">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <FolderOpen size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{editingModule ? "Edit Module" : "Add Module"}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  {editingModule ? "Modify the properties of this curriculum module." : "Create a new learning module for this course."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveModule} className="space-y-4 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="moduleTitle" className="text-[12px] font-semibold text-slate-500">
                Module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="moduleTitle"
                value={moduleTitle}
                onChange={e => setModuleTitle(e.target.value)}
                placeholder="e.g. Module 1: Foundations of Design"
                className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="moduleDescription" className="text-[12px] font-semibold text-slate-500">Description</Label>
              <Textarea
                id="moduleDescription"
                value={moduleDescription}
                onChange={e => setModuleDescription(e.target.value)}
                placeholder="Briefly describe what this module covers."
                className="text-[13px] min-h-[80px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                rows={3}
              />
            </div>
            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" onClick={() => setIsModuleModalOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={submittingModule} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                {submittingModule ? "Saving..." : "Save Module"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          SUBMODULE DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 flex flex-col">
          <DialogHeader className="border-b border-slate-100 pb-4 shrink-0">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <BookOpen size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{editingSubModule ? "Edit Sub-module" : "Add Sub-module"}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  {editingSubModule ? "Modify the title and description of this sub-module." : "Create a new sub-module section in this module."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveSubModule} className="space-y-4 py-3 flex-1 overflow-y-auto">
            <div className="space-y-1.5">
              <Label htmlFor="subModuleTitle" className="text-[12px] font-semibold text-slate-500">
                Sub-module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subModuleTitle"
                value={subModuleTitle}
                onChange={e => setSubModuleTitle(e.target.value)}
                placeholder="e.g. Introduction to Typography"
                className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subModuleDesc" className="text-[12px] font-semibold text-slate-500">Description</Label>
              <Textarea
                id="subModuleDesc"
                value={subModuleDescription}
                onChange={e => setSubModuleDescription(e.target.value)}
                placeholder="Brief description or learning objectives..."
                className="text-[13px] min-h-[80px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                rows={3}
              />
            </div>
            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" onClick={() => setIsDrawerOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={submittingSubModule} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                {submittingSubModule ? "Saving..." : "Save Sub-module"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          BLOCK CONFIGURATION DIALOG (Stitch Designs)
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={blockConfigOpen} onOpenChange={setBlockConfigOpen}>
        <DialogContent className="max-w-[640px] rounded-2xl shadow-2xl bg-white border border-slate-200 p-0 flex flex-col max-h-[90vh] overflow-hidden">
          {/* Header */}
          <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <Plus size={16} />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-base font-bold text-slate-800 capitalize leading-tight">
                  {blockConfigType === "text" ? "Article Settings" : `${blockConfigType} Block Settings`}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium leading-none mt-1">
                  {blockConfigType === "video" && "Configure your multimedia video settings"}
                  {blockConfigType === "pdf" && "Configure your downloadable PDF settings"}
                  {blockConfigType === "text" && "Configure your rich text content"}
                  {!["video", "pdf", "text"].includes(blockConfigType) && `Configure your interactive ${blockConfigType} block settings (Simulation Mode)`}
                </p>
              </div>
            </div>
          </header>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* 1. Video Form */}
            {blockConfigType === "video" && (
              <div className="space-y-4 text-left">
                {/* Preview */}
                {videoUrl.trim() && !videoUrlError && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
                    <SafeMediaEmbed url={videoUrl} title="Video Preview" />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="videoSourceUrl" className="text-[12px] font-bold text-slate-500">VIDEO SOURCE URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="videoSourceUrl"
                      type="url"
                      value={videoUrl}
                      onChange={e => handleVideoUrlChange(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className={`text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] flex-1 ${videoUrlError ? "border-red-400" : ""}`}
                    />
                  </div>
                  {videoUrlError && <p className="text-[11px] text-red-500 font-medium">{videoUrlError}</p>}
                  <p className="text-[10px] text-slate-400 font-medium">Supports YouTube, Vimeo, and Wistia links</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-700 block">Autoplay</span>
                      <span className="text-[10px] text-slate-400">Starts on load</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-700 block">Transcript</span>
                      <span className="text-[10px] text-slate-400">Enable text version</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. PDF Form */}
            {blockConfigType === "pdf" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="pdfSourceUrl" className="text-[12px] font-bold text-slate-500">DOCUMENT SOURCE URL</Label>
                  <Input
                    id="pdfSourceUrl"
                    type="url"
                    value={pdfUrl}
                    onChange={e => setPdfUrl(e.target.value)}
                    placeholder="https://example.com/document.pdf"
                    className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">Or Upload PDF File</Label>
                  <input type="file" ref={pdfInputRef} onChange={handlePdfFileChange} accept="application/pdf" className="hidden" />
                  {pdfUrl ? (
                    <div className="border border-emerald-200 rounded-xl p-3 bg-emerald-50/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-100 rounded-lg"><FileText size={14} className="text-emerald-700" /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[240px]">{uploadedFileName || "document.pdf"}</p>
                          <p className="text-[10px] text-emerald-700 font-bold">Attached</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => { setPdfUrl(""); setUploadedFileName(""); if (pdfInputRef.current) pdfInputRef.current.value = ""; }} className="px-2.5 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-[10px] font-bold border border-slate-200 bg-white cursor-pointer">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div onClick={() => pdfInputRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-[#6C1D5F] rounded-xl p-6 text-center hover:bg-slate-50/50 transition-all cursor-pointer space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/5 flex items-center justify-center text-[#6C1D5F] mx-auto"><FileText size={18} /></div>
                      <p className="text-xs font-bold text-slate-700">Click to upload PDF</p>
                      <p className="text-[10px] text-slate-400">PDF files only (Max. 50MB)</p>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pdfDisplayName" className="text-[12px] font-bold text-slate-500">DISPLAY NAME</Label>
                  <Input
                    id="pdfDisplayName"
                    placeholder="e.g. Course Syllabus 2024"
                    className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div>
                    <span className="text-[12.5px] font-bold text-slate-700 block">Enable Download</span>
                    <span className="text-[10px] text-slate-400">Allow students to save a local copy</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 3. Text/Article Form */}
            {blockConfigType === "text" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="articleContent" className="text-[12px] font-bold text-slate-500">ARTICLE CONTENT</Label>
                  <Textarea
                    id="articleContent"
                    value={textContent}
                    onChange={e => setTextContent(e.target.value)}
                    placeholder="Enter the article content for this lesson..."
                    className="text-[13px] min-h-[220px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                    rows={10}
                  />
                </div>
              </div>
            )}

            {/* 4. Image Block Form (Simulation Mode) */}
            {blockConfigType === "image" && (
              <div className="space-y-4 text-left">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50/50 transition-all cursor-pointer space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/5 flex items-center justify-center text-[#6C1D5F] mx-auto">
                    <Plus size={18} />
                  </div>
                  <p className="text-xs font-bold text-slate-700">Upload Image</p>
                  <p className="text-[10px] text-slate-400">Drag and drop your JPG, PNG or WebP image here, or click to browse</p>
                  <Button type="button" className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[11px] font-bold px-3 py-1 h-7">Select File</Button>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">Alt Text (Required for accessibility)</Label>
                  <Input placeholder="Describe the image for screen readers..." className="text-[13px] h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">Caption</Label>
                  <Input placeholder="Add a visible caption beneath the image" className="text-[13px] h-10" />
                </div>
              </div>
            )}

            {/* 5. Code Block Form (Simulation Mode) */}
            {blockConfigType === "code" && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-bold text-slate-500">LANGUAGE SPECIFICATION</Label>
                    <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700">
                      <option>JavaScript (Node.js)</option>
                      <option>Python</option>
                      <option>HTML / CSS</option>
                      <option>Java</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#6C1D5F]" />
                      Read-only
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                      <input type="checkbox" className="rounded text-[#6C1D5F]" />
                      Show Output
                    </label>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">SNIPPET EDITOR</Label>
                  <Textarea
                    placeholder="function initializeLMS() { ... }"
                    className="text-[13px] min-h-[140px] font-mono bg-slate-900 text-slate-100 focus:ring-1 focus:ring-[#6C1D5F]"
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* 6. Audio Block Form (Simulation Mode) */}
            {blockConfigType === "audio" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">AUDIO TITLE</Label>
                  <Input placeholder="e.g., Introduction to SEO Principles" className="text-[13px] h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">AUDIO SOURCE</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50/50 transition-all cursor-pointer">
                    <p className="text-xs font-bold text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-slate-400 mt-1">MP3, WAV or OGG (max. 50MB)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div>
                    <span className="text-[12.5px] font-bold text-slate-700 block">Enable Speed Controls</span>
                    <span className="text-[10px] text-slate-400">Allows users to adjust playback speed (0.5x - 2x)</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 7. Quote Block Form (Simulation Mode) */}
            {blockConfigType === "quote" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">QUOTE TEXT</Label>
                  <Textarea placeholder="Enter the wisdom you wish to share..." className="text-[13px]" rows={3} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">AUTHOR/SOURCE</Label>
                  <Input placeholder="e.g. Marcus Aurelius" className="text-[13px] h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">BLOCK PREVIEW</Label>
                  <div className="p-4 border-l-4 border-[#6C1D5F] bg-slate-50/80 rounded-r-xl italic text-slate-600 text-xs">
                    "The happiness of your life depends upon the quality of your thoughts..."
                    <span className="block mt-1.5 text-[10px] not-italic font-bold text-slate-400">— Meditations</span>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Divider Block Form (Simulation Mode) */}
            {blockConfigType === "divider" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500 font-sans">Divider Settings</Label>
                  <div className="flex gap-2">
                    {["Solid", "Dashed", "Dotted"].map((style, i) => (
                      <button
                        key={style}
                        type="button"
                        className={`flex-1 py-2 text-[12px] font-bold rounded-xl border ${
                          i === 0
                            ? "border-[#6C1D5F] bg-[#6C1D5F]/5 text-[#6C1D5F]"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl flex items-center justify-center">
                  <div className="w-full h-0.5 bg-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[11.5px] font-bold text-slate-500 block">Weight</span>
                    <input type="range" min="1" max="10" defaultValue="2" className="w-full accent-[#6C1D5F]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11.5px] font-bold text-slate-500 block">Spacing / Margin</span>
                    <input type="range" min="8" max="64" defaultValue="24" className="w-full accent-[#6C1D5F]" />
                  </div>
                </div>
              </div>
            )}

            {/* 9. Callout Block Form (Simulation Mode) */}
            {blockConfigType === "callout" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">CALLOUT TYPE</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { type: "Info", color: "bg-blue-50 text-blue-600 border-blue-200" },
                      { type: "Warning", color: "bg-amber-50 text-amber-600 border-amber-200" },
                      { type: "Tip", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
                      { type: "Note", color: "bg-purple-50 text-purple-600 border-purple-200" },
                    ].map((item, i) => (
                      <button
                        key={item.type}
                        type="button"
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-[11px] font-bold transition-all ${
                          i === 0 ? "ring-2 ring-[#6C1D5F] border-transparent" : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${item.color}`}>
                          {item.type[0]}
                        </div>
                        {item.type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">MESSAGE (Markdown supported)</Label>
                  <Textarea placeholder="Type your callout message here..." className="text-[13px]" rows={3} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">LIVE PREVIEW</Label>
                  <div className="p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-xs flex gap-2">
                    <span className="font-bold">Info</span>
                    <span>Your message will appear here in the live course view...</span>
                  </div>
                </div>
              </div>
            )}

            {/* 10. File Block Form (Simulation Mode) */}
            {blockConfigType === "file" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">UPLOAD FILE</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50/50 transition-all cursor-pointer">
                    <p className="text-xs font-bold text-slate-700">Drag and drop file here</p>
                    <p className="text-[10px] text-slate-400 mt-1">Max file size: 50MB. Supported formats: PDF, DOCX, ZIP, MP4.</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">FILE DESCRIPTION (Optional)</Label>
                  <Textarea placeholder="Add a brief summary of what this file contains for the learners..." className="text-[13px]" rows={3} />
                </div>
              </div>
            )}

            {/* 11. Embed URL Block Form (Simulation Mode) */}
            {blockConfigType === "embed" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">EXTERNAL RESOURCE URL</Label>
                  <Input placeholder="https://youtube.com/watch?v=..." className="text-[13px] h-10" />
                  <p className="text-[10px] text-slate-400">Paste a link from YouTube, Vimeo, Loom, or other supported platforms</p>
                </div>
                <div className="border border-slate-200 bg-slate-50 rounded-xl p-8 text-center text-slate-400 text-xs">
                  No Preview Available
                  <span className="block text-[10px] text-slate-300 mt-1">Enter a valid URL and click 'Preview' to see the content here.</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["YOUTUBE", "VIMEO", "LOOM", "SOUNDCLOUD", "WHIMSICAL"].map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0 bg-slate-50/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setBlockConfigOpen(false)}
              className="text-[12.5px] font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                if (["video", "pdf", "text"].includes(blockConfigType)) {
                  handleSaveBlock(e);
                } else {
                  showToast(`${blockConfigType} block simulated successfully!`, "success");
                  setBlockConfigOpen(false);
                }
              }}
              disabled={submittingSubModule}
              className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer"
            >
              {submittingSubModule ? "Saving..." : "Save Block"}
            </Button>
          </footer>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          COURSE SELECTION DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent className="max-w-[560px] max-h-[85vh] rounded-2xl shadow-2xl bg-white border border-slate-200 p-0 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-[#6C1D5F]/8 flex items-center justify-center">
                <GraduationCap size={18} className="text-[#6C1D5F]" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Select or Create Course</h2>
                <p className="text-[11.5px] text-slate-400">Choose an existing course or start a new one</p>
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg mt-3.5">
              {[
                { id: "select", label: "Select Existing" },
                { id: "create", label: "Create New Course" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCourseDialogTab(tab.id)}
                  className={`flex-1 py-1.5 text-[12px] font-bold rounded-md transition-all cursor-pointer ${
                    courseDialogTab === tab.id
                      ? "bg-white shadow-sm text-[#6C1D5F]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Select Existing */}
          {courseDialogTab === "select" && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Search */}
              <div className="px-5 py-3 border-b border-slate-100 shrink-0">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={e => setCourseSearch(e.target.value)}
                    placeholder="Search courses by name..."
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/30 focus:border-[#6C1D5F] transition-all"
                  />
                  {courseSearch && (
                    <button onClick={() => setCourseSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Course list */}
              <ScrollArea className="flex-1 min-h-0">
                <div className="p-3 space-y-1">
                  {loadingAllCourses ? (
                    [1, 2, 3, 4].map(i => (
                      <div key={i} className="animate-pulse flex items-center gap-3 px-3 py-3 rounded-xl">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                          <div className="h-2.5 bg-slate-50 rounded w-1/2" />
                        </div>
                      </div>
                    ))
                  ) : (() => {
                    const filtered = allCourses.filter(c =>
                      !courseSearch || c.title?.toLowerCase().includes(courseSearch.toLowerCase())
                    );
                    if (filtered.length === 0) return (
                      <EmptyState
                        size="sm"
                        icon={Search}
                        title="No courses found"
                        description={courseSearch ? `No results for "${courseSearch}"` : "Create your first course"}
                        primaryAction={{
                          label: "Create New Course",
                          onClick: () => setCourseDialogTab("create"),
                        }}
                      />
                    );
                    return filtered.map(c => {
                      const isCurrent = c.id === Number(id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => !isCurrent && handleSelectCourse(c)}
                          disabled={isCurrent}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            isCurrent
                              ? "bg-[#6C1D5F]/5 border border-[#6C1D5F]/20 cursor-default"
                              : "hover:bg-slate-50 hover:shadow-sm border border-transparent cursor-pointer"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent ? "bg-[#6C1D5F]/10 text-[#6C1D5F]" : "bg-slate-100 text-slate-500"
                          }`}>
                            <BookOpen size={14} />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className={`text-[13px] font-semibold truncate ${isCurrent ? "text-[#6C1D5F]" : "text-slate-700"}`}>
                              {c.title}
                            </p>
                            {c.description && (
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                              c.status === "Published"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}>
                              {c.status || "Draft"}
                            </span>
                            {isCurrent && (
                              <span className="text-[9.5px] font-bold text-[#6C1D5F] bg-[#6C1D5F]/8 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                            {!isCurrent && (
                              <ChevronRight size={13} className="text-slate-300" />
                            )}
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>
              </ScrollArea>

              <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
                <span className="text-[11.5px] text-slate-400">
                  {allCourses.length} course{allCourses.length !== 1 ? "s" : ""} available
                </span>
                <button
                  onClick={() => setCourseDialogTab("create")}
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6C1D5F] hover:underline cursor-pointer"
                >
                  <Plus size={12} /> Create New
                </button>
              </div>
            </div>
          )}

          {/* Tab: Create New Course */}
          {courseDialogTab === "create" && (
            <form onSubmit={handleCreateAndSelectCourse} className="p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
              <div className="space-y-1.5">
                <Label htmlFor="newCourseTitle" className="text-[12px] font-semibold text-slate-500">
                  Course Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="newCourseTitle"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Advanced UX/UI Design Masterclass"
                  className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newCourseDescription" className="text-[12px] font-semibold text-slate-500">Description</Label>
                <Textarea
                  id="newCourseDescription"
                  value={newCourseDescription}
                  onChange={e => setNewCourseDescription(e.target.value)}
                  placeholder="Briefly describe what this course covers."
                  className="text-[13px] min-h-[85px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newCourseCategory" className="text-[12px] font-semibold text-slate-500">Category</Label>
                <Input
                  id="newCourseCategory"
                  value={newCourseCategory}
                  onChange={e => setNewCourseCategory(e.target.value)}
                  placeholder="e.g. Design, Development, Business"
                  className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                />
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button type="button" variant="outline" onClick={() => setCourseDialogOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
                <Button type="submit" disabled={creatingCourse} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                  {creatingCourse ? "Creating..." : "Create Course"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          DELETE CONFIRM
      ══════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-[14px] leading-tight">
                  Delete {deleteTarget.type === "module" ? "Module" : "Block"}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>
              {deleteTarget.type === "module" ? " and all its blocks?" : "?"}
            </p>
            <div className="flex justify-end gap-2.5 pt-1">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-[12px] font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl text-[12px] font-bold shadow-sm transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOAST NOTIFICATIONS
      ══════════════════════════════════════════════════════════ */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border animate-in slide-in-from-bottom-2 duration-300 ${
          toast.type === "error"
            ? "bg-red-50 border-red-200 text-red-700"
            : toast.type === "info"
            ? "bg-blue-50 border-blue-200 text-blue-700"
            : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          {toast.type === "error"
            ? <AlertCircle size={14} className="shrink-0" />
            : toast.type === "info"
            ? <HelpCircle size={14} className="shrink-0" />
            : <CheckCircle2 size={14} className="shrink-0" />
          }
          <span className="text-[13px] font-semibold">{toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-1 text-current opacity-50 hover:opacity-100 cursor-pointer">
            <X size={12} />
          </button>
        </div>
      )}
    </>
  );
}

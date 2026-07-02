import React from "react";
import {
  Type,
  AlignLeft,
  Bold,
  Italic,
  List,
  Link2,
  Image,
  Maximize2,
  Video,
  FileText,
  ExternalLink,
  LayoutTemplate,
  BookOpen,
  Plus,
  Save,
  Clock,
  Layers,
  GripVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { getEmbedInfo, getContentIcon, getContentLabel, getContentType } from "../../utils/curriculumHelpers";
import EmptyState from "../shared/EmptyState";

export default function CurriculumEditor({
  activeSubModule,
  parentModuleLabel,
  modules,
  editorRef,
  setBlockPickerOpen,
  setBlockSearch,
  openEditSubModuleDrawer,
  openEditBlockDialog,
  requestDelete,
  handlePublishCourse,
  course,
  openAddModuleModal,
  openCourseDialog,
}) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f8f7fc]">
      {/* Editor Sub-header */}
      {activeSubModule ? (
        <div className="h-[50px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              getContentType(activeSubModule) ? "bg-[#6C1D5F]/10 text-[#6C1D5F]" : "bg-slate-100 text-slate-400"
            }`}>
              {getContentIcon(activeSubModule, 14)}
            </div>
            <div className="min-w-0">
              <h2 className="text-[14px] font-bold text-slate-800 truncate leading-tight">{activeSubModule.title}</h2>
              <p className="text-[10.5px] text-slate-400 font-medium leading-tight truncate">
                {parentModuleLabel} · {getContentLabel(activeSubModule)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openEditSubModuleDrawer(activeSubModule)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-[11.5px] font-semibold transition-colors cursor-pointer"
            >
              <PenLine size={12} /> Edit Block
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[50px] bg-white border-b border-slate-200 px-6 flex items-center shrink-0">
          <p className="text-[12.5px] text-slate-400 font-medium">Select a block from the curriculum to start editing</p>
        </div>
      )}

      {/* Canvas */}
      <div ref={editorRef} className="flex-1 overflow-y-auto">
        {activeSubModule ? (
          <div className="max-w-[760px] mx-auto px-6 py-8 space-y-3">
            {/* ── Block Title Block ─────────────────── */}
            <div className="group/block relative">
              <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Type size={14} className="text-[#6C1D5F]/60 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Block Title</span>
                </div>
                <h1 className="text-[26px] font-bold text-slate-800 leading-tight">
                  {activeSubModule.title}
                </h1>
                {activeSubModule.description && (
                  <p className="mt-2 text-[14px] text-slate-500 leading-relaxed">
                    {activeSubModule.description}
                  </p>
                )}
              </div>
              <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
            </div>

            {/* ── Text Block ─────────────────────────── */}
            {activeSubModule.content?.content && (
              <div className="group/block relative">
                <ContentBlock
                  icon={<AlignLeft size={14} />}
                  label="Rich Text Content"
                  onEdit={() => openEditBlockDialog(activeSubModule)}
                  onDelete={() => requestDelete("block", activeSubModule)}
                >
                  <div
                    className="text-[14px] text-slate-600 leading-relaxed prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: activeSubModule.content.content }}
                  />
                </ContentBlock>
                <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
              </div>
            )}

            {/* ── Video Block ────────────────────────── */}
            {activeSubModule.content?.videoUrl && (
              <div className="group/block relative">
                <ContentBlock
                  icon={<Video size={14} />}
                  label="Video Lesson"
                  badge="video"
                  highlighted
                  onEdit={() => openEditBlockDialog(activeSubModule)}
                  onDelete={() => requestDelete("block", activeSubModule)}
                >
                  <div className="space-y-4">
                    <p className="text-[13px] text-slate-500 font-medium">
                      Lesson Link: <a href={activeSubModule.content.videoUrl} target="_blank" rel="noreferrer" className="text-[#6C1D5F] hover:underline font-semibold break-all">{activeSubModule.content.videoUrl}</a>
                    </p>
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center">
                      {getEmbedInfo(activeSubModule.content.videoUrl) ? (
                        <iframe
                          src={getEmbedInfo(activeSubModule.content.videoUrl)}
                          title={activeSubModule.title}
                          className="w-full h-full border-none"
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-center text-slate-500 space-y-2">
                          <Video size={36} className="mx-auto text-slate-600 animate-[pulse_2s_infinite]" />
                          <p className="text-[12px] font-bold">Raw Video Stream Loaded</p>
                          <p className="text-[10px] text-slate-600">Video embedding requires standard streaming providers</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ContentBlock>
                <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
              </div>
            )}

            {/* ── PDF Document Block ─────────────────── */}
            {activeSubModule.content?.pdfUrl && (
              <div className="group/block relative">
                <ContentBlock
                  icon={<FileText size={14} />}
                  label="Reading Document"
                  badge="PDF Document"
                  onEdit={() => openEditBlockDialog(activeSubModule)}
                  onDelete={() => requestDelete("block", activeSubModule)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-700 truncate">Document Attachment</p>
                        <p className="text-[10.5px] text-slate-400 font-semibold truncate max-w-[280px]">
                          {activeSubModule.content.pdfUrl.split("/").pop()}
                        </p>
                      </div>
                    </div>
                    <a
                      href={activeSubModule.content.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-[#6C1D5F] text-slate-600 hover:text-[#6C1D5F] rounded-lg text-[12px] font-bold shadow-sm transition-all shrink-0 cursor-pointer w-full sm:w-auto"
                    >
                      <ExternalLink size={13} /> View Document
                    </a>
                  </div>
                </ContentBlock>
                <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
              </div>
            )}

            {/* ── Empty Content Block State ──────────── */}
            {!activeSubModule.content?.content && !activeSubModule.content?.videoUrl && !activeSubModule.content?.pdfUrl && (
              <div className="group/block relative">
                <EmptyState
                  size="sm"
                  icon={LayoutTemplate}
                  title="Empty Content Block"
                  description={
                    <span className="flex flex-col gap-1.5">
                      <span>No details or learning materials are attached to this submodule block yet.</span>
                      <span className="text-[11px] text-slate-400 block border-t border-slate-100 pt-1.5 mt-0.5">
                        Supported: {
                          [
                            { color: "text-violet-500", label: "video" },
                            { color: "text-rose-500", label: "PDFs" },
                            { color: "text-sky-500", label: "rich text content" }
                          ].map((item, i, arr) => (
                            <React.Fragment key={item.label}>
                              <strong className={`${item.color} font-bold`}>{item.label}</strong>
                              {i < arr.length - 1 ? ", " : ""}
                            </React.Fragment>
                          ))
                        }
                      </span>
                    </span>
                  }
                  primaryAction={{
                    label: "Add Your First Block",
                    onClick: () => { setBlockPickerOpen(true); setBlockSearch(""); },
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 w-full">
            {!course ? (
              <EmptyState
                icon={BookOpen}
                title="No Course Selected"
                description="Select an existing course or create a new one to start building and managing the curriculum."
                primaryAction={{
                  label: "Add Course to Curriculum",
                  onClick: () => openCourseDialog("select"),
                }}
              />
            ) : (
              <EmptyState
                icon={BookOpen}
                title="Select a block to start editing"
                description="Choose a block from the curriculum tree on the left to view and edit its content."
                primaryAction={
                  modules.length === 0
                    ? {
                        label: "Create First Module",
                        onClick: openAddModuleModal,
                      }
                    : null
                }
              />
            )}
          </div>
        )}
      </div>

      {/* Editor Footer */}
      <footer className="h-[44px] bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 text-[11.5px] text-slate-400">
          {activeSubModule && (
            <>
              <span className="flex items-center gap-1">
                <Layers size={11} /> {modules.find(m => m.subModules?.find(s => s.id === activeSubModule.id))?.subModules?.length || 0} blocks in module
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1">
                <Clock size={11} /> Est. 15 min
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }}
            disabled={!activeSubModule}
            className="flex items-center gap-1.5 px-3 py-1 border border-dashed border-slate-300 hover:border-[#6C1D5F] text-slate-500 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/5 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={11} /> Add Block
          </button>
          <button
            onClick={handlePublishCourse}
            disabled={course?.status === "Published"}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#6C1D5F] text-white rounded-lg text-[11.5px] font-bold hover:bg-[#521347] disabled:bg-slate-200 disabled:text-slate-400 transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm"
          >
            <Save size={11} /> Save
          </button>
        </div>
      </footer>
    </main>
  );
}

/* ─── Local Sub-components ──────────────────────────────────────────── */

function AddBlockDivider({ onClick }) {
  return (
    <div className="flex items-center justify-center py-2 opacity-0 group-hover/block:opacity-100 transition-opacity">
      <div className="h-px flex-1 bg-slate-200/60" />
      <button
        onClick={onClick}
        className="mx-4 flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 hover:border-[#6C1D5F] rounded-full text-[10.5px] font-bold text-slate-400 hover:text-[#6C1D5F] transition-all shadow-sm cursor-pointer"
      >
        <Plus size={10} /> Add Block
      </button>
      <div className="h-px flex-1 bg-slate-200/60" />
    </div>
  );
}

function ContentBlock({ icon, label, color = "text-slate-600", badge, highlighted, onEdit, onDelete, children }) {
  return (
    <div className={`relative bg-white rounded-xl border shadow-sm hover:shadow-md transition-all ${
      highlighted ? "border-[#6C1D5F]/30 shadow-[#6C1D5F]/5" : "border-slate-200/80 hover:border-slate-300"
    }`}>
      <div className={`flex items-center justify-between px-5 py-3 border-b ${highlighted ? "border-[#6C1D5F]/15 bg-[#6C1D5F]/3" : "border-slate-100 bg-slate-50/50"}`}>
        <div className="flex items-center gap-2">
          <GripVertical size={13} className="text-slate-300 cursor-grab" />
          <span className={`${color} shrink-0`}>{icon}</span>
          <span className="text-[11.5px] font-bold text-slate-700">{label}</span>
          {badge && (
            <span className="text-[9px] font-bold text-[#6C1D5F] bg-[#6C1D5F]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <Edit size={11} />
          </button>
          <button onClick={onDelete} className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
            <Trash2 size={11} />
          </button>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// Simple local duplicate wrapper for edit block button
function PenLine({ size }) {
  return <Edit size={size} />;
}

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

export default function CurriculumEditor({
  activeSubModule,
  parentModuleLabel,
  modules,
  editorRef,
  setBlockPickerOpen,
  setBlockSearch,
  openEditSubModuleDrawer,
  requestDelete,
  handlePublishCourse,
  course,
  openAddModuleModal,
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
                  label="Article"
                  color="text-slate-600"
                  onEdit={() => openEditSubModuleDrawer(activeSubModule)}
                  onDelete={() => requestDelete("submodule", activeSubModule)}
                >
                  <div className="flex items-center gap-1 mb-4 pb-3 border-b border-slate-100">
                    {[Bold, Italic, List, Link2, Image].map((Icon, i) => (
                      <button key={i} className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors">
                        <Icon size={13} />
                      </button>
                    ))}
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors">
                      <Maximize2 size={12} />
                    </button>
                  </div>
                  <p className="text-[14px] text-slate-700 leading-7 whitespace-pre-wrap">
                    {activeSubModule.content.content}
                  </p>
                </ContentBlock>
                <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
              </div>
            )}

            {/* ── Video Block ─────────────────────────── */}
            {activeSubModule.content?.videoUrl && (
              <div className="group/block relative">
                <ContentBlock
                  icon={<Video size={14} />}
                  label="Video"
                  color="text-[#6C1D5F]"
                  badge="Active"
                  highlighted
                  onEdit={() => openEditSubModuleDrawer(activeSubModule)}
                  onDelete={() => requestDelete("submodule", activeSubModule)}
                >
                  {(() => {
                    const embed = getEmbedInfo(activeSubModule.content.videoUrl);
                    return (
                      <div className="space-y-4">
                        {embed && (embed.type === "youtube" || embed.type === "vimeo") ? (
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-md">
                            <iframe
                              src={embed.url}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Video"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-3">
                            <Video size={36} className="text-slate-300" />
                            <p className="text-[12px] text-slate-400 font-medium">Video preview unavailable</p>
                          </div>
                        )}
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                          <Link2 size={12} className="text-slate-400 shrink-0" />
                          <span className="text-[11.5px] text-slate-600 flex-1 truncate">{activeSubModule.content.videoUrl}</span>
                        </div>
                      </div>
                    );
                  })()}
                </ContentBlock>
                <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
              </div>
            )}

            {/* ── PDF Block ─────────────────────────── */}
            {activeSubModule.content?.pdfUrl && (
              <div className="group/block relative">
                <ContentBlock
                  icon={<FileText size={14} />}
                  label="PDF Document"
                  color="text-rose-600"
                  onEdit={() => openEditSubModuleDrawer(activeSubModule)}
                  onDelete={() => requestDelete("submodule", activeSubModule)}
                >
                  <div className="flex items-center gap-4 p-4 bg-rose-50/40 border border-rose-200/60 rounded-xl">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={22} className="text-rose-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-800">PDF Document</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{activeSubModule.content.pdfUrl}</p>
                    </div>
                    <a
                      href={activeSubModule.content.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11.5px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <ExternalLink size={11} /> Open
                    </a>
                  </div>
                </ContentBlock>
                <AddBlockDivider onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }} />
              </div>
            )}

            {/* ── Empty state / Add first block ─────── */}
            {!activeSubModule.content && (
              <div className="group/block relative">
                <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 hover:border-[#6C1D5F]/40 transition-all p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C1D5F]/10 to-[#6C1D5F]/5 flex items-center justify-center mb-5 shadow-inner">
                    <LayoutTemplate size={28} className="text-[#6C1D5F]/50" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-700 mb-1.5">This block has no content yet</h3>
                  <p className="text-[12.5px] text-slate-400 max-w-xs leading-relaxed mb-6">
                    Add learning blocks like videos, articles, PDFs, quizzes, and more to build this section.
                  </p>
                  <button
                    onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#6C1D5F] text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#521347] transition-all"
                  >
                    <Plus size={15} /> Add Your First Block
                  </button>
                  <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
                    {["Video", "PDF", "Article", "Quiz", "Assignment"].map(t => (
                      <span key={t} className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6C1D5F]/10 to-[#6C1D5F]/5 flex items-center justify-center mb-5 shadow-inner">
              <BookOpen size={32} className="text-[#6C1D5F]/40" />
            </div>
            <h3 className="text-[16px] font-bold text-slate-700 mb-2">Select a block to start editing</h3>
            <p className="text-[12.5px] text-slate-400 max-w-sm leading-relaxed mb-6">
              Choose a block from the curriculum tree on the left to view and edit its content.
            </p>
            {modules.length === 0 && (
              <button
                onClick={openAddModuleModal}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#6C1D5F] text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#521347] transition-all"
              >
                <Plus size={15} /> Create First Module
              </button>
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

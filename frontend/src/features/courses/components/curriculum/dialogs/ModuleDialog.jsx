import React from "react";
import { FolderOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

export default function ModuleDialog({
    isModuleModalOpen,
    setIsModuleModalOpen,
    editingModule,
    moduleTitle,
    setModuleTitle,
    moduleDescription,
    setModuleDescription,
    submittingModule,
    handleSaveModule,
}) {
    return (
        <Dialog open={isModuleModalOpen} onOpenChange={setIsModuleModalOpen}>
            <DialogContent className="w-[95vw] sm:max-w-3xl rounded-xl shadow-xl bg-white border border-slate-200 p-6">
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
                    <div className="space-y-1.5 text-left">
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
                    <div className="space-y-1.5 text-left">
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
    );
}

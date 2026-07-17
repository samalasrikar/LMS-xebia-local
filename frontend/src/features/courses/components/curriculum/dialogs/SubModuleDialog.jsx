import React from "react";
import { BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

export default function SubModuleDialog({
    isDrawerOpen,
    setIsDrawerOpen,
    editingSubModule,
    subModuleTitle,
    setSubModuleTitle,
    subModuleDescription,
    setSubModuleDescription,
    submittingSubModule,
    handleSaveSubModule,
}) {
    return (
        <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DialogContent className="w-[95vw] sm:max-w-3xl rounded-xl shadow-xl bg-white border border-slate-200 p-6 flex flex-col">
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
                    <div className="space-y-1.5 text-left">
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
                    <div className="space-y-1.5 text-left">
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
    );
}

import { Upload, ImageOff, ChevronDown, FolderOpen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function CategoryDialog({
  show,
  mode, // "add" | "edit" | "view"
  name,
  desc,
  imagePreview,   // base64 or object-URL string for display
  status,
  errorMsg,
  submitting,
  onNameChange,
  onDescChange,
  onImageFileChange, // receives a File object
  onStatusChange,
  onClose,
  onSubmit,
}) {
  const title =
    mode === "view"
      ? "Category Details"
      : mode === "edit"
        ? "Edit Category"
        : "Add New Category";

  const isView = mode === "view";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageFileChange(file);
    }
  };

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6">

        {/* Header */}
        <DialogHeader className="border-b border-slate-50 pb-4">
          <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
              <FolderOpen size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="leading-tight">{title}</span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                {mode === "add" ? "Create a new category container for curriculum classification." : "Manage details, images, and catalog visibility status."}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-3 text-xs font-semibold animate-pulse">
            {errorMsg}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={onSubmit} className="space-y-4 py-2">

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="catName" className="text-[12px] font-semibold text-slate-500">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="catName"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Frontend Development"
              disabled={isView}
              required
              className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="catDesc" className="text-[12px] font-semibold text-slate-500">
              Description
            </Label>
            <Textarea
              id="catDesc"
              value={desc}
              onChange={(e) => onDescChange(e.target.value)}
              placeholder="Brief summary explaining what this topic covers..."
              rows={3}
              disabled={isView}
              className="text-[13px] px-3.5 py-2.5 min-h-[80px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Image & Status Side-by-Side */}
          <div className="grid grid-cols-2 gap-4">

            {/* Image Upload */}
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-500">
                Cover Photo
              </Label>
              <div className="relative w-full h-24 rounded-lg border border-dashed border-slate-200 bg-slate-50 overflow-hidden flex flex-col items-center justify-center">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    {!isView && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onImageFileChange(null);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md"
                        title="Remove cover"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <ImageOff size={16} />
                    <span className="text-[9px] mt-0.5 uppercase tracking-wider">No Image</span>
                  </div>
                )}
              </div>

              {!isView && (
                <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer w-fit px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-[11.5px] text-slate-600 font-bold transition-all shadow-sm">
                  <Upload size={12} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-500">
                Visibility Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isView}
                    className="w-full justify-between h-10 px-3 border border-slate-200 font-normal text-slate-700 text-[13px] bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg transition-all text-left"
                  >
                    {status}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-lg z-50">
                  <DropdownMenuRadioGroup value={status} onValueChange={(val) => onStatusChange(val)}>
                    <DropdownMenuRadioItem
                      value="Active"
                      className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                    >
                      Active
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="Inactive"
                      className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                    >
                      Inactive
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>

          {/* Footer Actions */}
          <DialogFooter className="pt-4 border-t border-slate-50 flex items-center justify-end gap-2.5">
            {isView ? (
              <Button
                type="button"
                onClick={onClose}
                className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6"
              >
                Close
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-[12.5px] font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm shadow-[#6C1D5F]/10"
                >
                  {submitting
                    ? "Saving..."
                    : mode === "edit"
                      ? "Save Changes"
                      : "Save Category"}

                </Button>
              </>
            )}
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
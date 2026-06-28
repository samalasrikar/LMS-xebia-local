import { X, Upload, ImageOff, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";

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
  if (!show) return null;

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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-[440px] max-w-[95vw] mx-4 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-3 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Artificial Intelligence"
              disabled={isView}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => onDescChange(e.target.value)}
              placeholder="Brief description of the category topic area..."
              rows={3}
              disabled={isView}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">
              Category Image
            </label>

            {/* Preview */}
            <div className="w-full h-32 rounded-lg border border-dashed border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <ImageOff size={24} />
                  <span className="text-[10px]">No image</span>
                </div>
              )}
            </div>

            {/* File input — hidden in view mode */}
            {!isView && (
              <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-xs text-slate-600 font-semibold transition-colors">
                <Upload size={13} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1 flex flex-col">
            <label className="text-xs font-semibold text-slate-500">
              Status
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isView}
                  className="w-full justify-between h-9 px-3 border border-slate-200 font-normal text-slate-700 text-xs bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg transition-all text-left"
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

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            {isView ? (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {submitting
                    ? "Saving..."
                    : mode === "edit"
                    ? "Save Changes"
                    : "Save Category"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

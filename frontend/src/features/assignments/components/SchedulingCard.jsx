import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

/**
 * Scheduling card for CreateAssignment.
 * Contains due date, due time, and late submission toggle.
 */
const SchedulingCard = React.memo(function SchedulingCard({ formData, onChange }) {
  return (
    <Card className="bg-white rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#84117C]" />
      <CardContent className="p-6">
        <h3 className="text-[15px] font-bold text-slate-800 mb-5 flex items-center gap-2">
          <CalendarIcon size={18} className="text-[#84117C]" />
          Scheduling
        </h3>
        <div className="space-y-4">
          {/* Due Date */}
          <div>
            <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Due Date & Time</label>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className={cn(
                      "w-full justify-start text-left font-normal border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 rounded-lg text-slate-750 text-xs h-9 px-3",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-450" />
                    {formData.dueDate ? format(parseISO(formData.dueDate), "PPP") : <span>Pick date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-slate-200 shadow-md" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate ? parseISO(formData.dueDate) : undefined}
                    onSelect={(date) => onChange("dueDate", date ? format(date, "yyyy-MM-dd") : "")}
                    initialFocus
                    className="[--primary:#6C1D5F] [--primary-foreground:#ffffff] [--accent:rgba(108,29,95,0.1)] [--accent-foreground:#6C1D5F]"
                  />
                </PopoverContent>
              </Popover>
              <Input
                className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-[#6C1D5F] transition-colors h-9 font-semibold"
                type="time"
                value={formData.dueTime}
                onChange={(e) => onChange("dueTime", e.target.value)}
              />
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-2" />

          {/* Late Submission Toggle */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <label className="text-[14px] text-slate-700 font-semibold block mb-0.5 cursor-pointer">
                Allow Late Submissions
              </label>
              <p className="text-[11.5px] text-slate-400">Flag as late but accept uploads.</p>
            </div>
            <button
              type="button"
              onClick={() => onChange("allowLate", !formData.allowLate)}
              className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${formData.allowLate ? "bg-[#6C1D5F]" : "bg-slate-200"}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${formData.allowLate ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default SchedulingCard;

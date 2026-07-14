import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Video,
  FileText,
  HelpCircle,
  MoreHorizontal,
  X,
  MapPin,
  Link as LinkIcon,
  AlignLeft,
  Tag,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";

// ── Constants ────────────────────────────────────────────────────────────────

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
];

const EVENT_TYPE_META = {
  assignment: { label: "Assignment", badge: "Assignment Due", icon: FileText },
  quiz:       { label: "Quiz",       badge: "Upcoming Quiz",  icon: HelpCircle },
  lecture:    { label: "Lecture",    badge: "Live Session",   icon: Video },
};

/** Seed data — lives in component state so new events merge in immediately */
const SEED_EVENTS = {
  24: {
    type: "assignment",
    title: "UX Case Study: Final Submission",
    course: "Advanced Interface Design",
    time: "11:59 PM (EST)",
    badge: "Due Today",
    icon: FileText,
  },
  26: {
    type: "quiz",
    title: "React Patterns Quiz",
    course: "Modern Web Development",
    time: "10:00 AM (EST)",
    badge: "Upcoming Quiz",
    icon: HelpCircle,
  },
  28: {
    type: "lecture",
    title: "Guest Lecture: Design Systems",
    course: "Design Systems at Scale",
    time: "2:00 PM (EST)",
    badge: "Live Session",
    icon: Video,
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns Tailwind colour tokens for a given event type */
function getEventColors(type) {
  switch (type) {
    case "assignment":
      return {
        accent: "bg-rose-500",
        tag:    "text-rose-600 bg-rose-50",
        dot:    "bg-rose-500",
        pill:   "bg-rose-50 text-rose-700 border-rose-100",
        card:   "bg-rose-50 border-rose-100",
      };
    case "quiz":
      return {
        accent: "bg-purple-500",
        tag:    "text-purple-600 bg-purple-50",
        dot:    "bg-purple-500",
        pill:   "bg-purple-50 text-purple-700 border-purple-100",
        card:   "bg-purple-50 border-purple-100",
      };
    default:
      return {
        accent: "bg-teal-500",
        tag:    "text-teal-600 bg-teal-50",
        dot:    "bg-teal-500",
        pill:   "bg-teal-50 text-teal-700 border-teal-100",
        card:   "bg-teal-50 border-teal-100",
      };
  }
}

/** For October 2023 (starts Sunday Oct 1): 7-day week range containing `day` */
function getWeekForDay(day) {
  const offset = (day - 1) % 7;
  const weekStart = day - offset;
  return Array.from({ length: 7 }, (_, i) => weekStart + i);
}

/** "10:00 AM (EST)" → "10:00 AM" */
function eventHourLabel(timeStr) {
  const parts = timeStr.split(" ");
  return `${parts[0]} ${parts[1]}`;
}

/** "14:30" → "2:30 PM" */
function formatTime24to12(t) {
  if (!t) return "";
  const [hStr, mStr] = t.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${m} ${ampm}`;
}

// ── Blank form ────────────────────────────────────────────────────────────────

function blankForm() {
  return {
    title:       "",
    description: "",
    day:         "",
    startTime:   "",
    endTime:     "",
    type:        "lecture",
    location:    "",
    meetingLink: "",
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

/** Pill badge inside a calendar cell */
function EventPill({ event }) {
  const colors = getEventColors(event.type);
  return (
    <div
      className={`mt-1 text-[9.5px] font-bold px-2 py-0.5 rounded truncate border flex items-center gap-1 cursor-pointer select-none ${colors.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
      <span className="truncate">{event.title}</span>
    </div>
  );
}

/** Right-sidebar detail card for the selected day */
function DayDetailCard({ selectedDay, events, onViewDetails }) {
  const event = events[selectedDay];
  if (!event) {
    return (
      <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2">
        <CalendarIcon size={24} className="text-slate-300" />
        <p className="text-[12px] text-slate-400 font-medium">No events scheduled today.</p>
      </div>
    );
  }

  const colors = getEventColors(event.type);
  const EventIcon = event.icon;
  return (
    <div className="border border-slate-100 rounded-2xl p-4 flex gap-3.5 hover:shadow-sm transition-all duration-200">
      <div className={`w-1 rounded-full shrink-0 ${colors.accent}`} />
      <div className="flex-1 min-w-0 space-y-2.5">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${colors.tag}`}
        >
          <EventIcon size={10} />
          {event.badge}
        </span>
        <div>
          <h4 className="font-bold text-[13.5px] text-slate-800 leading-snug break-words">
            {event.title}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{event.course}</p>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <Clock size={12} />
          <span>{event.time}</span>
        </div>
        <button onClick={onViewDetails} className="w-full mt-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-800 text-[11.5px] font-bold transition-colors border border-slate-200/50 cursor-pointer outline-none">
          View Details
        </button>
      </div>
    </div>
  );
}

/** Event Details Modal */
function EventDetailsModal({ open, onClose, event, day }) {
  if (!event) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-[13px] text-slate-600">{event.course}</p>
          <div className="text-[12px] text-slate-500">Day: October {day}</div>
          <div className="text-[12px] text-slate-500">Time: {event.time}</div>
        </div>
        <DialogFooter>
          <button onClick={onClose} className="px-4 py-2 bg-slate-100 rounded-xl text-[12px] font-bold">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Add Event Modal ───────────────────────────────────────────────────────────

function AddEventModal({ open, onClose, onSave }) {
  const [form, setForm]     = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  /** Reset form + errors whenever the modal opens */
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setForm(blankForm());
      setErrors({});
      setSaving(false);
      onClose();
    }
  };

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /** Field-level validation — returns an error map */
  function validate(f) {
    const errs = {};
    if (!f.title.trim())                   errs.title       = "Event title is required.";
    if (!f.description.trim())             errs.description = "Description is required.";
    const day = parseInt(f.day, 10);
    if (!f.day || isNaN(day) || day < 1 || day > 31)
                                            errs.day         = "Enter a valid day between 1 and 31.";
    if (!f.startTime)                      errs.startTime   = "Start time is required.";
    if (!f.endTime)                        errs.endTime     = "End time is required.";
    if (f.startTime && f.endTime && f.endTime <= f.startTime)
                                            errs.endTime     = "End time must be after start time.";
    if (f.meetingLink && !/^https?:\/\/.+/.test(f.meetingLink))
                                            errs.meetingLink = "Enter a valid URL (https://...).";
    return errs;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSaving(true);

    const meta   = EVENT_TYPE_META[form.type];
    const timeStr = `${formatTime24to12(form.startTime)} (EST)`;

    const newEvent = {
      type:   form.type,
      title:  form.title.trim(),
      course: form.description.trim(),
      time:   timeStr,
      badge:  meta.badge,
      icon:   meta.icon,
      ...(form.location    ? { location:    form.location.trim() }    : {}),
      ...(form.meetingLink ? { meetingLink: form.meetingLink.trim() } : {}),
    };

    // Simulate brief async save
    setTimeout(() => {
      onSave(parseInt(form.day, 10), newEvent);
      setSaving(false);
      handleOpenChange(false);
    }, 350);
  };

  // ── Field helper ──────────────────────────────────────────────────────────

  const fieldClass = (err) =>
    `w-full bg-slate-50 border ${err ? "border-rose-400 focus:border-rose-500 focus:ring-rose-300" : "border-slate-200 focus:border-[#6C1D5F] focus:ring-[#6C1D5F]/20"} rounded-xl px-3.5 py-2 text-[12.5px] focus:outline-none focus:ring-2 transition-all`;

  const labelClass = "block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5";
  const errorClass = "mt-1 text-[10.5px] text-rose-500 font-medium";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[560px] w-full rounded-2xl shadow-2xl bg-white border border-slate-200 flex flex-col max-h-[92vh]">

        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-[#6C1D5F]/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6C1D5F] flex items-center justify-center shadow-sm shadow-[#6C1D5F]/30">
                <Plus size={16} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-[14.5px] font-black text-slate-800 tracking-tight">
                  Add New Event
                </DialogTitle>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  October 2023 — Fall Semester
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenChange(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border-none outline-none"
            >
              <X size={16} />
            </button>
          </div>
        </DialogHeader>

        {/* ── Body ── */}
        <form
          id="add-event-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
          noValidate
        >
          {/* Event Title */}
          <div>
            <label className={labelClass}>
              Event Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="event-title"
              type="text"
              placeholder="e.g. Final Exam Review"
              value={form.title}
              onChange={set("title")}
              className={fieldClass(errors.title)}
            />
            {errors.title && <p className={errorClass}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              <AlignLeft size={10} className="inline mr-1" />
              Description / Course <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="event-description"
              rows={2}
              placeholder="e.g. Advanced Interface Design"
              value={form.description}
              onChange={set("description")}
              className={`${fieldClass(errors.description)} resize-none`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          {/* Day + Type row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Day (Oct 1–31) <span className="text-rose-400">*</span>
              </label>
              <input
                id="event-day"
                type="number"
                min={1}
                max={31}
                placeholder="e.g. 15"
                value={form.day}
                onChange={set("day")}
                className={fieldClass(errors.day)}
              />
              {errors.day && <p className={errorClass}>{errors.day}</p>}
            </div>

            <div>
              <label className={labelClass}>
                <Tag size={10} className="inline mr-1" />
                Event Type <span className="text-rose-400">*</span>
              </label>
              <select
                id="event-type"
                value={form.type}
                onChange={set("type")}
                className={`${fieldClass(false)} appearance-none cursor-pointer`}
              >
                {Object.entries(EVENT_TYPE_META).map(([val, meta]) => (
                  <option key={val} value={val}>{meta.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Start + End Time row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Start Time <span className="text-rose-400">*</span>
              </label>
              <input
                id="event-start-time"
                type="time"
                value={form.startTime}
                onChange={set("startTime")}
                className={fieldClass(errors.startTime)}
              />
              {errors.startTime && <p className={errorClass}>{errors.startTime}</p>}
            </div>

            <div>
              <label className={labelClass}>
                End Time <span className="text-rose-400">*</span>
              </label>
              <input
                id="event-end-time"
                type="time"
                value={form.endTime}
                onChange={set("endTime")}
                className={fieldClass(errors.endTime)}
              />
              {errors.endTime && <p className={errorClass}>{errors.endTime}</p>}
            </div>
          </div>

          {/* Location (optional) */}
          <div>
            <label className={labelClass}>
              <MapPin size={10} className="inline mr-1" />
              Location{" "}
              <span className="text-slate-400 normal-case font-medium tracking-normal">
                (optional)
              </span>
            </label>
            <input
              id="event-location"
              type="text"
              placeholder="e.g. Room 204, Building A"
              value={form.location}
              onChange={set("location")}
              className={fieldClass(false)}
            />
          </div>

          {/* Meeting Link (optional) */}
          <div>
            <label className={labelClass}>
              <LinkIcon size={10} className="inline mr-1" />
              Meeting Link{" "}
              <span className="text-slate-400 normal-case font-medium tracking-normal">
                (optional)
              </span>
            </label>
            <input
              id="event-meeting-link"
              type="url"
              placeholder="https://meet.google.com/..."
              value={form.meetingLink}
              onChange={set("meetingLink")}
              className={fieldClass(errors.meetingLink)}
            />
            {errors.meetingLink && <p className={errorClass}>{errors.meetingLink}</p>}
          </div>
        </form>

        {/* ── Footer ── */}
        <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={saving}
            className="px-4 py-2 rounded-xl text-[12px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 bg-slate-100 border border-slate-200 transition-colors cursor-pointer outline-none disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-event-form"
            disabled={saving}
            className="px-5 py-2 rounded-xl text-[12px] font-bold text-white bg-[#6C1D5F] hover:bg-[#521347] shadow-sm shadow-[#6C1D5F]/20 border-none cursor-pointer outline-none transition-colors disabled:opacity-60 flex items-center gap-1.5"
          >
            {saving ? (
              <>
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Plus size={13} />
                Save Event
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Month View ────────────────────────────────────────────────────────────────

function MonthView({ selectedDay, setSelectedDay, events }) {
  const days       = Array.from({ length: 31 }, (_, i) => i + 1);
  const suffixDays = Array.from({ length: 4 });

  const getDayClass = (day) => {
    let base =
      "bg-white p-3 flex flex-col min-h-[90px] border border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer relative ";
    if (day === selectedDay) base += "ring-2 ring-[#6C1D5F] ring-inset z-10 ";
    return base;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
      {/* Weekday Labels */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
        {WEEK_DAYS.map((dayName) => (
          <div
            key={dayName}
            className="py-3 text-center text-[11.5px] font-bold text-slate-450 uppercase tracking-wider"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-[1px] bg-slate-100">
        {days.map((day) => {
          const event     = events[day];
          const isSelected = day === selectedDay;
          return (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={getDayClass(day)}
            >
              <span
                className={`text-[12px] font-bold flex items-center justify-center w-6 h-6 rounded-full mb-1 transition-all ${
                  isSelected
                    ? "bg-[#6C1D5F] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {day}
              </span>
              {event && <EventPill event={event} />}
            </div>
          );
        })}

        {/* Nov suffix fill-in */}
        {suffixDays.map((_, i) => (
          <div
            key={`suffix-${i}`}
            className="bg-white p-3 flex flex-col min-h-[90px] border border-slate-50 opacity-40 select-none"
          >
            <span className="text-[12px] font-bold text-slate-350">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Week View ─────────────────────────────────────────────────────────────────

function WeekView({ selectedDay, setSelectedDay, events }) {
  const weekDays = getWeekForDay(selectedDay);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
      {/* Header row */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
        {weekDays.map((day, i) => {
          const isSelected = day === selectedDay;
          const isOct      = day >= 1 && day <= 31;
          return (
            <div
              key={day}
              onClick={() => isOct && setSelectedDay(day)}
              className={`py-4 flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                isOct ? "hover:bg-slate-100/60" : "opacity-40 cursor-default"
              }`}
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {WEEK_DAYS[i]}
              </span>
              <span
                className={`text-[14px] font-black flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  isSelected && isOct
                    ? "bg-[#6C1D5F] text-white shadow-md shadow-[#6C1D5F]/30"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {isOct ? day : day - 31}
              </span>
            </div>
          );
        })}
      </div>

      {/* Event columns */}
      <div className="grid grid-cols-7 gap-[1px] bg-slate-100 min-h-[320px]">
        {weekDays.map((day) => {
          const event      = events[day];
          const isSelected = day === selectedDay;
          const isOct      = day >= 1 && day <= 31;
          return (
            <div
              key={day}
              onClick={() => isOct && setSelectedDay(day)}
              className={`bg-white p-2 flex flex-col gap-2 min-h-[200px] cursor-pointer transition-colors ${
                isSelected && isOct ? "ring-2 ring-[#6C1D5F] ring-inset z-10" : ""
              } ${isOct ? "hover:bg-slate-50/60" : "opacity-40 cursor-default"}`}
            >
              {event && isOct && (
                <div className="mt-1">
                  <EventPill event={event} />
                  <p className="text-[9px] text-slate-400 mt-1 px-1">{event.time}</p>
                </div>
              )}
              {!event && isOct && (
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[9px] text-slate-300 font-medium">Free</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Day View ──────────────────────────────────────────────────────────────────

function DayView({ selectedDay, events }) {
  const event     = events[selectedDay];
  const eventHour = event ? eventHourLabel(event.time) : null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
      {/* Day header */}
      <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#6C1D5F] shadow-md shadow-[#6C1D5F]/30">
          <span className="text-white font-black text-[18px]">{selectedDay}</span>
        </div>
        <div>
          <h3 className="font-black text-slate-800 text-[15px]">
            {WEEK_DAYS[(selectedDay - 1) % 7]}, October {selectedDay}
          </h3>
          <p className="text-[11.5px] text-slate-400 mt-0.5">
            {event ? "1 event scheduled" : "No events scheduled"}
          </p>
        </div>
      </div>

      {/* Hourly timeline */}
      <div className="divide-y divide-slate-50">
        {HOURS.map((hour) => {
          const hasEvent = event && eventHour === hour;
          const colors   = event ? getEventColors(event.type) : null;
          const EventIcon = event?.icon;

          return (
            <div
              key={hour}
              className={`flex gap-4 px-6 py-3 transition-colors ${
                hasEvent ? "bg-slate-50/80" : "hover:bg-slate-50/40"
              }`}
            >
              {/* Time label */}
              <div className="w-16 shrink-0 pt-0.5">
                <span className="text-[11px] text-slate-400 font-semibold">{hour}</span>
              </div>

              {/* Timeline spine */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-2 h-2 rounded-full mt-1 ${hasEvent ? colors.dot : "bg-slate-200"}`} />
                <div className="w-px flex-1 bg-slate-100 mt-1" />
              </div>

              {/* Slot content */}
              <div className="flex-1 pb-2">
                {hasEvent ? (
                  <div
                    className={`rounded-xl p-3 border flex gap-3 shadow-sm ${colors.card}`}
                  >
                    <div className={`w-1 rounded-full shrink-0 ${colors.accent}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider ${colors.tag}`}
                        >
                          <EventIcon size={9} />
                          {event.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-[12.5px] text-slate-800 mt-1 leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">{event.course}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-6 flex items-center">
                    <span className="text-[10.5px] text-slate-300 font-medium">Available</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function StudentCalendar() {
  const [selectedDay,    setSelectedDay]    = useState(24);
  const [currentMonth]                      = useState("October 2023");
  const [currentView,    setCurrentView]    = useState("month");

  // ✅ Fix: events lives in state so newly created events appear immediately
  const [events, setEvents] = useState(SEED_EVENTS);

  // ✅ Fix: modal open state
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // ── View tab config ───────────────────────────────────────────────────────
  const VIEW_TABS = [
    { id: "month", label: "Month" },
    { id: "week",  label: "Week"  },
    { id: "day",   label: "Day"   },
  ];

  const getTabClass = (id) => {
    const base = "px-4 py-1.5 rounded text-[11.5px] font-bold cursor-pointer transition-all duration-150 border-none outline-none ";
    return id === currentView
      ? base + "bg-[#6C1D5F] text-white shadow-sm shadow-[#6C1D5F]/25"
      : base + "bg-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-200/50";
  };

  // ── Save handler from modal ───────────────────────────────────────────────
  const handleSaveEvent = (day, newEvent) => {
    setEvents((prev) => ({ ...prev, [day]: newEvent }));
    setSelectedDay(day);
  };

  return (
    <>
      <AddEventModal
        open={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onSave={handleSaveEvent}
      />
      
      <EventDetailsModal
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        event={events[selectedDay]}
        day={selectedDay}
      />

      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-8 py-8 animate-fadeIn flex flex-col xl:flex-row gap-6">
        {/* ── Calendar Main View ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Header Control */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentMonth}</h2>
              <p className="text-[13px] text-slate-400 mt-1">Fall Semester Schedule</p>
            </div>

            <div className="flex items-center gap-3">
              {/* View selector tabs */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
                {VIEW_TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setCurrentView(id)}
                    className={getTabClass(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* ✅ Fix: onClick opens the Add Event modal */}
              <button
                onClick={() => setIsAddEventOpen(true)}
                className="bg-[#6C1D5F] text-white hover:bg-[#521347] rounded-xl px-4 py-2 text-[12px] font-bold flex items-center gap-1.5 shadow-sm shadow-[#6C1D5F]/20 cursor-pointer border-none outline-none transition-colors"
              >
                <Plus size={14} /> Add Event
              </button>
            </div>
          </div>

          {/* Conditionally render the active calendar view */}
          {currentView === "month" && (
            <MonthView
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              events={events}
            />
          )}
          {currentView === "week" && (
            <WeekView
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              events={events}
            />
          )}
          {currentView === "day" && (
            <DayView selectedDay={selectedDay} events={events} />
          )}
        </div>

        {/* ── Right Panel: Event details & list ── */}
        <aside className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          {/* Selected Day Event Details */}
          <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[14.5px] text-slate-800">Oct {selectedDay} Details</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none outline-none">
                    <MoreHorizontal size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={5} className="min-w-[150px]">
                  <DropdownMenuItem onSelect={() => setIsDetailsOpen(true)}>View Details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DayDetailCard selectedDay={selectedDay} events={events} onViewDetails={() => setIsDetailsOpen(true)} />
          </div>

          {/* Upcoming Events list */}
          <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col justify-between flex-1 space-y-4">
            <h3 className="font-bold text-[14.5px] text-slate-800">Upcoming Events</h3>

            <div className="space-y-3">
              {Object.entries(events)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([day, ev]) => {
                  const EventIcon = ev.icon;
                  const colors    = getEventColors(ev.type);
                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(parseInt(day))}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors.tag}`}
                      >
                        <EventIcon size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[12.5px] text-slate-800 truncate">{ev.title}</h4>
                        <p className="text-[11px] text-slate-400">
                          Oct {day} • {ev.time.split(" ")[0]} {ev.time.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Video,
  FileText,
  HelpCircle,
  MoreHorizontal,
  X,
  BookOpen,
} from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// ─── Static event data ────────────────────────────────────────────────────────
const EVENTS = {
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

// ─── Month metadata ───────────────────────────────────────────────────────────
const MONTHS = [
  { label: "October 2023",  days: 31, startDay: 0 }, // 0 = Sunday
  { label: "November 2023", days: 30, startDay: 3 },
  { label: "December 2023", days: 31, startDay: 5 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function eventAccent(type) {
  if (type === "assignment") return { bar: "bg-rose-500",   tag: "text-rose-600 bg-rose-50",   dot: "bg-rose-500",   pill: "bg-rose-50 text-rose-700 border-rose-100",   icon: "bg-rose-50 text-rose-500"   };
  if (type === "quiz")       return { bar: "bg-purple-500", tag: "text-purple-600 bg-purple-50",dot: "bg-purple-500", pill: "bg-purple-50 text-purple-700 border-purple-100", icon: "bg-purple-50 text-purple-500" };
  return                            { bar: "bg-teal-500",   tag: "text-teal-600 bg-teal-50",   dot: "bg-teal-500",   pill: "bg-teal-50 text-teal-700 border-teal-100",     icon: "bg-teal-50 text-teal-500"   };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function EventDetail({ event, day, onNavigate }) {
  const EventIcon = event.icon;
  const accent = eventAccent(event.type);
  return (
    <div className="border border-slate-100 rounded-2xl p-4 flex gap-3.5 hover:shadow-sm transition-all duration-200">
      <div className={`w-1 rounded-full shrink-0 ${accent.bar}`} />
      <div className="flex-1 min-w-0 space-y-2.5">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${accent.tag}`}>
          <EventIcon size={10} />
          {event.badge}
        </span>
        <div>
          <h4 className="font-bold text-[13.5px] text-slate-800 leading-snug break-words">{event.title}</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{event.course}</p>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <Clock size={12} />
          <span>{event.time}</span>
        </div>
        <button
          onClick={onNavigate}
          className="w-full mt-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-800 text-[11.5px] font-bold transition-colors border border-slate-200/50 cursor-pointer outline-none"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// ─── Add Event Modal ──────────────────────────────────────────────────────────
function AddEventModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [type, setType]   = useState("assignment");
  const [time, setTime]   = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { toast.error("Please enter an event title"); return; }
    onSave({ title: title.trim(), type, time });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[420px] p-6 space-y-5 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-black text-[16px] text-slate-800">Add New Event</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 transition cursor-pointer border-none outline-none">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold text-slate-600 uppercase tracking-wider">Event Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Assignment Due, Quiz, Lecture…"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold text-slate-600 uppercase tracking-wider">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] bg-white"
            >
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
              <option value="lecture">Live Lecture</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold text-slate-600 uppercase tracking-wider">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F]"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-[12px] font-bold hover:bg-slate-50 transition cursor-pointer outline-none">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12px] font-bold shadow-sm transition cursor-pointer border-none outline-none">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Week View ────────────────────────────────────────────────────────────────
function WeekView({ selectedDay, setSelectedDay, events }) {
  // Show 7 days centred on selectedDay
  const start = Math.max(1, selectedDay - 3);
  const weekDays = Array.from({ length: 7 }, (_, i) => start + i).filter(d => d <= 31);
  const HOURS = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM"];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
      {/* Day headers */}
      <div className="grid border-b border-slate-100 bg-slate-50/50" style={{ gridTemplateColumns: "60px repeat(7, 1fr)" }}>
        <div />
        {weekDays.map(d => (
          <div
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`py-3 text-center cursor-pointer text-[12px] font-bold transition-colors ${d === selectedDay ? "text-[#6C1D5F]" : "text-slate-500 hover:text-slate-700"}`}
          >
            <div className={`mx-auto w-7 h-7 rounded-full flex items-center justify-center ${d === selectedDay ? "bg-[#6C1D5F] text-white" : ""}`}>{d}</div>
            <div className="text-[10px] font-medium text-slate-400 mt-0.5">Oct</div>
          </div>
        ))}
      </div>

      {/* Hour rows */}
      <div className="overflow-y-auto max-h-[420px]">
        {HOURS.map(hr => (
          <div key={hr} className="grid border-b border-slate-50 last:border-0" style={{ gridTemplateColumns: "60px repeat(7, 1fr)" }}>
            <div className="py-3 px-2 text-[10px] text-slate-400 font-semibold text-right pr-3 select-none">{hr}</div>
            {weekDays.map(d => {
              const ev = events[d];
              const matchHour = ev && ((hr === "10 AM" && ev.time.startsWith("10")) || (hr === "2 PM" && ev.time.startsWith("2")) || (hr === "11 AM" && ev.time.startsWith("11")));
              const accent = ev ? eventAccent(ev.type) : null;
              return (
                <div key={d} className="py-3 px-1 min-h-[48px] border-l border-slate-50 relative">
                  {matchHour && accent && (
                    <div onClick={() => setSelectedDay(d)} className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded cursor-pointer truncate border ${accent.pill}`}>
                      {ev.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Day View ─────────────────────────────────────────────────────────────────
function DayView({ selectedDay, events }) {
  const HOURS = ["7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM"];
  const ev = events[selectedDay];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <p className="text-[13px] font-bold text-slate-700">October {selectedDay}, 2023</p>
        <p className="text-[11px] text-slate-400">{ev ? "1 event scheduled" : "No events scheduled"}</p>
      </div>
      <div className="overflow-y-auto max-h-[420px]">
        {HOURS.map(hr => {
          const matchHour = ev && ((hr === "10 AM" && ev.time.startsWith("10")) || (hr === "2 PM" && ev.time.startsWith("2")) || (hr === "11 AM" && ev.time.startsWith("11")));
          const accent = ev ? eventAccent(ev.type) : null;
          return (
            <div key={hr} className="flex border-b border-slate-50 last:border-0">
              <div className="w-16 shrink-0 py-4 px-3 text-[10px] text-slate-400 font-semibold text-right select-none">{hr}</div>
              <div className="flex-1 py-3 px-3 min-h-[52px] border-l border-slate-50">
                {matchHour && accent && (
                  <div className={`text-[11px] font-bold px-3 py-2 rounded-xl border ${accent.pill} flex items-center gap-2`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${accent.dot}`} />
                    <span>{ev.title}</span>
                    <span className="ml-auto text-[10px] font-medium opacity-70">{ev.time}</span>
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StudentCalendar() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay]     = useState(24);
  const [monthIndex, setMonthIndex]       = useState(0);
  const [currentView, setCurrentView]     = useState("Month");
  const [showAddModal, setShowAddModal]   = useState(false);
  const [userEvents, setUserEvents]       = useState({});

  const monthMeta  = MONTHS[monthIndex];
  const allEvents  = { ...EVENTS, ...userEvents };

  // Merge prefix empty cells so month starts on the correct weekday
  const prefixCount = monthMeta.startDay;
  const suffixCount = (7 - ((prefixCount + monthMeta.days) % 7)) % 7;
  const days        = Array.from({ length: monthMeta.days }, (_, i) => i + 1);

  function getDayClass(day) {
    let base = "bg-white p-3 flex flex-col min-h-[90px] border border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer relative ";
    if (day === selectedDay) base += "ring-2 ring-[#6C1D5F] ring-inset z-10 ";
    return base;
  }

  function handleViewDetails(event) {
    if (event.type === "assignment") navigate("/student/assignments");
    else if (event.type === "quiz")  navigate("/student/assessments");
    else                             navigate("/student/courses");
  }

  function handleAddEvent({ title, type, time }) {
    const key = selectedDay;
    const icons = { assignment: FileText, quiz: HelpCircle, lecture: Video };
    setUserEvents(prev => ({
      ...prev,
      [key]: { type, title, course: "My Event", time: time || "12:00 PM", badge: type.charAt(0).toUpperCase() + type.slice(1), icon: icons[type] || BookOpen }
    }));
    toast.success(`Event "${title}" added to Oct ${selectedDay}`);
  }

  const selectedEvent = allEvents[selectedDay] || null;

  return (
    <>
      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEvent}
        />
      )}

      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-8 py-8 animate-fadeIn flex flex-col xl:flex-row gap-6">
        {/* ── Calendar Main View ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMonthIndex(i => Math.max(0, i - 1))}
                disabled={monthIndex === 0}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-white transition outline-none"
              >
                <ChevronLeft size={15} />
              </button>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{monthMeta.label}</h2>
                <p className="text-[13px] text-slate-400 mt-1">Fall Semester Schedule</p>
              </div>
              <button
                onClick={() => setMonthIndex(i => Math.min(MONTHS.length - 1, i + 1))}
                disabled={monthIndex === MONTHS.length - 1}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-white transition outline-none"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* View switcher */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
                {["Month", "Week", "Day"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    className={`px-4 py-1.5 rounded text-[11.5px] font-bold cursor-pointer transition-colors border-none outline-none ${
                      currentView === view
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 bg-transparent"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#6C1D5F] text-white hover:bg-[#521347] rounded-xl px-4 py-2 text-[12px] font-bold flex items-center gap-1.5 shadow-sm shadow-[#6C1D5F]/20 cursor-pointer border-none outline-none transition-colors"
              >
                <Plus size={14} /> Add Event
              </button>
            </div>
          </div>

          {/* ── View Panels ── */}
          {currentView === "Month" && (
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
              {/* Weekday Labels */}
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                  <div key={dayName} className="py-3 text-center text-[11.5px] font-bold text-slate-450 uppercase tracking-wider">
                    {dayName}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-[1px] bg-slate-100">
                {/* Prefix empty cells */}
                {Array.from({ length: prefixCount }).map((_, i) => (
                  <div key={`pre-${i}`} className="bg-white p-3 flex flex-col min-h-[90px] border border-slate-50 opacity-30 select-none" />
                ))}

                {days.map((day) => {
                  const event = allEvents[day];
                  const isSelected = day === selectedDay;
                  const accent = event ? eventAccent(event.type) : null;
                  return (
                    <div key={day} onClick={() => setSelectedDay(day)} className={getDayClass(day)}>
                      <span className={`text-[12px] font-bold flex items-center justify-center w-6 h-6 rounded-full mb-1 transition-all ${
                        isSelected ? "bg-[#6C1D5F] text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}>
                        {day}
                      </span>
                      {event && accent && (
                        <div className={`mt-1 text-[9.5px] font-bold px-2 py-0.5 rounded truncate border flex items-center gap-1 cursor-pointer select-none ${accent.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                          <span className="truncate">{event.title}</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Suffix empty cells */}
                {Array.from({ length: suffixCount }).map((_, i) => (
                  <div key={`suf-${i}`} className="bg-white p-3 flex flex-col min-h-[90px] border border-slate-50 opacity-40 select-none">
                    <span className="text-[12px] font-bold text-slate-300">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === "Week" && (
            <WeekView selectedDay={selectedDay} setSelectedDay={setSelectedDay} events={allEvents} />
          )}

          {currentView === "Day" && (
            <DayView selectedDay={selectedDay} events={allEvents} />
          )}
        </div>

        {/* ── Right Panel ── */}
        <aside className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          {/* Selected Day Details */}
          <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[14.5px] text-slate-800">{monthMeta.label.split(" ")[0]} {selectedDay} Details</h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none outline-none transition-colors"
                title="Add event to this day"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            {selectedEvent ? (
              <EventDetail
                event={selectedEvent}
                day={selectedDay}
                onNavigate={() => handleViewDetails(selectedEvent)}
              />
            ) : (
              <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2">
                <CalendarIcon size={24} className="text-slate-300" />
                <p className="text-[12px] text-slate-400 font-medium">No events scheduled today.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-[11px] text-[#6C1D5F] font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
                >
                  + Add an event
                </button>
              </div>
            )}
          </div>

          {/* Upcoming Events list */}
          <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col flex-1 space-y-4">
            <h3 className="font-bold text-[14.5px] text-slate-800">Upcoming Events</h3>
            <div className="space-y-3">
              {Object.entries(allEvents).length === 0 ? (
                <p className="text-[12px] text-slate-400 text-center py-4">No events yet.</p>
              ) : (
                Object.entries(allEvents).map(([day, ev]) => {
                  const EventIcon = ev.icon;
                  const accent = eventAccent(ev.type);
                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(parseInt(day))}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                        <EventIcon size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[12.5px] text-slate-800 truncate">{ev.title}</h4>
                        <p className="text-[11px] text-slate-400">{monthMeta.label.split(" ")[0]} {day} • {ev.time.split(" ")[0]} {ev.time.split(" ")[1]}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

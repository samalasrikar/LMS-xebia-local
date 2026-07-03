import React, { useState } from "react";
import {
  Bell,
  CheckCheck,
  ClipboardList,
  Megaphone,
  MessageSquare,
  BellOff,
  Inbox,
  Trash2,
} from "lucide-react";

export default function StudentNotifications() {
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'reminder', 'system', 'community'
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      label: "Reminder",
      time: "2h ago",
      title: "Upcoming Deadline: Advanced Data Structures",
      description: "Your final project is due tomorrow at 11:59 PM. Don't forget to submit.",
      read: false,
      icon: ClipboardList,
      iconColor: "text-[#6C1D5F] bg-[#6C1D5F]/5 border-[#6C1D5F]/15",
    },
    {
      id: 2,
      type: "system",
      label: "System Announcement",
      time: "Yesterday",
      title: "Platform Maintenance Scheduled",
      description: "Lumina Learning will be down for scheduled maintenance on Sunday, 2 AM - 4 AM EST.",
      read: true,
      icon: Megaphone,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      id: 3,
      type: "community",
      label: "Community Update",
      time: "Oct 12",
      title: "New Discussion Reply",
      description: "Sarah Jenkins replied to your post in 'Ethical AI Principles'.",
      read: true,
      icon: MessageSquare,
      iconColor: "text-teal-600 bg-teal-50 border-teal-100",
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Notifications</h2>
          <p className="text-[13px] text-slate-400 mt-1">Stay updated on your learning journey.</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#6C1D5F] font-bold rounded-xl text-[12px] border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer outline-none shrink-0"
          >
            <CheckCheck size={14} /> Mark all as read
          </button>
        )}
      </header>

      {/* ── Filters ── */}
      <div className="flex overflow-x-auto gap-2.5 pb-2 border-b border-slate-100 whitespace-nowrap hide-scrollbar">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition-all cursor-pointer outline-none ${
            activeFilter === "all"
              ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
              : "bg-white text-slate-500 border-slate-200 hover:border-slate-350"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("reminder")}
          className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition-all cursor-pointer outline-none ${
            activeFilter === "reminder"
              ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
              : "bg-white text-slate-500 border-slate-200 hover:border-slate-350"
          }`}
        >
          Reminders
        </button>
        <button
          onClick={() => setActiveFilter("system")}
          className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition-all cursor-pointer outline-none ${
            activeFilter === "system"
              ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
              : "bg-white text-slate-500 border-slate-200 hover:border-slate-350"
          }`}
        >
          System Announcements
        </button>
        <button
          onClick={() => setActiveFilter("community")}
          className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition-all cursor-pointer outline-none ${
            activeFilter === "community"
              ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
              : "bg-white text-slate-500 border-slate-200 hover:border-slate-350"
          }`}
        >
          Community Updates
        </button>
      </div>

      {/* ── Notifications List ── */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((n) => {
            const IconComponent = n.icon;

            return (
              <div
                key={n.id}
                onClick={() => toggleReadStatus(n.id)}
                className={`group relative border rounded-2xl p-5 flex gap-4 transition-all duration-200 cursor-pointer shadow-sm ${
                  !n.read
                    ? "bg-white border-[#6C1D5F]/20 hover:bg-[#6C1D5F]/5"
                    : "bg-white/80 border-slate-200 hover:bg-slate-50/50 opacity-80"
                }`}
              >
                {/* Highlight line on the left side of unread items */}
                {!n.read && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#6C1D5F] rounded-r-full" />
                )}

                {/* Circle Icon */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border ${n.iconColor}`}>
                  <IconComponent size={18} />
                </div>

                {/* Content details */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black uppercase text-[#84117C] tracking-wider">
                      {n.label}
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-semibold">{n.time}</span>
                  </div>
                  <h3 className={`text-[13.5px] text-slate-800 tracking-tight leading-snug ${!n.read ? "font-extrabold" : "font-semibold"}`}>
                    {n.title}
                  </h3>
                  <p className="text-[12px] text-slate-450 mt-1 leading-relaxed">{n.description}</p>
                </div>

                {/* Delete button (visible on hover) */}
                <button
                  onClick={(e) => handleDelete(n.id, e)}
                  className="absolute right-5 bottom-5 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer border-none bg-transparent outline-none"
                  title="Delete Notification"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-250/20 rounded-3xl shadow-sm space-y-4.5">
          <div className="w-16 h-16 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-350 shadow-sm">
            <BellOff size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-700 text-[14px]">You're all caught up!</h3>
            <p className="text-[11.5px] text-slate-400 max-w-xs mx-auto">
              There are no updates or system notifications in this category.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

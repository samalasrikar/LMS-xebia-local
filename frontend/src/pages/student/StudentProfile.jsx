import React, { useState } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle,
  Settings,
  Mail,
  Phone,
  FileText,
  MapPin,
  ChevronRight,
  TrendingUp,
  Percent,
  Sparkles,
  Lock,
} from "lucide-react";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("general"); // 'general', 'academic', 'learning', 'account'
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    id: "STU-2021-8902",
    rollNumber: "21CSB045",
    email: "alex.j@university.edu",
    phone: "+1 (555) 123-4567",
    dob: "2002-05-15",
    gender: "Female",
    address: "123 Tech Lane, Silicon Valley, CA 94000",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsyA0vivV0CljyXSlO3SYa2Gmz4zhiGm-b2jr6sz5y0X9zQ-2QYxVIQhFznZswh2oWy6CWbcilrt8DuhXIY0hoZEOwfoLXSXKJq52lwOp6TKpxMxvu5i3PCQBHmpCcMEo0bLB2uhWCNxh2gzo_NV6W4SMp5KSErR1EIEyk4e4ofvihdR7bax6PuGE-LHAsxwQQukHG1AU3DzIR_ILy3eVATJfuedxBS0V9ieM5lajis6SdRBJVU5kxbTcn5VlGWjqCkr786KglsMs",
  });

  const [settings, setSettings] = useState({
    tfa: true,
    emailNotifications: true,
    publicProfile: false,
  });

  const handleProfileChange = (key, val) => {
    setProfile((prev) => ({ ...prev, [key]: val }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProfileChange("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Header: Avatar & Brief Info ── */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/70 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/4 opacity-[0.02] pointer-events-none">
          <GraduationCap size={160} />
        </div>

        <div className="relative group shrink-0">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-slate-50 shadow-md overflow-hidden relative">
            <img className="w-full h-full object-cover" src={profile.avatar} alt="Profile" />
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span>Change Photo</span>
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1.5">
            <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">{profile.name}</h1>
              <span className="px-3 py-0.5 bg-[#84117C]/10 border border-[#84117C]/20 text-[#84117C] rounded-full text-[10px] font-black uppercase tracking-wider w-fit mx-auto md:mx-0">
                Active Student
              </span>
            </div>
            <p className="text-[12.5px] text-slate-400 font-bold tracking-wide uppercase">Student ID: {profile.id}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-left">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Roll Number</p>
              <p className="text-[12.5px] font-extrabold text-slate-850 mt-0.5">{profile.rollNumber}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Program</p>
              <p className="text-[12.5px] font-extrabold text-slate-850 mt-0.5">B.Tech CS</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Department</p>
              <p className="text-[12.5px] font-extrabold text-slate-850 mt-0.5">CSE</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Semester</p>
              <p className="text-[12.5px] font-extrabold text-slate-850 mt-0.5">5th Sem</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statistics Grid ── */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Enrolled */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center border border-[#6C1D5F]/10">
            <BookOpen size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Enrolled</p>
            <p className="text-xl font-black text-slate-800">6 Courses</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <CheckCircle size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
            <p className="text-xl font-black text-slate-800">24 Courses</p>
          </div>
        </div>

        {/* CGPA */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <TrendingUp size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Current CGPA</p>
            <p className="text-xl font-black text-slate-800">3.85 <span className="text-[10px] text-slate-400 font-medium">/ 4.0</span></p>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center border border-[#6C1D5F]/10">
            <Percent size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
            <p className="text-xl font-black text-slate-800">94%</p>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <Award size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Credits</p>
            <p className="text-xl font-black text-slate-800">72 <span className="text-[10px] text-slate-400 font-medium">CR</span></p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <Clock size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Pending Tasks</p>
            <p className="text-xl font-black text-slate-800">3 Items</p>
          </div>
        </div>
      </section>

      {/* ── Tabs & Configurations ── */}
      <section className="bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-sm">
        {/* Navigation Tab list */}
        <div className="flex border-b border-slate-100 px-6 overflow-x-auto whitespace-nowrap bg-slate-50/50">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-5 px-4 font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer border-none outline-none relative bg-transparent ${
              activeTab === "general" ? "text-[#6C1D5F]" : "text-slate-400 hover:text-slate-650"
            }`}
          >
            <User size={15} /> General Information
            {activeTab === "general" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] rounded-full" />}
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`py-5 px-4 font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer border-none outline-none relative bg-transparent ${
              activeTab === "academic" ? "text-[#6C1D5F]" : "text-slate-400 hover:text-slate-650"
            }`}
          >
            <GraduationCap size={15} /> Academic Record
            {activeTab === "academic" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] rounded-full" />}
          </button>
          <button
            onClick={() => setActiveTab("learning")}
            className={`py-5 px-4 font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer border-none outline-none relative bg-transparent ${
              activeTab === "learning" ? "text-[#6C1D5F]" : "text-slate-400 hover:text-slate-650"
            }`}
          >
            <BookOpen size={15} /> Learning Stats
            {activeTab === "learning" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] rounded-full" />}
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`py-5 px-4 font-bold text-[13px] transition-all flex items-center gap-2 cursor-pointer border-none outline-none relative bg-transparent ${
              activeTab === "account" ? "text-[#6C1D5F]" : "text-slate-400 hover:text-slate-650"
            }`}
          >
            <Settings size={15} /> Security &amp; Settings
            {activeTab === "account" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] rounded-full" />}
          </button>
        </div>

        {/* Tab content area */}
        <div className="p-8">
          {activeTab === "general" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Student ID</label>
                  <input
                    type="text"
                    value={profile.id}
                    readOnly
                    className="w-full bg-slate-100/70 border border-slate-200 text-slate-450 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Roll Number</label>
                  <input
                    type="text"
                    value={profile.rollNumber}
                    readOnly
                    className="w-full bg-slate-100/70 border border-slate-200 text-slate-450 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dob}
                    onChange={(e) => handleProfileChange("dob", e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => handleProfileChange("gender", e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Permanent Address</label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => handleProfileChange("address", e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button className="bg-[#6C1D5F] hover:bg-[#521347] text-white px-6 py-2.5 rounded-xl text-[12px] font-bold shadow-sm shadow-[#6C1D5F]/15 transition-all cursor-pointer border-none outline-none">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Program</label>
                <input readOnly value="B.Tech Computer Science" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Department</label>
                <input readOnly value="Computer Science & Engineering" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Batch Year</label>
                <input readOnly value="2021-2025" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Academic Semester</label>
                <input readOnly value="5th Semester" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Class Section</label>
                <input readOnly value="A" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Admission Intake</label>
                <input readOnly value="Fall 2021" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Expected Graduation</label>
                <input readOnly value="Spring 2025" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Academic Advisor</label>
                <input readOnly value="Dr. Sarah Jenkins" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
              </div>
            </div>
          )}

          {activeTab === "learning" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Enrolled Courses (Current Sem)</label>
                  <input readOnly value="6 Active Courses" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Certificates Earned</label>
                  <input readOnly value="14 External Certifications" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Total Learning Hours</label>
                  <input readOnly value="845 Hours" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-black uppercase text-slate-455 tracking-wider">Completed Modules</label>
                  <input readOnly value="128 Modules" className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-4 py-2.5 text-[13px] cursor-not-allowed outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2 pt-2">
                  <div className="flex justify-between items-center text-[12.5px] font-bold text-slate-700">
                    <span>Current Semester Progress</span>
                    <span className="text-[#6C1D5F]">65% Completed</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-[#6C1D5F] h-full w-[65%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn">
              {/* Password column */}
              <div className="space-y-5">
                <h4 className="text-[15px] font-bold text-slate-800 pb-2 border-b border-slate-100">Change Password</h4>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-black uppercase text-slate-400 tracking-wider">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]" />
                  </div>
                  <button className="bg-[#6C1D5F] hover:bg-[#521347] text-white px-6 py-2.5 rounded-xl text-[12px] font-bold shadow-sm shadow-[#6C1D5F]/15 transition-all cursor-pointer border-none outline-none">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Privacy/Security switches */}
              <div className="space-y-5">
                <h4 className="text-[15px] font-bold text-slate-800 pb-2 border-b border-slate-100">Security &amp; Privacy</h4>
                <div className="space-y-4">
                  {/* TFA */}
                  <div className="flex items-center justify-between p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl">
                    <div>
                      <p className="text-[13px] font-bold text-slate-700">Two-Factor Authentication (2FA)</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Secure your account with an extra security layer.</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting("tfa")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                        settings.tfa ? "bg-teal-600" : "bg-slate-200"
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                        settings.tfa ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl">
                    <div>
                      <p className="text-[13px] font-bold text-slate-700">Email Notifications</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Receive course updates and announcements.</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting("emailNotifications")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                        settings.emailNotifications ? "bg-teal-600" : "bg-slate-200"
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                        settings.emailNotifications ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Public Profile */}
                  <div className="flex items-center justify-between p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl">
                    <div>
                      <p className="text-[13px] font-bold text-slate-700">Public Profile</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Allow peers to see your academic progress.</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting("publicProfile")}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer border-none outline-none ${
                        settings.publicProfile ? "bg-teal-600" : "bg-slate-200"
                      }`}
                    >
                      <div className={`bg-white w-5 h-5 rounded-full shadow transition-transform ${
                        settings.publicProfile ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

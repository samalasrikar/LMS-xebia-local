import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Shield, Users, ArrowLeft, ArrowRight, Lock, Mail, CheckCircle2, Sparkles } from "lucide-react";

const DEMO_CREDS = {
  admin: { email: "admin@xebia.com", password: "Xebia@2024", role: "admin", label: "Admin Console", route: "/admin" },
  student: { email: "student@xebia.com", password: "Xebia@2024", role: "student", label: "Student Portal", route: "/student" },
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  const doLogin = (route) => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      navigate(route);
    }, 900);
  };

  const handleQuickLogin = (type) => {
    const cred = DEMO_CREDS[type];
    setActiveCard(type);
    setEmail(cred.email);
    setPassword(cred.password);
    setRole(cred.role);
    doLogin(cred.route);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const adminCred = DEMO_CREDS.admin;
    const studentCred = DEMO_CREDS.student;
    if (email === adminCred.email && password === adminCred.password) {
      doLogin(adminCred.route);
    } else if (email === studentCred.email && password === studentCred.password) {
      doLogin(studentCred.route);
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Geist Variable', sans-serif", background: "#0f0a1a", color: "#f1f0f5", overflow: "hidden" }}>

      {/* ── Left panel ──────────────────────────────── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 48px",
        width: "45%",
        minWidth: "380px",
        background: "linear-gradient(160deg, #1a0b28 0%, #2a0d3f 40%, #4A1E47 100%)",
        borderRight: "1px solid rgba(108,29,95,0.3)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
        className="hidden-mobile"
      >
        {/* Decorative glows */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(132,17,124,0.25) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(1,172,159,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Top: back link */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(241,240,245,0.6)", fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "color 0.2s", position: "relative" }}
          onMouseEnter={e => e.currentTarget.style.color = "#f1f0f5"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(241,240,245,0.6)"}
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        {/* Middle: branding + text */}
        <div style={{ position: "relative" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, #6C1D5F, #84117C)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", boxShadow: "0 8px 24px rgba(108,29,95,0.4)" }}>
            <GraduationCap size={26} color="#fff" />
          </div>
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Elevating Capabilities<br />Across Engineering Teams
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(241,240,245,0.65)", lineHeight: 1.7, maxWidth: "340px" }}>
            Access personalized training tracks, monitor learning investments, and manage corporate capabilities from one powerful hub.
          </p>

          {/* Feature chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "32px" }}>
            {["AI-Powered Learning Paths", "Real-Time Skill Analytics", "Certification Management"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(241,240,245,0.8)" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "rgba(1,172,159,0.15)", border: "1px solid rgba(1,172,159,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={13} color="#01ac9f" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: copyright */}
        <div style={{ fontSize: "11px", color: "rgba(241,240,245,0.35)", position: "relative" }}>
          © {new Date().getFullYear()} Xebia Learning System. All rights reserved.
        </div>
      </div>

      {/* ── Right panel: login form ──────────────────── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "#0f0a1a", position: "relative", overflow: "auto" }}>
        {/* Subtle background pattern */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(108,29,95,0.08), transparent 60%)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>
          {/* Mobile brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #6C1D5F, #84117C)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>Xebia LMS</div>
              <div style={{ fontSize: "9px", fontWeight: 700, color: "#84117C", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>Enterprise Suite</div>
            </div>
          </div>

          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "6px" }}>Welcome Back</h1>
          <p style={{ fontSize: "13px", color: "rgba(241,240,245,0.5)", marginBottom: "28px" }}>Sign in to access your learning portal</p>

          {/* ── Quick Access Cards ── */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(241,240,245,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Quick Access</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {/* Admin card */}
              <button type="button" onClick={() => handleQuickLogin("admin")}
                style={{ padding: "14px", borderRadius: "12px", background: activeCard === "admin" ? "rgba(108,29,95,0.2)" : "rgba(255,255,255,0.04)", border: activeCard === "admin" ? "1px solid rgba(108,29,95,0.6)" : "1px solid rgba(255,255,255,0.08)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                onMouseEnter={e => { if (activeCard !== "admin") { e.currentTarget.style.background = "rgba(108,29,95,0.12)"; e.currentTarget.style.border = "1px solid rgba(108,29,95,0.4)"; } }}
                onMouseLeave={e => { if (activeCard !== "admin") { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; } }}
              >
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(108,29,95,0.2)", border: "1px solid rgba(108,29,95,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                  <Shield size={15} color="#84117C" />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>Admin Console</div>
                <div style={{ fontSize: "10px", color: "rgba(241,240,245,0.4)" }}>admin@xebia.com</div>
              </button>

              {/* Student card */}
              <button type="button" onClick={() => handleQuickLogin("student")}
                style={{ padding: "14px", borderRadius: "12px", background: activeCard === "student" ? "rgba(1,172,159,0.12)" : "rgba(255,255,255,0.04)", border: activeCard === "student" ? "1px solid rgba(1,172,159,0.5)" : "1px solid rgba(255,255,255,0.08)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                onMouseEnter={e => { if (activeCard !== "student") { e.currentTarget.style.background = "rgba(1,172,159,0.08)"; e.currentTarget.style.border = "1px solid rgba(1,172,159,0.3)"; } }}
                onMouseLeave={e => { if (activeCard !== "student") { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; } }}
              >
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(1,172,159,0.15)", border: "1px solid rgba(1,172,159,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                  <Users size={15} color="#01ac9f" />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>Student Portal</div>
                <div style={{ fontSize: "10px", color: "rgba(241,240,245,0.4)" }}>student@xebia.com</div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "11px", color: "rgba(241,240,245,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>Or sign in manually</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Role toggle */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "rgba(241,240,245,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>Login Profile</label>
              <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "4px" }}>
                {["student", "admin"].map(r => (
                  <button key={r} type="button" onClick={() => { setRole(r); setEmail(DEMO_CREDS[r].email); setPassword(""); }}
                    style={{ flex: 1, padding: "7px 0", borderRadius: "7px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: "none", transition: "all 0.2s",
                      background: role === r ? (r === "admin" ? "#6C1D5F" : "#01ac9f") : "transparent",
                      color: role === r ? "#fff" : "rgba(241,240,245,0.4)"
                    }}
                  >
                    {r === "student" ? "Student" : "Administrator"}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "rgba(241,240,245,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(241,240,245,0.3)", pointerEvents: "none" }} />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={DEMO_CREDS[role].email}
                  style={{ width: "100%", paddingLeft: "40px", paddingRight: "14px", paddingTop: "11px", paddingBottom: "11px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "13px", color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "rgba(108,29,95,0.7)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "rgba(241,240,245,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
                <a href="#" style={{ fontSize: "11px", fontWeight: 600, color: "#84117C", textDecoration: "none" }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(241,240,245,0.3)", pointerEvents: "none" }} />
                <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", paddingLeft: "40px", paddingRight: "44px", paddingTop: "11px", paddingBottom: "11px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "13px", color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "rgba(108,29,95,0.7)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(241,240,245,0.35)", padding: 0, display: "flex" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ fontSize: "12px", color: "#f87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "8px", padding: "10px 12px" }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "13px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "#fff", cursor: loading ? "not-allowed" : "pointer", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "opacity 0.2s",
                background: role === "admin" ? "linear-gradient(to right, #6C1D5F, #84117C)" : "linear-gradient(to right, #009e92, #01ac9f)",
                boxShadow: role === "admin" ? "0 6px 20px rgba(108,29,95,0.35)" : "0 6px 20px rgba(1,172,159,0.25)",
                opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <>
                  <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                  Authenticating...
                </>
              ) : (
                <>Access Account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart2, Pencil, Trash2, Link, Clock, Plus, Search,
  ChevronLeft, ChevronRight, BookOpen, Activity, Info,
  TrendingUp, CheckCircle2, AlertCircle, Users, CheckCheck,
  FileEdit, Star,
} from "lucide-react";

import AppLayout from "../components/layout/AppLayout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import categoryService from "../services/categoryService";
import courseService from "../services/courseService";

/* ─── Level badge config ─────────────────────────────────────────── */
const LEVEL_CLS = {
  Beginner:     "bg-emerald-100 text-emerald-700 border-transparent",
  Intermediate: "bg-blue-100 text-blue-700 border-transparent",
  Advanced:     "bg-amber-100 text-amber-800 border-transparent",
  Expert:       "bg-red-100 text-red-700 border-transparent",
};

/* ─── Mock activity feed ─────────────────────────────────────────── */
const ACTIVITY = [
  { type: "add",  icon: Plus,     color: "bg-emerald-100 text-emerald-600", title: 'New course "Spring Boot Mastery" added',   meta: "By Rahul Sharma", time: "2d ago" },
  { type: "edit", icon: Pencil,   color: "bg-blue-100 text-blue-600",       title: "Category description updated",             meta: "By Admin User",   time: "3d ago" },
  { type: "pub",  icon: TrendingUp, color: "bg-yellow-100 text-yellow-600", title: '"Node.js Advanced Patterns" published',    meta: "By Priya Nair",   time: "5d ago" },
  { type: "edit", icon: Pencil,   color: "bg-blue-100 text-blue-600",       title: "SEO metadata refreshed for category",      meta: "By Admin User",   time: "1w ago" },
  { type: "arc",  icon: Trash2,   color: "bg-red-100 text-red-500",         title: '"Legacy Java EE" course archived',         meta: "By Admin User",   time: "2w ago" },
];

/* ─── SEO check items ────────────────────────────────────────────── */
const SEO_CHECKS = [
  { ok: true,  label: "Meta title set" },
  { ok: true,  label: "Meta description set" },
  { ok: true,  label: "Canonical URL defined" },
  { ok: false, label: "OG image missing" },
  { ok: false, label: "Twitter card not configured" },
];

const ACCENT = "#6C1D5F";

export default function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory]   = useState(null);
  const [courses, setCourses]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [courseSearch, setCourseSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [levelFilter, setLevelFilter]   = useState("All Levels");
  const [page, setPage]           = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    setLoading(true);
    try {
      const [cats, allCourses] = await Promise.all([
        categoryService.getAllCategories(),
        courseService.getAllCourses(),
      ]);
      const cat = cats?.find((c) => String(c.id) === String(id));
      setCategory(cat || null);
      const related = (allCourses || [])
        .filter((c) => String(c.categoryId) === String(id))
        .map((c) => ({
          id:         c.id,
          title:      c.title,
          subtitle:   c.description?.slice(0, 40) || "—",
          level:      c.difficulty || "Intermediate",
          duration:   c.duration || "—",
          learners:   Math.floor(Math.random() * 400) + 50,
          status:     c.status || "Published",
          updated:    "Jun 2025",
          thumbnail:  c.thumbnail || null,
        }));
      setCourses(related);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Derived values ──────────────────────────────────────────────── */
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(courseSearch.toLowerCase());
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchLevel  = levelFilter  === "All Levels"  || c.level  === levelFilter;
    return matchSearch && matchStatus && matchLevel;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const published = courses.filter((c) => c.status === "Published").length;
  const drafts    = courses.filter((c) => c.status !== "Published").length;
  const totalLearners = courses.reduce((s, c) => s + c.learners, 0);

  const enrollTop = [...courses]
    .sort((a, b) => b.learners - a.learners)
    .slice(0, 6);
  const maxEnroll = enrollTop[0]?.learners || 1;

  /* ── Placeholder if loading / not found ─────────────────────────── */
  const cat = category || {
    name: "Backend Engineering",
    description: "Java, Spring Boot, Node.js, REST APIs, microservices, and server-side development.",
    slug: "backend-engineering",
    status: "Active",
  };

  return (
    <AppLayout>
      <div className="max-w-[1300px] mx-auto space-y-4">

        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400">
              <button onClick={() => navigate("/categories")} className="font-medium text-slate-500 hover:text-[#6C1D5F] transition-colors">
                Categories
              </button>
              <ChevronRight size={12} />
              <span className="text-slate-800 font-semibold">{cat.name}</span>
            </div>
            <h1 className="text-[18px] font-bold text-slate-900 tracking-tight leading-snug">{cat.name}</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 text-[13px]">
              <BarChart2 size={14} /> Analytics
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-[13px]" onClick={() => navigate(`/categories/${id}/edit`)}>
              <Pencil size={14} /> Edit Category
            </Button>
            <Button variant="destructive" size="sm" className="gap-1.5 text-[13px] bg-red-50 text-red-600 border border-red-200 hover:bg-red-100">
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>

        {/* ── Hero card ───────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Color accent bar */}
          <div className="h-1" style={{ background: ACCENT }} />
          <div className="p-5 flex items-start gap-4">
            {/* Emoji box */}
            <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-3xl flex-shrink-0">⚙️</div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                <span className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">{cat.name}</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-transparent gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400 mb-2.5">
                <Link size={12} />
                <span>/categories/</span>
                <span className="text-[#6C1D5F] font-medium">{cat.slug || "backend-engineering"}</span>
              </div>
              <div className="text-[13.5px] text-slate-500 leading-relaxed mb-3" style={{ width: "100%" }}>{cat.description}</div>
              <div className="flex flex-wrap gap-1.5">
                {["Java","Spring Boot","Node.js","REST APIs","Microservices","PostgreSQL"].map((t) => (
                  <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[12px] font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Aside */}
            <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <div className="w-3.5 h-3.5 rounded-[3px]" style={{ background: ACCENT }} />
                <span className="text-[12.5px] font-bold text-slate-700 font-mono">{ACCENT}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <Clock size={12} />
                Updated 2 days ago
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ───────────────────────────────────────────── */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { icon: BookOpen,  iconCls: "bg-purple-50 text-purple-600",  val: courses.length || 21,      lbl: "Total Courses"  },
            { icon: Users,     iconCls: "bg-teal-50 text-teal-600",      val: totalLearners || "1,560",  lbl: "Total Learners" },
            { icon: CheckCheck,iconCls: "bg-orange-50 text-orange-500",  val: published || 16,           lbl: "Published"      },
            { icon: FileEdit,  iconCls: "bg-indigo-50 text-indigo-500",  val: drafts || 5,               lbl: "Drafts"         },
            { icon: Star,      iconCls: "bg-rose-50 text-rose-500",      val: "4.6",                     lbl: "Avg. Rating"    },
          ].map((s) => (
            <Card key={s.lbl} className="flex-row items-center gap-3 p-4 border-slate-200">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.iconCls}`}>
                <s.icon size={16} />
              </div>
              <div>
                <div className="text-[20px] font-bold text-slate-900 tracking-tight leading-none">{s.val}</div>
                <div className="text-[11.5px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">{s.lbl}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="flex gap-4 items-start">

          {/* ── LEFT column ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Courses table card */}
            <Card className="border-slate-200 overflow-hidden">
              <CardHeader className="flex-row items-center justify-between py-3.5 px-4 border-b border-slate-200">
                <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-800">
                  <BookOpen size={14} className="text-slate-400" />
                  Courses in this Category
                </div>
                <Button variant="ghost" size="sm" className="text-[#6C1D5F] hover:text-[#4A1E47] gap-1 text-[12.5px] font-medium h-auto py-1 px-2">
                  <Plus size={12} /> Add Course
                </Button>
              </CardHeader>

              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    value={courseSearch}
                    onChange={(e) => { setCourseSearch(e.target.value); setPage(1); }}
                    placeholder="Search courses..."
                    className="pl-8 text-[12.5px] h-8 w-52 bg-slate-50 border-slate-200"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="h-8 px-2 pr-6 bg-slate-50 border border-slate-200 rounded-md text-[12.5px] font-medium text-slate-600 outline-none cursor-pointer appearance-none"
                >
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
                <select
                  value={levelFilter}
                  onChange={(e) => { setLevelFilter(e.target.value); setPage(1); }}
                  className="h-8 px-2 pr-6 bg-slate-50 border border-slate-200 rounded-md text-[12.5px] font-medium text-slate-600 outline-none cursor-pointer appearance-none"
                >
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <span className="ml-auto text-[12px] text-slate-400 font-medium">
                  {filtered.length} courses
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {["Course","Level","Duration","Learners","Status","Updated",""].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap first:pl-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan={7} className="py-10 text-center text-[13px] text-slate-400">Loading…</td></tr>
                    ) : paginated.length === 0 ? (
                      /* ── Mock rows shown when backend is offline ── */
                      [
                        { title:"Spring Boot Mastery",       sub:"RESTful APIs with Java",         level:"Intermediate", dur:"12h 30m", learners:324, status:"Published", updated:"Jun 12, 2025" },
                        { title:"Node.js Advanced Patterns", sub:"Microservices & Event-driven",   level:"Advanced",     dur:"16h 45m", learners:278, status:"Published", updated:"May 28, 2025" },
                        { title:"REST API Design Principles",sub:"Best practices & OpenAPI",       level:"Beginner",     dur:"8h 20m",  learners:412, status:"Published", updated:"Jun 1, 2025" },
                        { title:"Java Fundamentals",         sub:"OOP, Collections, Streams",      level:"Beginner",     dur:"10h 10m", learners:189, status:"Draft",     updated:"Jun 18, 2025" },
                        { title:"Microservices Architecture",sub:"Docker, Kafka, Service Mesh",    level:"Advanced",     dur:"18h 00m", learners:201, status:"Published", updated:"May 14, 2025" },
                        { title:"PostgreSQL for Backends",   sub:"Queries, Indexing, Optimization",level:"Intermediate", dur:"9h 50m",  learners:156, status:"Published", updated:"Apr 30, 2025" },
                      ].map((row, i) => (
                        <CourseRow key={i} row={row} navigate={navigate} />
                      ))
                    ) : (
                      paginated.map((row) => <CourseRow key={row.id} row={row} navigate={navigate} />)
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100">
                <span className="text-[12px] text-slate-400">
                  Showing {Math.min((page-1)*PER_PAGE+1, filtered.length || 6)}–{Math.min(page*PER_PAGE, filtered.length || 6)} of {filtered.length || 21} courses
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40">
                    <ChevronLeft size={13} />
                  </button>
                  {Array.from({ length: Math.min(totalPages || 4, 4) }, (_, i) => i+1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-7 h-7 rounded-md border text-[12.5px] font-medium transition-colors ${page === p ? "bg-[#6C1D5F] text-white border-[#6C1D5F]" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40">
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Recent Activity card */}
            <Card className="border-slate-200 overflow-hidden">
              <CardHeader className="flex-row items-center gap-2 py-3.5 px-4 border-b border-slate-200">
                <Activity size={14} className="text-slate-400" />
                <span className="text-[13.5px] font-semibold text-slate-800">Recent Activity</span>
              </CardHeader>
              <CardContent className="px-4 py-1">
                {ACTIVITY.map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 py-3 ${i < ACTIVITY.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.color}`}>
                      <item.icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-slate-800 leading-snug">{item.title}</div>
                      <div className="text-[11.5px] text-slate-400 mt-0.5">{item.meta}</div>
                    </div>
                    <span className="text-[11.5px] text-slate-400 flex-shrink-0 whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>{/* end left col */}

          {/* ── RIGHT column ────────────────────────────────────── */}
          <div className="w-[272px] flex-shrink-0 flex flex-col gap-4">

            {/* Category Details */}
            <Card className="border-slate-200 overflow-hidden">
              <CardHeader className="flex-row items-center justify-between py-3 px-4 border-b border-slate-200">
                <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-800">
                  <Info size={14} className="text-slate-400" /> Category Details
                </div>
                <button className="flex items-center gap-1 text-[12.5px] font-medium text-[#6C1D5F] hover:text-[#4A1E47]">
                  <Pencil size={11} /> Edit
                </button>
              </CardHeader>
              <CardContent className="px-0 py-0">
                {[
                  { lbl: "Status",   val: <Badge className="bg-emerald-100 text-emerald-700 border-transparent gap-1 text-[11px]"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Active</Badge> },
                  { lbl: "Slug",     val: <span className="font-mono text-[11.5px] bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-slate-700">{cat.slug || "backend-engineering"}</span> },
                  { lbl: "Accent Color", val: (
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-[3px]" style={{ background: ACCENT }} />
                      <span className="text-[12px] font-bold text-slate-700">{ACCENT}</span>
                    </div>
                  )},
                  { lbl: "Created",  val: <span className="text-[12px] text-slate-500">Jan 10, 2024</span> },
                  { lbl: "Modified", val: <span className="text-[12px] text-slate-500">Jun 19, 2025</span> },
                  { lbl: "Featured", val: (
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-4 rounded-full bg-[#6C1D5F] relative flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-white absolute top-0.5 right-0.5 shadow-sm" />
                      </div>
                      <span className="text-[12px] font-semibold text-[#6C1D5F]">Yes</span>
                    </div>
                  )},
                ].map((row, i, arr) => (
                  <div key={row.lbl} className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <span className="text-[12.5px] text-slate-400 font-medium">{row.lbl}</span>
                    {row.val}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enrollments by Course */}
            <Card className="border-slate-200 overflow-hidden">
              <CardHeader className="flex-row items-center gap-2 py-3 px-4 border-b border-slate-200">
                <TrendingUp size={14} className="text-slate-400" />
                <span className="text-[13.5px] font-semibold text-slate-800">Enrollments by Course</span>
              </CardHeader>
              <CardContent className="px-4 py-4">
                <p className="text-[12px] text-slate-400 mb-3">Top 6 courses by learner count</p>
                <div className="flex flex-col gap-2.5">
                  {(enrollTop.length ? enrollTop : [
                    { title:"REST API Design",    learners:412 },
                    { title:"Spring Boot",         learners:324 },
                    { title:"Node.js Patterns",    learners:278 },
                    { title:"Microservices",       learners:201 },
                    { title:"Java Fundamentals",   learners:189 },
                    { title:"PostgreSQL",          learners:156 },
                  ]).map((c, i) => {
                    const max = enrollTop.length ? maxEnroll : 412;
                    const pct = Math.round((c.learners / max) * 100);
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[12px] text-slate-500 w-24 truncate flex-shrink-0">{c.title}</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ACCENT, opacity: 0.85 }} />
                        </div>
                        <span className="text-[12px] font-semibold text-slate-700 w-8 text-right flex-shrink-0">{c.learners}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* SEO Health */}
            <Card className="border-slate-200 overflow-hidden">
              <CardHeader className="flex-row items-center justify-between py-3 px-4 border-b border-slate-200">
                <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-800">
                  <Search size={14} className="text-slate-400" /> SEO Health
                </div>
                <button className="text-[12.5px] font-medium text-[#6C1D5F] hover:text-[#4A1E47]">Edit SEO</button>
              </CardHeader>
              <CardContent className="px-4 py-4">
                <div className="flex items-center gap-4 mb-4">
                  {/* Score ring */}
                  <div
                    className="w-[60px] h-[60px] rounded-full flex items-center justify-center flex-col flex-shrink-0"
                    style={{ border: `4px solid ${ACCENT}` }}
                  >
                    <span className="text-[17px] font-bold text-slate-900 leading-none">82</span>
                    <span className="text-[9.5px] text-slate-400">Score</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-800">Good</div>
                    <div className="text-[11.5px] text-slate-400 mt-0.5">A few improvements possible</div>
                    <div className="h-1 w-28 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: "82%", background: ACCENT }} />
                    </div>
                  </div>
                </div>

                <Separator className="mb-3" />

                <div className="flex flex-col divide-y divide-slate-100">
                  {SEO_CHECKS.map((chk) => (
                    <div key={chk.label} className="flex items-center gap-2 py-2 text-[12.5px] text-slate-700">
                      {chk.ok
                        ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                        : <AlertCircle  size={14} className="text-amber-500 flex-shrink-0"  />
                      }
                      {chk.label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>{/* end right col */}
        </div>

      </div>
    </AppLayout>
  );
}

/* ── Course table row ─────────────────────────────────────────────── */
function CourseRow({ row, navigate }) {
  const levelCls = LEVEL_CLS[row.level] || LEVEL_CLS.Intermediate;
  const isPub    = row.status === "Published";

  return (
    <tr className="hover:bg-slate-50/60 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-8 rounded flex-shrink-0 bg-slate-200 overflow-hidden">
            {row.thumbnail && <img src={row.thumbnail} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-slate-800 truncate max-w-[180px]">{row.title}</div>
            <div className="text-[11.5px] text-slate-400 truncate max-w-[180px]">{row.subtitle || row.sub}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge className={`text-[11.5px] font-semibold ${levelCls}`}>{row.level}</Badge>
      </td>
      <td className="px-4 py-3 text-[13px] text-slate-500 whitespace-nowrap">{row.duration || row.dur}</td>
      <td className="px-4 py-3 text-[13px] font-semibold text-slate-800">{row.learners}</td>
      <td className="px-4 py-3">
        <Badge className={`text-[11.5px] font-semibold ${isPub ? "bg-emerald-100 text-emerald-700 border-transparent" : "bg-slate-100 text-slate-500 border-transparent"}`}>
          {row.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-[12px] text-slate-400 whitespace-nowrap">{row.updated}</td>
      <td className="px-4 py-3 pr-4">
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50">
            <BookOpen size={13} className="text-slate-500" />
          </button>
          <button onClick={() => navigate(`/courses/${row.id}/edit`)} className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50">
            <Pencil size={13} className="text-slate-500" />
          </button>
          <button className="w-7 h-7 rounded-md border border-red-100 bg-red-50 flex items-center justify-center hover:bg-red-100">
            <Trash2 size={13} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}

import { useNavigate } from "react-router-dom";
import { Plus, Pencil, TrendingUp } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import useCategoryDetail from "@/features/categories/hooks/useCategoryDetail";
import CategoryDetailHeader from "@/features/categories/components/CategoryDetailHeader";
import CategoryDetailHero from "@/features/categories/components/CategoryDetailHero";
import CategoryDetailStats from "@/features/categories/components/CategoryDetailStats";
import CategoryDetailCourses from "@/features/categories/components/CategoryDetailCourses";
import CategoryDetailSidebar from "@/features/categories/components/CategoryDetailSidebar";
import { Button } from "@/shared/components/ui/button";

const ACCENT = "#6C1D5F";

export default function CategoryDetail() {
  const navigate = useNavigate();

  const {
    id,
    category,
    courses,
    loading,
    error,
    courseSearch,
    setCourseSearch,
    statusFilter,
    setStatusFilter,
    levelFilter,
    setLevelFilter,
    page,
    setPage,
    PER_PAGE,
    filtered,
    totalPages,
    paginated,
    published,
    drafts,
    totalLearners,
    totalModules,
    totalSubModules,
    enrollTop,
    maxEnroll,
  } = useCategoryDetail();

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center py-32 text-slate-400 gap-3">
          <div className="w-8 h-8 rounded-full border-3 border-slate-200 border-t-[#6C1D5F] animate-spin" />
          <span className="text-[13px] font-semibold text-slate-500">Loading curriculum...</span>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center py-24 text-slate-500 text-center gap-4">
          <div className="p-4 bg-red-50 text-red-650 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-md font-bold text-slate-800">Something went wrong</h3>
            <p className="text-xs text-slate-450 max-w-sm">{error}</p>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-[#6C1D5F] text-white hover:bg-[#5A1850] text-xs font-semibold py-2 px-4 rounded-lg cursor-pointer"
          >
            Retry Loading
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (!category) {
    return (
      <AppLayout>
        <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center py-24 text-slate-450 gap-2">
          <div className="text-4xl">🔍</div>
          <div className="text-[14px] font-bold text-slate-700">Category not found</div>
          <p className="text-xs text-slate-400">The requested category could not be resolved or was deleted.</p>
          <Button onClick={() => navigate("/categories")} variant="outline" className="mt-2 text-xs font-medium cursor-pointer">
            Back to Categories
          </Button>
        </div>
      </AppLayout>
    );
  }

  const cat = category;

  // Generate dynamic activities based on related courses
  const activities = courses.map((c, idx) => {
    const types = ["add", "edit", "pub"];
    const icons = [Plus, Pencil, TrendingUp];
    const colors = ["bg-emerald-100 text-emerald-655", "bg-blue-105 text-blue-650", "bg-yellow-105 text-yellow-650"];
    const typeIdx = idx % 3;
    return {
      type: types[typeIdx],
      icon: icons[typeIdx],
      color: colors[typeIdx],
      title: typeIdx === 0 
        ? `New course "${c.title}" added` 
        : typeIdx === 1 
          ? `Course "${c.title}" content updated` 
          : `"${c.title}" published`,
      meta: "By Instructor",
      time: "Recently"
    };
  });

  // Dynamic SEO checks
  const seoChecks = [
    { ok: !!cat.metaTitle, label: cat.metaTitle ? `Meta Title: "${cat.metaTitle}"` : "Meta Title not configured" },
    { ok: !!cat.metaDesc, label: cat.metaDesc ? "Meta Description configured" : "Meta Description not configured" },
    { ok: !!cat.focusKeyword, label: cat.focusKeyword ? `Focus Keyword: "${cat.focusKeyword}"` : "Focus Keyword not configured" },
    { ok: !!cat.image, label: "OG Image configured" },
    { ok: !!cat.slug, label: cat.slug ? `Slug: /categories/${cat.slug}` : "Slug not configured" },
  ];
  const seoScore = Math.round((seoChecks.filter(c => c.ok).length / seoChecks.length) * 100);

  return (
    <AppLayout>
      <div className="max-w-[1300px] mx-auto space-y-4">
        <CategoryDetailHeader cat={cat} id={id} navigate={navigate} />

        <CategoryDetailHero cat={cat} ACCENT={ACCENT} />

        <CategoryDetailStats
          coursesCount={courses.length}
          totalModules={totalModules}
          totalSubModules={totalSubModules}
          published={published}
          drafts={drafts}
        />

        <div className="flex flex-col lg:flex-row gap-4 items-start pt-2">
          <CategoryDetailCourses
            courses={courses}
            courseSearch={courseSearch}
            setCourseSearch={setCourseSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
            page={page}
            setPage={setPage}
            PER_PAGE={PER_PAGE}
            filtered={filtered}
            totalPages={totalPages}
            paginated={paginated}
            activities={activities}
            navigate={navigate}
            loading={loading}
          />

          <CategoryDetailSidebar
            cat={cat}
            ACCENT={ACCENT}
            enrollTop={enrollTop}
            maxEnroll={maxEnroll}
            seoScore={seoScore}
            seoChecks={seoChecks}
          />
        </div>
      </div>
    </AppLayout>
  );
}

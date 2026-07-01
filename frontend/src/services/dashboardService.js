import api from "./api";

const dashboardService = {
  async getDashboardStats() {
    const [categories, courses, modules, subModules, contents] =
      await Promise.all([
        api.get("/categories"),
        api.get("/courses"),
        api.get("/modules"),
        api.get("/submodules"),
        api.get("/contents"),
      ]);

    return {
      categories: categories.data.data?.length || 0,
      courses: courses.data.data?.length || 0,
      modules: modules.data.data?.length || 0,
      subModules: subModules.data.data?.length || 0,
      contents: contents.data.data?.length || 0,
    };
  },

  async getEnrollmentAnalytics(period = "Monthly") {
    const response = await api.get(
      `/dashboard/enrollment-analytics?period=${period}`
    );
    return response.data;
  },
};

export default dashboardService;
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
      categories: categories.data.length,
      courses: courses.data.length,
      modules: modules.data.length,
      subModules: subModules.data.length,
      contents: contents.data.length,
    };
  },
};

export default dashboardService;
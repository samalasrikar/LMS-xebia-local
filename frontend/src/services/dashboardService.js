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
      categories: categories.data.data ? categories.data.data.length : 0,
      courses: courses.data.data ? courses.data.data.length : 0,
      modules: modules.data.data ? modules.data.data.length : 0,
      subModules: subModules.data.data ? subModules.data.data.length : 0,
      contents: contents.data.data ? contents.data.data.length : 0,
    };
  },
};

export default dashboardService;
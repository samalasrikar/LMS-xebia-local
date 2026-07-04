import api from "./api";

const moduleService = {
  getAllModules: async (config) => {
    const response = await api.get("/modules", config);
    return response.data.data;
  },

  createModule: async (moduleData, config) => {
    const response = await api.post("/modules", moduleData, config);
    return response.data.data;
  },

  updateModule: async (id, moduleData, config) => {
    const response = await api.put(`/modules/${id}`, moduleData, config);
    return response.data.data;
  },

  deleteModule: async (id, config) => {
    const response = await api.delete(`/modules/${id}`, config);
    return response.data;
  },
};

export default moduleService;

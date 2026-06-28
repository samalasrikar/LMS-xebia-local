import api from "./api";

const moduleService = {
  getAllModules: async () => {
    const response = await api.get("/modules");
    return response.data.data;
  },

  createModule: async (moduleData) => {
    const response = await api.post("/modules", moduleData);
    return response.data.data;
  },

  updateModule: async (id, moduleData) => {
    const response = await api.put(`/modules/${id}`, moduleData);
    return response.data.data;
  },

  deleteModule: async (id) => {
    const response = await api.delete(`/modules/${id}`);
    return response.data;
  },
};

export default moduleService;

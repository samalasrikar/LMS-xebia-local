import api from "./api";

const subModuleService = {
  getAllSubModules: async () => {
    const response = await api.get("/submodules");
    return response.data.data;
  },

  createSubModule: async (subModuleData) => {
    const response = await api.post("/submodules", subModuleData);
    return response.data.data;
  },

  updateSubModule: async (id, subModuleData) => {
    if (!id || id === "undefined") {
      console.warn("Fetch aborted: Submodule ID is undefined");
      return null;
    }
    const response = await api.put(`/submodules/${id}`, subModuleData);
    return response.data.data;
  },

  deleteSubModule: async (id) => {
    if (!id || id === "undefined") {
      console.warn("Delete aborted: Submodule ID is undefined");
      return null;
    }
    const response = await api.delete(`/submodules/${id}`);
    return response.data;
  },
};

export default subModuleService;

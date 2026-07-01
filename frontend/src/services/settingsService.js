import api from "./api";

const settingsService = {
  getSettings: async () => {
    const response = await api.get("/settings");
    return response.data.data || {};
  },
  updateSettings: async (data) => {
    const response = await api.put("/settings", data);
    return response.data.data;
  },
  getSeoSettings: async () => {
    const response = await api.get("/settings/seo");
    return response.data.data || {};
  },
  updateSeoSettings: async (data) => {
    const response = await api.put("/settings/seo", data);
    return response.data.data;
  },
};

export default settingsService;

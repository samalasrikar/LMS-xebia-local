import api from "./api";

const integrationService = {
  getAll: async () => {
    const response = await api.get("/integrations");
    return response.data.data || [];
  },
  update: async (id, data) => {
    const response = await api.put(`/integrations/${id}`, data);
    return response.data.data;
  },
};

export default integrationService;

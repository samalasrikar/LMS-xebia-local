import api from "./api";

const scheduleService = {
  getAll: async () => {
    const response = await api.get("/schedule");
    return response.data.data || [];
  },
  create: async (data) => {
    const response = await api.post("/schedule", data);
    return response.data.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/schedule/${id}`, data);
    return response.data.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/schedule/${id}`);
    return response.data;
  },
};

export default scheduleService;

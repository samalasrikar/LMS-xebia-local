import api from "./api";

const assessmentService = {
  getAll: async () => {
    const response = await api.get("/assessments");
    return response.data.data || [];
  },
  create: async (data) => {
    const response = await api.post("/assessments", data);
    return response.data.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/assessments/${id}`, data);
    return response.data.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/assessments/${id}`);
    return response.data;
  },
};

export default assessmentService;

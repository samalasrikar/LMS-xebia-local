import api from "./api";

const certificationService = {
  getAll: async () => {
    const response = await api.get("/certifications");
    return response.data.data || [];
  },
  create: async (data) => {
    const response = await api.post("/certifications", data);
    return response.data.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/certifications/${id}`, data);
    return response.data.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/certifications/${id}`);
    return response.data;
  },
};

export default certificationService;

import api from "./api";

const learnerService = {
  getAll: async () => {
    const response = await api.get("/learners");
    return response.data.data || [];
  },
  create: async (data) => {
    const response = await api.post("/learners", data);
    return response.data.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/learners/${id}`, data);
    return response.data.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/learners/${id}`);
    return response.data;
  },
};

export default learnerService;

import api from "./api";

const contentService = {
  getAllContents: async () => {
    const response = await api.get("/contents");
    return response.data.data;
  },

  createContent: async (contentData) => {
    const response = await api.post("/contents", contentData);
    return response.data.data;
  },

  updateContent: async (id, contentData) => {
    const response = await api.put(`/contents/${id}`, contentData);
    return response.data.data;
  },

  deleteContent: async (id) => {
    const response = await api.delete(`/contents/${id}`);
    return response.data;
  },
};

export default contentService;

import api from "./api";

const courseService = {
  getAllCourses: async () => {
    const response = await api.get("/courses");
    return response.data.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post("/courses", courseData);
    return response.data.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data.data;
  },

  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },
};

export default courseService;

import api from "./api";

class AnalyticsService {
  async getDashboardMetrics() {
    try {
      const response = await api.get("/analytics/metrics");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch analytics metrics:", error);
      throw error;
    }
  }

  async getRevenueData(timeRange = 'monthly') {
    try {
      const response = await api.get(`/analytics/revenue?range=${timeRange}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch revenue data:", error);
      throw error;
    }
  }

  async getEnrollmentData(timeRange = 'monthly') {
    try {
      const response = await api.get(`/analytics/enrollments?range=${timeRange}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch enrollment data:", error);
      throw error;
    }
  }
}

export default new AnalyticsService();

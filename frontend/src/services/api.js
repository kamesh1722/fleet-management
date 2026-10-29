import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const dashboardService = {
  getSummary: async () => {
    const response = await apiClient.get('/dashboard/summary');
    return response.data;
  },
  getRecentActivity: async (params = {}) => {
    const response = await apiClient.get('/dashboard/recent-activity', { params });
    return response.data;
  },
  getReminders: async () => {
    const response = await apiClient.get('/dashboard/reminders');
    return response.data;
  },
  getAnalytics: async () => {
    const response = await apiClient.get('/dashboard/analytics');
    return response.data;
  },
};

export const vehicleService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/vehicles', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/vehicles/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/vehicles', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/vehicles/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/vehicles/${id}`);
    return response.data;
  },
};

export const maintenanceService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/maintenance', { params });
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/maintenance', data);
    return response.data;
  },
  updateStatus: async (id, data) => {
    const response = await apiClient.patch(`/maintenance/${id}/status`, data);
    return response.data;
  },
};

export const insuranceService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/insurance', { params });
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/insurance', data);
    return response.data;
  },
};

export const alertService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/alerts', { params });
    return response.data;
  },
  markRead: async (id) => {
    const response = await apiClient.patch(`/alerts/${id}/read`);
    return response.data;
  },
  resolve: async (id) => {
    const response = await apiClient.patch(`/alerts/${id}/resolve`);
    return response.data;
  },
};

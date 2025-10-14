import axios from 'axios';

// API Base URL - Change this to your backend URL
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Projects
  projects: {
    getAll: () => api.get('/projects'),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
    updateProgress: (id, progress) => api.put(`/projects/${id}/progress`, { progress }),
  },

  // Materials
  materials: {
    getAll: (params = {}) => api.get('/materials', { params }),
    getById: (id) => api.get(`/materials/${id}`),
    create: (data) => api.post('/materials', data),
    update: (id, data) => api.put(`/materials/${id}`, data),
    delete: (id) => api.delete(`/materials/${id}`),
    getCategories: () => api.get('/materials/categories/list'),
    updateQuantity: (id, quantity, operation) => 
      api.put(`/materials/${id}/quantity`, { quantity, operation }),
  },

  // Labour
  labour: {
    getAll: (params = {}) => api.get('/labour', { params }),
    getById: (id) => api.get(`/labour/${id}`),
    create: (data) => api.post('/labour', data),
    update: (id, data) => api.put(`/labour/${id}`, data),
    delete: (id) => api.delete(`/labour/${id}`),
    getRoles: () => api.get('/labour/roles/list'),
  },

  // Issues
  issues: {
    getAll: (params = {}) => api.get('/issues', { params }),
    getById: (id) => api.get(`/issues/${id}`),
    create: (data) => api.post('/issues', data),
    update: (id, data) => api.put(`/issues/${id}`, data),
    delete: (id) => api.delete(`/issues/${id}`),
    updateStatus: (id, status) => api.put(`/issues/${id}/status`, { status }),
    getStats: () => api.get('/issues/stats/summary'),
  },

  // Expenses
  expenses: {
    getAll: (params = {}) => api.get('/expenses', { params }),
    getById: (id) => api.get(`/expenses/${id}`),
    create: (data) => api.post('/expenses', data),
    update: (id, data) => api.put(`/expenses/${id}`, data),
    delete: (id) => api.delete(`/expenses/${id}`),
    getCategories: () => api.get('/expenses/categories/list'),
    getStats: (params = {}) => api.get('/expenses/stats/summary', { params }),
  },

  // Dashboard
  dashboard: {
    getStats: () => api.get('/dashboard/stats'),
    getRecentActivity: () => api.get('/dashboard/recent-activity'),
    getProjectHealth: () => api.get('/dashboard/project-health'),
  },

  // Health check
  health: () => api.get('/health'),
};

export default api;

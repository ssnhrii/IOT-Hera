import api from './api';

export const helpService = {
  async submitHelpRequest(requestData) {
    const response = await api.post('/help-requests', requestData);
    return response.data;
  },

  async getHelpRequests(params = {}) {
    const response = await api.get('/help-requests', { params });
    return response.data;
  },

  async getHelpRequestById(id) {
    const response = await api.get(`/help-requests/${id}`);
    return response.data;
  },

  async updateStatus(id, status, note) {
    const response = await api.patch(`/help-requests/${id}/status`, { status, note });
    return response.data;
  },

  async assignRequest(id, petugasId) {
    const response = await api.patch(`/help-requests/${id}/assign`, { petugasId });
    return response.data;
  }
};

export default helpService;

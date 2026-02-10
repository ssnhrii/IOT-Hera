import api from './api';

export const bmkgService = {
  async getDisasters(params = {}) {
    const response = await api.get('/bmkg/disasters', { params });
    return response.data;
  },

  async getDisasterById(id) {
    const response = await api.get(`/bmkg/disasters/${id}`);
    return response.data;
  },

  async syncData() {
    const response = await api.post('/bmkg/sync');
    return response.data;
  }
};

export default bmkgService;

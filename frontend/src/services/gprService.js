import api from './api';

export const gprService = {
  async getScans(params = {}) {
    const response = await api.get('/gpr/scans', { params });
    return response.data;
  },

  async getScanById(scanId) {
    const response = await api.get(`/gpr/scans/${scanId}`);
    return response.data;
  },

  async uploadScan(formData) {
    const response = await api.post('/gpr/scans', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default gprService;

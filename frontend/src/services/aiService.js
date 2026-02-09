import api from './api';

export const aiService = {
  async getAnalysis(scanId) {
    const response = await api.get(`/ai/analysis/${scanId}`);
    return response.data;
  },

  async analyzeGPR(scanId) {
    const response = await api.post('/ai/analyze', { scanId });
    return response.data;
  }
};

export default aiService;

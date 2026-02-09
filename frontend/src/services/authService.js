import api from './api';

export const authService = {
  async login(email, password) {
    console.log('🔐 Attempting login with:', { email, password: '***' });
    console.log('📡 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('✅ Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export default authService;

import axios from 'axios';

console.log('API.JS FILE LOADED');

const API = axios.create({
  baseURL: 'https://webdevelopment-backend-production.up.railway.app/auth',
});

export const authApi = {

  verifyEmail: async (email, code) => {
    const response = await API.post('/verify-email', {
      email,
      code,
    });

    return response.data;
  },
};
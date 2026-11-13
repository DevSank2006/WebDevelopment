
import axios from "axios";

const http = axios.create({
  baseURL: "https://webdevelopment-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically to every request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default http;

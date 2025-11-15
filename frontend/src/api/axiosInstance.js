import axios from 'axios';

// 1️⃣ Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://mern-note-application-weld.vercel.app/', // 👈 change this if your backend URL is different
});

// 2️⃣ Add a request interceptor to include JWT token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // JWT from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3️⃣ Optional: Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle 401 Unauthorized here, e.g., logout user
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

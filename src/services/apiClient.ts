import axios from 'axios';

//INFO: Create an instance of Axios with default settings
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

//INFO: Interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

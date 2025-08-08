import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// add token into header for all new request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// check if token is expired or Invalid.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            const originalRequest = error.config;
            const token = localStorage.getItem('token');

            if (originalRequest.url.includes('/users/token/') && !token) {
                return Promise.reject(error);
            }

            console.log('Token expired or Invalid. Logging out ...')
            localStorage.removeItem('token')
            // window.location.reload()
            // window.location.href = '/login'; // or navigate()
        }
        return Promise.reject(error);
    }    
)

export default api
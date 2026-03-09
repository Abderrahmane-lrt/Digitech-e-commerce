import axios from "axios";

const hostname = window.location.hostname;
export const API_BASE_URL = `http://${hostname}`;
export const STORAGE_URL = `${API_BASE_URL}/storage`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
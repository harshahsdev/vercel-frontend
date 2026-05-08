import axios from "axios";

const API = axios.create({
    baseURL: "https://vercel-backend-l3qs.onrender.com/api",
    withCredentials: true,
    timeout: 60000
});



// Add token to all requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Log responses for debugging
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(
            "API Error:",
            error.response?.status,
            JSON.stringify(error.response?.data)
        );
        return Promise.reject(error);
    }
);

export default API;
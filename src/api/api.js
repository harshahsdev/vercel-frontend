import axios from "axios";

const API = axios.create({
    baseURL: "https://vercel-backend-1-rmav.onrender.com/api/",
    withCredentials: true
});


// Add token to all requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Sending token:", token.substring(0, 20) + "...");
    } else {
        console.log("No token found in localStorage");
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
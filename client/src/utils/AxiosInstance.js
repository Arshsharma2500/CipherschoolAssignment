import axios from 'axios';
import {BASE_URL} from './Constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            console.log("Token found, adding Authorization header:", accessToken); // Debugging line
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.log("No token found."); // Debugging line
        }
        return config;
    },
    (error) => {
        console.error("Error in request interceptor:", error); // Debugging line
        return Promise.reject(error);
    }
);


export default axiosInstance;
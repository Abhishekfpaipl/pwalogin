import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://192.168.1.133:8006/',
});

axiosInstance.interceptors.request.use(
    function(config){
        const token = localStorage.getItem('token');

        if (token) {
           config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.headers.post.Accept = "application/json"
axiosInstance.defaults.headers.post.ContentType = "application/json"

export default axiosInstance
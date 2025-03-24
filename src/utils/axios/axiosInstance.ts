import axios from "axios";

const URL = "https://customer-care-technical-support.onrender.com/"

const axiosInstance = axios.create({
    baseURL: `${URL}`,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        if(token) {
            config.headers.Authorization= `Bearer ${token}`
        }
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default axiosInstance
import axios from "axios";

const URL = "https://customer-care-technical-support.onrender.com/"

const axiosInstance = axios.create({
    baseURL: `${URL}`
})

export default axiosInstance
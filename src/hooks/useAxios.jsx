import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://foods-sharing-server-assign-10.vercel.app",
});

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
    // local instance of firbase functions
    // baseURL: "http://127.0.0.1:5001/clone-6bd15/us-central1/api",
    // Deployed version of amazon server on render.com
    baseURL: "https://amazon-api-deploy-97z4.onrender.com/",
});

export {axiosInstance}
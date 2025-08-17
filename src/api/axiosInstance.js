import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken(true);
            if (idToken) {
                config.headers.Authorization = `Bearer ${idToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;

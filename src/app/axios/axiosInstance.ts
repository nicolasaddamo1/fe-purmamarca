import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: "http://localhost:3000",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // const token = useAuth.getState().user?.token;
  // if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  // }
  // return config;
  return config;
});

export default api;

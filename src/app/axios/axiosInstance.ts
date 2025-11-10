import { useStore } from "@/store/useStore";
import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: backendURL,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

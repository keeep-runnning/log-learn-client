import axios from "axios";

const baseURL = import.meta.env.DEV ? (
  import.meta.env.VITE_WITH_MSW === "true" ? "http://localhost:3000" : "http://localhost:8080"
): "";

const apiClient = axios.create({
  baseURL,
  withCredentials: true
});

export default apiClient;

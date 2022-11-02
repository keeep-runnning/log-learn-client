import axios from "axios";

const baseURL = import.meta.env.DEV ? "http://localhost:8080" : import.meta.env.BASE_URL;

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;

import axios from "axios";

axios.defaults.baseURL = import.meta.env.DEV ? (
  import.meta.env.VITE_WITH_MSW === "true" ? "http://localhost:3000" : "http://localhost:8080"
): "";

axios.defaults.withCredentials = true;

export * from "./users";
export * from "./posts";
export * from "./auth";

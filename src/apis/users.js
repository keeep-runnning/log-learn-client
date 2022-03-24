import axios from "axios";

export async function fetchCurrentUser() {
  const response = await axios.get("/api/currentUser");
  return response.data;
}

export async function login({ email, password }) {
  const response = await axios.post("/api/login", { email, password });
  return response.data;
}

export async function logout() {
  const response = await axios.post("/api/logout");
  return response.data;
}

export async function signUp({ username, email, password }) {
  const response = await axios.post("/api/users", { username, email, password });
  return response.data;
}

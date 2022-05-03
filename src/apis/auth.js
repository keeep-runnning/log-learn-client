import axios from "axios";

export async function fetchCurrentUser() {
  const response = await axios.get("/api/auth/current-user");
  return response.data;
}

export async function login({email, password}) {
  const response = await axios.post("/api/auth/login", {email, password});
  return response.data;
}

export async function logout() {
  const response = await axios.post("/api/auth/logout");
  return response.data;
}

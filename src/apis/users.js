import axios from "axios";

export async function signUp({ username, email, password }) {
  const response = await axios.post("/api/users", { username, email, password });
  return response.data;
}

import axios from "axios";

export async function publishPost({ title, content }) {
  const response = await axios.post("/api/posts", {title, content});
  return response.data;
}

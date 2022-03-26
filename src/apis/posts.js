import axios from "axios";

export async function publishPost({ title, content, urlTitle }) {
  const response = await axios.post("/api/posts", {title, content, urlTitle});
  return response.data;
}

import axios from "axios";

export async function publishPost({ title, content }) {
  const response = await axios.post("/api/posts", {title, content});
  return response.data;
}

export async function fetchPost(postId) {
  const response = await axios.get(`/api/posts/${postId}`);
  return response.data;
}

export async function editPost({ postId, title, content }) {
  const response = await axios.patch(`/api/posts/${postId}`, { title, content });
  return response.data;
}

export async function fetchPostsByAuthorName({ cursor = -1, authorName }) {
  const response = await axios.get(`/api/posts?cursor=${cursor}&authorName=${authorName}`);
  return response.data;
}

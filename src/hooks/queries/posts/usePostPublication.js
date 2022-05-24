import { useMutation } from "react-query";

import apiClient from "../apiClient";

const publishPost = async ({ title, content }) => {
  const response = await apiClient.post("/api/posts", { title, content });
  return response.data;
};

const usePostPublication = () => useMutation(publishPost);

export default usePostPublication;

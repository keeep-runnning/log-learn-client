import { useQuery } from "react-query";

import apiClient from "../apiClient";
import { postKeys } from "./queryKeys";

const fetchPost = async (postId) => {
  const response = await apiClient.get(`/api/posts/${postId}`);
  return response.data;
};

const usePostDetailQuery = (postId) => {
  return useQuery(
    postKeys.detail(postId),
    () => fetchPost(postId),
    {
      retry: (failureCount, error) => {
        if(error.response) {
          return error.response.status !== 404 && failureCount <= 3;
        }
        return failureCount <= 3;
      }
    }
  );
};

export default usePostDetailQuery;

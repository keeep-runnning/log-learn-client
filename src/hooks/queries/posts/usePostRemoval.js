import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { postKeys } from "../queryKeys";

const removePost = async (postId) => {
  const response = await apiClient.delete(`/api/posts/${postId}`);
  return response.data;
};

const usePostRemoval = () => {
  const queryClient = useQueryClient();
  return useMutation(
    post => removePost(post.id),
    {
      onSuccess: (data, { author }) => {
        queryClient.invalidateQueries(postKeys.list(author));
      }
    }
  );
};

export default usePostRemoval;

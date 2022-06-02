import { useMutation, useQueryClient } from "react-query";

import apiClient from "../apiClient";
import { postKeys } from "../queryKeys";

const editPost = async ({ postId, title, content }) => {
  const response = await apiClient.patch(`/api/posts/${postId}`, { title, content });
  return response.data;
};

const usePostEdit = () => {
  const queryClient = useQueryClient();
  return useMutation(editPost, {
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries(postKeys.detail(postId));
    }
  });
};

export default usePostEdit;

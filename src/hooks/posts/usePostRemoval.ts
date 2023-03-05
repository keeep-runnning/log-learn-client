import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostDetail } from "../../types/posts";
import apiClient, { ApiResponseError } from "../../utils/apiClient";
import queryKeys from "../../utils/queryKeys";

type Removed = {
  status: "removed";
};

type NotFound = {
  status: "notFound";
  message: string;
};

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

type Unauthorized = {
  status: "unauthorized";
  message: string;
};

async function removePost(
  id: number
): Promise<Removed | NotFound | Unauthenticated | Unauthorized> {
  try {
    await apiClient.delete(`/posts/${id}`);
    return { status: "removed" };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 401: {
          return {
            status: "unauthenticated",
            message: error.message,
          };
        }
        case 403: {
          return {
            status: "unauthorized",
            message: error.message,
          };
        }
        case 404: {
          return {
            status: "notFound",
            message: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function usePostRemoval(post: PostDetail) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removePost(post.id),
    onSuccess: (result) => {
      if (result.status === "removed") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.detail(post.id),
        });
        queryClient.resetQueries({
          queryKey: queryKeys.posts.list(post.author.name),
        });
      }
    },
  });
}

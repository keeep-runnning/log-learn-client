import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, { ApiFieldError, ApiResponseError } from "./../../utils/apiClient";
import { PostDetail } from "./PostDetail";
import queryKeys from "../../utils/queryKeys";

type EditPostData = {
  id: number;
  title: string;
  content: string;
};

type EditPostResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number;
  authorName: string;
};

type Edited = {
  result: "edited";
  editedPost: PostDetail;
};

type FieldsInvalid = {
  result: "fieldsInvalid";
  fieldError: ApiFieldError[];
};

type Unauthenticated = {
  result: "unauthenticated";
  reason: string;
};

type Unauthorized = {
  result: "unauthorized";
  reason: string;
};

type NotFound = {
  result: "notFound";
  reason: string;
};

async function editPost({
  id,
  title,
  content,
}: EditPostData): Promise<Edited | FieldsInvalid | Unauthenticated | Unauthorized | NotFound> {
  try {
    const { data } = await apiClient.patch<EditPostResponse>(`/posts/${id}`, { title, content });
    const editedPost: PostDetail = {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: new Date(data.createdAt),
      author: {
        id: data.authorId,
        name: data.authorName,
      },
    };

    return {
      result: "edited",
      editedPost,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            result: "fieldsInvalid",
            fieldError: error.fieldErrors,
          };
        }
        case 401: {
          return {
            result: "unauthenticated",
            reason: error.message,
          };
        }
        case 403: {
          return {
            result: "unauthorized",
            reason: error.message,
          };
        }
        case 404: {
          return {
            result: "notFound",
            reason: error.message,
          };
        }
      }
    }

    throw error;
  }
}

export default function usePostEdit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: (editPostResult) => {
      if (editPostResult.result === "edited") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.detail(editPostResult.editedPost.id),
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.list(editPostResult.editedPost.author.name),
        });
      }
    },
  });
}

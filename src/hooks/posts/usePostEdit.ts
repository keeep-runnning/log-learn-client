import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, {
  ApiFieldError,
  ApiResponseError,
} from "./../../utils/apiClient";
import { PostDetail } from "../../types/posts";
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
  status: "edited";
  editedPost: PostDetail;
};

type FieldsInvalid = {
  status: "fieldsInvalid";
  fieldErrors: ApiFieldError[];
};

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

type Unauthorized = {
  status: "unauthorized";
  message: string;
};

type NotFound = {
  status: "notFound";
  message: string;
};

async function editPost({
  id,
  title,
  content,
}: EditPostData): Promise<
  Edited | FieldsInvalid | Unauthenticated | Unauthorized | NotFound
> {
  try {
    const { data } = await apiClient.patch<EditPostResponse>(`/posts/${id}`, {
      title,
      content,
    });
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
      status: "edited",
      editedPost,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            status: "fieldsInvalid",
            fieldErrors: error.fieldErrors,
          };
        }
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

export default function usePostEdit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: (result) => {
      if (result.status === "edited") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.detail(result.editedPost.id),
        });
        queryClient.resetQueries({
          queryKey: queryKeys.posts.list(result.editedPost.author.name),
        });
      }
    },
  });
}

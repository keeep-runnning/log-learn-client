import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient, {
  ApiFieldValidationResult,
  ApiResponseError,
} from "../../lib/apiClient";
import { PostDetail } from "../../types/posts";
import queryKeys from "../../utils/queryKeys";

type PublishPostData = {
  title: string;
  content: string;
};

type PublishPostResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number;
  authorName: string;
};

type Published = {
  status: "published";
  newPost: PostDetail;
};

type Unauthenticated = {
  status: "unauthenticated";
  message: string;
};

type FieldsInvalid = {
  status: "fieldsInvalid";
  fieldValidationResults: ApiFieldValidationResult[];
};

async function publishPost({
  title,
  content,
}: PublishPostData): Promise<Published | FieldsInvalid | Unauthenticated> {
  try {
    const { data } = await apiClient.post<PublishPostResponse>("/posts", {
      title,
      content,
    });
    const newPost: PostDetail = {
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
      status: "published",
      newPost,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            status: "fieldsInvalid",
            fieldValidationResults: error.fieldValidationResults,
          };
        }
        case 401: {
          return {
            status: "unauthenticated",
            message: error.message,
          };
        }
      }
    }

    throw error;
  }
}

export default function usePostPublication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishPost,
    onSuccess: (result) => {
      if (result.status === "published") {
        queryClient.resetQueries({
          queryKey: queryKeys.posts.list(result.newPost.author.name),
        });
      }
    },
  });
}

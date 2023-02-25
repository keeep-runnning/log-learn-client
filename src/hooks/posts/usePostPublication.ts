import { useMutation } from "@tanstack/react-query";

import apiClient, { ApiFieldError, ApiResponseError } from "./../../utils/apiClient";
import { PostDetail } from "./PostDetail";

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
  result: "published";
  newPost: PostDetail;
};

type Unauthenticated = {
  result: "unauthenticated";
  reason: string;
};

type FieldsInvalid = {
  result: "fieldsInvalid";
  fieldError: ApiFieldError[];
};

async function publishPost({
  title,
  content,
}: PublishPostData): Promise<Published | FieldsInvalid | Unauthenticated> {
  try {
    const { data } = await apiClient.post<PublishPostResponse>("/posts", { title, content });
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
      result: "published",
      newPost,
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
      }
    }

    throw error;
  }
}

export default function usePostPublication() {
  return useMutation({
    mutationFn: publishPost,
  });
}

import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../utils/apiClient";

type LoadPostDetailResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number;
  authorName: string;
};

export type PostDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
  };
};

type Loaded = {
  result: "loaded";
  postDetail: PostDetail;
};

type NotFound = {
  result: "notFound";
};

type InvalidId = {
  result: "invalidId";
};

async function loadPostDetail(id: number): Promise<Loaded | NotFound | InvalidId> {
  try {
    const {
      data: { title, content, createdAt, authorId, authorName },
    } = await apiClient.get<LoadPostDetailResponse>(`/posts/${id}`);
    const postDetail: PostDetail = {
      id,
      title,
      content,
      createdAt: new Date(createdAt),
      author: {
        id: authorId,
        name: authorName,
      },
    };
    return {
      result: "loaded",
      postDetail,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            result: "invalidId",
          };
        }
        case 404: {
          return {
            result: "notFound",
          };
        }
      }
    }

    throw error;
  }
}

export default function usePostDetailQuery(id: number) {
  return useQuery({
    queryKey: ["posts", "detail", id],
    queryFn: () => loadPostDetail(id),
  });
}

import { useQuery } from "@tanstack/react-query";

import apiClient, { ApiResponseError } from "../../lib/apiClient";
import queryKeys from "../../utils/queryKeys";
import { PostDetail } from "../../types/posts";

type LoadPostDetailResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number;
  authorName: string;
};

type Loaded = {
  status: "loaded";
  postDetail: PostDetail;
};

type NotFound = {
  status: "notFound";
};

type InvalidId = {
  status: "invalidId";
};

async function loadPostDetail(
  id: number
): Promise<Loaded | NotFound | InvalidId> {
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
      status: "loaded",
      postDetail,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            status: "invalidId",
          };
        }
        case 404: {
          return {
            status: "notFound",
          };
        }
      }
    }
    throw error;
  }
}

export default function usePostDetailQuery(id: number) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => loadPostDetail(id),
  });
}

import { useInfiniteQuery } from "@tanstack/react-query";

import apiClient from "../../utils/apiClient";

type LoadPageOfPostsFilter = {
  authorName: string;
  cursor?: number;
};

type LoadPageOfPostsResponse = {
  posts: {
    id: number;
    title: string;
    createdAt: string;
    authorId: number;
    authorName: string;
  }[];
  nextCursor: number | null;
};

export type Post = {
  id: number;
  title: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
  };
};

type LoadPageOfPostsResult = {
  posts: Post[];
  nextCursor: number | null;
};

async function loadPageOfPosts({
  authorName,
  cursor,
}: LoadPageOfPostsFilter): Promise<LoadPageOfPostsResult> {
  let url = `/posts?authorName=${authorName}`;
  if (cursor) url += `&cursor=${cursor}`;

  const { data } = await apiClient.get<LoadPageOfPostsResponse>(url);

  return {
    ...data,
    posts: data.posts.map(({ id, title, createdAt, authorId, authorName }) => ({
      id,
      title,
      createdAt: new Date(createdAt),
      author: {
        id: authorId,
        name: authorName,
      },
    })),
  };
}

export default function usePostsInfiniteQuery(authorName: string) {
  return useInfiniteQuery({
    queryKey: ["posts", "list", { authorName }],
    queryFn: ({ pageParam }) => loadPageOfPosts({ authorName, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

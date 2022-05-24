import { useInfiniteQuery } from "react-query";

import apiClient from "../apiClient";
import { postKeys } from "./queryKeys";

const fetchPostsByAuthorName = async ({ cursor = "-1", authorName }) => {
  const response = await apiClient.get(`/api/posts?cursor=${cursor}&authorName=${authorName}`);
  return response.data;
};

const usePostsByAuthorInfiniteQuery = (authorName) => {
  return useInfiniteQuery(
    postKeys.list(authorName),
    ({ pageParam: cursor }) => fetchPostsByAuthorName({ cursor, authorName }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined
    }
  );
};

export default usePostsByAuthorInfiniteQuery;

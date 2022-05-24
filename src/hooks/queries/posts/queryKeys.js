export const postKeys = {
  all: ["posts"],
  lists: () => [...postKeys.all, "list"],
  list: (authorName) => [...postKeys.lists(), { authorName }],
  details: () => [...postKeys.all, "detail"],
  detail: (postId) => [...postKeys.details(), postId]
};

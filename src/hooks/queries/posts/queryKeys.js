export const postKeys = {
  all: ["posts"],
  details: () => [...postKeys.all, "detail"],
  detail: (postId) => [...postKeys.details(), postId]
};

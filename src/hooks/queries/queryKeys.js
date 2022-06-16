export const currentUserKey = ["currentUser"];

export const settingsKey = ["settings"];

export const postKeys = {
  all: ["posts"],
  lists: () => [...postKeys.all, "list"],
  list: (authorName) => [...postKeys.lists(), { authorName }],
  details: () => [...postKeys.all, "detail"],
  detail: (postId) => [...postKeys.details(), postId]
};

export const userKeys = {
  all: ["users"],
  details: () => [...userKeys.all, "detail"],
  detail: (username) => [...userKeys.details(), username]
};

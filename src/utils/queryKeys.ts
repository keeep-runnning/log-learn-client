const queryKeys = {
  me: ["me"],
  users: {
    all: ["users"],
    details() {
      return [...this.all, "detail"];
    },
    detail(username: string) {
      return [...this.details(), username];
    },
  },
  posts: {
    all: ["posts"],
    lists() {
      return [...this.all, "list"];
    },
    list(authorName: string) {
      return [...this.lists(), authorName];
    },
    details() {
      return [...this.all, "detail"];
    },
    detail(id: number) {
      return [...this.details(), id];
    },
  },
} as const;

export default queryKeys;

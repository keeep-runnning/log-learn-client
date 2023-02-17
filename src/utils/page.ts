export const pageKeyword = Object.freeze({
  signUp: "sign-up",
  login: "login",
  settings: "settings",
  users: "users",
  posts: "posts",
  new: "new",
  introduction: "introduction",
  password: "password",
});

export const pagePath = Object.freeze({
  getSignUp(): string {
    return `/${pageKeyword.signUp}`;
  },
  getLogin(): string {
    return `/${pageKeyword.login}`;
  },
  getSetting(): string {
    return `/${pageKeyword.settings}`;
  },
  getPasswordSetting(): string {
    return `${this.getSetting()}/${pageKeyword.password}`;
  },
  getUserHome(username: string): string {
    return `/${pageKeyword.users}/${encodeURIComponent(username)}`;
  },
  getUserIntroduction(username: string): string {
    return `${this.getUserHome(username)}/${pageKeyword.introduction}`;
  },
  getPostDetail(postId: number): string {
    return `/${pageKeyword.posts}/${postId}`;
  },
  getPostPublication(): string {
    return `/${pageKeyword.posts}/${pageKeyword.new}`;
  },
});

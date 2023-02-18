export const pageKeyword = Object.freeze({
  signUp: "sign-up",
  login: "login",
  settings: "settings",
  blogs: "blogs",
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
  getBlog(ownerName: string): string {
    return `/${pageKeyword.blogs}/${encodeURIComponent(ownerName)}`;
  },
  getBlogOwnerIntroduction(ownerName: string): string {
    return `${this.getBlog(ownerName)}/${pageKeyword.introduction}`;
  },
  getPostDetail(postId: number): string {
    return `/${pageKeyword.posts}/${postId}`;
  },
  getPostPublication(): string {
    return `/${pageKeyword.posts}/${pageKeyword.new}`;
  },
});

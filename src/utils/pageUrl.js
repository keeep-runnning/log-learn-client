const pageUrl = {
  SIGN_UP: "signup",
  LOGIN: "login",
  SETTINGS: "settings",
  USERS: "users",
  POSTS: "posts",
  getSignUpPageUrl() {
    return `/${this.SIGN_UP}`;
  },
  getLoginPageUrl() {
    return `/${this.LOGIN}`;
  },
  getSettingsPageUrl(tabSearchParam) {
    const queryString = tabSearchParam ? `?tab=${tabSearchParam}` : "";
    return `/${this.SETTINGS}${queryString}`;
  },
  getUserHomePageUrl(usernameParam) {
    return `/${this.USERS}/${usernameParam}`;
  },
  getPostDetailPageUrl(postIdParam) {
    return `/${this.POSTS}/${postIdParam}`;
  },
  getPostPublicationPageUrl() {
    return `/${this.POSTS}/new`;
  }
};

export default pageUrl;

const pageUrl = {
  SIGN_UP: "signup",
  LOGIN: "login",
  SETTINGS: "settings",
  USERS: "users",
  POSTS: "posts",
  NEW: "new",
  INTRODUCTION: "introduction",
  PASSWORD: "password",
  getSignUpPageUrl() {
    return `/${this.SIGN_UP}`;
  },
  getLoginPageUrl() {
    return `/${this.LOGIN}`;
  },
  getSettingsPageUrl(selectedTab = "") {
    if (selectedTab && ![this.INTRODUCTION, this.PASSWORD].includes(selectedTab)) {
      selectedTab = "";
    }

    return selectedTab ? `/${this.SETTINGS}/${selectedTab}` : `/${this.SETTINGS}`;
  },
  getUserHomePageUrl(usernameParam) {
    return `/${this.USERS}/${encodeURIComponent(usernameParam)}`;
  },
  getUserIntroductionPageUrl(usernameParam) {
    return `/${this.USERS}/${encodeURIComponent(usernameParam)}/${this.INTRODUCTION}`;
  },
  getPostDetailPageUrl(postIdParam) {
    return `/${this.POSTS}/${postIdParam}`;
  },
  getPostPublicationPageUrl() {
    return `/${this.POSTS}/${this.NEW}`;
  },
};

export default pageUrl;

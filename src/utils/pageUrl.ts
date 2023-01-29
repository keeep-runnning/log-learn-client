const pageUrl = {
  SIGN_UP: "signup",
  LOGIN: "login",
  SETTINGS: "settings",
  USERS: "users",
  POSTS: "posts",
  NEW: "new",
  INTRODUCTION: "introduction",
  PASSWORD: "password",
  getSignUpPageUrl(): string {
    return `/${this.SIGN_UP}`;
  },
  getLoginPageUrl(): string {
    return `/${this.LOGIN}`;
  },
  getSettingsPageUrl(selectedTab = ""): string {
    if (![this.INTRODUCTION, this.PASSWORD].includes(selectedTab)) {
      selectedTab = "";
    }

    return selectedTab ? `/${this.SETTINGS}/${selectedTab}` : `/${this.SETTINGS}`;
  },
  getUserHomePageUrl(usernameParam: string): string {
    return `/${this.USERS}/${encodeURIComponent(usernameParam)}`;
  },
  getUserIntroductionPageUrl(usernameParam: string): string {
    return `/${this.USERS}/${encodeURIComponent(usernameParam)}/${this.INTRODUCTION}`;
  },
  getPostDetailPageUrl(postIdParam: number): string {
    return `/${this.POSTS}/${postIdParam}`;
  },
  getPostPublicationPageUrl(): string {
    return `/${this.POSTS}/${this.NEW}`;
  },
};

export default pageUrl;

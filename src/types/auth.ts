export type MyProfile = {
  id: number;
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
};

export type LoggedInMe = {
  status: "loggedIn";
  myProfile: MyProfile;
};

export type LoggedOutMe = {
  status: "loggedOut";
};

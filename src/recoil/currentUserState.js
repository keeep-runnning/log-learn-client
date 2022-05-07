import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    isLoggedIn: false,
    username: ""
  }
});

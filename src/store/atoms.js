import { atom } from "recoil";
import { isUserAuthenticated } from "../utils/auth";

export const currentUser = atom({
  key: "currentUser",
  default: isUserAuthenticated()
    ? {
        loggedIn: false,
      }
    : {
        loggedIn: true,
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
        },
      },
});

export const isGithubConnected = atom({
  key: "githubConnection",
  default: true,
});

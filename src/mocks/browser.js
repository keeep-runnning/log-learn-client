import { setupWorker } from "msw";

import usersHandlers from "./handlers/users";
import postsHandlers from "./handlers/posts";
import authHandlers from "./handlers/auth";

export const worker = setupWorker(
  ...usersHandlers,
  ...postsHandlers,
  ...authHandlers
);

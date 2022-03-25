import { setupWorker } from "msw";
import usersHandlers from "./handlers/users";
import postsHandlers from "./handlers/posts"

export const worker = setupWorker(...usersHandlers, ...postsHandlers);

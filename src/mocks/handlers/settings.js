import { rest } from "msw";

import { getLoggedInUsername } from "../utils";
import db from "../model";
import delayedResponse from "../response/delayedResponse";

const handlers = [
  rest.get("/api/settings", (req, res, ctx) => {
    const currentUsername = getLoggedInUsername();
    const { username, email, shortIntroduction, introduction } = db.user.findFirst({
      where: {
        username: {
          equals: currentUsername
        }
      }
    });

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        username,
        email,
        shortIntroduction,
        introduction
      })
    );
  })
];

export default handlers;

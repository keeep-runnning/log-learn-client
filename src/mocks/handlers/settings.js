import { rest } from "msw";

import { getLoggedInUsername, saveLoggedInUsername } from "../utils";
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
  }),
  rest.patch("/api/settings/username", (req, res, ctx) => {
    const { username } = req.body;
    const currentUsername = getLoggedInUsername();
    const updatedUser = db.user.update({
      where: {
        username: {
          equals: currentUsername
        }
      },
      data: { username }
    });
    saveLoggedInUsername(updatedUser);
    return delayedResponse(ctx.status(204));
  })
];

export default handlers;

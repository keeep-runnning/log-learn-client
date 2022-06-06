import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";
import mockSession from "../mockSession";

const handlers = [
  rest.get("/api/settings", (req, res, ctx) => {
    const currentUserId = mockSession.getUserId();
    const { username, email, shortIntroduction, introduction } = db.user.findFirst({
      where: {
        id: {
          equals: currentUserId
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
    const currentUserId = mockSession.getUserId();
    db.user.update({
      where: {
        id: {
          equals: currentUserId
        }
      },
      data: { username }
    });

    return delayedResponse(ctx.status(204));
  })
];

export default handlers;

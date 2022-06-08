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
    const userFoundByUsername = db.user.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    });
    if(userFoundByUsername) {
      return delayedResponse(
        ctx.status(409),
        ctx.json({
          code: "user-001",
          errorMessage: "이미 사용중인 유저이름입니다.",
          errors: []
        })
      );
    }
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

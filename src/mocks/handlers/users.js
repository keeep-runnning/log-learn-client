import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";

const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    const { username, email, password } = req.body;

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

    const userFoundByEmail = db.user.findFirst({
      where: {
        email: {
          equals: email
        }
      }
    });
    if(userFoundByEmail) {
      return delayedResponse(
        ctx.status(409),
        ctx.json({
          code: "user-002",
          errorMessage: "이미 사용중인 이메일입니다.",
          errors: []
        })
      );
    }

    db.user.create({ username, email, password });

    return delayedResponse(ctx.status(200));
  }),
];

export default handlers;

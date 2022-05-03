import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";
import { deleteLoggedInUsername, getLoggedInUsername, saveLoggedInUsername } from "../utils";

const handlers = [
  rest.get("/api/auth/current-user", (req, res, ctx) => {
    const currentUsername = getLoggedInUsername();

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: Boolean(currentUsername),
        username: currentUsername ?? ""
      })
    );
  }),
  rest.post("/api/auth/login", (req, res, ctx) => {
    const { email, password } = req.body;
    const user = db.user.findFirst({
      where: {
        email: {
          equals: email
        },
        password: {
          equals: password
        }
      }
    });
    if(!user) {
      return delayedResponse(
        ctx.status(401),
        ctx.json({
          code: "auth-001",
          errorMessage: "이메일 또는 비밀번호가 유효하지 않습니다.",
          errors: []
        })
      );
    }
    saveLoggedInUsername(user);

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: Boolean(user),
        username: user.username,
      })
    );
  }),
  rest.post("/api/auth/logout", (req, res, ctx) => {
    const currentUsername = getLoggedInUsername();
    if(!currentUsername) {
      return delayedResponse(
        ctx.status(401)
      );
    }

    deleteLoggedInUsername();

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: false
      })
    );
  }),
];

export default handlers;

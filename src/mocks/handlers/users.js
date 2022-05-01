import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";
import { deleteLoggedInUsername, getLoggedInUsername, saveLoggedInUsername } from "../utils";

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
  rest.post("/api/login", (req, res, ctx) => {
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
    if(user) {
      saveLoggedInUsername(user);
    }

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: Boolean(user),
        username: user?.username ?? "",
        message: Boolean(user)? "" : "이메일 또는 비밀번호가 유효하지 않습니다."
      })
    );
  }),
  rest.get("/api/currentUser", (req, res, ctx) => {
    const currentUsername = getLoggedInUsername();

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: Boolean(currentUsername),
        username: currentUsername ?? ""
      })
    );
  }),
  rest.post("/api/logout", (req, res, ctx) => {
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

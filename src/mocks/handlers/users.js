import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";
import { deleteLoggedInUsername, getLoggedInUsername, saveLoggedInUsername } from "../utils";

const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    const { username, email, password } = req.body;
    const createdUser = db.user.create({username, email, password});

    return delayedResponse(
      ctx.status(201),
      ctx.json({ username: createdUser.username })
    );
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

import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";

const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    const { username, email, password } = req.body;
    const createdUser = db.users.create({username, email, password});

    return delayedResponse(
      ctx.status(201),
      ctx.json({ username: createdUser.username })
    );
  }),
  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body;
    const user = db.users.findFirst({
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
      localStorage.setItem("[mockData]currentUsername", user.username);
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
    const currentUsername = localStorage.getItem("[mockData]currentUsername");

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: Boolean(currentUsername),
        username: currentUsername ?? ""
      })
    );
  }),
  rest.post("/api/logout", (req, res, ctx) => {
    const currentUsername = localStorage.getItem("[mockData]currentUsername");
    if(!currentUsername) {
      return delayedResponse(
        ctx.status(401)
      );
    }
    localStorage.removeItem("[mockData]currentUsername");

    return delayedResponse(
      ctx.status(200),
      ctx.json({
        isLoggedIn: false
      })
    );
  }),
];

export default handlers;

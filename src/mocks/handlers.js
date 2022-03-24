import { rest } from "msw";
import { factory, primaryKey } from "@mswjs/data";

const DELAY_TIME_MS = 800;

let id = 0;

const db = factory({
  users: {
    id: primaryKey(() => String(id++)),
    username: String,
    email: String,
    password: String,
  },
  posts: {
    id: primaryKey(() => String(id++)),
    title: String,
    content: String,
    author: String,
    createdAt: String,
  }
});

export const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    const { username, email, password } = req.body;
    const createdUser = db.users.create({username, email, password});

    return res(
      ctx.status(201),
      ctx.delay(DELAY_TIME_MS),
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

    return res(
      ctx.status(200),
      ctx.delay(DELAY_TIME_MS),
      ctx.json({
        isLoggedIn: Boolean(user),
        username: user?.username ?? "",
        message: Boolean(user)? "" : "이메일 또는 비밀번호가 유효하지 않습니다."
      })
    );
  }),
  rest.get("/api/currentUser", (req, res, ctx) => {
     const currentUsername = localStorage.getItem("[mockData]currentUsername");

     return res(
       ctx.status(200),
       ctx.delay(DELAY_TIME_MS),
       ctx.json({
         isLoggedIn: Boolean(currentUsername),
         username: currentUsername ?? ""
       })
     );
  }),
  rest.post("/api/logout", (req, res, ctx) => {
    const currentUsername = localStorage.getItem("[mockData]currentUsername");
    if(!currentUsername) {
      return res(
        ctx.status(401),
        ctx.delay(DELAY_TIME_MS)
      );
    }
    localStorage.removeItem("[mockData]currentUsername");

    return res(
      ctx.status(200),
      ctx.delay(DELAY_TIME_MS),
      ctx.json({
        isLoggedIn: false
      })
    );
  }),
  rest.post("/api/posts", (req, res, ctx) => {
    const currentUsername = localStorage.getItem("[mockData]currentUsername");
    if(!currentUsername) {
      return res(
        ctx.status(401),
        ctx.delay(DELAY_TIME_MS),
        ctx.json({
          code: "common-002",
          errorMessage: "로그인이 필요합니다.",
          errors: []
        })
      );
    }
    const { title, content } = req.body;
    const createdPost = db.posts.create({
      title,
      content,
      author: currentUsername,
      createdAt: new Date().toISOString()
    });

    return res(
      ctx.status(201),
      ctx.delay(DELAY_TIME_MS),
      ctx.json(createdPost)
    );
  })
];

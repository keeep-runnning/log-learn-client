import { rest } from "msw";
import { factory, primaryKey } from "@mswjs/data";

const DELAY_TIME_MS = 800;

let id = 0;

const db = factory({
  user: {
    id: primaryKey(() => String(id++)),
    username: String,
    email: String,
    password: String,
  }
});

export const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    const { username, email, password } = req.body;
    const createdUser = db.user.create({username, email, password});

    return res(
      ctx.status(201),
      ctx.delay(DELAY_TIME_MS),
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

    return res(
      ctx.status(200),
      ctx.delay(DELAY_TIME_MS),
      ctx.json({
        isLoggedIn: Boolean(user),
        username: user?.username ?? "",
        message: Boolean(user)? "" : "이메일 또는 비밀번호가 유효하지 않습니다."
      })
    );
  })
];

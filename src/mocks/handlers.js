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
  })
];

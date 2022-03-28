import { factory, oneOf, primaryKey } from "@mswjs/data";

class IdGenerator {
  constructor() {
    this.id = 0;
  }

  getNextId() {
    return this.id++;
  }
}

const idGenerator = new IdGenerator();

const db = factory({
  user: {
    id: primaryKey(() => String(idGenerator.getNextId())),
    username: String,
    email: String,
    password: String,
  },
  post: {
    id: primaryKey(() => String(idGenerator.getNextId())),
    title: String,
    content: String,
    createdAt: String,
    author: oneOf("user")
  }
});

export default db;

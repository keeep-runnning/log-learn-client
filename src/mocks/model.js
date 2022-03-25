import { factory, primaryKey } from "@mswjs/data";

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
  users: {
    id: primaryKey(() => String(idGenerator.getNextId())),
    username: String,
    email: String,
    password: String,
  },
  posts: {
    id: primaryKey(() => String(idGenerator.getNextId())),
    title: String,
    content: String,
    author: String,
    createdAt: String,
  }
});

export default db;

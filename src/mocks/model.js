import { factory, oneOf, primaryKey } from "@mswjs/data";
import faker from "@faker-js/faker";

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

const mockUserData = [
  { username: "test", email: "test@test.com", password: "12341234!aA" },
  { username: "user", email: "user@user.com", password: "12341234!aA" }
];

mockUserData.forEach(({ username, email, password }) => {
  const author = db.user.create({ username, email, password });
  for(let i = 0; i < 25; i++) {
    db.post.create({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      createdAt: faker.date.between(new Date(2022, 0, 1), new Date()),
      author
    });
  }
});

export default db;

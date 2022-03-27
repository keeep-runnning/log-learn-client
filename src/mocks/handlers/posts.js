import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";

const handlers = [
  rest.post("/api/posts", (req, res, ctx) => {
    const currentUsername = localStorage.getItem("[mockData]currentUsername");
    if(!currentUsername) {
      return delayedResponse(
        ctx.status(401),
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

    return delayedResponse(
      ctx.status(201),
      ctx.json(createdPost)
    );
  }),
  rest.get("/api/posts/:postId", (req, res, ctx) => {
    const { postId } = req.params;
    const postFoundById = db.posts.findFirst({
      where: {
        id: {
          equals: postId
        }
      }
    });
    if(!postFoundById) {
      return delayedResponse(
        ctx.status(404),
        ctx.json({
          code: "post-001",
          errorMessage: "요청한 블로그 포스트를 찾을 수 없습니다.",
          errors: []
        })
      );
    }

    return delayedResponse(
      ctx.status(200),
      ctx.json(postFoundById)
    );
  })
];

export default handlers;

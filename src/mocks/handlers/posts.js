import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";
import { getLoggedInUsername } from "../utils";

const handlers = [
  rest.post("/api/posts", (req, res, ctx) => {
    const currentUsername = getLoggedInUsername();
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

    const author = db.user.findFirst({
      where: {
        username: {
          equals: currentUsername
        }
      }
    });
    const { title, content } = req.body;
    const createdPost = db.post.create({
      title,
      content,
      createdAt: new Date().toISOString(),
      author
    });

    return delayedResponse(
      ctx.status(201),
      ctx.json({
        id: createdPost.id,
        title: createdPost.title,
        content: createdPost.content,
        author: createdPost.author.username,
        createdAt: createdPost.createdAt
      })
    );
  }),
  rest.get("/api/posts/:postId", (req, res, ctx) => {
    const { postId } = req.params;
    const postFoundById = db.post.findFirst({
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
      ctx.json({
        id: postFoundById.id,
        title: postFoundById.title,
        content: postFoundById.content,
        author: postFoundById.author.username,
        createdAt: postFoundById.createdAt
      })
    );
  }),
  rest.patch("/api/posts/:postId", (req, res, ctx) => {
    const currentUsername = getLoggedInUsername();
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

    const { postId } = req.params;
    const postFoundById = db.post.findFirst({
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
          errorMessage: "존재하지 않는 블로그 포스트를 수정할 수 없습니다.",
          errors: []
        })
      );
    }

    const { title, content } = req.body;
    db.post.update({
      where: {
        id: {
          equals: postId
        }
      },
      data: {
        title, content
      }
    });

    return delayedResponse(
      ctx.status(204)
    );
  }),
  rest.get("/api/posts", (req, res, ctx) => {
    const PAGE_SIZE = 10;
    const cursor = req.url.searchParams.get("cursor") ?? "-1";
    const authorName = req.url.searchParams.get("authorName");

    let posts;
    if(authorName) {
      posts = db.post.findMany({
        orderBy: {
          createdAt: "desc"
        },
        where: {
          author: {
            username: {
              equals: authorName
            }
          }
        },
        cursor: cursor === "-1" ? null : cursor,
        take: PAGE_SIZE
      })
    } else {
      posts = db.post.findMany({
        orderBy: {
          createdAt: "desc"
        },
        cursor: cursor === "-1" ? null : cursor,
        take: PAGE_SIZE
      })
    }

    const responseBody = {
      posts: posts.map(post => ({
        id: post.id,
        author: post.author.username,
        title: post.title,
        createdAt: post.createdAt,
        content: post.content
      })),
      nextCursor: posts?.length === PAGE_SIZE ? posts[PAGE_SIZE - 1].id : null
    };

    return delayedResponse(
      ctx.status(200),
      ctx.json(responseBody)
    );
  })
];

export default handlers;

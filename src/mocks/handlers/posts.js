import { rest } from "msw";

import db from "../model";
import delayedResponse from "../response/delayedResponse";
import mockSession from "../mockSession";

const handlers = [
  rest.post("/api/posts", (req, res, ctx) => {
    const currentUserId = mockSession.getUserId();
    const author = db.user.findFirst({
      where: {
        id: {
          equals: currentUserId
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
    const { postId } = req.params;
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
  }),
  rest.delete("/api/posts/:postId", (req, res, ctx) => {
    const { postId } = req.params;
    db.post.delete({
      where: {
        id: {
          equals: postId
        }
      }
    });

    return delayedResponse(
      ctx.status(204)
    );
  })
];

export default handlers;

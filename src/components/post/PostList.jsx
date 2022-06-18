import { Fragment, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useOutletContext } from "react-router-dom";

import PostListItem from "./PostListItem";
import usePostsByAuthorInfiniteQuery from "../../hooks/queries/posts/usePostsByAuthorInfiniteQuery";
import MessageBox from "../common/MessageBox";

const PostList = () => {
  const targetRef = useRef();

  const { userData } = useOutletContext();

  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = usePostsByAuthorInfiniteQuery(userData.username);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const [target] = entries;
      if(target.isIntersecting) {
        if(hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }, {
      rootMargin: "200px 0px"
    });
    io.observe(targetRef.current);
    return () => io.disconnect()
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : isError ? (
        <div>{error.message}</div>
      ) : (data.pages.length === 1 && data.pages[0].posts.length === 0) ? (
        <MessageBox message="작성된 블로그 포스트가 없습니다." />
      ) : (
        <div css={theme => css`
          & > * + * {
            margin-top: ${theme.spacing[8]};
            border-top: ${theme.lineThickness[2]} solid ${theme.lineColor[2]};
            padding-top: ${theme.spacing[8]};
          }
        `}>
          {data.pages.map(page => (
            <Fragment key={page.nextCursor}>
              {page.posts.map(post => (
                <PostListItem key={post.id} postId={post.id} authorName={post.author} preview={post.content}
                              createdAt={post.createdAt} title={post.title} />
              ))}
            </Fragment>
          ))}
        </div>
      )}
      <div ref={targetRef} />
    </>
  );
};

export default PostList;

import { Fragment, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

import PostListItem from "./PostListItem";
import usePostsByAuthorInfiniteQuery from "../../hooks/queries/posts/usePostsByAuthorInfiniteQuery";

const PostList = ({ authorName }) => {
  const targetRef = useRef();

  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = usePostsByAuthorInfiniteQuery(authorName);

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
      {isLoading? <div>loading...</div>
        : isError? <div>{error.message}</div>
        : (
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
          )
      }
      <div ref={targetRef} />
    </>
  );
};

PostList.propTypes = {
  authorName: PropTypes.string.isRequired
};

export default PostList;

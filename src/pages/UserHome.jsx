import { useParams } from "react-router-dom";
import { css } from "@emotion/react";

import PostList from "../components/post/PostList";

const UserHome = () => {
  const { username } = useParams();
  return (
    <main css={theme => css`
      margin: 0 auto;
      max-width: ${theme.bp.md};
    `}>
      <PostList authorName={username} />
    </main>
  );
};

export default UserHome;

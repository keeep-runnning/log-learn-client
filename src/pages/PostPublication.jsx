import { css } from "@emotion/react";

import PostPublicationForm from "../components/PostPublicationForm";

const PostPublication = () => {
  return (
    <section css={theme => css`
      height: 100vh;
      background-color: ${theme.bgColor[2]};      
    `}>
      <PostPublicationForm />
    </section>
  );
};

export default PostPublication;

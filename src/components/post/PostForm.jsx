import { css } from "@emotion/react";
import styled from "@emotion/styled";

const PostForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ theme }) => css`
    padding: ${theme.spacing[4]};
    row-gap: ${theme.spacing[4]};
    ${theme.mq.md} {
      padding: ${theme.spacing[6]};
      row-gap: ${theme.spacing[6]};
    }  
  `}
`;

export default PostForm;

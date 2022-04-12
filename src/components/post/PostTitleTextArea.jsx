import { css } from "@emotion/react";
import styled from "@emotion/styled";

const PostTitleTextArea = styled.textarea`
  resize: none;
  background-color: transparent;
  border: 0;
  outline: 0;
  ${({ theme }) => css`
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    ${theme.textSize["2xl"]};
    &::placeholder {
      color: ${theme.textColor[2]};
    }
  `}
`;

export default PostTitleTextArea;

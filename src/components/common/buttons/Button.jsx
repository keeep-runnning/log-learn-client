import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Button = styled.button`
  ${({ theme }) => css`
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    ${theme.textSize.sm}
    ${theme.borderRound.normal}
  `}
  &:disabled {
    cursor: default;
  }
`;

export default Button;

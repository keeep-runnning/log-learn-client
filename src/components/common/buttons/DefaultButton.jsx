import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Button from "./Button";

const DefaultButton = styled(Button)`
  ${({ theme }) => css`
    color: ${theme.textColor[5]};
    background-color: transparent;
    &:hover {
      background-color: ${theme.bgColor[3]};
    }
    &:disabled {
      background-color: ${theme.bgColor[3]};
    }
  `}
`;

export default DefaultButton;

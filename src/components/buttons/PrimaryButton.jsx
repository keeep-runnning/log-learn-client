import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Button from "./Button";

const PrimaryButton = styled(Button)`
  ${({theme}) => css`
    color: ${theme.textColor[1]};
    background-color: ${theme.primaryColor[3]};
    &:hover {
      background-color: ${theme.primaryColor[4]};
    }
  `}
`;

export default PrimaryButton;

import { css } from "@emotion/react";
import styled from "@emotion/styled";

const UserMenuItem = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing[1]};
    column-gap: ${theme.spacing[4]};
    color: ${theme.textColor[4]};
    ${theme.textSize.base}
    &:hover {
      font-weight: ${theme.textWeight.bold};
      color: ${theme.textColor[5]};
    }
  `}
`;

export default UserMenuItem;

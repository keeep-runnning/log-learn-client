import styled from "@emotion/styled";
import { css } from "@emotion/react";

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({theme}) => css`
    row-gap: ${theme.spacing[2]};
    & label {
      ${theme.textSize.sm}
    }
    & input {
      padding: ${theme.spacing[1]} ${theme.spacing[2]};
      border: ${theme.lineThickness[1]} solid ${theme.lineColor[3]};
      ${theme.textSize.base}
      ${theme.borderRound.normal}
      &::placeholder {
        color: ${theme.textColor[2]};
        ${theme.textSize.base}
      }
      &:focus {
        outline: 0;
        border: ${theme.lineThickness[1]} solid ${theme.primaryColor[3]};
      }
    }
  `}
`;

export default TextInputWrapper;

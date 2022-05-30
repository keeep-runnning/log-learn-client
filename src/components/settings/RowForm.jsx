import styled from "@emotion/styled";
import { css } from "@emotion/react";

const RowForm = styled.form`
  display: flex;
  align-items: flex-start;
  ${({ theme }) => css`
    padding: ${theme.spacing[2]};
    & > label {
      width: 25%;
      color: ${theme.textColor[4]};
      ${theme.textSize.sm}
    }
    & > section {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      row-gap: ${theme.spacing[2]};
      align-items: flex-end;
    }
    & > section > input, textarea {
      width: 100%;
      padding: ${theme.spacing[1]} ${theme.spacing[2]};
      border: ${theme.lineThickness[1]} solid ${theme.lineColor[3]};
      ${theme.textSize.base}
      ${theme.borderRound.normal}
      &:focus {
        outline: 0;
        border: ${theme.lineThickness[1]} solid ${theme.primaryColor[3]};
      }
      &:disabled {
        background-color: ${theme.bgColor[2]};
      }
    }
    & > section > textarea {
      resize: vertical;
    }
  `}
`;

export default RowForm;

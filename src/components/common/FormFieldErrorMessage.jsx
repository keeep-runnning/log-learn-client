import { css } from "@emotion/react";
import styled from "@emotion/styled";

const FormFieldErrorMessage = styled.p`
  ${({theme}) => css`
    color: ${theme.dangerColor[3]};
    padding: ${theme.spacing[1]};
    font-weight: ${theme.textWeight.bold};
    ${theme.textSize.xs}    
  `}
`;

export default FormFieldErrorMessage;

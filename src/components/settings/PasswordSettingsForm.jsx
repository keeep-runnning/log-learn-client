import { css } from "@emotion/react";

import PrimaryButton from "../common/buttons/PrimaryButton";

const PasswordSettingsForm = () => {
  return (
    <form css={theme => css`
      padding: ${theme.spacing[2]};
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      row-gap: ${theme.spacing[6]};
      & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: ${theme.spacing[2]};
        & > label {
          color: ${theme.textColor[4]};
          ${theme.textSize.sm}
        }
        & > input {
          padding: ${theme.spacing[1]} ${theme.spacing[2]};
          border: ${theme.lineThickness[1]} solid ${theme.lineColor[3]};
          ${theme.textSize.base}
          ${theme.borderRound.normal}
          &:focus {
            outline: 0;
            border: ${theme.lineThickness[1]} solid ${theme.primaryColor[3]};
          }
        }
      }
      ${theme.mq.sm} {
        & > div {
          flex-direction: row;
          align-items: center;
          & > label {
            width: 30%;
          }
          & > input {
            flex-grow: 1;
          }
        }
      } 
    `}>
      <div>
        <label htmlFor="password">기존 비밀번호</label>
        <input id="password" type="password" />
      </div>
      <div>
        <label htmlFor="new-password">새 비밀번호</label>
        <input id="new-password" type="password" />
      </div>
      <div>
        <label htmlFor="new-password-check">새 비밀번호 확인</label>
        <input id="new-password-check" type="password" />
      </div>
      <PrimaryButton type="submit">수정하기</PrimaryButton>
    </form>
  );
};

export default PasswordSettingsForm;

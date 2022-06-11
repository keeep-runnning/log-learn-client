import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import PrimaryButton from "../common/buttons/PrimaryButton";
import usePasswordSettings from "../../hooks/queries/settings/usePasswordSettings";
import { passwordCheckValidation, passwordValidation } from "../../utils/formValidation";
import FormFieldErrorMessage from "../common/FormFieldErrorMessage";

const passwordSettingsFormFieldName = Object.freeze({
  PASSWORD: "password",
  NEW_PASSWORD: "newPassword",
  NEW_PASSWORD_CHECK: "newPasswordCheck"
});

const PasswordSettingsForm = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      [passwordSettingsFormFieldName.PASSWORD]: "",
      [passwordSettingsFormFieldName.NEW_PASSWORD]: "",
      [passwordSettingsFormFieldName.NEW_PASSWORD_CHECK]: ""
    },
    mode: "onChange"
  });

  const passwordSettingsMutation = usePasswordSettings();

  const onValid = useCallback(({ password, newPassword }) => {
    passwordSettingsMutation.mutate({ password, newPassword });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      css={theme => css`
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
      `}
    >
      <div>
        <label htmlFor="password">기존 비밀번호</label>
        <input
          id="password"
          type="password"
          {...register(passwordSettingsFormFieldName.PASSWORD, {
            required: passwordValidation.required
          })}
        />
      </div>
      <FormFieldErrorMessage message={errors[passwordSettingsFormFieldName.PASSWORD]?.message} />
      <div>
        <label htmlFor="new-password">새 비밀번호</label>
        <input
          id="new-password"
          type="password"
          {...register(passwordSettingsFormFieldName.NEW_PASSWORD, {
            required: passwordValidation.required,
            minLength: passwordValidation.minLength,
            maxLength: passwordValidation.maxLength,
            pattern: passwordValidation.pattern
          })}
        />
      </div>
      <FormFieldErrorMessage message={errors[passwordSettingsFormFieldName.NEW_PASSWORD]?.message} />
      <div>
        <label htmlFor="new-password-check">새 비밀번호 확인</label>
        <input
          id="new-password-check"
          type="password"
          {...register(passwordSettingsFormFieldName.NEW_PASSWORD_CHECK, {
            required: passwordCheckValidation.required,
            validate: {
              equalsToPassword: passwordCheckValidation.equalsToPassword(
                getValues(passwordSettingsFormFieldName.NEW_PASSWORD)
              )
            }
          })}
        />
      </div>
      <FormFieldErrorMessage message={errors[passwordSettingsFormFieldName.NEW_PASSWORD_CHECK]?.message} />
      <PrimaryButton type="submit" disabled={passwordSettingsMutation.isLoading}>수정하기</PrimaryButton>
    </form>
  );
};

export default PasswordSettingsForm;

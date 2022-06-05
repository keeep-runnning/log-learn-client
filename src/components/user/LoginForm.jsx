import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { css } from "@emotion/react";

import FormFieldErrorMessage from "../common/FormFieldErrorMessage";
import AlertMessage from "../common/AlertMessage";
import TextInputWrapper from "./TextInputWrapper";
import PrimaryButton from "../common/buttons/PrimaryButton";
import useNotifications from "../../hooks/useNotifications";
import useAlertMessage from "../../hooks/useAlertMessage";
import useLogin from "../../hooks/queries/auth/useLogin";

const LoginForm = () => {
  const navigate = useNavigate();

  const { notifySuccess } = useNotifications();

  const { alertMessage, setAlertMessage, removeAlertMessage } = useAlertMessage();

  const loginMutation = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLoginFormSubmit = useCallback(
    handleSubmit(({ email, password }) => {
      loginMutation.mutate({ email, password }, {
        onSuccess: ({ isLoggedIn, username }) => {
          if(!isLoggedIn) return;
          notifySuccess({ content: "로그인 되었습니다." });
          navigate(`/@${username}`);
        },
        onError: error => {
          if(error.response) {
            const { code } = error.response.data;
            if(code === "auth-001") {
              setAlertMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
            }
          }
        }
      });
    }),
    []
  );

  return (
    <form noValidate onSubmit={handleLoginFormSubmit}
          css={theme => css`
            display: flex;
            flex-direction: column;
            row-gap: ${theme.spacing[4]};
          `}
    >
      {alertMessage && <AlertMessage message={alertMessage} onCloseButtonClicked={removeAlertMessage} />}
      <TextInputWrapper>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email"
               {...register("email", {
                 required: "이메일을 입력해주세요."
               })}
        />
        {errors.email && <FormFieldErrorMessage>{errors.email.message}</FormFieldErrorMessage>}
      </TextInputWrapper>
      <TextInputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password"
               {...register("password", {
                 required: "비밀번호를 입력해주세요."
               })}
        />
        {errors.password && <FormFieldErrorMessage>{errors.password.message}</FormFieldErrorMessage>}
      </TextInputWrapper>
      <PrimaryButton disabled={loginMutation.isLoading} type="submit">
        로그인
      </PrimaryButton>
    </form>
  );
};

export default LoginForm;

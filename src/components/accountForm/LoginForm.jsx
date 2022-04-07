import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { css } from "@emotion/react";

import { login } from "../../apis/users";
import FormFieldErrorMessage from "../FormFieldErrorMessage";
import AlertMessage from "../AlertMessage";
import TextInputWrapper from "./TextInputWrapper";
import PrimaryButton from "../buttons/PrimaryButton";

const LoginForm = () => {
  const [alertMessage, setAlertMessage] = useState("");

  const clearAlertMessage = useCallback(() => {
    setAlertMessage("");
  }, []);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const { isLoggedIn, username, message } = data;
      if(!isLoggedIn) {
        setAlertMessage(message);
        return;
      }
      queryClient.invalidateQueries("currentUser");
      navigate(`/@${username}`);
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onLoginFormSubmitted = useCallback(handleSubmit((data) => {
    loginMutation.mutate(data);
  }), []);

  return (
    <form noValidate onSubmit={onLoginFormSubmitted}
          css={theme => css`
            display: flex;
            flex-direction: column;
            row-gap: ${theme.spacing[4]};
          `}
    >
      {alertMessage && <AlertMessage message={alertMessage} onCloseButtonClicked={clearAlertMessage} />}
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

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { css } from "@emotion/react";

import { login } from "../../apis";
import FormFieldErrorMessage from "../common/FormFieldErrorMessage";
import AlertMessage from "../common/AlertMessage";
import TextInputWrapper from "./TextInputWrapper";
import PrimaryButton from "../common/buttons/PrimaryButton";
import useNotifications from "../../hooks/useNotifications";
import { NOTIFICATION_TYPE } from "../../constants/notifications";
import useAlertMessage from "../../hooks/useAlertMessage";

const LoginForm = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { addNotification } = useNotifications();

  const { alertMessage, setAlertMessage, removeAlertMessage } = useAlertMessage();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const { isLoggedIn, username, message } = data;
      if(!isLoggedIn) {
        setAlertMessage(message);
        return;
      }
      queryClient.invalidateQueries("currentUser");
      addNotification({
        type: NOTIFICATION_TYPE.SUCCESS,
        content: "로그인 되었습니다.",
        isAutoClose: true
      });
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

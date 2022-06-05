import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { css } from "@emotion/react";

import FormFieldErrorMessage from "../common/FormFieldErrorMessage";
import PrimaryButton from "../common/buttons/PrimaryButton";
import TextInputWrapper from "./TextInputWrapper";
import AlertMessage from "../common/AlertMessage";
import useAlertMessage from "../../hooks/useAlertMessage";
import useSignUp from "../../hooks/queries/users/useSignUp";
import useNotificationsWithRedirect from "../../hooks/useNotificationsWithRedirect";

const SignUpForm = () => {
  const { redirectThenNotifySuccess } = useNotificationsWithRedirect();
  const { alertMessage, setAlertMessage, removeAlertMessage } = useAlertMessage();
  const signUpMutation = useSignUp();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onValidationSucceeded = useCallback(({ username, email, password }) => {
    signUpMutation.mutate(
      { username, email, password },
      {
        onSuccess: () => {
          redirectThenNotifySuccess({
            to: "/login",
            replace: true,
            content: "계정이 생성되었습니다. 로그인 해주세요."
          });
        },
        onError: (error) => {
          if(error.response) {
            const { code } = error.response.data;
            if(code === "user-001") {
              setAlertMessage("이미 사용중인 유저이름입니다.");
            } else if(code === "user-002") {
              setAlertMessage("이미 사용중인 이메일입니다.");
            }
          }
        }
      }
    );
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit(onValidationSucceeded)}
          css={theme => css`
            display: flex;
            flex-direction: column;
            row-gap: ${theme.spacing[4]};
          `}
    >
      {alertMessage && <AlertMessage message={alertMessage} onCloseButtonClicked={removeAlertMessage} />}
      <TextInputWrapper>
        <label htmlFor="username">유저이름</label>
        <input
          {...register("username", {
            required: "유저이름을 입력해주세요.",
            minLength: {
              value: 2,
              message: "유저이름을 2자 이상 20자 이하로 입력해주세요."
            },
            maxLength: {
              value: 20,
              message: "유저이름을 2자 이상 20자 이하로 입력해주세요."
            },
            pattern: {
              value: /^[ㄱ-ㅎ가-힣\w-]+$/,
              message: "한글/영문 대소문자/숫자/언더바(_)/하이픈(-)만을 이용해 유저이름을 입력해주세요."
            }
          })}
          type="text"
          id="username"
          placeholder="username"
        />
        {errors.username && <FormFieldErrorMessage>{errors.username.message}</FormFieldErrorMessage>}
      </TextInputWrapper>
      <TextInputWrapper>
        <label htmlFor="email">이메일</label>
        <input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: "이메일 형식이 올바르지 않습니다."
            }
          })}
          type="email"
          id="email"
          placeholder="example@example.com"
        />
        {errors.email && <FormFieldErrorMessage>{errors.email.message}</FormFieldErrorMessage>}
      </TextInputWrapper>
      <TextInputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 32자 이하로 입력해주세요."
            },
            maxLength: {
              value: 32,
              message: "비밀번호를 8자 이상 32자 이하로 입력해주세요."
            },
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
              message: "영문 대소문자/숫자/특수문자를 각각 1자 이상 포함해주세요."
            }
          })}
          type="password"
          id="password"
          placeholder="********"
        />
        {errors.password && <FormFieldErrorMessage>{errors.password.message}</FormFieldErrorMessage>}
      </TextInputWrapper>
      <TextInputWrapper>
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          {...register("passwordCheck", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (passwordCheck) =>
              (passwordCheck === getValues("password") || "비밀번호와 비밀번호 확인이 일치하지 않습니다.")
          })}
          type="password"
          id="passwordCheck"
          placeholder="********"
        />
        {errors.passwordCheck && <FormFieldErrorMessage>{errors.passwordCheck.message}</FormFieldErrorMessage>}
      </TextInputWrapper>
      <PrimaryButton disabled={signUpMutation.isLoading} type="submit">
        계정 만들기
      </PrimaryButton>
    </form>
  );
};

export default SignUpForm;

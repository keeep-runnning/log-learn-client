import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import FieldErrorMessage from "./FieldErrorMessage";

const SignUpForm = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onValidationSucceeded = useCallback((data) => {}, []);

  return (
    <section className="w-80 space-y-8">
      <header className="text-center space-y-4">
        <Link to="/" className="text-sm text-gray-400">log learn</Link>
        <h2 className="text-2xl font-bold">계정 만들기</h2>
      </header>
      <form onSubmit={handleSubmit(onValidationSucceeded)} noValidate className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="username" className="text-sm">유저이름</label>
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
            className="form-input"
          />
          {errors.username && <FieldErrorMessage message={errors.username.message} />}
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="email" className="text-sm">이메일</label>
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
            className="form-input"
          />
          {errors.email && <FieldErrorMessage message={errors.email.message} />}
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="password" className="text-sm">비밀번호</label>
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
            className="form-input"
          />
          {errors.password && <FieldErrorMessage message={errors.password.message} />}
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="passwordCheck" className="text-sm">비밀번호 확인</label>
          <input
            {...register("passwordCheck", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: (passwordCheck) =>
                (passwordCheck === getValues("password") || "비밀번호와 비밀번호 확인이 일치하지 않습니다.")
            })}
            type="password"
            id="passwordCheck"
            placeholder="********"
            className="form-input"
          />
          {errors.passwordCheck && <FieldErrorMessage message={errors.passwordCheck.message} />}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-1.5 rounded hover:bg-indigo-700"
        >
          계정 만들기
        </button>
        <div className="text-gray-600 text-sm text-center">
          가입시, log learn 의 <strong className="text-indigo-500">이용약관</strong>에 동의합니다.
        </div>
      </form>
      <div className="text-gray-600 text-sm text-center">
        이미 계정이 있으신가요? <Link to="/login">로그인 하기 ></Link>
      </div>
    </section>
  );
};

export default SignUpForm;

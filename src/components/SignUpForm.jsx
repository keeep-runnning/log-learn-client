import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <section className="w-80 space-y-8">
      <header className="text-center space-y-4">
        <Link to="/" className="text-sm text-gray-400">log learn</Link>
        <h2 className="text-2xl font-bold">계정 만들기</h2>
      </header>
      <form className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="username" className="text-sm">유저이름</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            className="form-input"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="email" className="text-sm">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            className="form-input"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="password" className="text-sm">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="form-input"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="passwordCheck" className="text-sm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordCheck"
            placeholder="******"
            className="form-input"
          />
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

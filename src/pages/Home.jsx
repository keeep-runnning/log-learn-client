import { Link } from "react-router-dom";

import AppKeywords from "../components/AppKeywords";

const Home = () => {
  return (
    <>
      <div className="my-4 md:container md:mx-auto space-y-4 md:space-y-8">
        <AppKeywords />
        <section className="max-w-screen-md mx-4 md:mx-auto rounded p-6 text-center
          bg-indigo-500 md:bg-white text-white md:text-black space-y-4">
          <p className="text-lg">
            쉽고 간단한 블로그 서비스, log learn 을 이용해 학습한 내용을 정리해 보세요
          </p>
          <Link to="/signup"
            className="inline-block p-2 bg-indigo-700 md:bg-white md:text-black
              md:border-2 md:border-indigo-500 rounded hover:scale-105 duration-300"
          >
            시작하기
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;

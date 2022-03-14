import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-20 p-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center gap-x-3">
          <img src="/logo.png" alt="logo" className="w-7" />
          <h1 className="text-xl font-bold">log learn</h1>
        </div>
      </Link>
      <Link to="/login"
        className="bg-indigo-500 text-sm text-white rounded px-2 py-1 md:py-2"
      >
        로그인
      </Link>
    </header>
  );
};

export default Header;

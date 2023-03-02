import { Route, Routes } from "react-router-dom";

import { pageKeyword } from "./utils/page";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Blogs from "./pages/blogs/Blogs";
import Posts from "./pages/posts/Posts";
import Settings from "./pages/settings/Settings";

export default function App() {
  return (
    <GlobalErrorBoundary>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path={pageKeyword.signUp} element={<SignUp />} />
          <Route path={pageKeyword.login} element={<Login />} />
          <Route path={`${pageKeyword.blogs}/:username/*`} element={<Blogs />} />
          <Route path={`${pageKeyword.posts}/*`} element={<Posts />} />
          <Route path={`${pageKeyword.settings}/*`} element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GlobalErrorBoundary>
  );
}

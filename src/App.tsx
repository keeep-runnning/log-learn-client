import { Route, Routes } from "react-router-dom";

import Root from "./pages/Root";
import Index from "./pages/Index";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Blog from "./pages/blog/Blog";
import PostPublication from "./pages/post/PostPublication";
import Post from "./pages/post/Post";
import NotFound from "./pages/NotFound";
import Setting from "./pages/setting/Setting";
import BlogOwnerPostList from "./pages/blog/BlogOwnerPostList";
import BlogOwnerIntroduction from "./pages/blog/BlogOwnerIntroduction";
import MainSetting from "./pages/setting/MainSetting";
import PasswordSetting from "./pages/setting/PasswordSetting";
import AuthChecker from "./pages/AuthChecker";
import { pageKeyword } from "./utils/page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Index />} />
        <Route path={`${pageKeyword.signUp}`} element={<SignUp />} />
        <Route path={`${pageKeyword.login}`} element={<Login />} />
        <Route path={`${pageKeyword.blogs}/:username`} element={<Blog />}>
          <Route index element={<BlogOwnerPostList />} />
          <Route path={`${pageKeyword.introduction}`} element={<BlogOwnerIntroduction />} />
        </Route>
        <Route path={`${pageKeyword.posts}/:postId`} element={<Post />} />
        <Route
          path={`${pageKeyword.settings}`}
          element={
            <AuthChecker>
              <Setting />
            </AuthChecker>
          }
        >
          <Route index element={<MainSetting />} />
          <Route path={`${pageKeyword.password}`} element={<PasswordSetting />} />
        </Route>
      </Route>
      <Route
        path={`/${pageKeyword.posts}/${pageKeyword.new}`}
        element={
          <AuthChecker>
            <PostPublication />
          </AuthChecker>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";

import Root from "./pages/Root";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Setting from "./pages/settings/Setting";
import MainSetting from "./pages/settings/MainSetting";
import PasswordSetting from "./pages/settings/PasswordSetting";
import Blog from "./pages/blogs/Blog";
import BlogOwnerPostList from "./pages/blogs/BlogOwnerPostList";
import BlogOwnerIntroduction from "./pages/blogs/BlogOwnerIntroduction";
import Post from "./pages/posts/Post";
import PostPublication from "./pages/posts/PostPublication";
import NotFound from "./pages/NotFound";
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

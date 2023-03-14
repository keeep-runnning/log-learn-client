import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { pageKeyword } from "./utils/page";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import LazyPageLoadingMessage from "./components/LazyPageLoadingMessage";
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";

const SignUp = lazy(
  () => import(/* webpackChunkName: "sign-up" */ "./pages/SignUp")
);
const Login = lazy(
  () => import(/* webpackChunkName: "login" */ "./pages/Login")
);
const Blogs = lazy(
  () => import(/* webpackChunkName: "blogs" */ "./pages/blogs/Blogs")
);
const Posts = lazy(
  () => import(/* webpackChunkName: "posts" */ "./pages/posts/Posts")
);
const Settings = lazy(
  () => import(/* webpackChunkName: "settings" */ "./pages/settings/Settings")
);

export default function App() {
  return (
    <GlobalErrorBoundary>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route
            path={pageKeyword.signUp}
            element={
              <Suspense fallback={<LazyPageLoadingMessage />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path={pageKeyword.login}
            element={
              <Suspense fallback={<LazyPageLoadingMessage />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path={`${pageKeyword.blogs}/:username/*`}
            element={
              <Suspense fallback={<LazyPageLoadingMessage />}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path={`${pageKeyword.posts}/*`}
            element={
              <Suspense fallback={<LazyPageLoadingMessage />}>
                <Posts />
              </Suspense>
            }
          />
          <Route
            path={`${pageKeyword.settings}/*`}
            element={
              <Suspense fallback={<LazyPageLoadingMessage />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GlobalErrorBoundary>
  );
}

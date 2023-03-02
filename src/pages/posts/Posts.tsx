import { Routes, Route } from "react-router-dom";

import { pageKeyword } from "../../utils/page";
import AuthChecker from "../../components/AuthChecker";
import NotFound from "../NotFound";
import PostDetail from "./PostDetail";
import PostPublication from "./PostPublication";

export default function Posts() {
  return (
    <Routes>
      <Route
        path={pageKeyword.new}
        element={
          <AuthChecker>
            <PostPublication />
          </AuthChecker>
        }
      />
      <Route path=":postId" element={<PostDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

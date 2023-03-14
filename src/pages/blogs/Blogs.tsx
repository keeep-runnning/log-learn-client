import { Routes, Route } from "react-router-dom";

import { pageKeyword } from "../../utils/page";
import NotFound from "../NotFound";
import BlogLayout from "./BlogLayout";
import BlogOwnerIntroduction from "./BlogOwnerIntroduction";
import BlogOwnerPostList from "./BlogOwnerPostList";

export default function Blogs() {
  return (
    <Routes>
      <Route path="/" element={<BlogLayout />}>
        <Route index element={<BlogOwnerPostList />} />
        <Route
          path={pageKeyword.introduction}
          element={<BlogOwnerIntroduction />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import Viewer from "../../components/common/Editor/Viewer";
import EmptyMessage from "../../components/common/EmptyMessage";
import { useBlogOwner } from "./Blog";

export default function BlogOwnerIntroduction() {
  const { blogOwner } = useBlogOwner();

  if (blogOwner.introduction) {
    return <Viewer content={blogOwner.introduction} />;
  }

  return <EmptyMessage message="소개가 작성되지 않았습니다" />;
}

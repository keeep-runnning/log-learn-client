import Viewer from "../../components/common/Editor/Viewer";
import EmptyMessage from "../../components/common/EmptyMessage";
import BaseContainer from "../BaseContainer";
import { useBlogOwner } from "./Blog";

export default function BlogOwnerIntroduction() {
  const { blogOwner } = useBlogOwner();

  if (blogOwner.introduction) {
    return (
      <BaseContainer>
        <Viewer content={blogOwner.introduction} />
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <EmptyMessage message="소개가 작성되지 않았습니다" />
    </BaseContainer>
  );
}

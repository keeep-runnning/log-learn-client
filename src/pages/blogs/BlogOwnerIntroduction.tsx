import Viewer from "../../components/editor/Viewer";
import BaseContainer from "../../components/BaseContainer";
import { useBlogOwner } from "./BlogLayout";

export default function BlogOwnerIntroduction() {
  const { blogOwner } = useBlogOwner();

  return (
    <BaseContainer>
      <Viewer content={blogOwner.introduction} defaultMessage="소개가 작성되지 않았습니다" />
    </BaseContainer>
  );
}

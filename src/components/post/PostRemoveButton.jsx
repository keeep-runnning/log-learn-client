import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import DefaultButton from "../common/buttons/DefaultButton";
import usePostRemoval from "../../hooks/queries/posts/usePostRemoval";
import useNotificationsWithRedirect from "../../hooks/useNotificationsWithRedirect";
import pageUrl from "../../utils/pageUrl";

const PostRemoveButton = ({ post }) => {
  const { redirectThenNotifySuccess } = useNotificationsWithRedirect();
  const postRemoveMutation = usePostRemoval();

  const handlePostRemoveButtonClick = useCallback(() => {
    postRemoveMutation.mutate(post, {
      onSuccess: () => {
        redirectThenNotifySuccess({
          to: pageUrl.getUserHomePageUrl(post.author),
          content: `블로그 포스트[${post.title}]가 삭제되었습니다.`,
          replace: true,
        });
      },
    });
  }, [post]);

  return (
    <DefaultButton disabled={postRemoveMutation.isLoading} onClick={handlePostRemoveButtonClick}>
      삭제
    </DefaultButton>
  );
};

PostRemoveButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(PostRemoveButton);

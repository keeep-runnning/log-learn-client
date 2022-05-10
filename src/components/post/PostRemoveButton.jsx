import { memo, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import DefaultButton from "../common/buttons/DefaultButton";
import { removePost } from "../../apis";
import useNotifications from "../../hooks/useNotifications";
import { NOTIFICATION_TYPE } from "../../constants/notifications";

const PostRemoveButton = ({ post }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { addNotification } = useNotifications();

  const postRemoveMutation = useMutation(postId => removePost(postId), {
    onSuccess: () => {
      addNotification({
        content: `블로그 포스트[${post.title}]가 삭제되었습니다.`,
        type: NOTIFICATION_TYPE.SUCCESS,
        isAutoClose: true
      });
      queryClient.invalidateQueries([post.author, "posts"]);
      navigate(`/@${post.author}`, { replace: true });
    }
  });

  const handlePostRemoveButtonClick = useCallback(() => {
    postRemoveMutation.mutate(post.id);
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
    author: PropTypes.string.isRequired
  }).isRequired
};

export default memo(PostRemoveButton);

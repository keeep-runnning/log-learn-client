import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { Viewer } from "@toast-ui/react-editor";
import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <article className="space-y-8 px-4">
      <header className="space-y-4 py-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="text-sm">
          <span className="font-bold">{post.author}</span>
          &nbsp;
          &middot;
          &nbsp;
          <span className="text-gray-400">{post.createdAt}</span>
        </div>
      </header>
      <section className="py-4">
        <Viewer
          initialValue={post.content}
          usageStatistics={false}
        />
      </section>
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default Post;

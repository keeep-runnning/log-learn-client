import PostList from "../../components/post/PostList";
import BaseContainer from "../BaseContainer";

const dummyPosts = [
  {
    id: 10,
    title: "post title",
    createdAt: new Date(),
    author: {
      id: 20,
      name: "post author",
    },
  },
  {
    id: 11,
    title: "post title 2",
    createdAt: new Date(),
    author: {
      id: 21,
      name: "post author 2",
    },
  },
];

export default function BlogOwnerPostList() {
  return (
    <BaseContainer>
      <PostList posts={dummyPosts} />
    </BaseContainer>
  );
}

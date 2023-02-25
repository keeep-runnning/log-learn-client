export type PostDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
  };
};

export type PostListItem = Omit<PostDetail, "content">;

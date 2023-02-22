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

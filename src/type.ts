export interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  board: {
    id: string;
    title: string;
    createdAt: string;
    creator: {
      id: string;
      nickname: string;
      createdAt: string;
    };
  };
  createdAt: string;
  createdBy: {
    id: string;
    nickname: string;
    createdAt: string;
  };
  images: {
    image: string;
    id: string;
  }[];
}

export interface PostResponse {
  count: number;
  list: Post[];
}

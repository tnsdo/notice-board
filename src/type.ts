export interface User {
  email: string;
  nickname: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

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

export interface Board {
  id: string;
  title: string;
  createdAt: string;
  creator: {
    id: string;
    nickname: string;
    createdAt: string;
  };
}

export interface BoardResponse {
  count: number;
  list: Board[];
}

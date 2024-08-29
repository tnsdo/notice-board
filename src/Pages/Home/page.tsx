import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  nickname: string;
  createdAt: string;
}

interface Board {
  id: string;
  title: string;
  createdAt: string;
  creator: User;
}

interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  board: Board;
  createdAt: string;
  createdBy: User;
}

interface PostResponse {
  count: number;
  list: Post[];
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PostResponse>(
          "https://api.2024.newbies.gistory.me/boards",
        );
        setPosts(response.data.list);
        setLoading(false);
      } catch (err) {
        setError("Error");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>id: {post.createdBy.nickname}</p>
          <p>Title: {post.board.title}</p>
          <p>Body: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Tag: {post.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

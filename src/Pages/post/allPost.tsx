import { useQuery } from "@tanstack/react-query";
import { getPosts } from "src/api/post";
import { PostResponse } from "src/type";

import * as item from "../../styles/post.styled";

function Post() {
  const { data: posts, isLoading } = useQuery<PostResponse>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!posts) return <div>Failed to load posts.</div>;

  return (
    <item.BoardContainer>
      {posts.list.map((post) => (
        <item.BoardItem to={`/post/${post.id}`} key={post.id}>
          <item.BoardTitle>{post.title}</item.BoardTitle>
          <item.BoardBody>{post.body}</item.BoardBody>
          <item.User>{post.createdBy.nickname}</item.User>
        </item.BoardItem>
      ))}
    </item.BoardContainer>
  );
}

export default Post;

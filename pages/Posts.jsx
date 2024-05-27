import { useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState();
  const [loading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    const config = {
      method: "get",
      url: "",
      headers: {
        Authorization: `Bearer`,
      },
    };
  };
  return <div>Posts</div>;
};
export default Posts;

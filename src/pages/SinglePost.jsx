import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import customFetch from "../utils/axios";
import { useSelector } from "react-redux";

const SinglePost = () => {
  const [post, setPost] = useState();
  const [loading, setIsLoading] = useState(true);
  const postId = useLocation().pathname.split("/")[2];
  const token = useSelector((store) => store.user.user.token);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const resp = await customFetch.get(`/drafts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(resp.data.post);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const togglePublish = async () => {
    setIsLoading(true);
    try {
      const resp = await customFetch.patch(
        `/posts/${postId}`,
        { published: !post.published },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPost(resp.data.post);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <div>Loading ...</div>;
  else {
    return (
      <div>
        <div>{post.title}</div>
        <div>{post.author.name}</div>
        <div>{post.content}</div>
        <button onClick={togglePublish}>
          {post.published ? "un publish" : "Publish"}
        </button>
        <div>Comments</div>
        <div>
          {post.comments &&
            post.comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <p>{comment.content}</p>
                  <p>{comment.author}</p>
                </div>
              );
            })}
        </div>

        <div></div>
      </div>
    );
  }
};
export default SinglePost;

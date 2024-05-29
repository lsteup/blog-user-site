import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updatePost } from "../features/posts/postsSlice";
import customFetch from "../utils/axios";

const PostThumb = ({ post }) => {
  const token = useSelector((store) => store.user.user.token);
  const dispatch = useDispatch();
  const { _id: id } = post;
  const [loading, setIsLoading] = useState(false);

  const publishPost = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await customFetch.patch(
        `/posts/${id}`,
        { published: !post.published },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updatePost(resp.data.post));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Link to={`/dashboard/${id}`} className="p-4 border border-black">
      <div className="flex items-center">
        <div className="">
          <p className="font-semibold">{post.title}</p>
          <p className="text-sm text-stone-500">{post.content.slice(0, 100)}</p>
        </div>
        <p>
          {!post.published && <button onClick={publishPost}>publish</button>}
        </p>
      </div>
    </Link>
  );
};
export default PostThumb;

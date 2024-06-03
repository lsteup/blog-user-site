import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updatePost } from "../features/posts/postsSlice";
import customFetch from "../utils/axios";
import { FaRegComment } from "react-icons/fa";

const PostThumb = ({ post }) => {
  const token = useSelector((store) => store.user.user.token);
  const dispatch = useDispatch();
  const { _id: id } = post;
  const [loading, setIsLoading] = useState(false);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(post.createdAt).toLocaleDateString(
    "en-US",
    dateOptions
  );

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
    <Link
      to={`/dashboard/${id}`}
      className="max-w-md sm:max-w-lg md:max-w-4xl md:max-h-48  box-border w-full font-semibold border border-stone-300 text-stone-500 text-xl  "
    >
      <div className="flex flex-col  md:flex-row md:items-center min-h-16 md:gap-4">
        {post.image && <img className="md:max-h-48" src={post.image} alt="" />}
        <div className="p-4">
          <p className="mb-1 text-black font-medium text-base md:text-lg 2xl:text-xl">
            {post.title}
          </p>
          <div className="flex gap-2 items-center text-sm md:text-base 2xl:text-lg font-light">
            <p className="">{post.published ? "Published" : "Draft"}</p>
            <p>•</p>
            <p className=""> {date}</p>
            <p>•</p>
            <div className="flex gap-1 items-center">
              <FaRegComment className="" />
              <p>{post.comments.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PostThumb;

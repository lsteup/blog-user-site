import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updatePost } from "../features/posts/postsSlice";
import customFetch from "../utils/axios";
import { MdModeComment } from "react-icons/md";

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
      className="box-border font-semibold border border-dotted border-stone-400 text-stone-500 text-xl  "
    >
      <div className="flex items-center justify-between min-h-16 p-4 gap-4">
        {post.image && <img className="max-w-20" src={post.image} alt="" />}
        <div className="grow">
          <p className="font-light text-black">{post.title}</p>
          <div className="flex gap-4">
            <p className="font-light text-sm">
              {post.published ? "Published" : "Draft"}
            </p>
            <p className="font-light text-sm"> {date}</p>
          </div>
        </div>
        <p>
          {!post.published && <button onClick={publishPost}>publish</button>}
        </p>
        <div className="flex gap-1 items-center">
          <MdModeComment className="text-cyan-900" />
          <p>{post.comments.length || 0}</p>
        </div>
      </div>
    </Link>
  );
};
export default PostThumb;

import { useState } from "react";
import { Link } from "react-router-dom";

const PostThumb = ({ post }) => {
  console.log(post);
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
      post.published = !post.published;
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

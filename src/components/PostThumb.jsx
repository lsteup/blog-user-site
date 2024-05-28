import { Link } from "react-router-dom";

const PostThumb = ({ post }) => {
  const { _id: id } = post;
  console.log(id);
  return (
    <Link to={`/dashboard/${id}`} className="p-4 border border-black">
      <div className="flex items-center">
        <div className="">
          <p className="font-semibold">{post.title}</p>
          <p className="text-sm text-stone-500">{post.content.slice(0, 100)}</p>
        </div>
        <p>{!post.published && <button>publish</button>}</p>
      </div>
    </Link>
  );
};
export default PostThumb;

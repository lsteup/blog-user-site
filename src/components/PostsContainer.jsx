import { useState } from "react";
import PostThumb from "./PostThumb";
import { useSelector } from "react-redux";

const PostsContainer = () => {
  const userPosts = useSelector((store) => store.user.user.posts);
  const [posts, setPosts] = useState(userPosts);
  const [filter, setFilter] = useState("all");

  const setPublished = () => {
    const published = userPosts.filter((post) => post.published === true);
    setPosts(published);
    setFilter("published");
  };

  const setDrafts = () => {
    const drafts = userPosts.filter((post) => post.published === false);
    setPosts(drafts);
    setFilter("drafts");
  };

  const setAll = () => {
    setPosts(userPosts);
    setFilter("all");
  };

  const filters = [
    ["all", setAll],
    ["published", setPublished],
    ["drafts", setDrafts],
  ];

  return (
    <div className="w-5/6 p-16">
      <div className="flex justify-between">
        <p className="font-bold">My Posts</p>
        <p className="p-2 bg-stone-900 text-stone-100">Go to website</p>
      </div>
      <div className="flex gap-4">
        {filters.map((filterObj) => {
          return (
            <p
              className={filter === filterObj[0] ? "font-bold" : ""}
              key={filterObj[0]}
              onClick={filterObj[1]}
            >
              {filterObj[0]}
            </p>
          );
        })}
        <p>{posts.length} posts</p>
      </div>

      <div className="grid auto-rows-fr gap-6 ">
        <div className="font-semibold border border-dotted border-stone-400 text-stone-500 text-xl content-center text-center">
          Create Post
        </div>

        {posts.map((post) => {
          return <PostThumb post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
};
export default PostsContainer;

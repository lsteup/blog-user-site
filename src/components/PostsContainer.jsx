import { useEffect, useState } from "react";
import PostThumb from "./PostThumb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import customFetch from "../utils/axios";
import { fetchPosts } from "../features/posts/postsSlice";

const PostsContainer = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.user.token);
  const { posts: allPosts, isLoading } = useSelector(
    (store) => store.posts.posts
  );
  const [posts, setPosts] = useState(allPosts);
  const [filter, setFilter] = useState("all");

  const setPublished = () => {
    const published = posts.filter((post) => post.published === true);
    setPosts(published);
    setFilter("published");
  };

  const setDrafts = () => {
    const drafts = posts.filter((post) => post.published === false);
    setPosts(drafts);
    setFilter("drafts");
  };

  const setAll = () => {
    setPosts(allPosts);
    setFilter("all");
  };

  const filters = [
    ["all", setAll],
    ["published", setPublished],
    ["drafts", setDrafts],
  ];

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch]);

  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  console.log(posts);

  if (isLoading) return <div>Loading...</div>;
  else {
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
          <p>{posts?.length || 0} posts</p>
        </div>

        <div className="grid auto-rows-fr gap-6 ">
          <Link
            to="/create"
            className="font-semibold border border-dotted border-stone-400 text-stone-500 text-xl content-center text-center"
          >
            Create Post
          </Link>

          {posts.length &&
            posts.map((post) => {
              return <PostThumb post={post} key={post._id} />;
            })}
        </div>
      </div>
    );
  }
};
export default PostsContainer;

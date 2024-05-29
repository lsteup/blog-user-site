import { useEffect, useState } from "react";
import PostThumb from "./PostThumb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import customFetch from "../utils/axios";

const PostsContainer = () => {
  const token = useSelector((store) => store.user.user.token);
  console.log(token);
  const [posts, setPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState();
  const [filter, setFilter] = useState("all");
  const [loading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const resp = await customFetch("/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(resp.data.posts);
      setFilteredPosts(resp.data.posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const setPublished = () => {
    const published = posts.filter((post) => post.published === true);
    setFilteredPosts(published);
    setFilter("published");
  };

  const setDrafts = () => {
    const drafts = posts.filter((post) => post.published === false);
    setFilteredPosts(drafts);
    setFilter("drafts");
  };

  const setAll = () => {
    setFilteredPosts(posts);
    setFilter("all");
  };

  const filters = [
    ["all", setAll],
    ["published", setPublished],
    ["drafts", setDrafts],
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
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
          <p>{filteredPosts?.length || 0} posts</p>
        </div>

        <div className="grid auto-rows-fr gap-6 ">
          <Link
            to="/create"
            className="font-semibold border border-dotted border-stone-400 text-stone-500 text-xl content-center text-center"
          >
            Create Post
          </Link>

          {filteredPosts &&
            filteredPosts.map((post) => {
              return <PostThumb post={post} key={post._id} />;
            })}
        </div>
      </div>
    );
  }
};
export default PostsContainer;

import { useEffect, useState } from "react";
import PostThumb from "./PostThumb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../features/posts/postsSlice";
import {
  getFilterFromLocalStorage,
  addFilterToLocalStorage,
} from "../utils/localStorage";

const PostsContainer = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.user.token);
  const { posts: allPosts, isLoading } = useSelector((store) => store.posts);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(getFilterFromLocalStorage);

  const applyFilter = (filter, posts) => {
    if (filter === "published") {
      return posts.filter((post) => post.published === true);
    } else if (filter === "drafts") {
      return posts.filter((post) => post.published === false);
    } else {
      return posts;
    }
  };

  const setPublished = () => {
    addFilterToLocalStorage("published");
    setFilter("published");
  };

  const setDrafts = () => {
    addFilterToLocalStorage("drafts");
    setFilter("drafts");
  };

  const setAll = () => {
    addFilterToLocalStorage("all");
    setFilter("all");
  };

  const filters = [
    ["all", setAll, true || false],
    ["published", setPublished, true],
    ["drafts", setDrafts, false],
  ];

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch]);

  useEffect(() => {
    if (allPosts && allPosts.length) {
      setPosts(applyFilter(filter, allPosts));
    }
  }, [allPosts, filter]);

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

          {posts &&
            posts.map((post) => {
              return <PostThumb post={post} key={post._id} />;
            })}
        </div>
      </div>
    );
  }
};
export default PostsContainer;

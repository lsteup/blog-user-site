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
  //const [query, setQuery] = useState("");

  const applyFilter = (filter, posts) => {
    if (filter === "published") {
      return posts.filter((post) => post.published === true);
    } else if (filter === "drafts") {
      return posts.filter((post) => post.published === false);
    } else {
      return posts;
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const query = e.target.value;
    const filtered = applyFilter(filter, allPosts);
    const newPosts = filtered.filter((post) =>
      post.title.toLowerCase().startsWith(query.toLowerCase())
    );
    setPosts(newPosts);
  };

  const handleReset = () => {
    setPosts(applyFilter(filter, allPosts));
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
        <form onReset={handleReset} action="">
          <input
            onChange={(e) => handleChange(e)}
            className="border border-black w-full rounded-lg p-1"
            type="text"
            placeholder="search by title..."
          />
          <button type="reset">clear</button>
        </form>
        <div className="flex gap-4 my-4  py-4 ">
          {filters.map((filterObj) => {
            return (
              <p
                className={
                  filter === filterObj[0]
                    ? "font-bold decoration-cyan-900 underline underline-offset-4 "
                    : "decoration-neutral-300 underline underline-offset-4"
                }
                key={filterObj[0]}
                onClick={filterObj[1]}
              >
                {filterObj[0]}
              </p>
            );
          })}
          <p className="grow text-end">{posts?.length || 0} posts</p>
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

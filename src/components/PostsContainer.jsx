import { useEffect, useState } from "react";
import PostThumb from "./PostThumb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../features/posts/postsSlice";
import {
  getFilterFromLocalStorage,
  addFilterToLocalStorage,
} from "../utils/localStorage";
import userSlice from "../features/user/userSlice";

const PostsContainer = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.user.token);
  const user = useSelector((store) => store.user.user);
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
  }, [dispatch, token, user]);

  useEffect(() => {
    if (allPosts && allPosts.length) {
      setPosts(applyFilter(filter, allPosts));
    } else {
      setPosts([]);
    }
  }, [allPosts, filter, user, token]);

  if (isLoading) return <div>Loading...</div>;
  else {
    return (
      <div className=" p-4 md:p-8 xl:px-16 w-full mt-4 sm:mt-8 max-w-md sm:max-w-lg md:max-w-4xl 2xl:max-w-5xl mx-auto">
        <h1 className="font-medium text-xl sm:text-2xl 2xl:text-4xl 2xl:mb-8">
          Dashboard
        </h1>

        <div className="flex text-sm md:text-base xl:text-lg 2xl:text-xl capitalize gap-4 py-4 ">
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
          <p className="grow text-end text-stone-500">
            {posts?.length || 0} posts
          </p>
        </div>

        <div className=" flex flex-col gap-4 items-center mt-4 sm:mt-8">
          <form
            className="hidden lg:flex mb-4 gap-8 max-w-4xl w-full "
            onReset={handleReset}
            action=""
          >
            <input
              onChange={(e) => handleChange(e)}
              className="border border-black w-full  rounded-lg px-2 py-1 placeholder-stone-500 "
              type="text"
              placeholder="Filter posts ..."
            />
            <button
              className="font-medium text-sm px-2 py-1 border border-black"
              type="reset"
            >
              Clear
            </button>
          </form>
          <Link
            to="/create"
            className="min-h-20 w-full max-w-md sm:max-w-lg md:max-w-4xl font-medium border border-dotted border-stone-400 text-stone-500 text-xl 2xl:text-2xl content-center text-center"
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

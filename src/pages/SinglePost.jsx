import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import customFetch from "../utils/axios";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { Navbar, Sidebar } from "../components";
import { GoReply } from "react-icons/go";

import PostEditBar from "../components/PostEditBar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SinglePost = () => {
  const user = useSelector((store) => store.user.user);
  const name = useSelector((store) => store.user.user.name);
  const [post, setPost] = useState();
  const [loading, setIsLoading] = useState(true);
  const postId = useLocation().pathname.split("/")[2];
  const token = useSelector((store) => store.user.user.token);

  const words = post?.content.split("").length;
  const time = `${Math.ceil(words / 200)} min. read`;
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(post?.createdAt).toLocaleDateString(
    "en-US",
    dateOptions
  );

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const resp = await customFetch.get(`/drafts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(resp.data.post);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePublish = async () => {
    setIsLoading(true);
    try {
      const resp = await customFetch.patch(
        `/posts/${postId}`,
        { published: !post.published },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!post.published) {
        toast.success("Post published");
      }
      setPost(resp.data.post);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <div>Loading ...</div>;
  else {
    return (
      <div className="font-sans">
        <Navbar />

        <div className="flex">
          <Sidebar />
          <div className=" px-4 max-w-3xl 2xl:max-w-4xl mx-auto sm:px-8 mt-4 py-6 text-stone-900">
            <Link to="/dashboard">
              <button className="p-2 border border-black rounded">
                Back to Posts
              </button>
            </Link>
            <div className=" text-3xl lg:text-4xl lg:mt-12 capitalize font-bold mb-8">
              {post.title}
            </div>
            <div className="flex items-center">
              <img className="max-w-10 max-h-10 mr-4" src={user.image} alt="" />
              <div>
                <p>{name}</p>
                <div className="text-stone-400 text-sm flex gap-2">
                  <p>{time}</p>
                  <p>·</p>
                  <p>{date}</p>
                </div>
              </div>
            </div>
            <PostEditBar togglePublish={togglePublish} post={post} />
            <img
              className="mt-12 2xl:my-8 2xl:mt-16 2xl:max-w-3xl max-h-[80vh] max-w-2xl mx-auto"
              src={post.image}
              alt=""
            />
            <pre className="text-wrap font-serif py-8 text-lg max-w-prose mx-auto ">
              {post.content}
            </pre>
            <PostEditBar togglePublish={togglePublish} post={post} />
            <div className="text-xl mt-6 mb-4">
              Responses {`(${post.comments.length})`}
            </div>
            {post.comments.length === 0 && (
              <div>No one has left any comments yet.</div>
            )}
            <div className="divide-y">
              <div></div>
              {post.comments.map((comment) => {
                const commentDate = new Date(
                  comment?.createdAt
                ).toLocaleDateString("en-US", dateOptions);
                return (
                  <div
                    className="text-sm py-4 "
                    key={comment._id}
                    id={comment._id}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-xs sm:text-sm flex gap-1">
                        <p className="text-stone-900 font-medium">
                          {comment.author}
                        </p>
                        <p className="text-stone-500">{commentDate}</p>
                      </div>
                      <div className="flex">
                        <button className=" text-stone-500 p-2 rounded-md flex items-center gap-1 sm:text-sm text-xs">
                          <MdDeleteOutline
                            className="text-red-500"
                            size="1.2em"
                          />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-base">{comment.content}</p>
                  </div>
                );
              })}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default SinglePost;

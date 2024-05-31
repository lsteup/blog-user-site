import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import customFetch from "../utils/axios";
import { useSelector } from "react-redux";
import { Modal, Button, Space } from "antd";
import { Navbar } from "../components";
import { MdModeComment } from "react-icons/md";

const SinglePost = () => {
  const name = useSelector((store) => store.user.user.name);
  const [modal, setModal] = useState(false);
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
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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

      setPost(resp.data.post);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <div>Loading ...</div>;
  else {
    return (
      <div>
        <Navbar />
        <div className="p-16 ">
          <div className="text-4xl capitalize font-semibold mb-8">
            {post.title}
          </div>
          <div className="flex">
            <img
              className="max-w-12 max-h-12 mr-4"
              src={`https://avatar.oxro.io/avatar.svg?name=${name}&length=1&background=083344&rounded=99999&caps=1&color=e5e5e5`}
              alt=""
            />
            <div>
              <p>{name}</p>
              <div className="text-stone-500 text-sm flex gap-2">
                <p>{time}</p>
                <p>{date}</p>
              </div>
            </div>
          </div>
          <div className="my-6 border-t border-b border-stone-400 flex gap-4 items-center p-2">
            <div className="grow flex gap-2 text-stone-500">
              <MdModeComment size="1.5em" />
              <p>{post.comments.length}</p>
            </div>
            <button
              onClick={togglePublish}
              className="border border-stone-500 p-2 rounded-md"
            >
              {post.published ? "Unpublish" : "Publish"}
            </button>
            <button className="border border-stone-500 p-2 rounded-md">
              Edit post
            </button>
          </div>
          <div className="font-serif py-8 text-lg ">{post.content}</div>

          <button
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this post?",
                content: "This action cannot be undone",
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <Button>Set as Private</Button>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
            className="block border border-black "
          >
            delete post
          </button>
          <div>Comments</div>
          <div>
            {post.comments &&
              post.comments.map((comment) => {
                return (
                  <div key={comment._id} id={comment._id}>
                    <p>{comment.content}</p>
                    <p>{comment.author}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
};
export default SinglePost;

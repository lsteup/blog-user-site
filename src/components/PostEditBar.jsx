import { FaRegComment } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { Modal, Button, Space } from "antd";
import { Link } from "react-router-dom";

const PostEditBar = ({ togglePublish, post, deletePost }) => {
  return (
    <div className="text-sm my-6 border-t border-b border-stone-400 flex gap-4 items-center py-1 px-4">
      <div className="grow flex gap-2 text-stone-500 items-center">
        <FaRegComment />
        <p>{post.comments.length}</p>
      </div>

      <Link
        to="edit"
        className=" text-stone-500 p-2 rounded-md flex items-center gap-2 "
      >
        <MdOutlineModeEdit size="1.2em" />
        <p>Edit</p>
      </Link>
      <button
        onClick={togglePublish}
        className="text-stone-500 p-2 rounded-md 
              "
      >
        {post.published ? (
          <div className="flex items-center gap-1 ">
            <p>Set As Private</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 ">
            <BsUpload className="text-green-600" />
            <p>Publish</p>
          </div>
        )}
      </button>
      <button
        onClick={() => {
          Modal.confirm({
            title: "Are you sure you want to delete this post?",
            content: "This action cannot be undone.",
            onOk: deletePost,
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ),
          });
        }}
        className=" text-stone-500 p-2 rounded-md flex items-center gap-2 "
      >
        <MdDeleteOutline className="text-red-500" size="1.2em" />
        <p>Delete</p>
      </button>
    </div>
  );
};
export default PostEditBar;

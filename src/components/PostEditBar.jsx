import { FaRegComment } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { Modal, Button, Space } from "antd";

const PostEditBar = ({ togglePublish, post }) => {
  return (
    <div className="my-6 border-t border-b border-stone-400 flex gap-4 items-center p-2">
      <div className="grow flex gap-2 text-stone-500 items-center">
        <FaRegComment />
        <p>{post.comments.length}</p>
      </div>

      <button className=" text-stone-500 p-2 rounded-md flex items-center gap-2 text-sm">
        <MdOutlineModeEdit size="1.2em" />
        <p>Edit</p>
      </button>
      <button
        onClick={togglePublish}
        className="text-stone-500 p-2 rounded-md 
              text-sm "
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
        className=" text-stone-500 p-2 rounded-md flex items-center gap-2 text-sm"
      >
        <MdDeleteOutline className="text-red-500" size="1.2em" />
        <p>Delete</p>
      </button>
    </div>
  );
};
export default PostEditBar;
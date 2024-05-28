import { useLocation } from "react-router-dom";

const SinglePost = () => {
  const postId = useLocation().pathname.split("/")[2];

  return <div>SinglePost</div>;
};
export default SinglePost;

const Notification = ({ comment }) => {
  return (
    <div className="my-3">
      <p className="font-light text-sm 2xl:text-base">
        <span className="font-medium mr-2">{comment.author}</span> commented on
        your post
      </p>
      <p className="mt-1 underline text-base 2xl:text-lg">
        {comment.post.title}
      </p>
    </div>
  );
};
export default Notification;

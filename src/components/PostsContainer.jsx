const PostsContainer = () => {
  return (
    <div className="w-5/6 p-16">
      <div className="flex justify-between">
        <p>My Posts</p>
        <p>Go to website</p>
      </div>
      <div className="flex justify-between">
        <p>Published</p>
        <p>Drafts</p>
        <p>All</p>
        <p>Total</p>
      </div>

      <div>Create Post</div>
    </div>
  );
};
export default PostsContainer;

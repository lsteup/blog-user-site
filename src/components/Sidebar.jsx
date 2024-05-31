import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import customFetch from "../utils/axios";
import { HashLink as Link } from "react-router-hash-link";

const Sidebar = () => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((store) => store.user.user.id);

  const getActivity = async () => {
    try {
      setIsLoading(true);
      const result = await customFetch.get(`/users/${userId}`);
      const activity = result.data.data.activity;
      setActivity(activity);
      console.log(activity);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  if (isLoading) return <div>Loading ...</div>;
  return (
    <div>
      <h1>recent activity</h1>
      <div>
        {activity.map((comment) => {
          return (
            <Link
              to={`/dashboard/${comment.post._id}/#${comment._id}`}
              className="border border-black"
              key={comment._id}
            >
              <p>{comment.content}</p>
              <p>{comment.author}</p>
              <p>{comment.post.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import customFetch from "../utils/axios";
import { HashLink as Link } from "react-router-hash-link";
import Notification from "./Notification";

const Sidebar = () => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((store) => store.user.user.id);

  const getActivity = async () => {
    try {
      setIsLoading(true);
      const result = await customFetch.get(`/users/${userId}`);
      const activity = result.data.data.activity;
      setActivity(activity.slice(0, 10));
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
    <div className="p-16 px-8 xl:px-12 min-w-60 border-r hidden lg:block max-w-sm">
      <h1 className="text-2xl  capitalize text-stone-500 2xl:text-3xl">
        recent activity
      </h1>

      <div className="py-8 divide-y flex flex-col gap-4  divide-stone-200 divide-dotted ">
        {!activity.length && (
          <p className=" text-stone-800">No activity to show ...</p>
        )}
        <p></p>

        {activity.map((comment) => {
          return (
            <Link
              to={`/dashboard/${comment.post._id}/#${comment._id}`}
              className=""
              key={comment._id}
            >
              <Notification comment={comment} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;

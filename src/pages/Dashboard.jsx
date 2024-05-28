import { Navbar } from "../components";
import PostsContainer from "../components/PostsContainer";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="flex gap-16">
        <Sidebar />
        <PostsContainer />
      </div>
    </div>
  );
};
export default Dashboard;

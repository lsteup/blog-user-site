import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="flex justify-around">
      <p>Logo</p>
      <p>Dashboard</p>
      <p>Visit Website</p>
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Logout
      </button>
    </nav>
  );
};
export default Navbar;

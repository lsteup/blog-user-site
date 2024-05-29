import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import logo from "/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.user.name);

  return (
    <nav className="flex justify-between border-b-4 border-cyan-950 box-border items-center ">
      <img className="max-w-24 max-h-24" src={logo} alt="" />
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
      <img
        className="max-w-12 max-h-12 mr-4"
        src={`https://avatar.oxro.io/avatar.svg?name=${name}&length=1&background=083344&rounded=99999&caps=1&color=e5e5e5`}
        alt=""
      />
    </nav>
  );
};
export default Navbar;

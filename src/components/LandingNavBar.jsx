import { Link } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";

const LandingNavBar = () => {
  return (
    <nav className="bg-stone-50 mb-8 flex w-full text-stone-500 sticky z-10 top-0  justify-between border-b border-stone-150 box-border items-center p-4 sm:p-4 sm:px-6 gap-4 xl:text-lg">
      <div className="flex items-center gap-2">
        <Link to="/">
          <Logo />
        </Link>
        <p className="hidden text-lg text-black font-medium font-sans">
          BlogSpace
        </p>
      </div>
      <a
        href="https://blog-site-three-topaz.vercel.app/"
        className="grow text-right"
      >
        Visit The Blog
      </a>

      <Button link="/register" text="Register" />
    </nav>
  );
};
export default LandingNavBar;

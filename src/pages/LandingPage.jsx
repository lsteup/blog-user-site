import { Button, Logo } from "../components";
import { Link } from "react-router-dom";
import bird from "/bird.png";

const LandingPage = () => {
  return (
    <main className="bg-stone-50 min-h-screen flex flex-col space-between">
      <nav className="bg-stone-50 mb-8 flex w-full text-stone-500 sticky z-10 top-0  justify-between border-b border-stone-150 box-border items-center p-4 sm:p-4 sm:px-6 gap-4 xl:text-lg">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="text-lg text-black font-medium font-sans">BlogSpace</p>
        </div>
        <Link className="grow text-right">Go To Website</Link>

        <Button link="register" text="Register" />
      </nav>
      <div className="md:px-12 px-8 my-8 font-serif flex flex-col md:flex-row md:flex-wrap lg:items-center lg:flex-nowrap lg:flex-row-reverse justify-center grow  gap-8">
        <img
          className="max-w-xs aspect-square object-contain top-0 self-start"
          src={bird}
          alt=""
        />
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl max-w-3xl after:content-['|'] after:animate-ping after:font-light  ">
            Share your story here
          </h1>
          <p className="font-sans text-2xl font-light">
            Where Reading, Writing, and Insight Converge.
          </p>
          <Button link="register" text="Get started" />
        </div>
      </div>
      <div className="border-t border-black text-center py-4">
        copyright lsteup
      </div>
    </main>
  );
};
export default LandingPage;

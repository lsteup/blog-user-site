import { Button, Logo } from "../components";
import { Link } from "react-router-dom";
import bird from "/bird.png";

const LandingPage = () => {
  return (
    <main className="bg-stone-200 h-screen">
      <nav className="px-16 flex items-center border-b border-black gap-4 font-light text-sm">
        <div className="flex items-center">
          <Logo />
          <p className="text-3xl font-bold font-serif">BlogSpace</p>
        </div>
        <Link className="grow text-right">Membership</Link>
        <Link to="register">Sign in</Link>
        <Button link="register" text="Get started" />
      </nav>
      <div className="relative px-16 font-serif flex flex-col justify-center h-full gap-8">
        <h1 className="text-9xl ">Share your story here ...</h1>
        <p className="font-sans text-2xl font-light">
          Where Reading, Writing, and Insight Converge.
        </p>
        <img className="absolute w-1/4 top-0 right-10 " src={bird} alt="" />
        <Button link="register" text="Get started" />
      </div>
    </main>
  );
};
export default LandingPage;

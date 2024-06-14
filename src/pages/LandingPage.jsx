import { Button, Logo } from "../components";
import { Link } from "react-router-dom";
import bird from "/bird.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import LandingNavBar from "../components/LandingNavBar";

const LandingPage = () => {
  return (
    <main className="bg-stone-50 min-h-screen flex flex-col space-between">
      <LandingNavBar />
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
      <div className="flex p-4 bg-stone-50 items-center text-lg justify-center gap-2 mt-6 ">
        <a href="">© lsteup</a>
        <a href="https://github.com/lsteup">
          <FaGithub className="hover:scale-110" size="1.45em" />
        </a>
        <a href="https://www.linkedin.com/in/louisa-steup-6484aa2a8/">
          <FaLinkedin className="hover:scale-110" size="1.45em" />
        </a>
      </div>
    </main>
  );
};
export default LandingPage;

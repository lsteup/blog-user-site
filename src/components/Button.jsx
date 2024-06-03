import { Link } from "react-router-dom";

const Button = ({ link, text }) => {
  return (
    <Link
      className="bg-black rounded-xl p-2 text-neutral-200 text-center max-w-48 text-sm md:text-base font-sans"
      to={link}
    >
      {text}
    </Link>
  );
};
export default Button;

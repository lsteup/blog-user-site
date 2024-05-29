import { Link } from "react-router-dom";

const Button = ({ link, text }) => {
  return (
    <Link
      className="bg-black rounded-xl p-2 text-neutral-200 text-center max-w-48 "
      to={link}
    >
      {text}
    </Link>
  );
};
export default Button;

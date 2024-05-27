import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h3>Page Not Foud</h3>
      <p>We can't seem to find that page.</p>
      <Link to="/">back home</Link>
    </div>
  );
};
export default Error;

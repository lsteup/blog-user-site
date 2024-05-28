import { Logo } from "../components";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main>
      <nav>
        <p>Logo</p>
        <Logo />
      </nav>
      <div>
        <h1>blog</h1>
        <p>description</p>
        <Link to="/register">Login/Register</Link>
      </div>
      <div>Landing Page</div>
    </main>
  );
};
export default LandingPage;

import { useState, useEffect } from "react";
import { Button, FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LandingNavBar from "../components/LandingNavBar";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  bio: "",
  code: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleBio = (e) => {
    const bio = e.target.value;
    setValues({ ...values, bio });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, bio, code } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill out all Fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    } else {
      dispatch(registerUser({ name, email, password, bio, code }));
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <LandingNavBar />
      <div className="flex grow justify-center items-center w-full ">
        <form
          className="w-80 pb-8 mx-auto border-black"
          onSubmit={handleSubmit}
        >
          <h1 className="font-semibold text-2xl text-center mb-8">
            {!values.isMember ? "Create Your Account" : "Log into Blogspace"}
          </h1>
          <div className="">
            <div className="my-4 w-full">
              {!values.isMember && (
                <FormRow
                  type="text"
                  name="name"
                  value={values.name}
                  handleChange={handleChange}
                />
              )}
              <FormRow
                type="email"
                name="email"
                value={values.email}
                handleChange={handleChange}
              />
              <FormRow
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
              />
            </div>
            {!values.isMember && (
              <div className=" w-full">
                <FormRow
                  type="password"
                  name="code"
                  value={values.code}
                  handleChange={handleChange}
                />
                <label
                  className="block uppercase text-xs text-stone-500 my-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className=" p-1 w-full block placeholder:capitalize placeholder-stone-500 text-sm transition-[background] focus:bg-[length:100%_1px] bg-left-bottom bg-gradient-to-r bg-[length:0%_1px] bg-no-repeat from-black to-black duration-300 focus:outline-none border-b border-gray py-2 my-1"
                  onChange={(e) => handleBio(e)}
                  placeholder="please provide a short bio about yourself."
                  name="bio"
                  id="bio"
                  rows="7"
                  minLength="10"
                ></textarea>
                <p className="text-xs text-stone-500 text-center py-6">
                  By creating an account, you agree to our{" "}
                  <span className="underline">Terms of Service</span> and have
                  read and understood the{" "}
                  <span className="underline">Privacy Policy</span>.
                </p>
              </div>
            )}
          </div>
          <button
            className={
              isLoading
                ? "p-2 border  w-full bg-stone-200 uppercase text-sm my-6 cursor-not-allowed"
                : "p-2 border  w-full bg-stone-900 uppercase text-stone-50 my-6 hover:bg-stone-700"
            }
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <p className="text-sm font-light text-center tracking-wider">
            {values.isMember ? "Not a member yet? " : "Already a member? "}
            <button className="underline" type="button" onClick={toggleMember}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
          {values.isMember && (
            <p className="text-xs text-stone-500 text-center py-6">
              Secure Login with reCAPTCHA subject to Google {}
              <span className="underline">Terms</span>
              {}
              {} and {}
              <span className="underline">Privacy</span>.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default Register;

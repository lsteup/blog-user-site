import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill out all Fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="h-screen">
      <Logo />

      <div className="grid place-content-center w-full h-full">
        <form className="w-80  mx-auto border-black" onSubmit={handleSubmit}>
          <h1 className="font-semibold text-2xl text-center mb-8">
            {!values.isMember ? "Create Your Account" : "Log into Blogspace"}
          </h1>
          <div className="my-4">
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
            <p className="text-xs text-stone-500 text-center py-6">
              By creating an account, you agree to our{" "}
              <span className="underline">Terms of Service</span> and have read
              and understood the{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          )}
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

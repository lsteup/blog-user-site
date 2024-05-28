import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";

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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked submit");
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
    console.log(values);
  };

  return (
    <div>
      <Logo />
      <form className="border border-black p-8" onSubmit={handleSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        <div className="flex flex-col gap-4 max-w-sm my-4">
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
        <button
          className="p-2 border border-black"
          disabled={isLoading}
          type="submit"
        >
          Submit
        </button>
        <p className="text-sm font-light">
          {values.isMember ? "Not a member yet? " : "Already a member?"}
          <button className="underline" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};
export default Register;

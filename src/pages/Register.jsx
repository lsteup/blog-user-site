import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

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
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    console.log(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
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
        <button type="submit">Login</button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};
export default Register;

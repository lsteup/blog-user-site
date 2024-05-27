import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        <FormRow />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Register;

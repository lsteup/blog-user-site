import { useState } from "react";
import { useSelector } from "react-redux";
import { FormRow } from "../components";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [loading, setIsLoading] = useState(false);
  const token = useSelector((store) => store.user.user.token);
  const navigate = useNavigate();

  const initialState = {
    title: "",
    content: "",
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(token);
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await customFetch.post(
        "/posts",
        {
          title: values.title,
          content: values.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("post saved");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    console.log(values);
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormRow
          type="text"
          name="title"
          value={values.name}
          handleChange={handleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          onChange={handleChange}
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
        <button
          className={
            loading
              ? "p-2 border  w-full bg-stone-200 uppercase text-sm my-6 cursor-not-allowed"
              : "p-2 border  w-full bg-stone-900 uppercase text-stone-50 my-6 hover:bg-stone-700"
          }
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Save Draft"}
        </button>
      </form>
    </div>
  );
};
export default CreatePost;

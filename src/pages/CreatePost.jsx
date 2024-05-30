import { useState } from "react";
import { useSelector } from "react-redux";
import { FormRow, Navbar } from "../components";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import background from "/background.jpg";

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
      <Navbar />
      <form className="p-16 font-serif" onSubmit={(e) => handleSubmit(e)}>
        <div className="my-6 w-full"></div>
        <input
          className="caret-stone-400 w-full font-light text-4xl block placeholder:capitalize placeholder-stone-400  focus:outline-none  py-2 my-1 "
          placeholder="Title"
          type="text"
          name="title"
          value={values.name}
          onChange={handleChange}
        />

        <textarea
          className="placeholder:text-stone-400 text-xl w-full text-black  focus:outline-none "
          onChange={handleChange}
          name="content"
          id="content"
          cols="30"
          rows="10"
          placeholder="Share your story ..."
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

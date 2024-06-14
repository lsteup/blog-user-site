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
    image: "",
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
      let path;
      if (values.image) {
        const formData = new FormData();
        formData.append("image", values.image);

        try {
          const response = await customFetch.post("/posts/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          path = response.data.image.src;
        } catch (error) {
          toast.error("please add a file that is a photo");
          setIsLoading(false);
          return;
        }
      }

      const resp = await customFetch.post(
        "/posts",
        {
          title: values.title,
          content: values.content,
          image: path,
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
      toast.error(err.response.data.msg);
    }
    setIsLoading(false);
  };

  const handleImgChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
    console.log(values);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <form
        className="pt-4 px-8 font-serif min-h-full    max-w-4xl mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="my-6 w-full"></div>
        <input
          className=" caret-stone-400 w-full font-light text-4xl block placeholder:capitalize placeholder-stone-400  focus:outline-none  py-2 mb-8 "
          placeholder="Title"
          type="text"
          name="title"
          value={values.name}
          onChange={handleChange}
        />

        <textarea
          className="placeholder:text-stone-400 text-xl h-[55vh] grow w-full text-black  focus:outline-none mb-8 "
          onChange={handleChange}
          name="content"
          id="content"
          placeholder="Share your story ..."
        ></textarea>
        <input
          className="file:mr-4"
          type="file"
          onChange={handleImgChange}
        ></input>
        <button
          className={
            loading
              ? "p-2 border  w-full bg-stone-200 uppercase text-sm my-6 cursor-not-allowed mb-8"
              : "p-2 border  w-full bg-stone-900 uppercase text-stone-50 my-6 hover:bg-stone-700 mb-8"
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

import { useEffect, useReducer, useState } from "react";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPost = () => {
  const id = location.pathname.split("/")[2];
  const token = useSelector((store) => store.user.user.token);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const [values, setValues] = useState();
  const [editPhoto, setEditPhoto] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const resp = await customFetch.get(`/drafts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const post = resp.data.post;
      setPost(post);
      setValues({
        title: post.title,
        content: post.content,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleImgChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let path;

      if (values.image && values.image !== "deleted") {
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

      if (values.image === "deleted") {
        path = "";
      }

      const resp = await customFetch.patch(
        `/posts/${id}`,
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
      console.log(err);
      toast.error(err.response.data.msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(values);
  if (isLoading) return <div>Loading...</div>;
  else {
    return (
      <div className="min-h-screen">
        <Navbar />
        <form
          className="pt-4 px-8 font-serif min-h-full max-w-4xl mx-auto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="my-6 w-full"></div>
          <input
            className=" caret-stone-400 w-full font-light text-4xl block placeholder:capitalize placeholder-stone-400  focus:outline-none  py-2 mb-8 "
            placeholder="Title"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />

          <textarea
            className="placeholder:text-stone-400 text-xl h-[55vh] grow w-full text-black  focus:outline-none mb-8 "
            onChange={handleChange}
            name="content"
            id="content"
            placeholder="Share your story ..."
            value={values.content}
          ></textarea>
          {(!editPhoto && (
            <div className="flex gap-4 items-center mb-4">
              <img
                className="object-cover aspect-square max-w-40"
                src={post.image}
                alt=""
              />
              <div>
                <button
                  onClick={() => {
                    setEditPhoto(true);
                  }}
                  className="block border border-black bg-stone-50 p-2 rounded py-1 my-2"
                >
                  {values.image && values.image != "deleted"
                    ? "Change Image"
                    : "Add Image"}
                </button>
              </div>
            </div>
          )) || (
            <div>
              <input
                className="file:mr-4"
                type="file"
                onChange={handleImgChange}
              ></input>
              <button
                className="border rounded border-black px-2 py-1 my-2"
                onClick={() => setEditPhoto(false)}
              >
                Go Back
              </button>
            </div>
          )}

          <button
            className={
              isLoading
                ? "p-2 border  w-full bg-stone-200 uppercase text-sm my-2 cursor-not-allowed "
                : "p-2 border  w-full bg-stone-900 uppercase text-stone-50 my-2 hover:bg-stone-700"
            }
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
          <Link
            to="/dashboard"
            className={
              isLoading
                ? "p-2 block border text-center  w-full bg-stone-200 uppercase text-sm  cursor-not-allowed my-2"
                : "p-2 block text-center border  w-full bg-stone-300 uppercase text-black my-2 hover:bg-stone-700"
            }
          >
            {isLoading ? "Loading..." : "Cancel"}
          </Link>
        </form>
      </div>
    );
  }
};
export default EditPost;

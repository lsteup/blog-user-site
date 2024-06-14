import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../features/user/userSlice";
import logo from "/logo.png";
import { Modal, Form, Input, Button, Avatar } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const img = useSelector((store) => store.user.user.image);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const initialState = { name: false, bio: false, photo: false };
  const [isEditMode, setIsEditMode] = useState(initialState);
  const [values, setValues] = useState({ name: user.name, bio: user.bio });
  const token = useSelector((store) => store.user.user.token);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleChange = (e, val) => {
    let value;
    if (val === "image") {
      value = e.target.files[0];
    } else value = e.target.value;
    setValues({ ...values, [val]: value });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsEditMode(initialState);
    setValues({ name: user.name, bio: user.bio });
    setIsModalVisible(false);
  };

  const toggleEdit = (value) => {
    setIsEditMode({ ...isEditMode, [value]: !isEditMode[value] });
  };

  //const [form] = Form.useForm();

  const onFinish = async () => {
    let path;
    if (values.image) {
      try {
        const formData = new FormData();
        formData.append("image", values.image);
        const response = await customFetch.post("/posts/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        path = response.data.image.src;
      } catch (error) {
        toast.error("Please link a valid document type.");
        return;
      }
    }
    const body = values;
    if (body.image) body.image = path;
    if (body.name && !body.image) {
      body.image = `https://avatar.oxro.io/avatar.svg?name=${body.name}&length=2&caps=1`;
    }

    if (Object.keys(body).length) {
      console.log(body);
      try {
        const resp = await customFetch.patch(
          "/users/profile/edit",
          {
            ...body,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(resp);
        dispatch(updateUser(resp.data.user));
        toast.success("profile updated");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }

    setIsEditMode(initialState);
    setValues({});
    handleOk(); // Close modal after form submission
  };

  return (
    <nav className="bg-white flex w-full text-stone-500 sticky top-0  justify-between border-b border-stone-150 box-border items-center p-2 sm:p-4 gap-8 xl:text-lg  ">
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className=""
      >
        <div className="flex gap-4 flex-col ">
          <h1 className="font-semibold text-2xl">Profile</h1>
          <div className="flex flex-col gap-2 border justify-center items-center p-8">
            {(!isEditMode.image && (
              <div className="max-w-20">
                <img
                  className="rounded-full overflow-hidden"
                  src={user.image}
                  alt=""
                />
              </div>
            )) || (
              <input
                onChange={(e) => handleChange(e, "image")}
                type="file"
              ></input>
            )}
            <button className="font-medium" onClick={() => toggleEdit("image")}>
              EDIT
            </button>
          </div>

          <div>
            <h2 className="my-2 text-stone-500 uppercase text-xs font-medium">
              Profile Info
            </h2>
            <div className="flex justify-between text-base items-center">
              <p className="font-medium ">Name</p>
              <input
                placeholder={user.name}
                value={values.name}
                onChange={(e) => handleChange(e, "name")}
                type="text"
                className="p-2 focus:border-b focus:border-0 focus:ouline-none focus:ring-0"
              ></input>
            </div>
            <div className="my-4 ">
              <p className="font-medium text-base mb-2 ">Bio</p>
              <textarea
                className="w-full max-h-[11rem] text-sm "
                value={values.bio}
                placeholder={user.bio}
                onChange={(e) => handleChange(e, "bio")}
              ></textarea>

              <button
                type="submit"
                onClick={onFinish}
                className="block  bg-green-600 text-white rounded my-2 w-full p-2 text-sm"
              >
                Save Changes
              </button>

              <button
                type="submit"
                onClick={handleCancel}
                className="block my-2 border rounded border-black bg-stone-200 w-full p-2 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                className="block border rounded  border-black w-full p-2 text-sm"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Link className="" to="/dashboard">
        {" "}
        <img className="max-h-10 2xl:max-h-16  ml-2" src={logo} alt="" />
      </Link>

      <a
        href="https://blog-site-three-topaz.vercel.app/"
        className="hidden md:block md:border-s-black grow"
      >
        Visit The Blog
      </a>

      <Link
        to="/create"
        className="hidden md:flex items-center font-normal text-sm md:text-base gap-2 hover:text-stone-800 xl:text-lg"
      >
        <HiOutlinePencilSquare />
        <p>Write</p>
      </Link>

      <img
        onClick={showModal}
        className="rounded-full overflow-hidden max-w-8 sm:max-w-10 2xl:max-w-12 mr-4 cursor-pointer"
        src={img}
        alt=""
      />
    </nav>
  );
};
export default Navbar;

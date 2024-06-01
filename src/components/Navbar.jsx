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
  const [values, setValues] = useState({});
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
    setValues({});
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
        toast.error("something went wrong. Try again in a few moments.");
      }
    }
    const body = values;
    if (body.image) body.image = path;
    if (body.name && !body.image) {
      body.image = `https://avatar.oxro.io/avatar.svg?name=${body.name}&length=2&caps=1`;
    }

    if (Object.keys(body).length) {
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
        toast.error("something went wrong");
      }
    }

    setIsEditMode(initialState);
    setValues({});
    handleOk(); // Close modal after form submission
  };

  return (
    <nav className="flex text-stone-500  justify-between border-b border-stone-150 box-border items-center p-2 gap-8">
      <Modal
        title="Profile"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex gap-4">
          <div className="">
            {(!isEditMode.image && (
              <div className="max-w-20">
                <img src={user.image} alt="" />
              </div>
            )) || (
              <input
                onChange={(e) => handleChange(e, "image")}
                type="file"
              ></input>
            )}
            <button onClick={() => toggleEdit("image")}>change photo</button>
          </div>

          <div>
            <div className="flex gap-4">
              <div>
                {(!isEditMode.name && user.name) || (
                  <input
                    placeholder={user.name}
                    value={user.name}
                    onChange={(e) => handleChange(e, "name")}
                    type="text"
                  ></input>
                )}
              </div>
              <p onClick={() => toggleEdit("name")}>
                {isEditMode.name ? "cancel" : "edit"}
              </p>
            </div>
            <div>
              <div className="flex gap-4">
                <div>
                  {(!isEditMode.bio && user.bio) || (
                    <input
                      placeholder={user.bio}
                      value={user.bio}
                      onChange={(e) => handleChange(e, "bio")}
                      type="text"
                    ></input>
                  )}
                </div>
                <p onClick={() => toggleEdit("bio")}>
                  {isEditMode.bio ? "cancel" : "edit"}
                </p>
              </div>
              <button
                type="submit"
                onClick={onFinish}
                className="block border border-black"
              >
                submit
              </button>
              <button
                type="button"
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
        <img className="max-h-10  mx-4" src={logo} alt="" />
      </Link>
      <Link className="grow">Visit Website</Link>

      <Link className="flex items-center font-normal text-sm gap-2 hover:text-stone-800">
        <HiOutlinePencilSquare />
        <p>Write</p>
      </Link>

      <img
        onClick={showModal}
        className="max-w-8 max-h-10 mr-4 cursor-pointer"
        src={img}
        alt=""
      />
    </nav>
  );
};
export default Navbar;

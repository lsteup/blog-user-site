import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import logo from "/logo.png";
import { Modal, Form, Input, Button, Avatar } from "antd";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const img = useSelector((store) => store.user.user.image);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const initialState = { name: false, bio: false, photo: false };
  const [isEditMode, setIsEditMode] = useState(initialState);
  const [values, setValues] = useState({});

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

  const onFinish = () => {
    setIsEditMode(initialState);
    console.log("Form Values:", values);
    handleOk(); // Close modal after form submission
  };

  return (
    <nav className="flex justify-between border-b-4 border-cyan-950 box-border items-center ">
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
                    placeholder="Name"
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
            </div>
          </div>
        </div>
      </Modal>
      <img className="max-w-24 max-h-24" src={logo} alt="" />
      <p>Dashboard</p>
      <p>Visit Website</p>
      <button
        type="button"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Logout
      </button>
      <img
        onClick={showModal}
        className="max-w-12 max-h-12 mr-4"
        src={img}
        alt=""
      />
    </nav>
  );
};
export default Navbar;

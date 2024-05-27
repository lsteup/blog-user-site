import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import NewPost from "../pages/NewPost.jsx";
import Posts from "../pages/Posts.jsx";
import SinglePost from "../pages/SinglePost.jsx";
import Auth from "../pages/Auth.jsx";

const router = createBrowserRouter([
  { path: "/register", element: <Auth /> },
  { path: "/login", element: <Auth /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/published", element: <Posts /> },
      { path: "/published/:postId", element: <SinglePost /> },
      { path: "/drafts", element: <Posts /> },
      { path: "/drafts:/draftId", element: <SinglePost /> },
      { path: "/new", element: <NewPost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

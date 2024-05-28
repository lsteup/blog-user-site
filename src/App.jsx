import { useState, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LandingPage,
  Error,
  Dashboard,
  Register,
  ProtectedRoute,
} from "./pages";
import SinglePost from "./pages/SinglePost";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="dashboard/:id"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

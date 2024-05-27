import { useState, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LandingPage, Error, Dashboard, Register } from "./pages";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

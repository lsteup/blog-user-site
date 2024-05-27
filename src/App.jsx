import { useState, useContext, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function App() {
  return (
    <AppContext.Provider value={{ hello: "hello" }}>
      <p>hello</p>
      <Outlet />
    </AppContext.Provider>
  );
}

export default App;

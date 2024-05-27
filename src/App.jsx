import { useState, useContext, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function App() {
  return (
    <AppContext.Provider value={{ hello: "hello" }}>
      <p>hello</p>
    </AppContext.Provider>
  );
}

export default App;

import React, { useContext, useState } from "react";

type propsTypes = {
  children: React.ReactNode;
};

type mainContextType = {
  isActive: boolean;
  toggleActive: () => void;
};
const token = localStorage.getItem("token");

export const MainContext = React.createContext<mainContextType>({
  isActive: token ? true : false,
  toggleActive: () => {},
});

const MainContextProvider = (props: propsTypes) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const [isActive, setIsActive] = useState(() => (token ? true : false));
  const toggleActive = () => {
    setIsActive((prevValue) => !prevValue);
  };
  return (
    <MainContext.Provider value={{ isActive, toggleActive }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

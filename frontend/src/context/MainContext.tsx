import React, { useContext, useState } from "react";

type propsTypes = {
  children: React.ReactNode;
};

type mainContextType = {
  isActive: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MainContext = React.createContext<mainContextType>({
  isActive: true,
});

const MainContextProvider = (props: propsTypes) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <MainContext.Provider value={{ isActive, setIsActive }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

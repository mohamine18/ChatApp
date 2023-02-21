import React, { useContext, useState, useEffect } from "react";

type propsTypes = {
  children: React.ReactNode;
};

type mainContextType = {
  isLoggedIn: boolean;
  user: null;
  login: (token: string, fetchedUser: any) => void;
  logout: () => void;
};

export const MainContext = React.createContext<mainContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const MainContextProvider = (props: propsTypes) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    console.log(storedUser);

    if (storedUser && storedUser.isLoggedIn) {
      setIsLoggedIn(true);
      setUser(storedUser.user);
    }
    setIsLoaded(true);
  }, []);

  const login = (token: string, fetchedUser: any) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUser(fetchedUser);
    localStorage.setItem(
      "user",
      JSON.stringify({ isLoggedIn: true, user: fetchedUser })
    );
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <MainContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {isLoaded && props.children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

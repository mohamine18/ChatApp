import React, { useContext, useState, useEffect } from "react";

type propsTypes = {
  children: React.ReactNode;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
};

type mainContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, fetchedUser: any) => void;
  logout: () => void;
  token: string | null;
};

export const MainContext = React.createContext<mainContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  token: "",
});

const MainContextProvider = (props: propsTypes) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (storedUser && storedUser.isLoggedIn && token) {
      setIsLoggedIn(true);
      setUser(storedUser.user);
      setToken(token);
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
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setToken("");
  };

  return (
    <MainContext.Provider value={{ isLoggedIn, login, logout, user, token }}>
      {isLoaded && props.children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

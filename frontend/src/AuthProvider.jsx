import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [id, setId] = useState(localStorage.getItem("userid") || "");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userName = localStorage.getItem("username");
    const userId = localStorage.getItem("userid");

    setIsAuthenticated(!!token); // Sync localStorage values with state
    setUsername(userName || "");
    setId(userId || "");
  }, []);

  const register = (token, userName, Id) => {
    console.log("Signing up...");
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", userName);
    localStorage.setItem("userid", Id);
    setIsAuthenticated(true);
    setUsername(userName);
    setId(Id);
  };

  const login = (token, userName, Id) => {
    console.log("Logging in...");
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", userName);
    localStorage.setItem("userid", Id);
    setIsAuthenticated(true);
    setUsername(userName);
    setId(Id);
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUsername("");
    setId("");
    // enqueueSnackbar("You are logged out", { variant: "success" });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, id, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

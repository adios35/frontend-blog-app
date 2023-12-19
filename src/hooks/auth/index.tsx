import React, { createContext, useState, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { LoginType, RegisterType } from "../../types/auth";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  user: string;
};

type JwtPayloads = JwtPayload & User;

type ApiContextType = {
  accessToken: string | null;
  user: User;
  login: (
    formData: LoginType,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  registerUser: (
    formData: RegisterType,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  refreshToken: () => void;
  setAccessToken: (token: string | null) => void;
  setUser: (userData: User) => void;
  setExpire: (expire: number | undefined) => void;
  logout: () => Promise<void>;
};
const ApiContext = createContext<ApiContextType | undefined>(undefined);

const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(
    { user: "", id: "" } || JSON.parse(localStorage.getItem("user")!)
  );
  const [expire, setExpire] = useState<number | undefined>();

  const API = axios.create({
    baseURL: "http://localhost:3000/v1/auth",
  });

  // Your API interceptors and refreshToken function can remain the same

  const login = async (
    formData: LoginType,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Your login logic here
    try {
      const response = await API.post("/login", formData);
      if (response.status === 200) {
        const decoded: JwtPayloads = await jwtDecode(response.data.accessToken);
        setUser({ user: decoded.user, id: decoded.id });
        setExpire(decoded.exp);
        setError("");
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");

        // window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error.response);
      setError(error?.response?.data.message);
    }
  };

  const registerUser = async (
    formData: RegisterType,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Your registration logic here
    try {
      const response = await API.post("/register", formData);
      if (response.status === 200) {
        // const decoded: JwtPayloads = await jwtDecode(response.data.accessToken);
        // setUser({ user: decoded.user, id: decoded.id });
        // setExpire(decoded.exp);
        // setError("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Login error:", error.response);
      setError(error?.response?.data.message);
    }
  };
  async function getPost() {
    try {
      const res = await API.get("/user");
      if (res.status == 200) {
        console.log(res);
      }
    } catch (error) {
      console.log("theres an error: ", error);
    }
  }

  const refreshToken = async () => {
    // Your refreshToken logic here
    try {
      const data = await API.get("http://localhost:3000/v1/auth/token");
      if (data.status == 200) {
        // console.log(data.data.accessToken);
        const user: JwtPayloads = jwtDecode(data.data.accessToken);
        setAccessToken(data.data.accessToken);
        setUser({ user: user.user, id: user.id });
      }
    } catch (error) {}
  };

  const logout = async () => {
    try {
      const res = await API.get("/logout");
      if (res.status >= 200 && res.status < 300) {
        navigate("/login");
        localStorage.clear();
        setUser({ user: "", id: "" });
        setExpire(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        accessToken,
        user,
        logout,
        login,
        registerUser,
        refreshToken,
        setAccessToken,
        setUser,
        setExpire,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export { ApiProvider, useApi };

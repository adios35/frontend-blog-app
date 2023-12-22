import axios, { AxiosPromise, AxiosResponse, AxiosError } from "axios";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import React, { ReactNode, createContext, useContext } from "react";
import { LoginType, RegisterType } from "../../types/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";
// import credAxios from "../../api/axios";
// type CustomErrorType = Error | AxiosError;

type AuthContextType = {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  loginMutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    any,
    any
  >;
  login: (form: LoginType) => AxiosPromise<Tresponse>;
  user: User | null;
  logoutMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
  regsiterMutation: UseMutationResult<
    AxiosResponse<TregisterResponse, any>,
    AxiosError<unknown, any>,
    {
      email: string;
      password: string;
      confirmPassword: string;
    },
    unknown
  >;
  accessToken: string
};

type Tresponse = {
  message: string;
  accessToken: string;
};

type User = {
  id: string;
  user: string;
};

type Email = {
  id: string;
  email: string;
};
type TregisterResponse = {
  message: string;
  user: Email;
};

type JwtPayloads = JwtPayload & User;

const credAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
})

const AuthContext = createContext<AuthContextType | undefined>(undefined);


///the main hooks
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(
    null || JSON.parse(localStorage.getItem("user")!)
  );
  const [accessToken, setAccessToken] = React.useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const register = (form: RegisterType): AxiosPromise<TregisterResponse> =>
    credAxios.post("/v1/auth/register", form)
  const logout = (): AxiosPromise =>
    credAxios.post("/v1/auth/logout", {withCredentials:{ headers:{"Authorization":`Bearer ${accessToken}`}}})
  const login = (form: LoginType): AxiosPromise<Tresponse> =>
    credAxios.post("/v1/auth/login", form);


  credAxios.interceptors.response.use((response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = (await credAxios.get("/v1/auth/token")).data.accessToken;
        setAccessToken(newAccessToken)
      }
    }
  )



  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ["auth"],
    onSuccess: async (data) => {
      const { user, id }: JwtPayloads = await jwtDecode(data.data.accessToken);
      setUser({ user, id });
      localStorage.setItem("user", JSON.stringify({ user, id }));
      queryClient.invalidateQueries(["auth"]);
      setAccessToken(data.data.accessToken);
      navigate("/");
    },
    onError: (err: AxiosError<any, any>) => {
      console.log(err);

    },
  });

  const logoutMutation = useMutation(logout, {
    mutationKey: ["auth"],
    onSuccess: () => {
      navigate("/login");
      setUser(null);
      setAccessToken("");
      localStorage.clear();
    },
  });

  const regsiterMutation = useMutation(register, {
    mutationKey: ["auth"],
    onSuccess: (data) => {
      queryClient.invalidateQueries(["auth"]);
      navigate("/login");
    },
    onError: (err: AxiosError) => console.log(err),
  });

  return (
    <AuthContext.Provider
      value={{ setAccessToken, loginMutation, accessToken, login, user, logoutMutation, regsiterMutation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an authProvider");
  }
  return context;
};
export { useAuth, AuthProvider };

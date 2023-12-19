// import axios, { AxiosResponse } from "axios";
// import { useState } from "react";
// import jwtDecode, { JwtPayload } from "jwt-decode";
// import { RegisterType, TFormType } from "../types/auth";

// type User = {
//   id: string;
//   user: string;
// };

// type JwtPayloads = JwtPayload & User;

// const UseApi = () => {
//   const [accessToken, setAccessToken] = useState();
//   const [user, setUser] = useState<User>({ user: "", id: "" });
//   const [expire, setExpire] = useState<number | undefined>();

//   const API = axios.create({
//     baseURL: "http://localhost:3000/v1/auth",
//   });
//   API.interceptors.response.use(
//     (response) => {
//       // Return the response if it's successful
//       return response;
//     },
//     (error) => {
//       // Handle errors here
//       if (error.response) {
//         // The request was made, but the server responded with an error status code
//         console.error(
//           "Response Error:",
//           error.response.status,
//           error.response.data
//         );
//       } else if (error.request) {
//         // The request was made, but there was no response from the server
//         console.error("Request Error:", error.request);
//       } else {
//         // Something happened in setting up the request that triggered an error
//         console.error("General Error:", error.message);
//       }

//       // Return a rejected promise with the error
//       return Promise.reject(error);
//     }
//   );
//   const refreshToken = async () => {
//     const res = await API.get("/token");
//     console.log(res);
//   };

//   //   API.interceptors
//   async function registerUser(
//     formData: RegisterType,
//     setError: React.Dispatch<React.SetStateAction<string>>
//   ) {
//     try {
//       const response = await API.post("/register", formData);
//       if (response.status === 200) {
//         const decoded: JwtPayloads = await jwtDecode(response.data.accessToken);
//         setUser({ user: decoded.user, id: decoded.id });
//         setExpire(decoded.exp);
//         setError("");
//         console.log(decoded);
//       }
//     } catch (error) {
//       console.error("Login error:", error.response);
//       setError(error?.response?.data.message);
//     }
//   }

//   async function login(
//     formData: TFormType,
//     setError: React.Dispatch<React.SetStateAction<string>>
//   ) {
//     try {
//       const response = await API.post("/login", formData);
//       if (response.status === 200) {
//         const decoded: JwtPayloads = await jwtDecode(response.data.accessToken);
//         setUser({ user: decoded.user, id: decoded.id });
//         setExpire(decoded.exp);
//         setError("");
//         console.log(decoded);
//       }
//     } catch (error) {
//       console.error("Login error:", error.response);
//       setError(error?.response?.data.message);
//     }
//   }

//   return {
//     login,
//     registerUser,
//     refreshToken,
//     setAccessToken,
//     setUser,
//     setExpire,
//     user,
//   };
// };
// export default UseApi;

import axios, { AxiosResponse } from "axios";
import { RegisterType } from "../types/auth";
const authAPI = axios.create({
  baseURL: "http://localhost:3000/v1/auth",
});

export async function login(formData) {
  try {
    const data = await authAPI.post("/login", formData);
    // alert("login sucesss");
    console.log(data.data);
  } catch (error) {
    console.error(error);
  }
}
export async function registerApi(
  formData: RegisterType
): Promise<AxiosResponse | undefined> {
  try {
    const data = await authAPI.post("/register", formData);
    // alert("login sucesss");
    console.log(data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

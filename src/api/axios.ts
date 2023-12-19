import axios from "axios";

const credAxios = axios.create({
    //@ts-ignore
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

export const privateAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "aplication/json"
    }

})

export default credAxios;

import credAxios from "../api/axios";
import { useAuth } from "./wrQuery";

const UseRereshToken = () => {
    const { setAccessToken } = useAuth()

    function refresh() {
        credAxios.get("/v1/auth//token").then(data => {
            setAccessToken(data.data.accessToken)
            console.log(data.data.accessToken)
            return data.data.accessToken
        })
    }
    return refresh
}
export default UseRereshToken
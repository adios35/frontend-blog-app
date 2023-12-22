

// import  from ''
import { useNavigate } from 'react-router-dom'
import credAxios from '../../api/axios'
import { useAuth } from '../../hooks/wrQuery'
import { useEffect, useState } from 'react'

const Protected = () => {
    const navigate = useNavigate()
    const { accessToken } = useAuth()
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        credAxios.get("/protected", {
            signal: controller.signal,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(data => {
            console.log(data)
            isMounted && setIsLogin(true)
            setError("")
        }).catch(async (err) => {
            setError(err.response?.data?.message)
            setIsLogin(false)
            console.log(err)
        })
        return () => {
            // cleanup code
            isMounted = false
            controller.abort()
        };
    }, []);

    // const { data, error } = useQuery({
    //     queryFn: () => credAxios.get("/protected", { headers: { 'Authorization': `Bearer ${accessToken}` } }).then(data => console.log(data)),
    //     queryKey: "hello",
    // })
    // console.log(data, error)
    return (
        <div className='grid  h-screen w-screen place-items-center bg-gray-700'>
            <h1 className='text-gray-300'>
                {isLogin ? <h1>you're login</h1> : <h1>{error || "you're not login"}</h1>}
            </h1>
        </div>
    )
}

export default Protected
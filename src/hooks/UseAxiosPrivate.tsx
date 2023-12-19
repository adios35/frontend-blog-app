import React, { useEffect } from 'react'
import { useAuth } from './wrQuery'
import { privateAxios } from '../api/axios'
import UseRereshToken from './useRefreshToken'

const UseAxiosPrivate = () => {
    const { setAccessToken, accessToken } = useAuth()
    const refresh = UseRereshToken()
    useEffect(() => {

        const axiosRequestIntercept = privateAxios.interceptors.response.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`
                }
            },
            (error) => Promise.reject(error)
        )
        const axiosResponseIntercept = privateAxios.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log("fired", error)
                const preventRequest = error?.config
                if (error.response.status == 401 && !preventRequest?.sent) {
                    console.log("fired2")

                    preventRequest.sent = true
                    const newToken = await refresh()
                    console.log(newToken)
                    // preventRequest.headers["Authorization"] = `Bearer ${newToken}`
                    return privateAxios(preventRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            privateAxios.interceptors.response.eject(axiosResponseIntercept)
            privateAxios.interceptors.request.eject(axiosRequestIntercept)
        }
    }, [accessToken, refresh])
    return privateAxios

}
export default UseAxiosPrivate
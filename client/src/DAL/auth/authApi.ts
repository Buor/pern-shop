import axiosInstance from "../axiosInstance"
import {getAccessToken, setAccessToken} from "./accessToken"
import {ILoginRequestDTO, ILoginResponseDTO, IRegisterRequest} from "../../../../types/DTOs"

//Requests
export const sendLoginData = (loginData: ILoginRequestDTO) => {
    return axiosInstance.post('/auth/login', loginData, {withCredentials: true})
}

export const sendRegisterData = (registerData: IRegisterRequest) => {
    return axiosInstance.post('/auth/register', registerData, {withCredentials: true})
}

export const getIsVerifiedReq = () => {
    let accessToken = getAccessToken()
    console.log(accessToken)
    return axiosInstance.get('/auth/is-verify', {headers: {"Authorization": "Bearer " + accessToken}, withCredentials: true})
}

export const getRefreshAccessToken = () => {
    return axiosInstance.get('/auth/refresh-token',{ withCredentials: true})
}

//Handlers
export const login = async (loginData: ILoginRequestDTO) => {
    try {
        const response = await sendLoginData(loginData)
        const responseData: ILoginResponseDTO = response.data

        setAccessToken(responseData.accessToken)
        console.log(responseData)
        return true
    } catch (err) {
        console.log(err.response.data)
        return false
    }
}

export const register = async (registerData: IRegisterRequest) => {
    try {
        const response = await sendRegisterData(registerData)
        console.log(response)
    } catch (err) {
        console.log(err.response.data)
    }
}

export const getIsVerified = async () => {
    try {
        let success = (await getIsVerifiedReq()).data
        if(success) return true

        let newAccessToken = (await getRefreshAccessToken()).data.accessToken
        if (!newAccessToken) return false

        setAccessToken(newAccessToken)
        return true
    } catch (err) {
        console.log(err.response.data)
    }
}
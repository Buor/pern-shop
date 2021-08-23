import axiosInstance from "../axiosInstance"
import {getAccessToken, setAccessToken} from "./accessToken"
import {ILoginRequestDTO, ILoginResponseDTO, IRegisterRequest} from "../../../../types/DTOs"

//Requests
export const sendLoginData = (loginData: ILoginRequestDTO) => {
    return axiosInstance.post('/auth/login', loginData)
}

export const sendRegisterData = (registerData: IRegisterRequest) => {
    return axiosInstance.post('/auth/register', registerData)
}

export const getIsVerifiedReq = () => {
    let accessToken = getAccessToken()
    return axiosInstance.get('/auth/is-verify', {headers: {"Authorization": "Bearer " + accessToken}})
}

export const getRefreshAccessToken = () => {
    return axiosInstance.get('/auth/refresh-token')
}

//Handlers
export const login = async (loginData: ILoginRequestDTO) => {
    try {
        const response = await sendLoginData(loginData)
        const responseData: ILoginResponseDTO = response.data

        setAccessToken(responseData.accessToken)
        return true
    } catch (err) {
        if(err.response.status === 401) return "Wrong email or password"
        return "Server error occurred, try again later"
    }
}

export const register = async (registerData: IRegisterRequest) => {
    try {
        const response = await sendRegisterData(registerData)
    } catch (err) {
        console.log(err.response.data)
    }
}

export const getIsVerified = async () => {
    try {
        //Get access token and check it
        let success = (await getIsVerifiedReq()).data
        if(success) return true

        //If access token wrong, refresh it
        let newAccessToken = (await getRefreshAccessToken()).data.accessToken
        if (!newAccessToken) return false

        setAccessToken(newAccessToken)
        return true
    } catch (err) {
        console.log(err.response)
        return false
    }
}
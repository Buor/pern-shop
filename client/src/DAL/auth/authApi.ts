import axiosInstance from "../axiosInstance"
import {setAccessToken} from "./accessToken"
import {ILoginRequestDTO, ILoginResponseDTO, IRegisterRequest} from "../../../../types/DTOs"
//Interfaces


//Requests
export const sendLoginData = (loginData: ILoginRequestDTO) => {
    return axiosInstance.post('/auth/login', loginData, {withCredentials: true})
}

export const sendRegisterData = (registerData: IRegisterRequest) => {
    return axiosInstance.post('/auth/register', registerData, {withCredentials: true})
}

//Handlers
export const login = async (loginData: ILoginRequestDTO) => {
    try {
        const response = await sendLoginData(loginData);
        const responseData: ILoginResponseDTO = response.data;

        setAccessToken(responseData.accessToken);
        console.log(responseData)
        return true
    } catch(err) {
        console.log(err.response.data)
        return false
    }
}

export const register = async (registerData: IRegisterRequest) => {
    try {
        const response = await sendRegisterData(registerData);
        console.log(response)
    } catch(err) {
        console.log(err.response.data)
    }
}
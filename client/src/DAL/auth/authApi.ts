import axiosInstance from "../axiosInstance"
import {setAccessToken} from "./accessToken"
//Interfaces
interface ILoginData {
    email: string
    password: string
}

interface RegisterData extends ILoginData {
    name: string
}

//Requests
export const sendLoginData = (loginData: ILoginData) => {
    return axiosInstance.post('/auth/login', loginData, {withCredentials: true})
}

export const sendRegisterData = (registerData: RegisterData) => {
    return axiosInstance.post('/auth/register', registerData, {withCredentials: true})
}

//Handlers
export const login = async (loginData: ILoginData) => {
    try {
        const response = await sendLoginData(loginData);
        console.log(response);
        setAccessToken(response.data.accessToken);
    } catch(err) {
        console.log(err.response.data)
    }
}

export const register = async (registerData: RegisterData) => {
    try {
        const response = await sendRegisterData(registerData);
        console.log(response)
    } catch(err) {
        console.log(err.response.data)
    }
}
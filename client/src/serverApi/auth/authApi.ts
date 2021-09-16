import axiosInstance from "./../axiosInstance"
import {getAccessToken, setAccessToken} from "./accessToken"
import {ILoginRequestDTO, ILoginResponseDTO, IRegisterRequest} from "../../../../types/DTOs"

export class AuthAPI {

    static async login(loginData: ILoginRequestDTO) {
        try {
            const response = await AuthAPI.sendLoginData(loginData)
            const responseData: ILoginResponseDTO = response.data

            setAccessToken(responseData.accessToken)
            return true
        } catch (err) {
            if(err.response.status === 401) return "Wrong email or password"
            return "Server error occurred, try again later"
        }
    }

    static async register(registerData: IRegisterRequest) {
        try {
            const response = await AuthAPI.sendRegisterData(registerData)
        } catch (err) {
            console.log(err.response.data)
        }
    }

    static async getIsVerified() {
        try {
            //Get access token and check it
            let success = (await AuthAPI.getIsVerifiedReq()).data
            if(success) return true

            //If access token wrong, refresh it
            let newAccessToken = (await AuthAPI.getRefreshAccessToken()).data.accessToken
            if (!newAccessToken) return false

            setAccessToken(newAccessToken)
            return true
        } catch (err) {
            console.log(err.response)
            return false
        }
    }

    private static sendLoginData(loginData: ILoginRequestDTO) {
        return axiosInstance.post('/auth/login', loginData)
    }

    private static sendRegisterData(registerData: IRegisterRequest) {
        return axiosInstance.post('/auth/register', registerData)
    }

    private static getIsVerifiedReq() {
        let accessToken = getAccessToken()
        return axiosInstance.get('/auth/is-verify', {headers: {"Authorization": "Bearer " + accessToken}})
    }

    private static getRefreshAccessToken() {
        return axiosInstance.get('/auth/refresh-token')
    }
}
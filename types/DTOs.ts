export interface ILoginResponseDTO {
    accessToken: string,
    userData: {
        name: string
        email: string
    }
}

export interface ILoginRequestDTO {
    email: string
    password: string
}

export interface IRegisterRequest extends ILoginRequestDTO {
    name: string
}
//Comment
export enum EAuthActionType {
    SET_USER_DATA = 'SET_USER_DATA',
    SET_IS_AUTH = 'SET_IS_AUTH'
}

export interface ISetUserData {
    type: EAuthActionType.SET_USER_DATA,
    userData: { name: string, email: string }
}

export interface ISetIsAuth {
    type: EAuthActionType.SET_IS_AUTH,
    isAuth: boolean
}

export type TAuthAction = ISetIsAuth | ISetUserData
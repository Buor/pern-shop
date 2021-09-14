import { EAuthActionType, ISetIsAuth, ISetUserData } from './types'

export const AuthActionCreators = {
    setUserData: (userData: { name: string, email: string }): ISetUserData => ({userData, type: EAuthActionType.SET_USER_DATA}),
    setIsAuth: (isAuth: boolean): ISetIsAuth => ({isAuth, type: EAuthActionType.SET_IS_AUTH})
}
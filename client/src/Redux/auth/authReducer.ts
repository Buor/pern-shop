import { TAuthAction } from './types'

const initialState = {
    userData: {
        name: "",
        email: ""
    },
    isAuth: false
}

type AuthState = typeof initialState;

export const authReducer = (state = initialState, action: TAuthAction): AuthState => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {...state, userData: action.userData}
        }
        case "SET_IS_AUTH": {
            return {...state, isAuth: action.isAuth}
        }
        default: {
            return state
        }
    }
}
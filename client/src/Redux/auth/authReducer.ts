import {Reducer} from "redux"

type TAction = "SET_USER_DATA" | "SET_IS_AUTH"

const initialState = {
    userData: {
        name: "",
        email: ""
    },
    isAuth: false
}

export const authReducer: Reducer<typeof initialState> = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {...state, userData: action.userData}
        }
        case "SET_IS_AUTH": {
            return {...state, isAuth: action.isAuth}
        }
    }

    return state
}

export const setUserData = (userData: { name: string, email: string }) => {
    return {userData, type: "SET_USER_DATA"}
}

export const setIsAuth = (isAuth: boolean) => {
    return {isAuth, type: "SET_IS_AUTH"}
}
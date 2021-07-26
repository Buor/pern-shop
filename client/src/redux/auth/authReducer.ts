import {Reducer} from "redux"

type TAction = "SET_USER_DATA"

const initialState = {
    userData: {
        name: "",
        email: ""
    }
}

export const authReducer: Reducer<typeof initialState> = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {...state, userData: action.userData}
        }
    }

    return state
}

export const setUserData = (userData: { name: string, email: string }) => {
    return {userData, type: "SET_USER_DATA"}
}
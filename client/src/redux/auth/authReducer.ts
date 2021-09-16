import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserData {
    name: string,
    email: string
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: {
            name: "",
            email: ""
        },
        isAuth: false
    },
    reducers: {
        setUserData(state, action: PayloadAction<IUserData>) {
            state.userData = action.payload
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    }
})

export const {setUserData, setIsAuth} = authSlice.actions

export default authSlice.reducer
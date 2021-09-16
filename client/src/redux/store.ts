import authReducer from './auth/authReducer'
import categoryPageReducer from './category/categoryPageReducer'
import basketReducer from './basket/basketReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        auth: authReducer,
        categoryPage: categoryPageReducer,
        basket: basketReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store
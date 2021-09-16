import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name: 'categoryPage',
    initialState: {
        filters: [] as number[]
    },
    reducers: {
        addFilter(state, action: PayloadAction<number>) {
            state.filters.push(action.payload)
        },
        removeFilter(state, action: PayloadAction<number>) {
            state.filters = state.filters.filter(id => id !== action.payload)
        }
    }
})

export const {addFilter, removeFilter} = categorySlice.actions

export default categorySlice.reducer
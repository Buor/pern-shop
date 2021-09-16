import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        products: [] as ProductDTO[]
    },
    reducers: {
        addProduct(state, action: PayloadAction<ProductDTO>) {
            state.products.push(action.payload)
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(product => product.id !== action.payload)
        }
    }
})

export const {addProduct, removeProduct} = basketSlice.actions

export default basketSlice.reducer
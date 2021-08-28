import { Reducer } from 'redux'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

const ADD_PRODUCT = "ADD_PRODUCT"
const REMOVE_PRODUCT = "REMOVE_PRODUCT"

const initialState: {products: ProductDTO[]} = {
    products: []
}

export const basketReducer: Reducer<typeof initialState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            return {...state, products: [...state.products, action.product]}
        }
        case REMOVE_PRODUCT: {
            return {...state, products: state.products.filter(id => id !== action.product.id)}
        }
    }

    return state
}

export const addProduct = (product: ProductDTO) => {
    return {product, type: ADD_PRODUCT}
}
export const removeProduct = (product: ProductDTO) => {
    return {product, type: REMOVE_PRODUCT}
}
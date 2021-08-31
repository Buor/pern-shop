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
            return {...state, products: state.products.filter(product => product.id !== action.productId)}
        }
    }

    return state
}

export const addProduct = (product: ProductDTO) => {
    return {product, type: ADD_PRODUCT}
}
export const removeProduct = (productId: number) => {
    return {productId, type: REMOVE_PRODUCT}
}
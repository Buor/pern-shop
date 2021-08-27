import { Reducer } from 'redux'

const ADD_PRODUCT = "ADD_PRODUCT"
const REMOVE_PRODUCT = "REMOVE_PRODUCT"

const initialState: {productIds: number[]} = {
    productIds: []
}

export const basketReducer: Reducer<typeof initialState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            return {...state, productIds: [...state.productIds, action.productId]}
        }
        case REMOVE_PRODUCT: {
            return {...state, productIds: state.productIds.filter(id => id !== action.productId)}
        }
    }

    return state
}

export const addProduct = (productId: number) => {
    return {productId, type: ADD_PRODUCT}
}
export const removeProduct = (productId: number) => {
    return {productId, type: REMOVE_PRODUCT}
}
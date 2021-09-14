import { EBasketActionType, IBasketState, TBasketAction } from './types'

const initialState: IBasketState = {
    products: []
}

export const basketReducer = (state = initialState, action: TBasketAction): IBasketState => {
    switch (action.type) {
        case EBasketActionType.ADD_PRODUCT: {
            return {...state, products: [...state.products, action.product]}
        }
        case EBasketActionType.REMOVE_PRODUCT: {
            return {...state, products: state.products.filter(product => product.id !== action.productId)}
        }
        default: {
            return state
        }
    }
}
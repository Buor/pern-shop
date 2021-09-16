import { ProductDTO } from '../../../../@types/DTO/productDTOs'

export interface IBasketState {
    products: ProductDTO[]
}

export enum EBasketActionType {
    ADD_PRODUCT = "ADD_PRODUCT",
    REMOVE_PRODUCT = "REMOVE_PRODUCT"
}

export interface IAddProduct {
    product: ProductDTO,
    type: EBasketActionType.ADD_PRODUCT
}

export interface IRemoveProduct {
    productId: number,
    type: EBasketActionType.REMOVE_PRODUCT
}

export type TBasketAction = IAddProduct | IRemoveProduct
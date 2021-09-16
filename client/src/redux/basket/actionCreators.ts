import { ProductDTO } from '../../../../@types/DTO/productDTOs'
import { EBasketActionType, IAddProduct, IRemoveProduct } from './types'

export const BasketActionCreators = {
    addProduct: (product: ProductDTO): IAddProduct => ({product, type: EBasketActionType.ADD_PRODUCT}),
    removeProduct: (productId: number): IRemoveProduct => ({productId, type: EBasketActionType.REMOVE_PRODUCT})
}

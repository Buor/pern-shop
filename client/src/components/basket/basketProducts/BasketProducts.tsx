import React from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import { BasketProduct } from './BasketProduct'

type TSetPurchasePriceArg = (prev: number) => number
type TSetPurchasePriceFunc = (arg0: TSetPurchasePriceArg) => void

export interface IBasketProductProps {
    setPurchasePrice: TSetPurchasePriceFunc
    isVerified: 'true' | 'false'
    removeLocalProduct: (productId: number) => void
}

interface IProps extends IBasketProductProps {
    products: ProductDTO[]
}

export const BasketProducts: React.FC<IProps> = ({ products, ...props}) => {
    return (
        <div className='products_wrapper'>
            {products.map(product => <BasketProduct product={product} {...props}/>)}
        </div>
    )
}
import React from 'react'
import { ProductDTO } from '../../../../../../@types/DTO/productDTOs'
import imgNoProduct from '../../../../styles/images/common/noImage.png'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../../redux/basket/basketReducer'
import { BasketAPI } from '../../../../serverApi/basket/basketAPI'
import { useHistory } from 'react-router-dom'

interface Props {
    product: ProductDTO,
    isVerified: 'true' | 'false'
}

export const ContentProduct: React.FC<Props> = ({
                                                    isVerified,
                                                    product: {
                                                        id,
                                                        img,
                                                        cost,
                                                        discountCost,
                                                        name,
                                                        count,
                                                        typePropertyValues
                                                    }
                                                }) => {
    //todo move to ProductPage!
    const dispatch = useDispatch()
    const history = useHistory()

    const addProductToBasket = (product: ProductDTO) => {
        if (isVerified === 'true')
            BasketAPI.addProductToBasket(product)
        else
            dispatch(addProduct(product))
    }

    return (
        <div className='product' onClick={() => history.push(`/product/${id}`)}>
            <div className='head'></div>
            <div className='image_wrapper'>
                <img
                    src={img || imgNoProduct}
                    alt='tea' />
            </div>
            <div className='name'>
                {name}
            </div>
            {
                discountCost
                    ? (
                        <>
                            <div className={'discount_price'}>{cost} $</div>
                            <div className='price'>{discountCost} $</div>
                        </>
                    )
                    : <div className='price'>{cost} $</div>
            }

        </div>
    )
}
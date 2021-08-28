import React from 'react'
import { CategoryProductDTO, ProductDTO } from '../../../../../../@types/DTO/productDTOs'
import imgNoProduct from './../../../../Styles/Images/Common/noImage.png'
import { connect } from 'react-redux'
import { addProductToBasket as addProductToServerBasket } from '../../../../DAL/basket/basketAPI'
import { addProduct } from '../../../../Redux/basket/basketReducer'

interface Props {
    product: CategoryProductDTO,
    addProductToLocalBasket: Function,
    isVerified: 'true' | 'false'
}

const ContentProduct: React.FC<Props> = ({
                                             isVerified,
                                             addProductToLocalBasket,
                                             product: { id, img, cost, discountCost, name, count, typePropertyValues }
                                         }) => {

    const addProductToBasket = (product: ProductDTO) => {
        if (isVerified === 'true')
            addProductToServerBasket(product)
        else
            addProductToLocalBasket(product)
    }

    return (
        <div className='product' onClick={() => addProductToBasket({ id, img, cost, discountCost, name, count })}>
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

export default connect(() => ({}), {
    addProductToLocalBasket: addProduct
})(ContentProduct)


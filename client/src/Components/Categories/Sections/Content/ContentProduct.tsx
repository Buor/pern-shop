import React from 'react'
import { CategoryProductDTO } from '../../../../../../@types/DTO/productDTOs'
import imgNoProduct from './../../../../Styles/Images/Common/noImage.png'

interface Props {
    product: CategoryProductDTO
}

const ContentProduct: React.FC<Props> = ({product: {img,cost,discountCost,name,count,typePropertyValues}}) => {
    return (
        <div className='product'>
            <div className='head'></div>
            <div className='image_wrapper'>
                <img
                    src={img || imgNoProduct}
                    alt='tea' />
            </div>
            <div className='name'>
                {name}
            </div>
            <div className='price'>{cost} $</div>
        </div>
    )
}

export default ContentProduct
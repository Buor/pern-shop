import React from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import imgNoImage from './../../../Styles/Images/Common/noImage.png'
import imgCross from './../../../Styles/Images/Icons/cross.svg'
import ProductCounter from './ProductCounter'

interface Props extends ProductDTO {

}

const BasketProduct: React.FC<Props> = ({ img, id, count, cost, discountCost, name }) => {
    return (
        <div className={'product'}>
            <div className={'product_head'}>
                <img src={img || imgNoImage} alt={name} className={'head_image'} />
                <div className='name'>{name}</div>
                <button className={'btn_delete'} onClick={() => {
                    //todo implement
                }}>
                    <img src={imgCross} alt='delete' className={'cross_image'}/>
                </button>
            </div>
            <div className='product_tail'>
                <ProductCounter/>
                <div className='cost'>

                </div>
            </div>
        </div>
    )
}

export default BasketProduct
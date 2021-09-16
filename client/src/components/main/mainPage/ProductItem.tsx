import React from 'react'
import { NavLink } from 'react-router-dom'
import { GetAllProductsDTO } from '../../../../../@types/DTO/productDTOs'

const ProductItem: React.FC<GetAllProductsDTO> = ({ img, cost, discountCost, count, name }) => {
    return <div className='item'>
        <div className='item_head'>

        </div>
        <NavLink to={'/'}>
            <div className='item_image_wrapper'>
                <img className={'item_image'}
                     src={img || 'http://cdn.onlinewebfonts.com/svg/img_451641.png'}
                     alt='product_image' />
            </div>
        </NavLink>
        <NavLink to={'/'}>
            <div className='item_name'>{name}</div>
        </NavLink>

        {discountCost
            ? <div className='item_discount'>
                <span className='item_cost'>{discountCost}</span>
                <span className='item_currency'>$</span>
            </div>
            : null
        }

        <div className='item_cost_wrapper'>
            <span className='item_cost'>{cost}</span>
            <span className='item_currency'>$</span>
        </div>

        {
            count > 100
                ? <div className='item_stock'></div>
                :
                count > 0
                    ? <div className='item_stock finishes'>Заканчивается</div>
                    : <div className='item_stock'>Нет в наличии</div>
        }
    </div>
}

export default ProductItem
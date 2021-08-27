import React, { useState } from 'react'
import img_cross from './../../Styles/Images/Icons/cross.svg'
import BasketProduct from './BasketProduct/BasketProduct'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

interface Props {
    closeFunc: Function,
}

const Basket: React.FC<Props> = ({ closeFunc }) => {

    const [products, setProducts] = useState<ProductDTO[]>([])

    return (
        <div className={'basket_wrapper'} onClick={(e) => closeFunc()}>
            <div className={'basket'} onClick={(e) => e.stopPropagation()}>
                <div className={'head'}>
                    <div className={'basket_title'}>Basket</div>
                    <button className={'btn_close'} onClick={() => closeFunc()}>
                        <img src={img_cross} alt='exit' />
                    </button>
                </div>
                <div className='products_wrapper'>
                    {products.map(product => <BasketProduct {...product} />)}
                </div>
                <div className='basket_footer'>
                    <button className='continue_shopping'>
                        Continue shopping
                    </button>
                    <div className='submit_area'>
                        <div className='all_cost'>4588$</div>
                        <button className={'btn_place_order'}>Place an order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket
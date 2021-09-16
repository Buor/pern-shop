import React from 'react'
import imgSadSmile from '../../styles/images/icons/sad_smile.svg'

export const NoProducts = () => {
    return (
        <div className={'no_products'}>
            <img src={imgSadSmile} alt='No products' />
            <div className={'message'}>
                Basket is empty! You can change it any time!
            </div>
        </div>
    )
}

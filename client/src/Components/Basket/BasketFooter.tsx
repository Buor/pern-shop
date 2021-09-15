import React from 'react'

interface IProps {
    closeFunc: Function,
    purchasePrice: number
}

export const BasketFooter: React.FC<IProps> = ({ closeFunc, purchasePrice }) => {
    return (
        <div className='basket_footer'>
            <button className='btn_continue_shopping' onClick={() => closeFunc()}>
                Continue shopping
            </button>
            <div className='submit_area'>
                <div className='all_cost'>{purchasePrice} $</div>
                <button className={'btn_place_order'}>Place an order</button>
            </div>
        </div>
    )
}
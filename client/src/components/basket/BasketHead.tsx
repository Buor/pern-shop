import React from 'react'
import img_cross from '../../styles/images/icons/cross.svg'

interface IProps {
    closeFunc: Function
}

export const BasketHead: React.FC<IProps> = ({closeFunc}) => {
    return (
        <div className={'head'}>
            <div className={'basket_title'}>Basket</div>
            <button className={'btn_close'} onClick={() => closeFunc()}>
                <img src={img_cross} alt='exit' />
            </button>
        </div>
    )
}

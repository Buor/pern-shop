import React from 'react'
import imgPlus from '../../../styles/images/icons/plus.svg'
import imgMinus from '../../../styles/images/icons/minus.svg'

interface Props {
    productCount: number
    setProductCount: Function,
    notificationMax: string
}

const ProductCounter: React.FC<Props> = ({ notificationMax, productCount, setProductCount }) => {

    const changeProductCountByOne = (value: 1 | -1) => {
        setProductCount(productCount + value)
    }

    return (
        <div className={'counter' + (notificationMax ? ' max' : '')}>
            <button onClick={() => changeProductCountByOne(-1)}>
                <img src={imgMinus} alt='minus' />
            </button>
            <input type='number' value={productCount} onChange={(e) => setProductCount(e.target.value)} />
            <button onClick={() => changeProductCountByOne(1)}>
                <img src={imgPlus} alt='plus' />
            </button>
            {
                notificationMax
                ? <div className={'notification_max'}>
                    {notificationMax}
                </div>
                : null
            }

        </div>
    )
}

export default ProductCounter
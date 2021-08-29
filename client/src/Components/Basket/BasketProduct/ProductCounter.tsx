import React from 'react'
import imgPlus from './../../../Styles/Images/Icons/plus.svg'
import imgMinus from './../../../Styles/Images/Icons/minus.svg'

interface Props {
    productCount: number
    setProductCount: Function
}

const ProductCounter: React.FC<Props> = ({ productCount, setProductCount }) => {

    const changeProductCountByOne = (value: 1 | -1) => {
        setProductCount(productCount + value)
    }

    return (
        <div className={'counter'}>
            <button onClick={() => changeProductCountByOne(-1)}>
                <img src={imgMinus} alt='minus' />
            </button>
            <input type='number' value={productCount} onChange={(e) => setProductCount(e.target.value)} />
            <button onClick={() => changeProductCountByOne(1)}>
                <img src={imgPlus} alt='plus' />
            </button>
        </div>
    )
}

export default ProductCounter
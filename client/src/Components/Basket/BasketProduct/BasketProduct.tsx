import React, { useEffect, useRef, useState } from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import imgNoImage from './../../../Styles/Images/Common/noImage.png'
import imgCross from './../../../Styles/Images/Icons/cross.svg'
import ProductCounter from './ProductCounter'

interface Props extends ProductDTO {

}

const BasketProduct: React.FC<Props> = ({ img, id, count, cost, discountCost, name }) => {

    const [productCount, setProductCount] = useState(1)
    const [isFetching, setIsFetching] = useState(false)
    const timer = useRef<number>(NaN)
    const firstLoad = useRef(true)

    useEffect(() => {
        if(firstLoad.current) {
            firstLoad.current = false
            return
        }

        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            console.log('a')
        },1000) as unknown as number
    },[productCount])

    const changeProductCount = (value: string) => {
        let numVal = +value
        setProductCount(numVal <= 0 ? 1 : numVal >= 9999 ? 9999 : numVal)
    }

    return (
        <div className={'product_wrapper'}>
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
                    <ProductCounter productCount={productCount} setProductCount={changeProductCount}/>
                    <div className='cost'>
                        {cost - discountCost!} $
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasketProduct
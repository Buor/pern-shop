import React, { useEffect, useRef, useState } from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import imgNoImage from './../../../Styles/Images/Common/noImage.png'
import imgCross from './../../../Styles/Images/Icons/cross.svg'
import ProductCounter from './ProductCounter'

type TSetPurchasePriceFunc = (prev: number) => number

interface Props extends ProductDTO {
    setPurchasePrice: (callback: TSetPurchasePriceFunc) => void
}

const BasketProduct: React.FC<Props> = ({ setPurchasePrice, img, id, count, cost, discountCost, name }) => {

    const [productCount, setProductCount] = useState(1)
    const [productCost, setProductCost] = useState(cost)
    const [notificationMax, setNotificationMax] = useState('')
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

    const changeProductsCount = (value: string | number) => {
        let numVal = +value
        console.log(numVal)
        let newProductsCount

        if(numVal <= 0) {
            newProductsCount = 1
        } else if(numVal >= count) {
            newProductsCount = count
        } else {
            newProductsCount = numVal
        }

        if(newProductsCount === count) {
            setNotificationMax('Max')
        } else if(notificationMax !== '') {
            setNotificationMax('')
        }
        changeProductCost(productCount, newProductsCount)
        setProductCount(newProductsCount)
    }

    const changeProductCost = (oldProductsCount: number,newProductsCount: number) => {
        setPurchasePrice((prev) => {
            return prev - oldProductsCount * cost + newProductsCount * cost
        })
        setProductCost(cost * newProductsCount)
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
                    <div className={'no_product'}></div>
                    <ProductCounter notificationMax={notificationMax} productCount={productCount} setProductCount={changeProductsCount}/>
                    <div className='cost'>
                        {productCost - discountCost!} $
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasketProduct
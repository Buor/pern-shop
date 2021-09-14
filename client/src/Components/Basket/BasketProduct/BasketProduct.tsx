import React, { useEffect, useRef, useState } from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import imgNoImage from './../../../Styles/Images/Common/noImage.png'
import imgCross from './../../../Styles/Images/Icons/cross.svg'
import ProductCounter from './ProductCounter'
import { deleteProductFromBasket as deleteProductFromBasketOnServer } from '../../../DAL/basket/basketAPI'
import { useDispatch } from 'react-redux'
import { BasketActionCreators } from '../../../Redux/basket/actionCreators'

type TSetPurchasePriceFunc = (prev: number) => number

interface Props extends ProductDTO {
    setPurchasePrice: (callback: TSetPurchasePriceFunc) => void
    isVerified: 'true' | 'false',
    removeLocalProduct: (productId: number) => void
}

export const BasketProduct: React.FC<Props> = ({
                                            removeLocalProduct,
                                            isVerified,
                                            setPurchasePrice,
                                            img,
                                            id,
                                            count,
                                            cost,
                                            discountCost,
                                            name
                                        }) => {

    const dispatch = useDispatch()

    const [productCount, setProductCount] = useState(1)
    const [productCost, setProductCost] = useState(cost)
    const [notificationMax, setNotificationMax] = useState('')
    const [isProductRemoving, setIsProductRemoving] = useState(false)

    const timer = useRef<number>(NaN)
    const firstLoad = useRef(true)

    const deleteProductFromBasket = async (productId: number) => {
        if (isVerified === 'true') {
            setIsProductRemoving(true)
            const success = await deleteProductFromBasketOnServer(productId)
            if(success)
                removeLocalProduct(id)
            setIsProductRemoving(false)
        } else if (isVerified === 'false') {
            dispatch(BasketActionCreators.removeProduct(productId))
        }
    }

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false
            return
        }

        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
        }, 1000) as unknown as number
    }, [productCount])

    const changeProductsCount = (value: string | number) => {
        let numVal = +value
        let newProductsCount

        if (numVal <= 0) {
            newProductsCount = 1
        } else if (numVal >= count) {
            newProductsCount = count
        } else {
            newProductsCount = numVal
        }

        if (newProductsCount === count) {
            setNotificationMax('Max')
        } else if (notificationMax !== '') {
            setNotificationMax('')
        }
        changeProductCost(productCount, newProductsCount)
        setProductCount(newProductsCount)
    }

    const changeProductCost = (oldProductsCount: number, newProductsCount: number) => {
        setPurchasePrice((prev) => {
            return prev - oldProductsCount * cost + newProductsCount * cost
        })
        setProductCost(cost * newProductsCount)
    }

    return (
        <div className={'product_wrapper' + (isProductRemoving ? ' __removing' : "")}>
            <div className={'product'}>
                <div className={'product_head'}>
                    <img src={img || imgNoImage} alt={name} className={'head_image'} />
                    <div className='name'>{name}</div>
                    <button className={'btn_delete'} onClick={() => {
                        if(isProductRemoving) return
                        deleteProductFromBasket(id)
                    }}>
                        <img src={imgCross} alt='delete' className={'cross_image'} />
                    </button>
                </div>
                <div className='product_tail'>
                    <div className={'no_product'}></div>
                    <ProductCounter notificationMax={notificationMax} productCount={productCount}
                                    setProductCount={changeProductsCount} />
                    <div className='cost'>
                        {productCost - discountCost!} $
                    </div>
                </div>
            </div>
        </div>
    )
}
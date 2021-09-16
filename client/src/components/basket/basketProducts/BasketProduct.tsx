import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import { deleteProductFromBasket as deleteProductFromBasketOnServer } from '../../../dal/basket/basketAPI'
import { IBasketProductProps } from './BasketProducts'

import ProductCounter from './ProductCounter'

import imgNoImage from '../../../styles/images/common/noImage.png'
import imgCross from '../../../styles/images/icons/cross.svg'
import { removeProduct } from '../../../redux/basket/basketReducer'

interface IProps extends IBasketProductProps {
    product: ProductDTO
}

export const BasketProduct: React.FC<IProps> = ({
                                                    removeLocalProduct,
                                                    isVerified,
                                                    setPurchasePrice,
                                                    product: {
                                                        img,
                                                        id,
                                                        count,
                                                        cost,
                                                        discountCost,
                                                        name
                                                    }
                                                }) => {

    const dispatch = useDispatch()

    const [productCount, setProductCount] = useState(1)
    const [productCost, setProductCost] = useState(cost)
    const [notificationMax, setNotificationMax] = useState('')
    const [isProductRemoving, setIsProductRemoving] = useState(false)

    const timer = useRef<number>(NaN)
    const firstLoad = useRef(true)

    const deleteProductFromBasket = useMemo(() => {
            if (isVerified === 'true')
                return async function(productId: number) {
                    setIsProductRemoving(true)
                    const success = await deleteProductFromBasketOnServer(productId)
                    if (success)
                        removeLocalProduct(id)
                    setIsProductRemoving(false)
                }
            else if (isVerified === 'false') {
                return function(productId: number) {
                    dispatch(removeProduct(productId))
                }
            }
            return function() {}
        }
        , [isVerified])

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
            let availableCost = discountCost ?? cost;
            return prev - oldProductsCount * availableCost + newProductsCount * availableCost
        })
        setProductCost(cost * newProductsCount)
    }

    return (
        <div className={'product_wrapper' + (isProductRemoving ? ' __removing' : '')}>
            <div className={'product'}>
                <div className={'product_head'}>
                    <img src={img || imgNoImage} alt={name} className={'head_image'} />
                    <div className='name'>{name}</div>
                    <button className={'btn_delete'} onClick={() => {
                        if (isProductRemoving) return
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
                        {`${(discountCost ?? productCost) * productCount} $`}
                    </div>
                </div>
            </div>
        </div>
    )
}
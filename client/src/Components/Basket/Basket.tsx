import React, { useEffect, useState } from 'react'
import img_cross from './../../Styles/Images/Icons/cross.svg'
import BasketProduct from './BasketProduct/BasketProduct'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'
import useIsVerified from '../../Utils/CustomHooks/useIsVerified'
import { connect } from 'react-redux'
import { getProductsFromUserBasket } from '../../DAL/basket/basketAPI'
import imgSadSmile from './../../Styles/Images/Icons/sad_smile.svg'

interface Props {
    closeFunc: Function,
    localProducts: ProductDTO[]
}

const Basket: React.FC<Props> = ({ closeFunc, localProducts }) => {

    const isVerified = useIsVerified()
    const [products, setProducts] = useState<ProductDTO[]>([])
    const [purchasePrice, setPurchasePrice] = useState(-1)

    useEffect(() => {

        const fetchProductsFromServer = async () => {
            const fetchedProducts = await getProductsFromUserBasket()
            setProducts(fetchedProducts)
            changePurchasePrice(fetchedProducts)
        }

        const fetchProductsFromClient = () => {
            setProducts(localProducts)
            changePurchasePrice(localProducts)
        }

        const changePurchasePrice = (products: ProductDTO[]) => {
            setPurchasePrice(products.reduce((acc, product) => {
                return acc + product.cost
            }, 0))
        }

        if (isVerified === 'true')
            fetchProductsFromServer()
        else if (isVerified === 'false')
            fetchProductsFromClient()
    }, [isVerified, localProducts])

    console.log('Products: ', products)

    if (isVerified === 'pending' || purchasePrice === -1) return null

    return (
        <div className={'basket_wrapper'} onClick={() => closeFunc()}>
            <div className={'basket'} onClick={(e) => e.stopPropagation()}>
                <div className={'head'}>
                    <div className={'basket_title'}>Basket</div>
                    <button className={'btn_close'} onClick={() => closeFunc()}>
                        <img src={img_cross} alt='exit' />
                    </button>
                </div>
                {
                    products.length
                        ? <>
                            <div className='products_wrapper'>
                                {products.map(product => <BasketProduct
                                    setPurchasePrice={setPurchasePrice} {...product} />)}
                            </div>
                            <div className='basket_footer'>
                                <button className='btn_continue_shopping' onClick={() => closeFunc()}>
                                    Continue shopping
                                </button>
                                <div className='submit_area'>
                                    <div className='all_cost'>{purchasePrice} $</div>
                                    <button className={'btn_place_order'}>Place an order</button>
                                </div>
                            </div>
                        </>
                        : <div className={'no_products'}>
                            <img src={imgSadSmile} alt='No products' />
                            <div className={'message'}>
                                Basket is empty! You can change it any time!
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default connect(
    (state: any) => ({ localProducts: state.basket.products }),
    {}
)(Basket)
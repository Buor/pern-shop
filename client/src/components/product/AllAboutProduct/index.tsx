import React from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import styles from './allAboutProduct.module.scss'
import imgNoImage from './../../../styles/images/common/noImage.png'
import imgCartIcon from './../../../styles/images/icons/shopping_cart.svg'
import imgTeaShopLogo from './../../../styles/images/icons/tea_shop_logo.png'
import { useHistory } from 'react-router-dom'

interface IProps {
    product: ProductDTO
}

export const AllAboutProduct: React.FC<IProps> = ({ product }) => {

    const history = useHistory()

    return (
        <section className={styles.root}>
            <div className={styles.imgWrapper}>
                <img src={product.img ?? imgNoImage} alt={product.name} />
            </div>
            <div className={styles.contentWrapper}>
                <section className={styles.costSection}>
                    {
                        product.discountCost
                            ? <>
                                <div className={styles.originalCost}>{product.cost} $</div>
                                <div className={styles.cost + ' ' + styles.discount}>
                                    {product.discountCost ?? product.cost} $
                                </div>
                            </>
                            : <div className={styles.cost}>
                                {product.discountCost ?? product.cost} $
                            </div>
                    }
                    <button className={styles.btnBuy}>
                        <img src={imgCartIcon} alt='cart' />
                        Купить
                    </button>

                </section>

                <section className={styles.sellerSection}>
                    <span>Продавец: <strong>Tea Shop</strong></span>
                    <img src={imgTeaShopLogo} alt='Tea Shop' onClick={() => history.push('/')}/>
                </section>
            </div>
        </section>
    )
}
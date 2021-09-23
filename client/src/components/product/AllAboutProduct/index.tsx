import React from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import styles from './allAboutProduct.module.scss'
import imgNoImage from './../../../styles/images/common/noImage.png'
import imgTeaShopLogo from './../../../styles/images/icons/tea_shop_logo.png'
import { useHistory } from 'react-router-dom'
import { ProductBuyComponent } from '../components/ProductBuyComponent'
import { GrayBorderUI } from '../../../utils/uiComponents/GrayBorderUI'

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
                <ProductBuyComponent/>
                <GrayBorderUI>
                    <section className={styles.sellerSection}>
                        <span>Продавец: <strong>Tea Shop</strong></span>
                        <img src={imgTeaShopLogo} alt='Tea Shop' onClick={() => history.push('/')}/>
                    </section>
                </GrayBorderUI>
            </div>
        </section>
    )
}
import React from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import imgNoImage from './../../../styles/images/common/noImage.png'
import { GrayBorderUI } from '../../../utils/uiComponents/GrayBorderUI'
import styles from './productAside.module.scss'
import { ProductBuyComponent } from '../components/ProductBuyComponent'

interface IProps {
    product: ProductDTO
}

export const ProductAsideWrapper: React.FC<IProps> = ({ children, product }) => {
    return (
        <div className={styles.root}>
            {children}
            <aside>
                <GrayBorderUI className={styles.productBox}>
                    <img src={product.img ?? imgNoImage} alt='Product Image' />
                    <div className={styles.productName}>
                        {product.name}
                    </div>
                </GrayBorderUI>
                <ProductBuyComponent discountCost={product.discountCost} cost={product.cost}/>
            </aside>
        </div>
    )
}
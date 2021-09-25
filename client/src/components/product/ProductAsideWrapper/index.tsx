import React, { useContext } from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import imgNoImage from './../../../styles/images/common/noImage.png'
import { GrayBorderUI } from '../../../utils/uiComponents/GrayBorderUI'
import styles from './productAside.module.scss'
import { ProductBuyComponent } from '../components/ProductBuyComponent'
import { ProductContext } from '../ProductPage'

interface IProps {

}

export const ProductAsideWrapper: React.FC<IProps> = ({ children }) => {

    const product = useContext(ProductContext)

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
                <ProductBuyComponent/>
            </aside>
        </div>
    )
}
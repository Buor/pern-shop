import React, { useContext } from 'react'
import styles from './productStats.module.scss'
import { ProductContext } from '../ProductPage'
import { ProductTypeProp } from './ProductTypeProp'

interface IProps {

}

export const ProductStats: React.FC<IProps> = () => {
    const product = useContext(ProductContext)

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                Характеристики <span>{product.name}</span>
            </div>
            <div className={styles.typePropertiesWrapper}>
                {product.typeProperties!.map(typeProp => <ProductTypeProp typeProperty={typeProp}/>)}
            </div>
        </div>
    )
}
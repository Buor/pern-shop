import React from 'react'
import { ProductDTO } from '../../../../../@types/DTO/productDTOs'
import styles from './productStats.module.scss'

interface IProps {
    product: ProductDTO
}

export const ProductStats: React.FC<IProps> = ({product}) => {
    return (
        <div className={styles.root}>
            Product Stats
        </div>
    )
}
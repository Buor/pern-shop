import React from 'react'
import styles from './productAside.module.scss'

interface IProps {

}

export const ProductAside: React.FC<IProps> = () => {
    return (
        <div className={styles.root}>
            Product Aside
        </div>
    )
}
import React from 'react'
import styles from './productStats.module.scss'

interface IProps {

}

export const ProductStats: React.FC<IProps> = () => {
    return (
        <div className={styles.root}>
            Product Stats
        </div>
    )
}
import React from 'react'
import styles from './productAside.module.scss'

interface IProps {

}

export const ProductAsideWrapper: React.FC<IProps> = ({children}) => {
    return (
        <div className={styles.root}>
            {children}
            <aside>
                Aside
            </aside>
        </div>
    )
}
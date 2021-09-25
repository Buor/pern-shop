import React from 'react'
import styles from './gray-border-ui.module.scss'

interface IProps {
    className?: string
}

export const GrayBorderUI: React.FC<IProps> = ({children, className=""}) => {
    return (
        <div className={styles.root + " " + className}>
            {children}
        </div>
    )
}
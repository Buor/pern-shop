import React from 'react'
import styles from './productStats.module.scss'
import { ITypePropertyValue } from '../../../../../@types/DTO/typeDTOs'

interface IProps {
    typePropertyValue: ITypePropertyValue
}

export const ProductTypePropValue: React.FC<IProps> = ({typePropertyValue}) => {
    return (
        <div className={styles.typePropertyValue}>
            {typePropertyValue.name}
        </div>
    )
}
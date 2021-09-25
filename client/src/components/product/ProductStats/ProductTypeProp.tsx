import React from 'react'
import { ITypeProperty } from '../../../../../@types/DTO/typeDTOs'
import styles from './productStats.module.scss'
import { ProductTypePropValue } from './ProductTypePropValue'

interface IProps {
    typeProperty: ITypeProperty
}

export const ProductTypeProp: React.FC<IProps> = ({typeProperty}) => {
    return (
        <div className={styles.typeProperty}>
            <div className={styles.typePropertyTitle}>
                {typeProperty.name}:
            </div>
            <div className={styles.separator}></div>
            <div className={styles.typePropertyValuesWrapper}>
                {typeProperty.typePropertyValues.map(typePropValue => <ProductTypePropValue typePropertyValue={typePropValue}/>)}
            </div>
        </div>
    )
}
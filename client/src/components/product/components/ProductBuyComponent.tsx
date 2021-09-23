import React from 'react'
import styles from './productBuy.module.scss'
import imgCartIcon from '../../../styles/images/icons/shopping_cart.svg'
import { GrayBorderUI } from '../../../utils/uiComponents/GrayBorderUI'

interface IProps {
    discountCost: number | null
    cost: number
}

export const ProductBuyComponent: React.FC<IProps> = ({ discountCost, cost }) => {
    return (
        <GrayBorderUI className={styles.costSection}>
            {
                discountCost
                    ? <>
                        <div className={styles.originalCost}>{cost} $</div>
                        <div className={styles.cost + ' ' + styles.discount}>
                            {discountCost ?? cost} $
                        </div>
                    </>
                    : <div className={styles.cost}>
                        {discountCost ?? cost} $
                    </div>
            }
            <button className={styles.btnBuy}>
                <img src={imgCartIcon} alt='cart' />
                Купить
            </button>

        </GrayBorderUI>
    )
}
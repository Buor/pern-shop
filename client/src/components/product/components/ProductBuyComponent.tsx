import React, { useContext } from 'react'
import styles from './productBuy.module.scss'
import imgCartIcon from '../../../styles/images/icons/shopping_cart.svg'
import { GrayBorderUI } from '../../../utils/uiComponents/GrayBorderUI'
import { useDispatch } from 'react-redux'
import useIsVerified from '../../../utils/customHooks/useIsVerified'
import { addProduct } from '../../../redux/basket/basketReducer'
import { ProductContext } from '../ProductPage'

interface IProps {

}

export const ProductBuyComponent: React.FC<IProps> = () => {
    const isVerified = useIsVerified()
    const dispatch = useDispatch()
    const product = useContext(ProductContext)

    const buyButtonHandler = () => {
        if(isVerified) {

        }
        else {
            dispatch(addProduct(product))
        }
    }

    return (
        <GrayBorderUI className={styles.costSection}>
            {
                product.discountCost
                    ? <>
                        <div className={styles.originalCost}>{product.cost} $</div>
                        <div className={styles.cost + ' ' + styles.discount}>
                            {product.discountCost ?? product.cost} $
                        </div>
                    </>
                    : <div className={styles.cost}>
                        {product.discountCost ?? product.cost} $
                    </div>
            }
            <button className={styles.btnBuy} onClick={buyButtonHandler}>
                <img src={imgCartIcon} alt='cart' />
                Купить
            </button>

        </GrayBorderUI>
    )
}
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductsAPI } from '../../serverApi/products/productsAPI'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'
import styles from './productPage.module.scss'
import { AllAboutProduct } from './AllAboutProduct'
import { ProductStats } from './ProductStats'

interface IProps {

}

export const ProductPage: React.FC<IProps> = () => {
    const history = useHistory()
    const [product, setProduct] = useState<ProductDTO | null>(null)
    const [currentSection, setCurrentSection] = useState<'All about Product' | 'Stats'>('All about Product')


    useEffect(() => {
        const getDataFromServer = async () => {
            let productData = await ProductsAPI.getProductById(history.location.pathname.split('/').pop() as string)
            setProduct(productData)
        }

        getDataFromServer()
    }, [])

    if (product === null) return null

    return (
        <div className={styles.root}>
            <div className={styles.title + ' container'}>{product.name}</div>
            <nav className={styles.navWrapper}>
                <div className={styles.navigation + ' container'}>
                    <button className={styles.active} onClick={() => setCurrentSection('All about Product')}>Все о товаре</button>
                    <button onClick={() => setCurrentSection('Stats')}>Характеристики</button>
                </div>
            </nav>
            <div className='container'>
                {currentSection === 'All about Product' && <AllAboutProduct product={product} />}
                {currentSection === 'Stats' && <ProductStats product={product} />}
            </div>
        </div>
    )
}
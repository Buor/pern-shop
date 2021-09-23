import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductsAPI } from '../../serverApi/products/productsAPI'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'
import styles from './productPage.module.scss'
import { AllAboutProduct } from './AllAboutProduct'
import { ProductStats } from './ProductStats'
import { ProductAsideWrapper } from './ProductAsideWrapper'
import { ProductNavigation } from './components/ProductNavigation'

interface IProps {

}

export const ProductContext = createContext({} as ProductDTO)
export type TProductPageSection = 'All about Product' | 'Stats'

export const ProductPage: React.FC<IProps> = () => {
    const history = useHistory()
    const [product, setProduct] = useState<ProductDTO | null>(null)
    const [currentSection, setCurrentSection] = useState<TProductPageSection>('All about Product')

    useEffect(() => {
        const getDataFromServer = async () => {
            let productData = await ProductsAPI.getProductById(history.location.pathname.split('/').pop() as string)
            setProduct(productData)
        }

        getDataFromServer()
    }, [])

    if (product === null) return null

    return (
        <ProductContext.Provider value={product}>
            <div className={styles.root}>
                <div className={styles.title + ' container'}>{product.name}</div>
                <ProductNavigation setCurrentSection={setCurrentSection} currentSection={currentSection}/>
                <div className='container'>
                    {currentSection === 'All about Product' && <AllAboutProduct product={product} />}
                    {currentSection === 'Stats' &&
                    <ProductAsideWrapper>
                      <ProductStats/>
                    </ProductAsideWrapper>
                    }
                </div>
            </div>
        </ProductContext.Provider>
    )
}
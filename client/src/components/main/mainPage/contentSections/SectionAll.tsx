import React, { useEffect, useState } from 'react'
import { ProductsAPI } from '../../../../serverApi/products/productsAPI'
import { GetAllProductsDTO } from '../../../../../../@types/DTO/productDTOs'
import ProductItem from '../ProductItem'

export const SectionAll: React.FC = () => {

    const [products, setProducts] = useState<GetAllProductsDTO[] | null>(null)

    useEffect(() => {
        (async () => {
            const allProducts: GetAllProductsDTO[] = (await ProductsAPI.getAllProducts()).data
            setProducts(allProducts)
        })()
    }, [])

    return <section>
        <div className='title'>All products</div>
        <div className='items_wrapper'>
            {products && products.map(product => <ProductItem key={product.name} {...product}/>)}
        </div>
    </section>
}
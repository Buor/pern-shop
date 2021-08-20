import React from 'react'
import { CategoryProductDTO } from '../../../../../../@types/DTO/productDTOs'
import ContentProduct from './ContentProduct'

interface Props {
    products: CategoryProductDTO[]
}

export const CategoryPageContent: React.FC<Props> = ({products}) => {
    return <section className='content'>
        <div className='product_wrapper'>
            {/*Mock data*/}
            {/*{Array(7).fill(null).map(() => <ContentProduct/>)}*/}
            {products.map(product => <ContentProduct product={product}/>)}
        </div>
    </section>
}
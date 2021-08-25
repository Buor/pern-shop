import React from 'react'
import { CategoryProductDTO } from '../../../../../../@types/DTO/productDTOs'
import ContentProduct from './ContentProduct'

interface Props {
    products: CategoryProductDTO[]
}

const getAllProductsIds = (products: CategoryProductDTO[]) => {
    return products.map(product => product.id).sort((a,b) => a - b).join(',')
}

const CategoryPageContent: React.FC<Props> = ({products}) => {
    return <div className='product_wrapper'>
            {products.map(product => <ContentProduct key={product.name} product={product}/>)}
        </div>
}

export default React.memo(CategoryPageContent, (prev, next) => {
    if(prev.products.length === next.products.length) {
        if(getAllProductsIds(prev.products) === getAllProductsIds(next.products))
            return true
    }
    return false
})
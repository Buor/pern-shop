import React from 'react'
import { CategoryProductDTO } from '../../../../../../@types/DTO/productDTOs'
import ContentProduct from './ContentProduct'
import useIsVerified from '../../../../Utils/CustomHooks/useIsVerified'

interface Props {
    products: CategoryProductDTO[]
}

const getAllProductsIds = (products: CategoryProductDTO[]) => {
    return products.map(product => product.id).sort((a, b) => a - b).join(',')
}

const CategoryPageContent: React.FC<Props> = ({ products }) => {

    const isVerified = useIsVerified()
    if (isVerified === 'pending') return null
    return <div className='product_wrapper'>
        {products.map(product => <ContentProduct isVerified={isVerified} key={product.name}
                                                 product={product} />)}
    </div>
}

export default React.memo(CategoryPageContent, (prev, next) => {
    if (prev.products.length === next.products.length) {
        if (getAllProductsIds(prev.products) === getAllProductsIds(next.products))
            return true
    }
    return false
})

import React from 'react'
import { CategoryProductDTO } from '../../../../../../@types/DTO/productDTOs'
import { ContentProduct } from './ContentProduct'
import useIsVerified from '../../../../Utils/CustomHooks/useIsVerified'

interface Props {
    products: CategoryProductDTO[]
}

const CategoryPageContent: React.FC<Props> = ({ products }) => {

    const isVerified = useIsVerified()
    if (isVerified === 'pending') return null
    return <div className='product_wrapper'>
        {products.map(product => <ContentProduct isVerified={isVerified} key={product.name}
                                                 product={product} />)}
    </div>
}

export default CategoryPageContent

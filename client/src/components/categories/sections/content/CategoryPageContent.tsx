import React from 'react'
import { ProductDTO } from '../../../../../../@types/DTO/productDTOs'
import { ContentProduct } from './ContentProduct'
import useIsVerified from '../../../../utils/customHooks/useIsVerified'

interface Props {
    products: ProductDTO[]
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

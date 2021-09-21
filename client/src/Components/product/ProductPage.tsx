import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductsAPI } from '../../serverApi/products/productsAPI'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

interface IProps {

}

export const ProductPage: React.FC<IProps> = () => {
    const history = useHistory()
    const [product,setProduct] = useState<ProductDTO | null>(null)

    useEffect(() => {
        const getDataFromServer = async () => {
            let productData = await ProductsAPI.getProductById(history.location.pathname.split('/').pop() as string)
            setProduct(productData)
        }

        getDataFromServer()
    }, [])

    if(product === null) return null
    console.log(product)
    return (
        <div>

        </div>
    )
}
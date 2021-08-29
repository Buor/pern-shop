import axiosInstance from '../axiosInstance'
import { getAccessToken } from '../auth/accessToken'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

export const getProductsFromUserBasket = async () => {
    return (await axiosInstance.get('/basket')).data
}

export const addProductToBasket = (product: ProductDTO) => {
    let accessToken = getAccessToken()
    axiosInstance.put('/basket', {productId: product.id}, {headers: {"Authorization": "Bearer " + accessToken}})
}
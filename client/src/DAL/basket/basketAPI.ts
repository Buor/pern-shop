import axiosInstance from '../axiosInstance'
import { getAccessToken } from '../auth/accessToken'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

export const getProductsFromUserBasket = async () => {
    let accessToken = getAccessToken()
    return (await axiosInstance.get('/basket', {headers: {"Authorization": "Bearer " + accessToken}})).data
}

export const addProductToBasket = (product: ProductDTO) => {
    let accessToken = getAccessToken()
    axiosInstance.put('/basket', {productId: product.id}, {headers: {"Authorization": "Bearer " + accessToken}})
}

export const deleteProductFromBasket = async (productId: number) => {
    let accessToken = getAccessToken()
    return (await axiosInstance.delete(`/basket/${productId}`, {headers: {"Authorization": "Bearer " + accessToken}})).data
}
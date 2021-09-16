import axiosInstance from '../axiosInstance'
import { getAccessToken } from '../auth/accessToken'
import { ProductDTO } from '../../../../@types/DTO/productDTOs'

export class BasketAPI {
    static addProductToBasket (product: ProductDTO) {
        let accessToken = getAccessToken()
        axiosInstance.put('/basket', {productId: product.id}, {headers: {"Authorization": "Bearer " + accessToken}})
    }
    static async getProductsFromUserBasket() {
        let accessToken = getAccessToken()
        return (await axiosInstance.get('/basket', {headers: {"Authorization": "Bearer " + accessToken}})).data
    }
    static async deleteProductFromBasket(productId: number) {
        let accessToken = getAccessToken()
        return (await axiosInstance.delete(`/basket/${productId}`, {headers: {"Authorization": "Bearer " + accessToken}})).data
    }
}
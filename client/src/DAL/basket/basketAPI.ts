import axiosInstance from '../axiosInstance'

export const getProductsFromUserBasket = async () => {
    return (await axiosInstance.get('/basket')).data
}
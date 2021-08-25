import axiosInstance from '../axiosInstance'

export const getAllProducts = () => {
    return axiosInstance.get('/product/all')
}

export const getCategoryProducts = async (typeId: number, pageNumber: number) => {
    return (await axiosInstance.get(`/product/all/type/${typeId}/page/${pageNumber}`)).data
}

export const getCategoryProductsCount = async (typeId: number) => {
    return (await axiosInstance.get(`/product/all/type/${typeId}/count`)).data
}
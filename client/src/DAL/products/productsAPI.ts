import axiosInstance from '../axiosInstance'

export const getAllProducts = () => {
    return axiosInstance.get('/product/all')
}

export const getCategoryProducts = async (typeId: number, pageNumber: number, pageSize: number | undefined = undefined) => {
    return (await axiosInstance.get(`/product/all/type/${typeId}/page/${pageNumber}`, {
        params: {
            pageSize
        }
    })).data
}

export const getCategoryProductsCount = async (typeId: number) => {
    return (await axiosInstance.get(`/product/all/type/${typeId}/count`)).data
}
import axiosInstance from '../axiosInstance'

export const getAllProducts = () => {
    return axiosInstance.get('/product/all')
}

export const getProductsByIds = () => {
    return axiosInstance.get('/product')
}

export const getCategoryProducts = async (
    typeId: number,
    pageNumber: number,
    filters: number[],
    pageSize: number | undefined = undefined,
    order: 'ASC' | 'DESC' | undefined = undefined
) => {
    return (await axiosInstance.get(`/product/all/type/${typeId}/page/${pageNumber}`, {
        params: {
            pageSize,
            filters,
            order
        }
    })).data
}

export const getCategoryProductsCount = async (typeId: number, filters: number[]) => {
    return (await axiosInstance.get(`/product/all/type/${typeId}/count`, {
        params: {
            filters
        }
    })).data
}
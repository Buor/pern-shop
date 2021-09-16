import axiosInstance from '../axiosInstance'

export class ProductsAPI {

    static getAllProducts() {
        return axiosInstance.get('/product/all')
    }

    static getProductsByIds() {
        return axiosInstance.get('/product')
    }

    static async getCategoryProducts (
        typeId: number,
        pageNumber: number,
        filters: number[],
        pageSize: number | undefined = undefined,
        order: 'ASC' | 'DESC' | undefined = undefined
    ) {
        return (await axiosInstance.get(`/product/all/type/${typeId}/page/${pageNumber}`, {
            params: {
                pageSize,
                filters,
                order
            }
        })).data
    }

    static async getCategoryProductsCount(typeId: number, filters: number[]) {
        return (await axiosInstance.get(`/product/all/type/${typeId}/count`, {
            params: {
                filters
            }
        })).data
    }
}
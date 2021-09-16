import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GetTypeDTO } from '../../../../@types/DTO/typeDTOs'
import { CategoryProductDTO } from '../../../../@types/DTO/productDTOs'
import { ProductsAPI } from '../../serverApi/products/productsAPI'
import CategoryPageOrder from './sections/content/CategoryPageOrder'
import { connect } from 'react-redux'
import { CategoryPageSidebar } from './sections/sidebar/CategoryPageSidebar'
import CategoryPageContent from './sections/content/CategoryPageContent'
import CategoryPagePagination from './sections/content/CategoryPagePagination'
import { TypeAPI } from '../../serverApi/type/typeAPI'

interface Props {
    filters: number[]
}

const CategoryPage: React.FC<Props> = ({ filters }) => {

    const history = useHistory()
    const [type, setType] = useState<GetTypeDTO | null>(null)
    const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')
    const [products, setProducts] = useState<CategoryProductDTO[]>([])
    const productsCount = useRef<number>(0)
    const pageSize = useRef<number>(50)
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)

    useEffect(() => {
        const getTypeFromServer = async () => {
            let typeData: GetTypeDTO = await TypeAPI.getType(history.location.pathname.split('/').pop() as string)
            setType(typeData)
        }
        getTypeFromServer()
    }, [])

    useEffect(() => {
        getProductsFromServer.current(type?.id, currentPageNumber, filters, order)
    }, [currentPageNumber, type, order])

    useEffect(() => {
        setCurrentPageNumber(1)
        getProductsFromServer.current(type?.id, 1, filters, order)
    }, [filters])

    const getProductsFromServer = useRef(async (typeId: number | undefined, pageNumber: number, filters: number[], order: "ASC" | "DESC") => {
        if (!typeId) return
        productsCount.current = await ProductsAPI.getCategoryProductsCount(typeId, filters)
        let productsData: CategoryProductDTO[] = await ProductsAPI.getCategoryProducts(typeId, pageNumber,filters, pageSize.current, order )
        setProducts(productsData)
    })

    const changeOrder = (value: 'ASC' | 'DESC') => setOrder(value)

    if (type === null || products === null) return null

    return <div className={'category_page'}>
        <div className={'title'}>
            {type.name}
        </div>
        <div className='category_settings'>
            <CategoryPageOrder changeOrder={changeOrder} value={order} />
        </div>
        <div className='category_wrapper'>
            <CategoryPageSidebar typeProperties={type.typeProperties} />
            <section className='content'>
                <CategoryPageContent products={products} />
                <CategoryPagePagination pageSize={pageSize.current} currentPage={currentPageNumber} setCurrentPageNumber={setCurrentPageNumber} productsCount={productsCount.current} />
            </section>
        </div>
    </div>
}

export default connect((state: any) => ({
    filters: state.categoryPage.filters
}))(CategoryPage)
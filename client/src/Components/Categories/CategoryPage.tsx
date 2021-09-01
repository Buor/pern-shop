import React, { useEffect, useRef, useState } from 'react'
import { getType } from '../../DAL/type/typeAPI'
import { useHistory } from 'react-router-dom'
import { GetTypeDTO } from '../../../../@types/DTO/typeDTOs'
import CategoryPageContent from './Sections/Content/CategoryPageContent'
import { CategoryPageSidebar } from './Sections/Sidebar/CategoryPageSidebar'
import { CategoryProductDTO } from '../../../../@types/DTO/productDTOs'
import { getCategoryProducts, getCategoryProductsCount } from '../../DAL/products/productsAPI'
import CategoryPageOrder from './Sections/Content/CategoryPageOrder'
import { connect } from 'react-redux'
import CategoryPagePagination from './Sections/Content/CategoryPagePagination'

interface Props {
    filters: number[]
}

const CategoryPage: React.FC<Props> = ({ filters }) => {

    const history = useHistory()
    const [type, setType] = useState<GetTypeDTO | null>(null)
    const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')
    const [products, setProducts] = useState<CategoryProductDTO[]>([])
    const productsCount = useRef<number>(0)
    const pageSize = useRef<number>(10)
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)

    useEffect(() => {
        const getTypeFromServer = async () => {
            let typeData: GetTypeDTO = await getType(history.location.pathname.split('/').pop() as string)
            setType(typeData)
        }
        getTypeFromServer()
    }, [])

    useEffect(() => {
        getProductsFromServer.current(type?.id, currentPageNumber, filters, order)
    }, [currentPageNumber, type, filters, order])


    const getProductsFromServer = useRef(async (typeId: number | undefined, pageNumber: number, filters: number[], order: "ASC" | "DESC") => {
        if (!typeId) return
        productsCount.current = await getCategoryProductsCount(typeId)
        let productsData: CategoryProductDTO[] = await getCategoryProducts(typeId, pageNumber,filters, pageSize.current, order )
        setProducts(productsData)
    })

    const changeOrder = (value: 'ASC' | 'DESC') => {
        setOrder(value)
    }

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
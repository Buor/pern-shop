import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getType } from '../../DAL/type/typeAPI'
import { useHistory } from 'react-router-dom'
import { GetTypeDTO } from '../../../../@types/DTO/typeDTOs'
import { CategoryPageContent } from './Sections/Content/CategoryPageContent'
import { CategoryPageSidebar } from './Sections/Sidebar/CategoryPageSidebar'
import { CategoryProductDTO } from '../../../../@types/DTO/productDTOs'
import { getCategoryProducts } from '../../DAL/products/productsAPI'
import CategoryPageOrder from './Sections/Content/CategoryPageOrder'
import { connect } from 'react-redux'

interface Props {
    filters: number[]
}

const sortProducts = (order: 'asc' | 'desc') => (a: CategoryProductDTO, b: CategoryProductDTO) => {
    if (order === 'asc')
        return a.cost - b.cost
    return b.cost - a.cost
}

const CategoryPage: React.FC<Props> = ({ filters }) => {

    const history = useHistory()
    const [type, setType] = useState<GetTypeDTO | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [products, setProducts] = useState<CategoryProductDTO[]>([])

    useEffect(() => {
        getProductsFromServer.current()
    }, [])

    const filteredProducts = useMemo(() => {
        if(filters.length === 0) return products
        return products.filter(product => product.typePropertyValues.some(typePropValue => filters.includes(typePropValue.id)))
    }, [filters, products])

    const getProductsFromServer = useRef(async () => {
        let typeData: GetTypeDTO = await getType(history.location.pathname.split('/').pop() as string)
        setType(typeData)
        let productsData: CategoryProductDTO[] = await getCategoryProducts(typeData.id)
        setProducts(productsData)
    })

    const changeOrder = (value: 'asc' | 'desc') => {
        setOrder(value)
    }

    const resultProducts = useMemo(() => {
        return filteredProducts.sort(sortProducts(order))
    }, [order, filteredProducts])

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
            <CategoryPageContent products={resultProducts} />
        </div>
    </div>
}

export default connect((state: any) => ({
    filters: state.categoryPage.filters
}))(CategoryPage)
import React, { useEffect, useMemo, useState } from 'react'
import { getType } from '../../DAL/type/typeAPI'
import { useHistory } from 'react-router-dom'
import { GetTypeDTO } from '../../../../@types/DTO/typeDTOs'
import { CategoryPageContent } from './Sections/Content/CategoryPageContent'
import { CategoryPageSidebar } from './Sections/Sidebar/CategoryPageSidebar'
import { CategoryProductDTO } from '../../../../@types/DTO/productDTOs'
import { getCategoryProducts } from '../../DAL/products/productsAPI'

export const CategoryPage: React.FC = () => {

    const history = useHistory()
    const [type, setType] = useState<GetTypeDTO | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [products, setProducts] = useState<CategoryProductDTO[]>([])

    useEffect(() => {
        getProductsFromServer()
    }, [])

    const getProductsFromServer = async () => {
        let typeData: GetTypeDTO = await getType(history.location.pathname.split('/').pop() as string)
        setType(typeData)
        let productsData: CategoryProductDTO[] = await getCategoryProducts(typeData.id)
        setProducts(productsData)
    }

    const changeOrder = (value: 'asc' | 'desc') => {
        setOrder(value)
    }

    const resultProducts = useMemo(() => {

        return products.sort((a, b) => {
            if(order === "asc")
                return a.cost - b.cost
            return b.cost - a.cost
        })
    }, [order, products])

    if (type === null || products === null) return null
    console.log(resultProducts)

    return <div className={'category_page'}>
        <div className={'title'}>
            {type.name}
        </div>
        <div className='category_settings'>
            <select name='category_order' id='category_order'
                    onChange={e => changeOrder(e.target.value as 'asc' | 'desc')} value={order}>
                <option value='desc'>Descending Price</option>
                <option value='asc'>Ascending Price</option>
            </select>
        </div>
        <div className='category_wrapper'>
            <CategoryPageSidebar typeProperties={type.typeProperties} />
            <CategoryPageContent products={resultProducts} />
        </div>

    </div>
}
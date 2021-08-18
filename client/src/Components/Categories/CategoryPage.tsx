import React, { useEffect, useState } from 'react'
import { getType } from '../../DAL/type/typeAPI'
import { useHistory } from 'react-router-dom'
import { GetTypeDTO } from '../../../../@types/DTO/typeDTOs'
import { CategoryPageContent } from './Sections/CategoryPageContent'
import { CategoryPageSidebar } from './Sections/CategoryPageSidebar'

export const CategoryPage: React.FC = () => {

    const history = useHistory()
    const [type, setType] = useState<GetTypeDTO | null>(null)

    useEffect(() => {
        (async () => {
            let typeData: GetTypeDTO = await getType(history.location.pathname.split('/').pop() as string)
            setType(typeData)
        })()
    }, [])

    if (type === null) return null

    return <div className={'category_page'}>
        <div className={'title'}>
            {type.name}
        </div>
        <div className='category_settings'>
            <select name='category_order' id='category_order'>
                <option value='Desc'>Descending Price</option>
                <option value='Asc'>Ascending Price</option>
            </select>
        </div>
        <div className='category_wrapper'>
            <CategoryPageSidebar typeProperties={type.typeProperties}/>
            <CategoryPageContent />
        </div>

    </div>
}
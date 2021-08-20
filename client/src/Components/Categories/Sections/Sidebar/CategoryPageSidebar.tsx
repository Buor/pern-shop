import React from 'react'
import { ITypeProperty } from '../../../../../../@types/DTO/typeDTOs'

interface Props {
    typeProperties: ITypeProperty[]
}

export const CategoryPageSidebar: React.FC<Props> = ({typeProperties}) => {
    console.log("Type properties: ",typeProperties)
    return  <aside className='sidebar'>

    </aside>
}
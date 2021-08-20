import React from 'react'
import { ITypeProperty } from '../../../../../../@types/DTO/typeDTOs'
import SidebarList from './SidebarList'

interface Props {
    typeProperties: ITypeProperty[]
}

export const CategoryPageSidebar: React.FC<Props> = ({typeProperties}) => {
    console.log("Type properties: ",typeProperties)

    return  <aside className='sidebar'>
        {typeProperties.map(prop => <SidebarList key={prop.id} typeProperty={prop}/>)}
    </aside>
}
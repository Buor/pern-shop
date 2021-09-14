import React, { useState } from 'react'
import { ITypePropertyValue } from '../../../../../../@types/DTO/typeDTOs'
import { useDispatch } from 'react-redux'
import { CategoryPageActionCreators } from '../../../../Redux/category/actionCreators'

interface Props {
    typePropValue: ITypePropertyValue
}

export const SidebarListOption: React.FC<Props> = ({typePropValue: {name, id}}) => {

    const dispatch = useDispatch()

    const [selected, setSelected] = useState(false)

    const toggleSelect = () => {
        if(selected)
            dispatch(CategoryPageActionCreators.addFilter(id))
        else
            dispatch(CategoryPageActionCreators.removeFilter(id))

        setSelected(prev => !prev)
    }

    return (
        <div className={'list_option' + (selected ? " __selected" : "")} onClick={() => toggleSelect()}>
            {name}
        </div>
    )
}
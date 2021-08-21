import React, { useState } from 'react'
import { ITypePropertyValue } from '../../../../../../@types/DTO/typeDTOs'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../../../../Redux/category/categoryPageReducer'

interface Props {
    typePropValue: ITypePropertyValue,
    addFilter: typeof addFilter,
    removeFilter: typeof removeFilter
}

const SidebarListOption: React.FC<Props> = ({typePropValue: {name, id}, addFilter, removeFilter}) => {

    const [selected, setSelected] = useState(false)

    const toggleSelect = () => {
        if(selected)
            removeFilter(id)
        else
            addFilter(id)

        setSelected(prev => !prev)
    }

    return (
        <div className={'list_option' + (selected ? " __selected" : "")} onClick={() => toggleSelect()}>
            {name}
        </div>
    )
}

export default connect(() => ({}), {
    addFilter,
    removeFilter
})(SidebarListOption)
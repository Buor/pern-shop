import React, { useState } from 'react'
import { ITypePropertyValue } from '../../../../../../@types/DTO/typeDTOs'

interface Props {
    typePropValue: ITypePropertyValue
}

const SidebarListOption: React.FC<Props> = ({typePropValue: {name, id}}) => {

    const [selected, setSelected] = useState(false)

    const toggleSelect = () => {
        setSelected(prev => !prev)
    }

    return (
        <div className={'list_option' + (selected ? " __selected" : "")} onClick={() => toggleSelect()}>
            {name}
        </div>
    )
}

export default SidebarListOption
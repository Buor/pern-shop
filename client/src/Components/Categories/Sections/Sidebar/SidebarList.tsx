import React, { useState } from 'react'
import { ITypeProperty } from '../../../../../../@types/DTO/typeDTOs'
import SidebarListOption from './SidebarListOption'

interface Props {
    typeProperty: ITypeProperty,
}

const SidebarList: React.FC<Props> = ({ typeProperty: { name, typePropertyValues } }) => {

    const [hidden, setHidden] = useState(false)

    const toggleHide = () => {
        setHidden(prev => !prev)
    }

    return (
        <div className={'list'}>
            <div className={'list_title'} onClick={() => toggleHide()}>
                <span className='name'>
                    {name}
                </span>
                <span className='count'>
                    {typePropertyValues.length}
                </span>
            </div>
            <div className={'list_select' + (hidden ? " __hidden" : "")}>
                {typePropertyValues.map(typePropValue => <SidebarListOption key={typePropValue.id} typePropValue={typePropValue}/>)}
            </div>
        </div>
    )
}

export default SidebarList
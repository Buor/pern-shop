import React from 'react'

interface Props {
    changeOrder: Function,
    value: string
}

const CategoryPageOrder: React.FC<Props> = ({changeOrder, value}) => {
    return (
        <select name='category_order' id='category_order'
                onChange={e => changeOrder(e.target.value as 'asc' | 'desc')} value={value}>
            <option value='desc'>Descending Price</option>
            <option value='asc'>Ascending Price</option>
        </select>
    )
}

export default CategoryPageOrder
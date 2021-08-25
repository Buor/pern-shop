import React, { useMemo } from 'react'
import img_right_arrow from './../../../../Styles/Images/Icons/right_arrow.svg'

interface Props {
    productsCount: number,
    currentPage?: number
}

const CategoryPagePagination: React.FC<Props> = ({ productsCount, currentPage = 1 }) => {

    //Mock
    const pageItems = Array(10).fill(null).map((_, i) => i + 1)
    console.log("Page items", pageItems)
    const goToPageByNumber = (pageNumber: number) => {
        console.log("Go to " + pageNumber)
    }

    return (
        <div className={'category_pagination'}>
            <button className={'btn_arrow'}>
                <img src={img_right_arrow} alt='left' />
            </button>
            <div className={'page_item_wrapper'}>
                {pageItems.map(item => {
                    return <div className={'page_item'} onClick={e => goToPageByNumber(item)}>{item}</div>
                })}
            </div>
            <button className={'btn_arrow'}>
                <img src={img_right_arrow} alt='right' />
            </button>
        </div>
    )
}

export default CategoryPagePagination
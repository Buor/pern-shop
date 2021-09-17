import React, { useMemo } from 'react'
import img_right_arrow from '../../../../styles/images/icons/right_arrow.svg'
import { generatePaginationList } from '../../../../utils/functions/generatePaginationList'

interface Props {
    productsCount: number,
    currentPage?: number,
    setCurrentPageNumber: Function,
    pageSize: number
}

const CategoryPagePagination: React.FC<Props> = ({ pageSize, setCurrentPageNumber, productsCount, currentPage = 1 }) => {

    const pageItems = useMemo(() => generatePaginationList(productsCount, currentPage, pageSize), [productsCount, currentPage, pageSize])

    if(pageItems.length === 1) return null

    const goToPageByNumber = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber)
    }

    const changePageByDirection = (direction: 'left' | 'right') => {
        let pagesCount = Math.ceil(productsCount / pageSize)
        if (direction === 'right' && currentPage + 1 <= pagesCount)
            setCurrentPageNumber(currentPage + 1)
        else if (direction === 'left' && currentPage - 1 >= 1)
            setCurrentPageNumber(currentPage - 1)
    }

    return (
        <section className={'category_pagination'}>
            <button className={'btn_arrow'} onClick={() => changePageByDirection('left')}>
                <img src={img_right_arrow} alt='left' />
            </button>
            <div className={'page_item_wrapper'}>
                {pageItems.map(item => {
                    return <div className={'page_item' + (item === currentPage ? ' page_item_current' : '')}
                                onClick={() => goToPageByNumber(item)}>{item}</div>
                })}
            </div>
            <button className={'btn_arrow'} onClick={() => changePageByDirection('right')}>
                <img src={img_right_arrow} alt='right' />
            </button>
        </section>
    )
}

export default CategoryPagePagination
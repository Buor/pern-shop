import React, { useMemo } from 'react'
import img_right_arrow from './../../../../Styles/Images/Icons/right_arrow.svg'
import { generatePaginationList } from '../../../../Utils/Functions/generatePaginationList'

interface Props {
    productsCount: number,
    currentPage?: number,
    setCurrentPageNumber: Function
}

const CategoryPagePagination: React.FC<Props> = ({ setCurrentPageNumber, productsCount, currentPage = 1 }) => {
    console.log(productsCount)
    //Mock
    const pageItems = useMemo(() => generatePaginationList(productsCount, currentPage), [productsCount, currentPage])

    const goToPageByNumber = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber)
    }

    console.log('Products count: ', productsCount)

    return (
        <section className={'category_pagination'}>
            <button className={'btn_arrow'}>
                <img src={img_right_arrow} alt='left' />
            </button>
            <div className={'page_item_wrapper'}>
                {pageItems.map(item => {
                    return <div className={'page_item' + (item === currentPage ? ' page_item_current' : '')}
                                onClick={() => goToPageByNumber(item)}>{item}</div>
                })}
            </div>
            <button className={'btn_arrow'}>
                <img src={img_right_arrow} alt='right' />
            </button>
        </section>
    )
}

export default CategoryPagePagination